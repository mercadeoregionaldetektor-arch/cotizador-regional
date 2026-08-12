'use strict';

const http = require('http');
const fsp = require('fs/promises');
const path = require('path');

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || '0.0.0.0';
const COUNTERS_FILE = path.join(__dirname, 'data', 'counters.json');

let writeLock = Promise.resolve();

function getAllowedOrigins() {
  return String(process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map(v => v.trim())
    .filter(Boolean);
}

function isOriginAllowed(req) {
  const origin = req.headers.origin || '';
  const allowed = getAllowedOrigins();
  return !origin || !allowed.length || allowed.includes(origin);
}

function corsHeaders(req) {
  const origin = req.headers.origin || '';
  const allowed = getAllowedOrigins();

  const headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-store',
    'Vary': 'Origin'
  };

  if (!origin) headers['Access-Control-Allow-Origin'] = '*';
  else if (!allowed.length || allowed.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return headers;
}

function sendJson(res, status, data, extra = {}) {
  const body = JSON.stringify(data);

  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store',
    ...extra
  });

  res.end(body);
}

function cleanCode(value, fallback = '') {
  const clean = String(value || '')
    .trim()
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z0-9-]/g, '')
    .slice(0, 24);

  return clean || fallback;
}

function cleanYear(value) {
  const current = String(new Date().getFullYear());
  const year = String(value || current).replace(/\D/g, '').slice(0, 4);
  return /^\d{4}$/.test(year) ? year : current;
}

async function readCounters() {
  try {
    const raw = await fsp.readFile(COUNTERS_FILE, 'utf8');
    const data = JSON.parse(raw);
    return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
  } catch (error) {
    if (error?.code !== 'ENOENT') {
      console.error('[COUNTERS] Error leyendo archivo:', error);
    }
    return {};
  }
}

async function writeCounters(data) {
  await fsp.mkdir(path.dirname(COUNTERS_FILE), { recursive: true });

  const tempFile = `${COUNTERS_FILE}.tmp`;

  await fsp.writeFile(
    tempFile,
    JSON.stringify(data, null, 2),
    'utf8'
  );

  await fsp.rename(tempFile, COUNTERS_FILE);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    let finished = false;

    req.setEncoding('utf8');

    req.on('data', chunk => {
      if (finished) return;

      raw += chunk;

      if (raw.length > 1_000_000) {
        finished = true;
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });

    req.on('end', () => {
      if (finished) return;

      finished = true;

      try {
        resolve(raw.trim() ? JSON.parse(raw) : {});
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', error => {
      if (finished) return;
      finished = true;
      reject(error);
    });
  });
}

async function generateQuoteNumber({ countryCode, advisorCode, year, prefix }) {
  const country = cleanCode(countryCode);
  const advisor = cleanCode(advisorCode);
  const quoteYear = cleanYear(year);
  const companyPrefix = cleanCode(prefix, 'DET');

  if (!country) throw new Error('countryCode es obligatorio.');
  if (!advisor) throw new Error('advisorCode es obligatorio.');

  const key = `${country}|${advisor}|${quoteYear}`;

  writeLock = writeLock
    .catch(error => {
      console.error('[COUNTERS] Operación previa falló:', error);
    })
    .then(async () => {
      const counters = await readCounters();
      const current = Number(counters[key] || 0);
      const sequence = Number.isFinite(current) ? current + 1 : 1;

      counters[key] = sequence;
      await writeCounters(counters);

      return {
        sequence,
        quoteNumber:
          `${companyPrefix}-${country}-${quoteYear}-${advisor}-${String(sequence).padStart(4, '0')}`
      };
    });

  return writeLock;
}

const server = http.createServer(async (req, res) => {
  const cors = corsHeaders(req);

  if (req.method === 'OPTIONS') {
    if (!isOriginAllowed(req)) {
      return sendJson(res, 403, {
        ok: false,
        error: 'Origin not allowed'
      }, cors);
    }

    res.writeHead(204, cors);
    return res.end();
  }

  let pathname = '/';

  try {
    pathname = new URL(
      req.url,
      `http://${req.headers.host || 'localhost'}`
    ).pathname;
  } catch {
    return sendJson(res, 400, {
      ok: false,
      error: 'Invalid URL'
    }, cors);
  }

  if (req.method === 'GET' && pathname === '/') {
    return sendJson(res, 200, {
      ok: true,
      service: 'detektor-cotizador-api',
      purpose: 'quote-number-only'
    }, cors);
  }

  if (req.method === 'GET' && pathname === '/api/health') {
    return sendJson(res, 200, {
      ok: true,
      service: 'detektor-cotizador-api',
      status: 'online',
      timestamp: new Date().toISOString()
    }, cors);
  }

  if (!isOriginAllowed(req)) {
    return sendJson(res, 403, {
      ok: false,
      error: 'Origin not allowed'
    }, cors);
  }

  if (req.method === 'POST' && pathname === '/api/quote-number') {
    try {
      const body = await readBody(req);

      const result = await generateQuoteNumber({
        countryCode: body.countryCode,
        advisorCode: body.advisorCode,
        year: body.year,
        prefix: body.prefix || 'DET'
      });

      console.log('[QUOTE]', result.quoteNumber);

      return sendJson(res, 200, {
        ok: true,
        ...result
      }, cors);

    } catch (error) {
      console.error('[QUOTE] Error:', error);

      const message = String(error?.message || '');

      const clientError =
        message.includes('obligatorio') ||
        message.includes('Invalid JSON') ||
        message.includes('Payload too large');

      return sendJson(
        res,
        clientError ? 400 : 500,
        {
          ok: false,
          error: clientError
            ? message
            : 'No fue posible generar el consecutivo.'
        },
        cors
      );
    }
  }

  return sendJson(res, 404, {
    ok: false,
    error: 'Not found'
  }, cors);
});

server.on('error', error => {
  console.error('[SERVER] Error fatal:', error);
});

server.listen(PORT, HOST, () => {
  console.log(`Detektor Cotizador API activa en ${HOST}:${PORT}`);
  console.log('PDF gestionado únicamente en frontend');
  console.log('POST /api/quote-number');
});
