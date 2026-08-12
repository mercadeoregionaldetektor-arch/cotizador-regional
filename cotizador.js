/* Detektor Cotizador Regional - Frontend Webflow (Solo Vista Previa e Interfaz) */
window.DTK_BUILD_VERSION = 'v27-logica-separada';

window.DTK_CONFIG = {
  apiBase: 'https://cotizador-regional.onrender.com', 
  companyPrefix: 'DET',
  quoteCounterStorageKey: 'dtk_quote_counters_v2'
};

window.dtkApiBase = window.DTK_CONFIG.apiBase; // Exportamos para el archivo de descarga

window.DTK_COUNTRY_CONTACTS = {
  'Colombia': { web: 'https://www.detektor.com.co/', socials: [{ type: 'facebook', label: 'f', url: 'https://www.facebook.com/profile.php?id=100029671341345&locale=es_LA' }, { type: 'linkedin', label: 'in', url: 'https://www.linkedin.com/company/tracker-de-colombia-s-a-s-/' }, { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorcolombia/' }] },
  'Costa Rica': { web: 'https://www.detektor.co.cr/', socials: [{ type: 'facebook', label: 'f', url: 'https://www.facebook.com/detektorcostarica/' }, { type: 'x', label: 'X', url: 'https://twitter.com/detektor' }, { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorcr/' }, { type: 'whatsapp', label: 'WA', url: 'https://wa.me/50684534331' }] },
  'Panamá': { web: 'https://www.detektor.com.pa/', socials: [{ type: 'facebook', label: 'f', url: 'https://www.facebook.com/detektorpanama/' }, { type: 'x', label: 'X', url: 'https://twitter.com/detektor_pa' }, { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorpa/' }, { type: 'whatsapp', label: 'WA', url: 'https://wa.me/50762002871' }] },
  'Guatemala': { web: 'https://www.detektor.com.gt/', socials: [{ type: 'facebook', label: 'f', url: 'https://www.facebook.com/detektorguatemala/' }, { type: 'x', label: 'X', url: 'https://twitter.com/detektor' }, { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorgt/' }, { type: 'whatsapp', label: 'WA', url: 'https://bit.ly/DetektorGTWhatsapp' }] },
  'Honduras': { web: 'https://www.detektor.com.hn/', socials: [{ type: 'facebook', label: 'f', url: 'https://www.facebook.com/detektorhonduras/' }, { type: 'x', label: 'X', url: 'https://twitter.com/detektor_hn' }, { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorhn/' }, { type: 'whatsapp', label: 'WA', url: 'https://wa.me/50432416682' }] },
  'El Salvador': { web: 'https://www.detektor.com.sv/', socials: [{ type: 'facebook', label: 'f', url: 'https://www.facebook.com/detektorelsalvador/' }, { type: 'x', label: 'X', url: 'https://twitter.com/detektor_sv' }, { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorsv/' }, { type: 'whatsapp', label: 'WA', url: 'https://wa.me/50370038712' }] },
  'Nicaragua': { web: 'https://www.detektor.com.ni/', socials: [{ type: 'facebook', label: 'f', url: 'https://www.facebook.com/detektornicaragua/' }, { type: 'x', label: 'X', url: 'https://twitter.com/detektor_ni' }, { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorni/' }, { type: 'whatsapp', label: 'WA', url: 'https://wa.me/50586150778' }] },
  'Venezuela': { web: 'https://www.detektor.com.ve/', socials: [{ type: 'facebook', label: 'f', url: 'https://www.facebook.com/DetektorVE/' }, { type: 'x', label: 'X', url: 'https://twitter.com/detektorVE' }, { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorve/' }] }
};

window.DTK_DATA = {
  countries: {
    'Colombia': { code: 'CO', currency: ['COP', 'USD'], taxName: 'IVA', taxRates: [19, 0], phonePlaceholder: 'Ej. +57 300 000 0000', cityPlaceholder: 'Ej. Bogotá', advisorMode: 'manual', agents: [], terms: { installation: 'En disposición y coordinación con el cliente', payment: '30 días crédito', validity: '30 días calendario', warranty: '1 año por defectos de fábrica', extra: 'Esta propuesta es confidencial y propiedad de Detektor hasta su aceptación formal.' } },
    'Costa Rica': { code: 'CR', currency: ['CRC', 'USD'], taxName: 'IVA', taxRates: [13, 0], phonePlaceholder: 'Ej. +506 8888 8888', cityPlaceholder: 'Ej. San José', advisorMode: 'list', agents: [ { name: 'Yonder Ricardo Vega Nuñez', code: 'EMP362', role: 'Asesor Comercial' } ], terms: { installation: 'En coordinación con el cliente.', payment: 'Transferencia electrónica o cargo automático.', validity: '30 días.', warranty: 'Vigente por contrato.', extra: 'Propiedad de Detektor.' } }
  },
  products: [
    { id: 'cazador', name: 'Detektor El Cazador', image: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7b8d48e70aa94196be3df0_Productos-soluciones-detektor-cotizador%20(1).webp', description: 'Localización vehicular en tiempo real.', benefit: '✓ Tu vehículo en días, no en meses.' },
    { id: 'gps', name: 'Detektor GPS', image: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7b8d482a0eec4e41112bc8_Productos-soluciones-detektor-cotizador%20(5).webp', description: 'Rastreo satelital de alta precisión.', benefit: '✓ Visibilidad total de tu flota.' },
    { id: 'roadview', name: 'Roadview IA', image: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7b8d481a47f3c932fec5b9_Productos-soluciones-detektor-cotizador%20(4).webp', description: 'Cámaras con IA para prevención.', benefit: '✓ Reduce accidentes.' },
    { id: 'smart-track', name: 'Detektor Smart Track', image: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7b8d48cd2fcdddf06b6212_Productos-soluciones-detektor-cotizador%20(2).webp', description: 'Plataforma administrativa.', benefit: '✓ Monitoreo al alcance.' },
    { id: 'plus', name: 'Detektor Plus', image: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7b8d4880cacf3cb9ac7328_Productos-soluciones-detektor-cotizador%20(3).webp', description: 'Seguridad y monitoreo total.', benefit: '✓ Control operativo y menores costos.' }
  ]
};

(() => {
  'use strict';
  const CONFIG = window.DTK_CONFIG || {};
  const DATA = window.DTK_DATA || { countries: {}, products: [] };
  const CONTACTS = window.DTK_COUNTRY_CONTACTS || {};
  const $ = (id) => document.getElementById(id);
  const els = {};
  let reservedKey = ''; let reservedNumber = ''; let quoteTimer = null; let noticeTimer = null;

  function initRefs() {
    ['quote-date','quote-number','quote-country','quote-advisor-select','quote-advisor-manual','quote-advisor-code',
      'quote-advisor-phone','quote-advisor-email','currency-select','select-tax','input-tax-manual','tax-manual-wrap','tax-label','dtk-calc-tbody',
      'val-subtotal','val-tax','val-total','advisor-select-wrap','advisor-manual-wrap','dtk-products-catalog',
      'dtk-preview-modal','modal-scroll-area','dtk-notice'
    ].forEach(k => els[k] = $(k));
  }

  function todayLocal() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
  function sanitizeCode(value) { return String(value || '').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Z0-9-]/g, '').slice(0, 24); }

  function showNotice(message, type = 'success') {
    if (!els['dtk-notice']) return;
    clearTimeout(noticeTimer); els['dtk-notice'].textContent = message; els['dtk-notice'].className = `dtk-notice ${type}`;
    noticeTimer = setTimeout(() => { els['dtk-notice'].textContent = ''; els['dtk-notice'].className = 'dtk-notice'; }, 4500);
  }
  window.dtkShowNotice = showNotice; // Exportamos para descargar-pdf.js

  function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch])); }
  function parseNum(value) { let raw = String(value || '').replace(/[^\d.,-]/g, ''); const comma = raw.lastIndexOf(','); const dot = raw.lastIndexOf('.'); if (comma > dot) raw = raw.replace(/\./g, '').replace(',', '.'); else if (dot > comma) raw = raw.replace(/,/g, ''); return Number.parseFloat(raw) || 0; }
  function currentCurrency() { return els['currency-select']?.value || ''; }
  function currentTaxRate() { const mode = els['val-tax']?.dataset?.mode || 'auto'; const rate = mode === 'manual' ? parseNum(els['input-tax-manual']?.value) : parseNum(els['select-tax']?.value); return Math.min(100, Math.max(0, rate)); }
  function formatMoney(value) { return `${new Intl.NumberFormat('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value) || 0)} ${currentCurrency()}`.trim(); }
  function getCountry() { return DATA.countries[els['quote-country']?.value] || null; }
  function countryHasAdvisorList(country) { return !!country && Array.isArray(country.agents) && country.agents.length > 0; }
  
  function getAdvisorName() {
    const c = getCountry(); if (!c) return '';
    if (countryHasAdvisorList(c)) { const datalist = $('dtk-advisor-list'); const option = datalist ? Array.from(datalist.options).find(o => o.value === els['quote-advisor-select']?.value) : null; return option?.dataset?.name || ''; }
    return els['quote-advisor-manual']?.value.trim() || '';
  }
  function getAdvisorCode() { return sanitizeCode(els['quote-advisor-code']?.value || ''); }
  function quoteYear() { const val = els['quote-date']?.value; const y = val ? String(val).slice(0,4) : String(new Date().getFullYear()); return /^\d{4}$/.test(y) ? y : String(new Date().getFullYear()); }
  function previewQuoteNumber() { const country = getCountry(); const advisorCode = getAdvisorCode(); return (!country || !advisorCode) ? '' : `${CONFIG.companyPrefix || 'DET'}-${country.code}-${quoteYear()}-${advisorCode}-VISTA`; }

  async function reserveQuoteNumber(force = false, { showError = false } = {}) {
    const country = getCountry(); const advisorCode = getAdvisorCode();
    if (!country || !advisorCode) { reservedKey = ''; reservedNumber = ''; if (els['quote-number']) els['quote-number'].value = ''; return ''; }
    const key = `${country.code}|${advisorCode}|${quoteYear()}`;
    if (!force && key === reservedKey && reservedNumber) { els['quote-number'].value = reservedNumber; return reservedNumber; }
    
    if (els['quote-number']) els['quote-number'].value = 'Generando…';
    try {
      const response = await fetch(`${CONFIG.apiBase}/api/quote-number`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ countryCode: country.code, advisorCode, year: quoteYear(), prefix: CONFIG.companyPrefix }) });
      if (!response.ok) throw new Error(); const json = await response.json();
      reservedKey = key; reservedNumber = json.quoteNumber; els['quote-number'].value = reservedNumber; return reservedNumber;
    } catch (e) {
      if (els['quote-number']) els['quote-number'].value = ''; return '';
    }
  }

  function scheduleQuoteNumber() { clearTimeout(quoteTimer); if (els['quote-number']) els['quote-number'].value = ''; reservedKey = ''; reservedNumber = ''; quoteTimer = setTimeout(() => reserveQuoteNumber(false), 550); }

  function populateCountries() { const select = els['quote-country']; if (select) select.innerHTML = '<option value="">Seleccione un país</option>' + Object.keys(DATA.countries).map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join(''); }
  function populateProducts() {
    const grid = els['dtk-products-catalog']; if (!grid) return;
    grid.innerHTML = DATA.products.map(p => `<article class="dtk-product-card"><div class="dtk-product-image" style="padding:0;overflow:hidden;"><img src="${p.image}" style="width:100%;height:100%;object-fit:cover;display:block;"></div><div class="dtk-product-body"><h3 class="dtk-product-name">${escapeHtml(p.name)}</h3><p class="dtk-product-desc">${escapeHtml(p.description)}</p><p class="dtk-product-benefit">${escapeHtml(p.benefit)}</p><button type="button" class="dtk-btn dtk-btn-dark dtk-btn-add" data-product-id="${escapeHtml(p.id)}">Agregar a cotización</button></div></article>`).join('') + `<article class="dtk-product-custom"><h3>¿Necesitas otro producto?</h3><button type="button" class="dtk-btn dtk-btn-red" id="btn-add-custom">+ Agregar producto personalizado</button></article>`;
  }

  function applyCountry() {
    const country = getCountry(); reservedKey = ''; reservedNumber = ''; els['quote-number'].value = ''; els['quote-advisor-code'].value = ''; els['quote-advisor-phone'].value = ''; els['quote-advisor-email'].value = '';
    if (!country) { els['advisor-select-wrap'].classList.remove('dtk-hidden'); els['advisor-manual-wrap'].classList.add('dtk-hidden'); els['quote-advisor-select'].innerHTML = '<option value="">Seleccione el país primero</option>'; els['currency-select'].innerHTML = ''; els['select-tax'].innerHTML = ''; return; }
    if (countryHasAdvisorList(country)) { els['advisor-select-wrap'].classList.remove('dtk-hidden'); els['advisor-manual-wrap'].classList.add('dtk-hidden'); els['quote-advisor-manual'].value = ''; els['quote-advisor-code'].readOnly = true; const datalist = $('dtk-advisor-list'); if (datalist) datalist.innerHTML = country.agents.map(a => `<option value="${escapeHtml(a.code)}" data-name="${escapeHtml(a.name)}">${escapeHtml(a.code)} - ${escapeHtml(a.name)}</option>`).join(''); els['quote-advisor-select'].value = ''; els['quote-advisor-select'].placeholder = 'Buscar o seleccionar asesor...'; } else { els['advisor-select-wrap'].classList.add('dtk-hidden'); els['advisor-manual-wrap'].classList.remove('dtk-hidden'); els['quote-advisor-select'].innerHTML = '<option value="">Asesor manual</option>'; els['quote-advisor-code'].readOnly = true; }
    els['currency-select'].innerHTML = country.currency.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join(''); els['tax-label'].textContent = country.taxName; els['select-tax'].innerHTML = country.taxRates.map(r => `<option value="${r}">${r}%</option>`).join('');
    if (els['input-tax-manual']) els['input-tax-manual'].value = String(country.taxRates?.[0] ?? 0);
    $('terms-installation').value = country.terms.installation || ''; $('terms-payment').value = country.terms.payment || ''; $('terms-validity').value = country.terms.validity || ''; $('terms-warranty').value = country.terms.warranty || ''; $('terms-extra').value = country.terms.extra || ''; calculateAll();
  }

  function renderEmptyRow() { const tbody = els['dtk-calc-tbody']; if (tbody && !tbody.querySelector('tr[data-row]')) tbody.innerHTML = '<tr class="dtk-empty-row"><td colspan="6">Agrega uno o más productos.</td></tr>'; }
  function appendRow(name = '', qty = 1, price = 0, discount = 0, productId = '') {
    const tbody = els['dtk-calc-tbody']; if (!tbody) return; tbody.querySelector('.dtk-empty-row')?.remove();
    const tr = document.createElement('tr'); tr.dataset.row = '1'; tr.dataset.productId = productId || '';
    tr.innerHTML = `<td><input class="dtk-input dtk-prod-name" value="${escapeHtml(name)}"></td><td><input type="number" class="dtk-input dtk-qty" value="${qty}"></td><td><input type="number" class="dtk-input dtk-price" value="${price}"></td><td><input type="number" class="dtk-input dtk-desc" value="${discount}"></td><td class="dtk-row-subtotal">${formatMoney(0)}</td><td><button type="button" class="dtk-remove">×</button></td>`;
    tbody.appendChild(tr); calculateAll();
  }

  function rowData() {
    return [...(els['dtk-calc-tbody']?.querySelectorAll('tr[data-row]') || [])].map(row => {
      const qty = parseNum(row.querySelector('.dtk-qty')?.value); const price = parseNum(row.querySelector('.dtk-price')?.value); const discount = Math.min(100, Math.max(0, parseNum(row.querySelector('.dtk-desc')?.value))); const subtotal = qty * price * (1 - discount / 100);
      return { row, productId: row.dataset.productId || '', name: row.querySelector('.dtk-prod-name')?.value.trim() || '', qty, price, discount, subtotal };
    });
  }

  function calculateAll() {
    const rows = rowData(); let rawSubtotal = 0;
    rows.forEach(item => { rawSubtotal += item.subtotal; const el = item.row.querySelector('.dtk-row-subtotal'); if (el) el.textContent = formatMoney(item.subtotal); });
    let subtotal = rawSubtotal; if (els['val-subtotal'].dataset.mode === 'auto') els['val-subtotal'].textContent = formatMoney(rawSubtotal); else subtotal = parseNum(els['val-subtotal'].textContent);
    const tax = subtotal * (currentTaxRate() / 100); els['val-tax'].textContent = formatMoney(tax);
    if (els['val-total'].dataset.mode === 'auto') els['val-total'].textContent = formatMoney(subtotal + tax);
    renderEmptyRow();
  }

  async function validateForm({ requireFinalNumber = false } = {}) {
    document.querySelectorAll('.dtk-error').forEach(el => el.classList.remove('dtk-error')); let valid = true;
    ['client-name','client-email','client-phone','quote-date','quote-country','quote-advisor-code','terms-installation','terms-payment','terms-validity','terms-warranty'].forEach(id => { const el = $(id); if (!el || !String(el.value || '').trim()) { el?.classList.add('dtk-error'); valid = false; } });
    const rows = rowData(); if (!rows.length) { showNotice('Agrega un producto.', 'error'); return false; }
    rows.forEach(item => { if (!item.name) { item.row.querySelector('.dtk-prod-name')?.classList.add('dtk-error'); valid = false; } });
    if (!valid) { showNotice('Revisa los campos en rojo.', 'error'); return false; }
    const number = await reserveQuoteNumber(false, { showError: requireFinalNumber });
    if (!number) { if (requireFinalNumber) return false; els['quote-number'].value = previewQuoteNumber(); }
    return true;
  }

  // EXPORTAMOS LA FUNCIÓN PARA QUE EL ARCHIVO "descargar-pdf.js" PUEDA SOLICITAR LOS DATOS
  window.dtkGetPayload = async function() {
    const isValid = await validateForm({ requireFinalNumber: true });
    if (!isValid) return null;
    calculateAll();
    return {
      quoteData: { date: $('quote-date').value, number: els['quote-number'].value, country: els['quote-country'].value, advisorCode: getAdvisorCode(), advisorName: getAdvisorName(), advisorEmail: $('quote-advisor-email').value, advisorPhone: $('quote-advisor-phone').value, observations: $('quote-obs').value },
      clientData: { name: $('client-name').value, company: $('client-company').value, role: $('client-role').value, email: $('client-email').value, phone: $('client-phone').value, city: $('client-city').value },
      terms: { installation: $('terms-installation').value, payment: $('terms-payment').value, validity: $('terms-validity').value, warranty: $('terms-warranty').value, extra: $('terms-extra').value },
      financials: { currency: currentCurrency(), taxRate: currentTaxRate(), taxLabel: getCountry()?.taxName || 'IVA', subtotal: els['val-subtotal'].textContent, taxAmount: els['val-tax'].textContent, total: els['val-total'].textContent },
      products: rowData().map(item => ({ productId: item.productId, name: item.name, qty: item.qty, price: item.price, discount: item.discount, subtotal: item.subtotal }))
    };
  };

  function populatePreview() {
    const gv = id => $(id)?.value?.trim() || ''; const setText = (id, val) => { const el = $(id); if(el) el.textContent = val || '-'; };
    setText('prev-client-name', gv('client-name')); setText('prev-client-company', gv('client-company')); setText('prev-quote-number', gv('quote-number')); setText('prev-quote-date', gv('quote-date')); setText('prev-adv-name-box', getAdvisorName()); setText('prev-subtotal', els['val-subtotal'].textContent); setText('prev-tax', els['val-tax'].textContent); setText('prev-total', els['val-total'].textContent);
    
    // RESTAURAR LA TABLA CON LAS COLUMNAS CORRECTAS EN LA VISTA PREVIA
    const rows = rowData(); const taxRate = currentTaxRate(); const taxLabel = taxRate === 0 ? 'NA' : `${taxRate}%`;
    const previewBody = $('prev-calc-tbody');
    if (previewBody) previewBody.innerHTML = rows.map(item => `<tr><td>• ${escapeHtml(item.name)}</td><td style="text-align:center;">${item.qty}</td><td style="text-align:center;">${escapeHtml(formatMoney(item.price))}</td><td style="text-align:center;">${escapeHtml(taxLabel)}</td><td style="text-align:right;font-weight:700">${escapeHtml(formatMoney(item.subtotal))}</td></tr>`).join('');
    
    // RESTAURAR LAS IMÁGENES Y SOLUCIONES EN LA VISTA PREVIA
    const selectedIds = rows.map(r => r.productId);
    const previewSolutions = $('prev-solutions');
    if (previewSolutions) {
      previewSolutions.innerHTML = DATA.products.map(p => {
        const isSelected = selectedIds.includes(p.id);
        const selClass = isSelected ? 'is-selected' : '';
        return `<div class="pdf-solution ${selClass}"><div class="pdf-solution-img"><img src="${p.image}"></div><div class="pdf-solution-copy"><h4>${p.name}</h4><p>${p.description}</p><div class="pdf-bullets"><span>${p.benefit}</span></div></div></div>`;
      }).join('');
    }
  }

  function wireEvents() {
    els['quote-country'].addEventListener('change', applyCountry);
    els['dtk-products-catalog'].addEventListener('click', e => { const add = e.target.closest('.dtk-btn-add'); if (add) { const p = DATA.products.find(x => x.id === add.dataset.productId); if (p) appendRow(p.name, 1, 0, 0, p.id); } if (e.target.id === 'btn-add-custom') appendRow('', 1, 0, 0, ''); });
    els['dtk-calc-tbody'].addEventListener('input', calculateAll); els['dtk-calc-tbody'].addEventListener('click', e => { if (e.target.closest('.dtk-remove')) { e.target.closest('tr[data-row]')?.remove(); calculateAll(); } });
    
    // EVENTOS SOLO PARA LA VISTA PREVIA
    $('btn-preview').addEventListener('click', async (e) => { e.preventDefault(); if (await validateForm()) { calculateAll(); populatePreview(); els['dtk-preview-modal'].classList.add('open'); document.body.style.overflow = 'hidden'; } });
    $('btn-modal-close').addEventListener('click', (e) => { e.preventDefault(); els['dtk-preview-modal'].classList.remove('open'); document.body.style.overflow = ''; });
  }

  function init() { initRefs(); populateCountries(); populateProducts(); els['quote-date'].value = todayLocal(); renderEmptyRow(); wireEvents(); calculateAll(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
