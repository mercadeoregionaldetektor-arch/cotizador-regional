const http = require('http');
const fsp = require('fs/promises');
const path = require('path');
const puppeteer = require('puppeteer');

// Importamos el diseño exacto que creamos en el otro archivo
const buildPdfTemplate = require('./pdfdescargar');

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

function corsHeaders(req) {
  const origin = req.headers.origin || '';
  const allowed = getAllowedOrigins();
  const headers = {
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };

  if (!origin) headers['Access-Control-Allow-Origin'] = '*';
  else if (!allowed.length || allowed.includes(origin)) headers['Access-Control-Allow-Origin'] = origin;

  return headers;
}

function isOriginAllowed(req) {
  const origin = req.headers.origin || '';
  const allowed = getAllowedOrigins();
  return !origin || !allowed.length || allowed.includes(origin);
}

function sendJson(res, status, data, extra = {}) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    ...extra
  });
  res.end(body);
}

function cleanCode(value, fallback = 'XX') {
  const out = String(value || '')
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z0-9-]/g, '')
    .slice(0, 24);
  return out || fallback;
}

async function readCounters() {
  try {
    return JSON.parse(await fsp.readFile(COUNTERS_FILE, 'utf8')) || {};
  } catch {
    return {};
  }
}

async function writeCounters(data) {
  await fsp.mkdir(path.dirname(COUNTERS_FILE), { recursive: true });
  await fsp.writeFile(COUNTERS_FILE, JSON.stringify(data, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      // Límite aumentado a 5MB para evitar que falle al recibir cotizaciones con muchos productos
      if (raw.length > 5000000) { 
        reject(new Error('Payload too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const cors = corsHeaders(req);

  if (req.method === 'OPTIONS') {
    if (!isOriginAllowed(req)) return sendJson(res, 403, { ok: false, error: 'Origin not allowed' }, cors);
    res.writeHead(204, cors);
    return res.end();
  }

  const pathname = new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname;

  if (req.method === 'GET' && pathname === '/') {
    return sendJson(res, 200, {
      ok: true,
      service: 'detektor-cotizador-api',
      frontend: 'Webflow'
    }, cors);
  }

  if (req.method === 'GET' && pathname === '/api/health') {
    return sendJson(res, 200, { ok: true, service: 'detektor-cotizador-api' }, cors);
  }

  if (!isOriginAllowed(req)) {
    return sendJson(res, 403, { ok: false, error: 'Origin not allowed' }, cors);
  }

  if (req.method === 'POST' && pathname === '/api/quote-number') {
    try {
      const body = await readBody(req);
      const countryCode = cleanCode(body.countryCode);
      const advisorCode = cleanCode(body.advisorCode, 'ASESOR');
      const year = String(body.year || new Date().getFullYear()).replace(/\D/g, '').slice(0, 4) || String(new Date().getFullYear());
      const prefix = cleanCode(body.prefix || 'DET', 'DET');
      const key = `${countryCode}|${advisorCode}|${year}`;

      const result = await (writeLock = writeLock.then(async () => {
        const counters = await readCounters();
        const sequence = Number(counters[key] || 1);
        counters[key] = sequence + 1;
        await writeCounters(counters);
        return {
          sequence,
          quoteNumber: `${prefix}-${countryCode}-${year}-${advisorCode}-${String(sequence).padStart(4, '0')}`
        };
      }));

      return sendJson(res, 200, { ok: true, ...result }, cors);
    } catch (error) {
      console.error(error);
      return sendJson(res, 500, { ok: false, error: 'No fue posible generar el consecutivo.' }, cors);
    }
  }

  // ==========================================
  // NUEVA RUTA: GENERACIÓN DE PDF
  // ==========================================
  if (req.method === 'POST' && pathname === '/api/generate-pdf') {
    try {
      const payload = await readBody(req);

      // Llamamos al archivo pdfdescargar.js que inyecta los datos JSON en el HTML
      const htmlContent = buildPdfTemplate(payload); 

      // 1. Lanzamos el navegador virtual
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();

      // 2. Renderizamos el HTML
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      // 3. Imprimimos a PDF
      const pdfBuffer = await page.pdf({
        width: '794px',
        height: '1123px',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
      });

      await browser.close();

      // 4. Enviamos el archivo binario de vuelta manteniendo los headers de CORS
      res.writeHead(200, {
        ...cors,
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.length
      });
      res.end(pdfBuffer);
      
      return; // Detener la ejecución

    } catch (error) {
      console.error('Error generando PDF:', error);
      return sendJson(res, 500, { ok: false, error: 'Fallo al generar el documento PDF' }, cors);
    }
  }

  // Fallback para rutas no encontradas
  return sendJson(res, 404, { ok: false, error: 'Not found' }, cors);
});

server.listen(PORT, HOST, () => {
  console.log(`Detektor Cotizador API activa en puerto ${PORT}`);
});
