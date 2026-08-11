/* Detektor Cotizador Regional - Frontend Webflow
   HTML/CSS viven en Webflow. Este archivo contiene datos + lógica JS.
*/

window.DTK_CONFIG = {
  // REEMPLAZA esta URL por la URL pública REAL de tu servicio Render, sin slash al final.
  apiBase: 'https://cotizador-regional.onrender.com',
  companyPrefix: 'DET',
  quoteCounterStorageKey: 'dtk_quote_counters_v2'
};

window.DTK_DATA = {
  countries: {
    'Colombia': {
      code: 'CO', currency: ['COP', 'USD'], taxName: 'IVA', taxRates: [19, 0], advisorMode: 'manual', agents: [],
      terms: {
        installation: 'En disposición y coordinación con el cliente',
        payment: '30 días crédito',
        validity: '30 días calendario',
        warranty: '1 año por defectos de fábrica',
        extra: 'Esta propuesta es confidencial y propiedad de Detektor hasta su aceptación formal. Su contenido no podrá ser divulgado ni utilizado con fines comerciales sin autorización. Comprometidos con la sostenibilidad, presentamos este documento en formato digital. Antes de imprimirlo, considere si es realmente necesario.'
      }
    },
    'Costa Rica': {
      code: 'CR', currency: ['CRC', 'USD'], taxName: 'IVA', taxRates: [13, 0], advisorMode: 'list',
      agents: [
        { name: 'Ileana María Solera Obaldía', code: 'EMP041' },
        { name: 'Lizbeth Gomez Muñoz', code: 'EMP375' },
        { name: 'Yonder Ricardo Vega Nuñez', code: 'EMP362' },
        { name: 'Gabriel Madrigal Blanco', code: 'EMP110' },
        { name: 'Josué Zúñiga Rodríguez', code: 'EMP622' },
        { name: 'Cairo Alonso Pérez López', code: 'EMP634' },
        { name: 'Anthony Chaves Montoya', code: 'EMP636' },
        { name: 'Melissa Méndez Porras', code: 'EMP233' },
        { name: 'Javier Alberto Rivera Quesada', code: 'EMP543' },
        { name: 'Manfred Bogarin Matarrita', code: 'EMP610' }
      ],
      terms: {
        installation: 'En disposición y coordinación con el cliente',
        payment: 'Según las condiciones comerciales acordadas con el cliente',
        validity: '30 días calendario',
        warranty: '1 año por defectos de fábrica',
        extra: 'Esta propuesta es confidencial y propiedad de Detektor hasta su aceptación formal. Revise y ajuste estas condiciones de acuerdo con la política comercial vigente de Costa Rica.'
      }
    },
    'Panamá': {
      code: 'PA', currency: ['USD'], taxName: 'ITBMS', taxRates: [7, 0], advisorMode: 'manual', agents: [],
      terms: {
        installation: 'En disposición y coordinación con el cliente',
        payment: 'Según las condiciones comerciales acordadas con el cliente',
        validity: '30 días calendario',
        warranty: '1 año por defectos de fábrica',
        extra: 'Esta propuesta es confidencial y propiedad de Detektor hasta su aceptación formal. Revise y ajuste estas condiciones de acuerdo con la política comercial vigente de Panamá.'
      }
    },
    'Guatemala': {
      code: 'GT', currency: ['GTQ', 'USD'], taxName: 'IVA', taxRates: [12, 0], advisorMode: 'list',
      agents: [
        { name: 'Edgar Salazar', code: 'GT-001' },
        { name: 'Mirna Arevalo', code: 'GT-002' },
        { name: 'Patricia Estrada', code: 'GT-003' },
        { name: 'Randy Ford', code: 'GT-004' },
        { name: 'Dorian Perez', code: 'GT-005' },
        { name: 'Lucia Hernandez', code: 'GT-006' },
        { name: 'Jorge Fajardo', code: 'GT-007' },
        { name: 'Roberto Mendez', code: 'GT-008' },
        { name: 'Evelyn Foronda', code: 'GT-009' },
        { name: 'Sthepannie Izaguirre', code: 'GT-010' }
      ],
      terms: {
        installation: 'En disposición y coordinación con el cliente, luego de firmada la autorización de la presente propuesta de productos y del contrato de servicio.',
        payment: 'El contrato de servicio comprende un período de doce meses (12). El pago del servicio lo puede realizar mediante transferencia electrónica, cargo a tarjeta de crédito.',
        validity: 'La presente propuesta de productos y servicios tiene una validez de 30 días calendario.',
        warranty: '1 año por defectos de fábrica',
        extra: 'POLÍTICA DE REVISIONES Y TRABAJOS TÉCNICOS: Toda revisión técnica de equipos fuera de garantía, así como aquellas derivadas de manipulación, accidentes o negligencia, tendrán un costo adicional. El valor de revisión es de Q160.00 por visita y, en caso de requerirse reemplazo de equipos, aplicarán los siguientes precios de referencia: Detektor El Cazador US$180 + IVA, Detektor GPS US$60 + IVA, y accesorios conforme a lista vigente. Las revisiones preventivas programadas y los desperfectos cubiertos por garantía no generan costo para el cliente.'
      }
    },
    'Honduras': {
      code: 'HN', currency: ['HNL', 'USD'], taxName: 'ISV', taxRates: [15, 0], advisorMode: 'list',
      agents: [
        { name: 'Fanny Roxana Rodriguez Lagos', code: 'HD-0030' },
        { name: 'Cinthia Carolina Alcantara Padilla', code: 'HD-0077' },
        { name: 'Odilson Arturo Mendoza Fletes', code: 'HD-0085' },
        { name: 'Belky Carolina Valladares Medina', code: 'HN-0106' },
        { name: 'Jessy Carolina Burgos Fiallos', code: 'HN-0240' },
        { name: 'Jeniffer Estefania Herrera Montalban', code: 'HN-0241' },
        { name: 'Mario Alejandro Garcia Salgado', code: 'HN-0251' },
        { name: 'Samir Ivan Hernandez Lopez', code: 'HN-0312' },
        { name: 'Allison Maria Oyuela Flores', code: 'HN-0322' },
        { name: 'Blanca Vanessa Sanders Barrera', code: 'HN-0325' }
      ],
      terms: {
        installation: 'En disposición y coordinación con el cliente, luego de firmada la autorización de la presente propuesta de productos y del contrato de servicio.',
        payment: 'Periodo maximo de pago de 30 dias credito. Nuestras políticas de facturación aplican a pago de servicios de manera anticipada.',
        validity: 'La presente propuesta de productos y servicios tiene una validez de 30 días calendario.',
        warranty: 'Los equipos Detektor GPS tienen una garantía de 1 año a partir de la fecha de instalación, no aplica por daños ocasionados por manipulación de los equipos.',
        extra: 'SERVICIOS DE MANTENIMIENTO: Se establecen 2 tipos de mantenimiento los cuales son preventivos y correctivos. El preventivo se hace una vez cada 12 meses y consiste en revisar todas las unidades que sean requeridas para descartar fallas en el futuro. Correctivos son aquellas revisiones que se realizan en caso de fallas técnicas, por no transmisión o errores de datos dentro de la plataforma.\nSERVICIO DE DESMONTE Y REINSTALACION: El costo de revisión preventiva de los equipos después de los primeros 12 meses de servicio por El Cazador es de $25, GPS $25 y Plus $35 más impuesto por cada servicio.\nCAPACITACIÓN: Se brindará capacitación a través de nuestros expertos en temas de plataforma, aplicativo, y reportes gerenciales a personal designado por la empresa.\nCONTRATO: El contrato de servicio comprenderá un período de 10 meses, de conformidad a la oferta económica, modalidad y aceptación por parte del cliente.'
      }
    },
    'El Salvador': {
      code: 'SV', currency: ['USD'], taxName: 'IVA', taxRates: [13, 0], advisorMode: 'list',
      agents: [
        { name: 'Patricia Veronica Cazun Vasquez', code: 'SL0189' },
        { name: 'Gerber Edgardo Navarro Ramirez', code: 'SL0281' },
        { name: 'Brenda Elizabeth Palacios Ruiz', code: 'SL0284' },
        { name: 'Javier Aaron Valdez Zelaya', code: 'SL0289' },
        { name: 'Milagro del Carmen Ferrufino de Duque', code: 'SL0292' },
        { name: 'Guillermo Ernesto Aquino Galan', code: 'SL0306' },
        { name: 'Nathaly Isela Sosa Guzman', code: 'SL0317' },
        { name: 'Jimmy Osmin Erazo Martinez', code: 'SL0321' },
        { name: 'Nestor Josue Guzman Salmeron', code: 'SL0327' },
        { name: 'Rene Arturo Lazo Velasquez', code: 'SL0328' }
      ],
      terms: {
        installation: 'En disposición y coordinación con el cliente, luego de firmada la autorización de la presente propuesta de productos y del contrato de servicio.',
        payment: 'Periodo maximo de pago de 30 dias credito. Nuestras políticas de facturación aplican a pago de servicios de manera anticipada.',
        validity: 'La presente propuesta de productos y servicios tiene una validez de 30 días calendario.',
        warranty: 'Los equipos Detektor GPS tienen una garantía de 1 año a partir de la fecha de instalación, no aplica por daños ocasionados por manipulación de los equipos.',
        extra: 'SERVICIOS DE MANTENIMIENTO: Se establecen 2 tipos de mantenimiento los cuales son preventivos y correctivos. El preventivo se hace una vez cada 12 meses y consiste en revisar todas las unidades que sean requeridas para descartar fallas en el futuro. Correctivos son aquellas revisiones que se realizan en caso de fallas técnicas, por no transmisión o errores de datos dentro de la plataforma.\nSERVICIO DE DESMONTE Y REINSTALACION: El costo de revisión preventiva de los equipos después de los primeros 12 meses de servicio por El Cazador es de $25, GPS $25 y Plus $35 más impuesto por cada servicio.\nCAPACITACIÓN: Se brindará capacitación a través de nuestros expertos en temas de plataforma, aplicativo, y reportes gerenciales a personal designado por la empresa.\nCONTRATO: El contrato de servicio comprenderá un período de 10 meses, de conformidad a la oferta económica, modalidad y aceptación por parte del cliente.'
      }
    },
    'Nicaragua': {
      code: 'NI', currency: ['NIO', 'USD'], taxName: 'IVA', taxRates: [15, 0], advisorMode: 'list',
      agents: [
        { name: 'Madeling Martinez', code: 'NI-001' },
        { name: 'Manuel Toruño', code: 'NI-002' },
        { name: 'Xochil Moreno', code: 'NI-003' },
        { name: 'Amy Ramirez', code: 'NI-004' }
      ],
      terms: {
        installation: 'En disposición y coordinación con el cliente, luego de firmada la autorización de la presente propuesta de productos y del contrato de servicio.',
        payment: 'Periodo maximo de pago de 30 dias credito. Nuestras políticas de facturación aplican a pago de servicios de manera anticipada.',
        validity: 'La presente propuesta de productos y servicios tiene una validez de 30 días calendario.',
        warranty: 'Los equipos Detektor GPS tienen una garantía de 1 año a partir de la fecha de instalación, no aplica por daños ocasionados por manipulación de los equipos.',
        extra: 'SERVICIOS DE MANTENIMIENTO: Se establecen 2 tipos de mantenimiento los cuales son preventivos y correctivos. El preventivo se hace una vez cada 12 meses y consiste en revisar todas las unidades que sean requeridas para descartar fallas en el futuro. Correctivos son aquellas revisiones que se realizan en caso de fallas técnicas, por no transmisión o errores de datos dentro de la plataforma.\nSERVICIO DE DESMONTE Y REINSTALACION: El costo de revisión preventiva de los equipos después de los primeros 12 meses de servicio por El Cazador es de $25, GPS $25 y Plus $35 más impuesto por cada servicio.\nCAPACITACIÓN: Se brindará capacitación a través de nuestros expertos en temas de plataforma, aplicativo, y reportes gerenciales a personal designado por la empresa.\nCONTRATO: El contrato de servicio comprenderá un período de 10 meses, de conformidad a la oferta económica, modalidad y aceptación por parte del cliente.'
      }
    },
    'Venezuela': {
      code: 'VE', currency: ['USD', 'VES'], taxName: 'IVA', taxRates: [16, 0], advisorMode: 'manual', agents: [],
      terms: {
        installation: 'En disposición y coordinación con el cliente',
        payment: 'Según las condiciones comerciales acordadas con el cliente',
        validity: '30 días calendario',
        warranty: '1 año por defectos de fábrica',
        extra: 'Esta propuesta es confidencial y propiedad de Detektor hasta su aceptación formal. Revise y ajuste estas condiciones de acuerdo con la política comercial vigente de Venezuela.'
      }
    }
  },
  products: [
    {
      id: 'cazador', name: 'Detektor El Cazador', imageLabel: 'IMG: RECUPERACIÓN VEHICULAR',
      description: 'Localización vehicular en tiempo real con red de reacción 24/7.',
      benefit: '✓ Tu vehículo en días, no en meses.',
      pdfDescription: 'Tecnología especializada para localizar vehículos en caso de hurto, incluso donde otras señales no llegan.'
    },
    {
      id: 'gps', name: 'Detektor GPS', imageLabel: 'IMG: MAPA GPS FLOTA',
      description: 'Rastreo satelital de alta precisión con geocercas y reportes de ruta.',
      benefit: '✓ Visibilidad total de tu flota, en cualquier momento.',
      pdfDescription: 'Dispositivo de rastreo de alta precisión. Permite monitoreo en tiempo real, histórico de rutas y geocercas.'
    },
    {
      id: 'roadview', name: 'Roadview IA', imageLabel: 'IMG: CÁMARA IA VEHÍCULO',
      description: 'Cámaras con IA para prevención de fatiga y distracción al volante.',
      benefit: '✓ Reduce accidentes con alertas en tiempo real.',
      pdfDescription: 'Cámara con inteligencia artificial para prevenir riesgos y mejorar la conducción.'
    },
    {
      id: 'smart-track', name: 'Detektor Smart Track', imageLabel: 'IMG: EQUIPO DE RESPUESTA',
      description: 'Una sola plataforma todos sus vehículos sin importar el proveedor, a través de una administración centralizada.',
      benefit: '✓ Monitoreo de su vehículo al alcance de su mano.',
      pdfDescription: 'Aplicación de centro de control basada en la nube. Interfaz intuitiva para gestión de flotas, reportes y alertas automatizadas.'
    },
    {
      id: 'plus', name: 'Detektor Plus', imageLabel: 'IMG: SATÉLITE / FLOTA CARGA',
      description: 'Seguridad de sus vehículos y flotas, garantizando que podrán ser monitoreados, rastreados y localizados.',
      benefit: '✓ Control operativo y menores costos.',
      pdfDescription: 'Combina GPS + El Cazador para monitoreo diario y localización especializada en caso de hurto.'
    }
  ]
};

