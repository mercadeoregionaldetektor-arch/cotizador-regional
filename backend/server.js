const http = require('http');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || '0.0.0.0';
const COUNTERS_FILE = path.join(__dirname, 'data', 'counters.json');
const FRONTEND_DIR = path.join(__dirname, '..', 'frontend');
let writeLock = Promise.resolve();

const mime = {
  '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8',
  '.json':'application/json; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'
};

function corsHeaders(req) {
  const allowed = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',').map(s=>s.trim()) : [];
  const origin = req.headers.origin || '*';
  const allowOrigin = !allowed.length || allowed.includes(origin) ? origin : allowed[0] || '*';
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };
}

function sendJson(res, status, data, extra = {}) {
  const body = JSON.stringify(data);
  res.writeHead(status, { 'Content-Type':'application/json; charset=utf-8', 'Content-Length':Buffer.byteLength(body), ...extra });
  res.end(body);
}

function cleanCode(value, fallback='XX') {
  const out = String(value || '').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Z0-9-]/g,'').slice(0,24);
  return out || fallback;
}

async function readCounters() {
  try { return JSON.parse(await fsp.readFile(COUNTERS_FILE,'utf8')) || {}; } catch { return {}; }
}
async function writeCounters(data) {
  await fsp.mkdir(path.dirname(COUNTERS_FILE), { recursive:true });
  await fsp.writeFile(COUNTERS_FILE, JSON.stringify(data,null,2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw='';
    req.on('data', chunk => {
      raw += chunk;
      if (raw.length > 50000) { reject(new Error('Payload too large')); req.destroy(); }
    });
    req.on('end', () => {
      try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

async function serveStatic(req, res, cors) {
  let urlPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname);
  if (urlPath === '/') urlPath = '/index.html';
  let filePath = path.normalize(path.join(FRONTEND_DIR, urlPath));
  if (!filePath.startsWith(FRONTEND_DIR)) return sendJson(res,403,{ok:false,error:'Forbidden'},cors);
  try {
    const stat = await fsp.stat(filePath);
    if (stat.isDirectory()) filePath = path.join(filePath,'index.html');
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200,{ 'Content-Type': mime[ext] || 'application/octet-stream', ...cors });
    fs.createReadStream(filePath).pipe(res);
  } catch {
    try {
      const fallback = path.join(FRONTEND_DIR,'index.html');
      res.writeHead(200,{ 'Content-Type':'text/html; charset=utf-8', ...cors });
      fs.createReadStream(fallback).pipe(res);
    } catch { sendJson(res,404,{ok:false,error:'Not found'},cors); }
  }
}

const server = http.createServer(async (req,res) => {
  const cors = corsHeaders(req);
  if (req.method === 'OPTIONS') { res.writeHead(204,cors); return res.end(); }
  const pathname = new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname;

  if (req.method === 'GET' && pathname === '/api/health') return sendJson(res,200,{ok:true,service:'detektor-cotizador-api'},cors);

  if (req.method === 'POST' && pathname === '/api/quote-number') {
    try {
      const body = await readBody(req);
      const countryCode = cleanCode(body.countryCode);
      const advisorCode = cleanCode(body.advisorCode,'ASESOR');
      const year = String(body.year || new Date().getFullYear()).replace(/\D/g,'').slice(0,4) || String(new Date().getFullYear());
      const prefix = cleanCode(body.prefix || 'DET','DET');
      const key = `${countryCode}|${advisorCode}|${year}`;
      const result = await (writeLock = writeLock.then(async () => {
        const counters = await readCounters();
        const sequence = Number(counters[key] || 1);
        counters[key] = sequence + 1;
        await writeCounters(counters);
        return { sequence, quoteNumber:`${prefix}-${countryCode}-${year}-${advisorCode}-${String(sequence).padStart(4,'0')}` };
      }));
      return sendJson(res,200,{ok:true,...result},cors);
    } catch (error) {
      console.error(error);
      return sendJson(res,500,{ok:false,error:'No fue posible generar el consecutivo.'},cors);
    }
  }

  return serveStatic(req,res,cors);
});

server.listen(PORT,HOST,()=>console.log(`Detektor Cotizador listo en http://localhost:${PORT}`));