(() => {
  'use strict';

  const CONFIG = window.DTK_CONFIG || {};
  const DATA = window.DTK_DATA || { countries: {}, products: [] };
  const $ = (id) => document.getElementById(id);
  const els = {};
  let reservedKey = '';
  let reservedNumber = '';
  let quoteTimer = null;
  let noticeTimer = null;

  function initRefs() {
    [
      'quote-date','quote-number','quote-country','quote-advisor-select','quote-advisor-manual','quote-advisor-code',
      'quote-advisor-phone','quote-advisor-email','currency-select','select-tax','tax-label','dtk-calc-tbody',
      'val-subtotal','val-tax','val-total','advisor-select-wrap','advisor-manual-wrap','dtk-products-catalog',
      'dtk-preview-modal','modal-scroll-area','dtk-pdf-export-content','dtk-render-host','dtk-notice'
    ].forEach(k => els[k] = $(k));
  }

  function todayLocal() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function sanitizeCode(value) {
    return String(value || '')
      .toUpperCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^A-Z0-9-]/g, '')
      .slice(0, 24);
  }

  function showNotice(message, type = 'success') {
    if (!els['dtk-notice']) return;
    clearTimeout(noticeTimer);
    els['dtk-notice'].textContent = message;
    els['dtk-notice'].className = `dtk-notice ${type}`;
    noticeTimer = setTimeout(() => {
      if (els['dtk-notice']) {
        els['dtk-notice'].textContent = '';
        els['dtk-notice'].className = 'dtk-notice';
      }
    }, 4500);
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }

  function parseNum(value) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : 0;
    let raw = String(value || '').replace(/[^\d.,-]/g, '');
    const comma = raw.lastIndexOf(',');
    const dot = raw.lastIndexOf('.');
    if (comma > dot) raw = raw.replace(/\./g, '').replace(',', '.');
    else if (dot > comma) raw = raw.replace(/,/g, '');
    return Number.parseFloat(raw) || 0;
  }

  function currentCurrency() {
    return els['currency-select']?.value || '';
  }

  function formatMoney(value) {
    const number = Number(value) || 0;
    const formatted = new Intl.NumberFormat('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
    return `${formatted} ${currentCurrency()}`.trim();
  }

  function getCountry() {
    return DATA.countries[els['quote-country']?.value] || null;
  }

  function getAdvisorName() {
    const c = getCountry();
    if (!c) return '';
    if (c.advisorMode === 'list') {
      const option = els['quote-advisor-select']?.selectedOptions?.[0];
      return option?.dataset?.name || '';
    }
    return els['quote-advisor-manual']?.value.trim() || '';
  }

  function getAdvisorCode() {
    return sanitizeCode(els['quote-advisor-code']?.value || '');
  }

  function quoteYear() {
    const val = els['quote-date']?.value;
    const y = val ? String(val).slice(0,4) : String(new Date().getFullYear());
    return /^\d{4}$/.test(y) ? y : String(new Date().getFullYear());
  }

  function localReserve(countryCode, advisorCode, year) {
    const storageKey = CONFIG.quoteCounterStorageKey || 'dtk_quote_counters_v2';
    let counters = {};
    try { counters = JSON.parse(localStorage.getItem(storageKey) || '{}') || {}; } catch (_) {}
    const key = `${countryCode}|${advisorCode}|${year}`;
    const sequence = Number(counters[key] || 1);
    counters[key] = sequence + 1;
    try { localStorage.setItem(storageKey, JSON.stringify(counters)); } catch (_) {}
    return `${CONFIG.companyPrefix || 'DET'}-${countryCode}-${year}-${advisorCode}-${String(sequence).padStart(4,'0')}`;
  }

  function previewQuoteNumber() {
    const country = getCountry();
    const advisorCode = getAdvisorCode();
    if (!country || !advisorCode) return '';
    return `${CONFIG.companyPrefix || 'DET'}-${country.code}-${quoteYear()}-${advisorCode}-VISTA`;
  }

  async function reserveQuoteNumber(force = false, { showError = false } = {}) {
    const country = getCountry();
    const advisorCode = getAdvisorCode();
    if (!country || !advisorCode) {
      reservedKey = '';
      reservedNumber = '';
      if (els['quote-number']) els['quote-number'].value = '';
      return '';
    }

    const year = quoteYear();
    const key = `${country.code}|${advisorCode}|${year}`;
    if (!force && key === reservedKey && reservedNumber) {
      els['quote-number'].value = reservedNumber;
      return reservedNumber;
    }

    const rawApiBase = String(CONFIG.apiBase || '').trim();
    const apiConfigured = rawApiBase && !rawApiBase.includes('__RENDER_API_URL__');
    const apiBase = apiConfigured ? rawApiBase.replace(/\/$/, '') : '';
    const canTryApi = location.protocol !== 'file:' && !!apiBase;

    if (els['quote-number']) els['quote-number'].value = canTryApi ? 'Generando…' : '';
    let quoteNumber = '';

    if (canTryApi) {
      try {
        const response = await fetch(`${apiBase}/api/quote-number`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            countryCode: country.code,
            advisorCode,
            year,
            prefix: CONFIG.companyPrefix || 'DET'
          })
        });
        if (!response.ok) throw new Error(`API ${response.status}`);
        const json = await response.json();
        if (!json?.quoteNumber) throw new Error('Sin consecutivo');
        quoteNumber = json.quoteNumber;
      } catch (error) {
        console.error('Backend no disponible.', error);
        if (els['quote-number']) els['quote-number'].value = '';
        if (showError) {
          showNotice('El asesor está correcto, pero no fue posible generar el consecutivo. Revisa la URL de Render y ALLOWED_ORIGINS.', 'error');
        }
        return '';
      }
    } else {
      if (showError) {
        showNotice('Falta configurar la URL pública de Render en window.DTK_CONFIG.apiBase.', 'error');
      }
      return '';
    }

    reservedKey = key;
    reservedNumber = quoteNumber;
    if (els['quote-number']) {
      els['quote-number'].value = quoteNumber;
      els['quote-number'].classList.remove('dtk-error');
    }
    return quoteNumber;
  }

  function scheduleQuoteNumber() {
    clearTimeout(quoteTimer);
    if (els['quote-number']) els['quote-number'].value = '';
    reservedKey = '';
    reservedNumber = '';
    quoteTimer = setTimeout(() => reserveQuoteNumber(false), 550);
  }

  function populateCountries() {
    const select = els['quote-country'];
    if (!select) return;
    const names = Object.keys(DATA.countries);
    select.innerHTML = '<option value="">Seleccione un país</option>' + names.map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join('');
  }

  function populateProducts() {
    const grid = els['dtk-products-catalog'];
    if (!grid) return;
    grid.innerHTML = DATA.products.map(p => `
      <article class="dtk-product-card">
        <div class="dtk-product-image">${escapeHtml(p.imageLabel)}</div>
        <div class="dtk-product-body">
          <h3 class="dtk-product-name">${escapeHtml(p.name)}</h3>
          <p class="dtk-product-desc">${escapeHtml(p.description)}</p>
          <p class="dtk-product-benefit">${escapeHtml(p.benefit)}</p>
          <button type="button" class="dtk-btn dtk-btn-dark dtk-btn-add" data-product-id="${escapeHtml(p.id)}">Agregar a cotización</button>
        </div>
      </article>`).join('') + `
      <article class="dtk-product-custom">
        <h3>¿Necesitas otro producto?</h3>
        <p>Amplía la propuesta agregando un producto personalizado, no listado arriba.</p>
        <button type="button" class="dtk-btn dtk-btn-red" id="btn-add-custom">+ Agregar producto personalizado</button>
      </article>`;
  }

  function applyCountry() {
    const country = getCountry();
    reservedKey = '';
    reservedNumber = '';
    els['quote-number'].value = '';
    els['quote-advisor-code'].value = '';
    els['quote-advisor-phone'].value = '';
    els['quote-advisor-email'].value = '';

    if (!country) {
      els['advisor-select-wrap'].classList.remove('dtk-hidden');
      els['advisor-manual-wrap'].classList.add('dtk-hidden');
      els['quote-advisor-select'].innerHTML = '<option value="">Seleccione el país primero</option>';
      els['quote-advisor-code'].readOnly = false;
      els['currency-select'].innerHTML = '';
      els['select-tax'].innerHTML = '';
      return;
    }

    if (country.advisorMode === 'list') {
      els['advisor-select-wrap'].classList.remove('dtk-hidden');
      els['advisor-manual-wrap'].classList.add('dtk-hidden');
      els['quote-advisor-manual'].value = '';
      els['quote-advisor-code'].readOnly = true;
      els['quote-advisor-select'].innerHTML = '<option value="">Seleccione un asesor</option>' + country.agents.map(a => `<option value="${escapeHtml(a.code)}" data-name="${escapeHtml(a.name)}">${escapeHtml(a.code)} - ${escapeHtml(a.name)}</option>`).join('');
    } else {
      els['advisor-select-wrap'].classList.add('dtk-hidden');
      els['advisor-manual-wrap'].classList.remove('dtk-hidden');
      els['quote-advisor-select'].innerHTML = '<option value="">Asesor manual</option>';
      els['quote-advisor-code'].readOnly = false;
      els['quote-advisor-code'].placeholder = 'Ej. JPEREZ, CO-001 o VE-023';
    }

    els['currency-select'].innerHTML = country.currency.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
    els['tax-label'].textContent = country.taxName;
    els['select-tax'].innerHTML = country.taxRates.map(r => `<option value="${r}">${r}%</option>`).join('');
    $('terms-installation').value = country.terms.installation || '';
    $('terms-payment').value = country.terms.payment || '';
    $('terms-validity').value = country.terms.validity || '';
    $('terms-warranty').value = country.terms.warranty || '';
    $('terms-extra').value = country.terms.extra || '';
    calculateAll();
  }

  function onAdvisorSelect() {
    const country = getCountry();
    if (!country || country.advisorMode !== 'list') return;
    const option = els['quote-advisor-select'].selectedOptions?.[0];
    els['quote-advisor-code'].value = option?.value || '';
    els['quote-advisor-code'].classList.remove('dtk-error');
    reservedKey = '';
    reservedNumber = '';
    reserveQuoteNumber(false, { showError: false });
  }

  function renderEmptyRow() {
    const tbody = els['dtk-calc-tbody'];
    if (!tbody) return;
    if (!tbody.querySelector('tr[data-row]')) tbody.innerHTML = '<tr class="dtk-empty-row"><td colspan="6">Agrega uno o más productos para construir la propuesta económica.</td></tr>';
  }

  function appendRow(name = '', qty = 1, price = 0, discount = 0, productId = '') {
    const tbody = els['dtk-calc-tbody'];
    if (!tbody) return;
    tbody.querySelector('.dtk-empty-row')?.remove();
    const tr = document.createElement('tr');
    tr.dataset.row = '1';
    tr.dataset.productId = productId || '';
    tr.innerHTML = `
      <td><input class="dtk-input dtk-prod-name" value="${escapeHtml(name)}" placeholder="Ej. Detektor GPS"></td>
      <td><input type="number" class="dtk-input dtk-qty" value="${qty}" min="0" step="any" aria-label="Cantidad"></td>
      <td><input type="number" class="dtk-input dtk-price" value="${price}" min="0" step="any" aria-label="Valor unitario"></td>
      <td><input type="number" class="dtk-input dtk-desc" value="${discount}" min="0" max="100" step="any" aria-label="Descuento"></td>
      <td class="dtk-row-subtotal">${formatMoney(0)}</td>
      <td><button type="button" class="dtk-remove" title="Quitar producto">×</button></td>`;
    tbody.appendChild(tr);
    calculateAll();
  }

  function addCatalogProduct(productId) {
    const product = DATA.products.find(p => p.id === productId);
    if (!product) return;
    const existing = els['dtk-calc-tbody']?.querySelector(`tr[data-product-id="${CSS.escape(productId)}"]`);
    if (existing) {
      existing.querySelector('.dtk-prod-name')?.focus();
      showNotice('Ese producto ya está en la propuesta económica.', 'error');
      return;
    }
    appendRow(product.name, 1, 0, 0, product.id);
    showNotice(`${product.name} agregado. Ingresa el valor unitario.`, 'success');
  }

  function rowData() {
    return [...(els['dtk-calc-tbody']?.querySelectorAll('tr[data-row]') || [])].map(row => {
      const qty = parseNum(row.querySelector('.dtk-qty')?.value);
      const price = parseNum(row.querySelector('.dtk-price')?.value);
      const discount = Math.min(100, Math.max(0, parseNum(row.querySelector('.dtk-desc')?.value)));
      const subtotal = qty * price * (1 - discount / 100);
      return {
        row,
        productId: row.dataset.productId || '',
        name: row.querySelector('.dtk-prod-name')?.value.trim() || '',
        qty, price, discount, subtotal
      };
    });
  }

  function calculateAll() {
    const rows = rowData();
    let rawSubtotal = 0;
    rows.forEach(item => {
      rawSubtotal += item.subtotal;
      const el = item.row.querySelector('.dtk-row-subtotal');
      if (el) el.textContent = formatMoney(item.subtotal);
    });

    let subtotal = rawSubtotal;
    if (els['val-subtotal'].dataset.mode === 'auto') els['val-subtotal'].textContent = formatMoney(rawSubtotal);
    else subtotal = parseNum(els['val-subtotal'].textContent);

    let tax = 0;
    if (els['val-tax'].dataset.mode === 'auto') {
      tax = subtotal * (parseNum(els['select-tax'].value) / 100);
      els['val-tax'].textContent = formatMoney(tax);
    } else tax = parseNum(els['val-tax'].textContent);

    if (els['val-total'].dataset.mode === 'auto') els['val-total'].textContent = formatMoney(subtotal + tax);
    renderEmptyRow();
  }

  function setMode(target, mode) {
    const valEl = target === 'tax' ? els['val-tax'] : target === 'subtotal' ? els['val-subtotal'] : els['val-total'];
    if (!valEl) return;
    valEl.dataset.mode = mode;
    valEl.contentEditable = mode === 'manual' ? 'true' : 'false';
    valEl.classList.toggle('manual', mode === 'manual');
    if (target === 'tax') els['select-tax'].style.display = mode === 'manual' ? 'none' : '';
    if (mode === 'manual') {
      valEl.textContent = formatMoney(parseNum(valEl.textContent));
      valEl.focus();
    } else calculateAll();
  }

  function clearErrors() {
    document.querySelectorAll('.dtk-error').forEach(el => el.classList.remove('dtk-error'));
  }

  async function validateForm({ requireFinalNumber = false } = {}) {
    clearErrors();
    let valid = true;
    const requiredIds = ['client-name','client-email','client-phone','quote-date','quote-country','quote-advisor-code','terms-installation','terms-payment','terms-validity','terms-warranty'];
    for (const id of requiredIds) {
      const el = $(id);
      if (!el || !String(el.value || '').trim()) { el?.classList.add('dtk-error'); valid = false; }
    }

    const country = getCountry();
    if (country?.advisorMode === 'list') {
      if (!els['quote-advisor-select'].value) { els['quote-advisor-select'].classList.add('dtk-error'); valid = false; }
    } else if (country) {
      if (!els['quote-advisor-manual'].value.trim()) { els['quote-advisor-manual'].classList.add('dtk-error'); valid = false; }
    }

    const rows = rowData();
    if (!rows.length) {
      showNotice('Debes agregar al menos un producto a la cotización.', 'error');
      return false;
    }
    rows.forEach(item => {
      const input = item.row.querySelector('.dtk-prod-name');
      if (!item.name) { input?.classList.add('dtk-error'); valid = false; }
    });

    if (!valid) {
      showNotice('Revisa los campos en rojo. Falta información obligatoria (*).', 'error');
      document.querySelector('.dtk-error')?.scrollIntoView({ behavior:'smooth', block:'center' });
      return false;
    }

    const number = await reserveQuoteNumber(false, { showError: requireFinalNumber });
    if (!number) {
      if (requireFinalNumber) {
        // El problema es el consecutivo/backend, NO el identificador del asesor.
        els['quote-number']?.classList.add('dtk-error');
        els['quote-number']?.scrollIntoView({ behavior:'smooth', block:'center' });
        return false;
      }
      // La vista previa puede abrirse sin bloquearse por una caída/configuración del backend.
      // Este número es solo visual y nunca se guarda como consecutivo definitivo.
      const provisional = previewQuoteNumber();
      if (els['quote-number']) els['quote-number'].value = provisional;
      showNotice('Vista previa abierta con número provisional. El consecutivo definitivo se generará al descargar el PDF.', 'success');
    }

    return true;
  }

  function setText(id, value, fallback = '-') {
    const el = $(id);
    if (el) el.textContent = String(value || fallback);
  }

  function productForRow(item) {
    return DATA.products.find(p => p.id === item.productId) || DATA.products.find(p => p.name === item.name) || null;
  }

  function populatePreview() {
    const gv = id => $(id)?.value?.trim() || '';
    setText('prev-client-name', gv('client-name'));
    setText('prev-client-company', gv('client-company'));
    setText('prev-client-role', gv('client-role'));
    setText('prev-client-email', gv('client-email'));
    setText('prev-client-phone', gv('client-phone'));
    setText('prev-client-city', gv('client-city'));
    setText('prev-quote-date', gv('quote-date'));
    setText('prev-quote-number', gv('quote-number'));
    setText('prev-country', gv('quote-country'));
    setText('prev-advisor', getAdvisorName());
    setText('prev-advisor-code', getAdvisorCode());
    setText('prev-adv-name-box', getAdvisorName());
    setText('prev-adv-mail-box', gv('quote-advisor-email'), '');
    setText('prev-adv-phone-box', gv('quote-advisor-phone'), '');
    setText('prev-subtotal', els['val-subtotal'].textContent);
    setText('prev-tax', els['val-tax'].textContent);
    setText('prev-total', els['val-total'].textContent);
    setText('prev-obs', gv('quote-obs'));

    const country = getCountry();
    setText('prev-tax-label', country?.taxName || 'IVA');
    const taxPct = els['val-tax'].dataset.mode === 'auto' ? `(${els['select-tax'].value}%)` : '(Manual)';
    setText('prev-tax-percent', taxPct, '');

    const rows = rowData();
    const previewBody = $('prev-calc-tbody');
    if (previewBody) {
      const taxLabel = els['val-tax'].dataset.mode === 'auto' ? (parseNum(els['select-tax'].value) === 0 ? 'NA' : `${els['select-tax'].value}%`) : 'Manual';
      previewBody.innerHTML = rows.map(item => `<tr><td>• ${escapeHtml(item.name)}</td><td>${item.qty}</td><td>${escapeHtml(formatMoney(item.price))}</td><td>${escapeHtml(taxLabel)}</td><td style="text-align:right;font-weight:700">${escapeHtml(formatMoney(item.subtotal))}</td></tr>`).join('');
    }

    const chosen = rows.slice(0, 2);
    const solutions = $('prev-solutions');
    if (solutions) {
      const display = chosen.length ? chosen : [{ name:'Detektor GPS', productId:'gps' }, { name:'Detektor Smart Track', productId:'smart-track' }];
      solutions.innerHTML = display.map((item, i) => {
        const product = productForRow(item) || DATA.products.find(p => p.id === item.productId);
        const title = item.name || product?.name || 'Solución Detektor';
        const description = product?.pdfDescription || 'Solución configurada de acuerdo con las necesidades de la operación.';
        const bullets = product?.id === 'gps' ? ['● Monitoreo y recorridos', '● Geocercas y alertas', '● Reportes de operación'] : product?.id === 'smart-track' ? ['● Administración centralizada', '● Reportes personalizables', '● Alertas y app móvil'] : ['● Tecnología especializada', '● Configuración según operación', '● Respaldo Detektor'];
        return `<div class="pdf-solution ${i % 2 ? 'reverse' : ''}"><div class="pdf-solution-img"></div><div class="pdf-solution-copy"><h4>${escapeHtml(title)}</h4><p>${escapeHtml(description)}</p><div class="pdf-bullets">${bullets.map(b => `<span>${escapeHtml(b)}</span>`).join('')}</div></div></div>`;
      }).join('');
    }

    const termsText = [
      `Condiciones de pago: ${gv('terms-payment')}`,
      `Instalación y entrega: ${gv('terms-installation')}`,
      `Vigencia: ${gv('terms-validity')}`,
      `Garantía: ${gv('terms-warranty')}`,
      '',
      'Consideraciones adicionales:',
      gv('terms-extra') || '-'
    ].join('\n');
    setText('prev-terms', termsText, '');
  }

  async function openPreview() {
    if (!(await validateForm({ requireFinalNumber: false }))) return;
    calculateAll();
    populatePreview();
    els['dtk-preview-modal'].classList.add('open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      els['modal-scroll-area'].scrollTop = 0;
      updateActiveDot();
    });
  }

  function closePreview() {
    els['dtk-preview-modal'].classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateActiveDot() {
    const area = els['modal-scroll-area'];
    if (!area) return;
    const pages = [1,2,3].map(n => $(`pdf-page-${n}`));
    const areaTop = area.getBoundingClientRect().top;
    let bestIndex = 0, bestDistance = Infinity;
    pages.forEach((page, i) => {
      if (!page) return;
      const distance = Math.abs(page.getBoundingClientRect().top - areaTop - 10);
      if (distance < bestDistance) { bestDistance = distance; bestIndex = i; }
    });
    document.querySelectorAll('.dtk-nav-dot').forEach((dot, i) => dot.classList.toggle('active', i === bestIndex));
  }

  function scrollToPage(targetId, button) {
    const area = els['modal-scroll-area'];
    const target = $(targetId);
    if (!area || !target) return;
    document.querySelectorAll('.dtk-nav-dot').forEach(d => d.classList.remove('active'));
    button?.classList.add('active');
    const areaRect = area.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    area.scrollTo({ top: targetRect.top - areaRect.top + area.scrollTop, behavior:'smooth' });
  }

  async function downloadPDF() {
    if (!(await validateForm({ requireFinalNumber: true }))) return;
    calculateAll();
    populatePreview();
    if (typeof window.html2pdf === 'undefined') {
      showNotice('No se pudo cargar la librería PDF. Verifica la conexión a internet.', 'error');
      return;
    }
    const host = els['dtk-render-host'];
    host.innerHTML = '';
    const clone = els['dtk-pdf-export-content'].cloneNode(true);
    clone.removeAttribute('id');
    clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
    host.appendChild(clone);
    showNotice('Generando PDF, por favor espera…', 'success');
    const docName = els['quote-number'].value || 'Cotizacion-Detektor';
    const options = {
      margin: 0,
      filename: `Cotizacion_${docName.replace(/[^A-Za-z0-9-]/g,'')}.pdf`,
      image: { type:'jpeg', quality:0.98 },
      html2canvas: { scale:2, useCORS:true, allowTaint:false, backgroundColor:'#ffffff', logging:false },
      jsPDF: { unit:'px', format:[794,1123], orientation:'portrait', hotfixes:['px_scaling'] },
      pagebreak: { mode:['css','legacy'], before:[] }
    };
    try {
      await window.html2pdf().set(options).from(clone).save();
      showNotice('PDF generado correctamente.', 'success');
    } catch (error) {
      console.error(error);
      showNotice('No fue posible generar el PDF. Inténtalo nuevamente.', 'error');
    } finally {
      host.innerHTML = '';
    }
  }

  function resetModes() {
    document.querySelectorAll('.dtk-toggle').forEach(group => {
      const target = group.dataset.target;
      group.querySelectorAll('button').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === 'auto'));
      setMode(target, 'auto');
    });
  }

  function clearForm() {
    const fields = ['client-name','client-company','client-role','client-email','client-phone','client-city','quote-advisor-manual','quote-advisor-code','quote-advisor-phone','quote-advisor-email'];
    fields.forEach(id => { if ($(id)) $(id).value = ''; });
    $('quote-obs').value = 'Crezca con Detektor: cuando su operación lo requiera, podrá complementar esta solución con nuevas tecnologías de monitoreo, seguridad, gestión de flotas y localización vehicular.';
    els['quote-date'].value = todayLocal();
    els['quote-number'].value = '';
    els['quote-country'].value = '';
    reservedKey = '';
    reservedNumber = '';
    applyCountry();
    ['terms-installation','terms-payment','terms-validity','terms-warranty','terms-extra'].forEach(id => { if ($(id)) $(id).value = ''; });
    els['dtk-calc-tbody'].innerHTML = '';
    renderEmptyRow();
    resetModes();
    clearErrors();
    $('confirm-actions').classList.add('dtk-hidden');
    $('main-actions').classList.remove('dtk-hidden');
    showNotice('Formulario limpio. Nueva cotización lista.', 'success');
    window.scrollTo({ top:0, behavior:'smooth' });
  }

  function wireEvents() {
    els['quote-country'].addEventListener('change', applyCountry);
    els['quote-advisor-select'].addEventListener('change', onAdvisorSelect);
    els['quote-advisor-code'].addEventListener('input', e => {
      if (getCountry()?.advisorMode !== 'list') {
        const clean = sanitizeCode(e.target.value);
        if (clean !== e.target.value) e.target.value = clean;
        reservedKey = '';
        reservedNumber = '';
        if (els['quote-number']) els['quote-number'].value = '';
      }
    });
    els['quote-advisor-code'].addEventListener('blur', () => reserveQuoteNumber(false, { showError: false }));
    els['quote-date'].addEventListener('change', scheduleQuoteNumber);
    els['currency-select'].addEventListener('change', calculateAll);
    els['select-tax'].addEventListener('change', calculateAll);

    els['dtk-products-catalog'].addEventListener('click', e => {
      const add = e.target.closest('.dtk-btn-add');
      if (add) addCatalogProduct(add.dataset.productId);
      if (e.target.id === 'btn-add-custom') appendRow('', 1, 0, 0, '');
    });

    els['dtk-calc-tbody'].addEventListener('input', e => {
      if (e.target.matches('.dtk-prod-name,.dtk-qty,.dtk-price,.dtk-desc')) {
        e.target.classList.remove('dtk-error');
        calculateAll();
      }
    });
    els['dtk-calc-tbody'].addEventListener('click', e => {
      if (e.target.closest('.dtk-remove')) {
        e.target.closest('tr[data-row]')?.remove();
        calculateAll();
      }
    });

    document.querySelectorAll('.dtk-toggle').forEach(group => group.addEventListener('click', e => {
      const btn = e.target.closest('button[data-mode]');
      if (!btn) return;
      group.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setMode(group.dataset.target, btn.dataset.mode);
    }));

    [els['val-subtotal'], els['val-tax'], els['val-total']].forEach(el => {
      el.addEventListener('input', () => { if (el.dataset.mode === 'manual') calculateAll(); });
      el.addEventListener('blur', () => {
        if (el.dataset.mode === 'manual') {
          el.textContent = formatMoney(parseNum(el.textContent));
          calculateAll();
        }
      });
    });

    document.querySelectorAll('.dtk-required, #quote-advisor-manual, #quote-advisor-select').forEach(el => {
      el.addEventListener('input', () => el.classList.remove('dtk-error'));
      el.addEventListener('change', () => el.classList.remove('dtk-error'));
    });

    $('btn-preview').addEventListener('click', openPreview);
    $('btn-download').addEventListener('click', downloadPDF);
    $('btn-modal-download').addEventListener('click', downloadPDF);
    $('btn-modal-close').addEventListener('click', closePreview);
    els['dtk-preview-modal'].addEventListener('click', e => { if (e.target === els['dtk-preview-modal']) closePreview(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && els['dtk-preview-modal'].classList.contains('open')) closePreview(); });

    document.querySelectorAll('.dtk-nav-dot').forEach(dot => dot.addEventListener('click', e => scrollToPage(dot.dataset.target, dot)));
    els['modal-scroll-area'].addEventListener('scroll', () => window.requestAnimationFrame(updateActiveDot));

    const askClear = (e) => {
      e?.preventDefault?.();
      $('main-actions').classList.add('dtk-hidden');
      $('confirm-actions').classList.remove('dtk-hidden');
    };
    $('btn-clear').addEventListener('click', askClear);
    $('top-clear').addEventListener('click', askClear);
    $('btn-clear-cancel').addEventListener('click', () => {
      $('confirm-actions').classList.add('dtk-hidden');
      $('main-actions').classList.remove('dtk-hidden');
    });
    $('btn-clear-confirm').addEventListener('click', clearForm);
  }

  function init() {
    initRefs();
    populateCountries();
    populateProducts();
    els['quote-date'].value = todayLocal();
    els['dtk-calc-tbody'].innerHTML = '';
    renderEmptyRow();
    wireEvents();
    calculateAll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
