*
 * pdfdescargar.js · Detektor Cotizador Webflow
 * ------------------------------------------------------------
 * RESPONSABILIDAD ÚNICA:
 *   1) Leer los datos que ya están diligenciados en el cotizador.
 *   2) Generar y descargar el PDF directamente.
 *
 * NO abre ni controla la vista previa.
 * NO modifica campos del formulario.
 * NO valida ni pinta errores en el formulario.
 * NO toca el botón "Limpiar formulario".
 * NO guarda borradores ni usa localStorage.
 * NO genera consecutivos ni llama a Render/API.
 *
 * Se conecta ÚNICAMENTE al botón #btn-download.
 * El HTML/CSS del PDF ya viven en el embed de Webflow.
 * ------------------------------------------------------------
 */
(function () {
  'use strict';

  if (window.__DTK_PDF_DOWNLOAD_ONLY__) return;
  window.__DTK_PDF_DOWNLOAD_ONLY__ = true;

  const CFG = {
    pageWidth: 794,
    pageHeight: 1123,
    renderScale: 2,
    solutionsPerPage: 5,
    libs: {
      html2canvas: 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
      jspdf: 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
    },
    footerLogo: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7a8e42775bc4c63e44c311_Recurso%2027%404x.webp'
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const valueOf = (selector, root = document) => {
    const el = $(selector, root);
    return el ? String(el.value ?? '').trim() : '';
  };

  const textOf = (selector, root = document) => {
    const el = $(selector, root);
    return el ? String(el.textContent ?? '').trim() : '';
  };

  const esc = value => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  const normalize = value => String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();

  const slug = value => String(value || 'cotizacion')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'cotizacion';

  function formatDate(dateISO) {
    if (!dateISO) return '';
    const parts = dateISO.split('-');
    return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : dateISO;
  }

  function readAdvisor() {
    const manualWrap = $('#advisor-manual-wrap');
    const manualMode = !!manualWrap && !manualWrap.classList.contains('dtk-hidden');

    const raw = manualMode
      ? valueOf('#quote-advisor-manual')
      : valueOf('#quote-advisor-select');

    const code = valueOf('#quote-advisor-code');
    let name = raw;

    // Formato actual del datalist: EMP362 - Nombre Apellido
    if (!manualMode && raw.includes(' - ')) {
      name = raw.split(' - ').slice(1).join(' - ').trim();
    }

    // Si DTK_DATA existe, intenta resolver el nombre exacto por código.
    const countryName = valueOf('#quote-country');
    const country = window.DTK_DATA?.countries?.[countryName];
    if (!manualMode && code && Array.isArray(country?.agents)) {
      const advisor = country.agents.find(a => String(a.code || '') === code);
      if (advisor?.name) name = advisor.name;
    }

    return {
      name,
      code,
      phone: valueOf('#quote-advisor-phone'),
      email: valueOf('#quote-advisor-email')
    };
  }

  function readEconomicRows() {
    const tbody = $('#dtk-calc-tbody');
    if (!tbody) return [];

    return $$('tr[data-row]', tbody).map(row => ({
      productId: row.dataset.productId || '',
      product: String($('.dtk-prod-name', row)?.value || '').trim(),
      qty: String($('.dtk-qty', row)?.value || '').trim(),
      unit: String($('.dtk-price', row)?.value || '').trim(),
      discount: String($('.dtk-desc', row)?.value || '').trim(),
      subtotal: String($('.dtk-row-subtotal', row)?.textContent || '').trim()
    })).filter(row => row.product);
  }

  function readCatalogProducts(economicRows) {
    const selectedIds = new Set(economicRows.map(row => row.productId).filter(Boolean));
    const selectedNames = new Set(economicRows.map(row => normalize(row.product)));
    const dataProducts = Array.isArray(window.DTK_DATA?.products) ? window.DTK_DATA.products : [];

    const cards = $$('.dtk-product-card', $('#dtk-products-catalog') || document);

    let products = cards.map(card => {
      const name = textOf('.dtk-product-name', card) || card.dataset.name || '';
      const dataProduct = dataProducts.find(p =>
        normalize(p.name) === normalize(name) ||
        (card.querySelector('[data-product-id]')?.dataset.productId && p.id === card.querySelector('[data-product-id]').dataset.productId)
      );

      const img = $('img', card);
      const id = dataProduct?.id || card.querySelector('[data-product-id]')?.dataset.productId || '';

      return {
        id,
        name: dataProduct?.name || name,
        image: dataProduct?.image || img?.currentSrc || img?.src || '',
        description: dataProduct?.pdfDescription || textOf('.dtk-product-desc', card) || '',
        benefit: textOf('.dtk-product-benefit', card) || dataProduct?.benefit || '',
        selected: (id && selectedIds.has(id)) || selectedNames.has(normalize(dataProduct?.name || name))
      };
    }).filter(p => p.name);

    // Si el catálogo aún no está renderizado, usa DTK_DATA.
    if (!products.length && dataProducts.length) {
      products = dataProducts.map(p => ({
        id: p.id || '',
        name: p.name || '',
        image: p.image || '',
        description: p.pdfDescription || p.description || '',
        benefit: p.benefit || '',
        selected: (p.id && selectedIds.has(p.id)) || selectedNames.has(normalize(p.name))
      })).filter(p => p.name);
    }

    // Agrega productos personalizados que estén en la propuesta.
    economicRows.forEach(row => {
      const exists = products.some(p =>
        (row.productId && p.id === row.productId) ||
        normalize(p.name) === normalize(row.product)
      );

      if (!exists) {
        products.push({
          id: row.productId || '',
          name: row.product,
          image: '',
          description: 'Producto incluido en esta propuesta.',
          benefit: '',
          selected: true
        });
      }
    });

    return products;
  }

  function readCountryContact(countryName) {
    const contact = window.DTK_COUNTRY_CONTACTS?.[countryName] || null;
    if (!contact) return { web: '', socials: [] };

    return {
      web: String(contact.web || ''),
      socials: Array.isArray(contact.socials)
        ? contact.socials.filter(item => item?.url).map(item => ({
            type: item.type || '',
            url: item.url || ''
          }))
        : []
    };
  }

  function readTotals() {
    const manualTaxVisible = $('#tax-manual-wrap') && !$('#tax-manual-wrap').classList.contains('dtk-hidden');

    return {
      currency: valueOf('#currency-select'),
      subtotal: textOf('#val-subtotal') || '0',
      tax: textOf('#val-tax') || '0',
      total: textOf('#val-total') || '0',
      taxLabel: textOf('#tax-label') || 'IVA',
      taxPercent: manualTaxVisible ? valueOf('#input-tax-manual') : valueOf('#select-tax')
    };
  }

  function collectData() {
    const country = valueOf('#quote-country');
    const economicRows = readEconomicRows();

    return {
      quote: {
        date: valueOf('#quote-date'),
        number: valueOf('#quote-number'),
        country,
        observations: valueOf('#quote-obs')
      },
      advisor: readAdvisor(),
      client: {
        name: valueOf('#client-name'),
        company: valueOf('#client-company'),
        role: valueOf('#client-role'),
        email: valueOf('#client-email'),
        phone: valueOf('#client-phone'),
        city: valueOf('#client-city')
      },
      terms: {
        installation: valueOf('#terms-installation'),
        payment: valueOf('#terms-payment'),
        validity: valueOf('#terms-validity'),
        warranty: valueOf('#terms-warranty'),
        extra: valueOf('#terms-extra')
      },
      economicRows,
      totals: readTotals(),
      products: readCatalogProducts(economicRows),
      countryContact: readCountryContact(country)
    };
  }

  function setCloneText(root, selector, value, fallback = '—') {
    const el = $(selector, root);
    if (el) el.textContent = String(value || fallback);
  }

  function setOptionalCloneText(root, selector, value) {
    const el = $(selector, root);
    if (!el) return;

    const clean = String(value || '').trim();
    el.textContent = clean;

    const row = el.closest('.pdf-info-row');
    if (row) row.style.display = clean ? 'grid' : 'none';
  }

  function syncCoverOnClone(clone, data) {
    setOptionalCloneText(clone, '#prev-client-name', data.client.name);
    setOptionalCloneText(clone, '#prev-client-company', data.client.company);
    setOptionalCloneText(clone, '#prev-client-role', data.client.role);
    setOptionalCloneText(clone, '#prev-client-email', data.client.email);
    setOptionalCloneText(clone, '#prev-client-phone', data.client.phone);
    setOptionalCloneText(clone, '#prev-client-city', data.client.city);
    setOptionalCloneText(clone, '#prev-quote-date', formatDate(data.quote.date));
    setOptionalCloneText(clone, '#prev-quote-number', data.quote.number);
  }

  function makeSolutionHTML(product) {
    const selectedClass = product.selected ? ' is-selected' : '';
    const imageHTML = product.image
      ? `<div class="pdf-solution-img"><img src="${esc(product.image)}" alt="${esc(product.name)}" crossorigin="anonymous" referrerpolicy="no-referrer"></div>`
      : `<div class="pdf-solution-img" style="display:flex;align-items:center;justify-content:center;text-align:center;padding:14px;color:#777;font-size:11px;">${esc(product.name)}</div>`;

    let bullets;
    if (normalize(product.name).includes('gps')) {
      bullets = ['Monitoreo y recorridos', 'Geocercas y alertas', 'Reportes de operación'];
    } else {
      bullets = ['Tecnología especializada', 'Configuración según operación', 'Respaldo Detektor'];
    }

    return `
      <div class="pdf-solution${selectedClass}">
        ${imageHTML}
        <div class="pdf-solution-copy">
          <h4>${esc(product.name)}</h4>
          ${product.description ? `<p>${esc(product.description)}</p>` : ''}
          <div class="pdf-bullets">${bullets.map(item => `<span>• ${esc(item)}</span>`).join('')}</div>
        </div>
      </div>`;
  }

  function createPage(id, extraClass = '') {
    const page = document.createElement('section');
    page.className = `dtk-pdf-page pdf-page2 pdf-generated-page ${extraClass}`.trim();
    page.id = id;
    return page;
  }

  function buildSolutionsPage(products, pageNumber, continuation) {
    const page = createPage(`pdf-download-page-${pageNumber}`);
    page.innerHTML = `
      <div class="pdf-inner">
        <div class="pdf-flow-group pdf-flow-solutions">
          <h3 class="pdf-section-title">
            NUESTRAS SOLUCIONES TECNOLÓGICAS${continuation ? ' <span class="red">· CONT.</span>' : ''}
          </h3>
          <div class="pdf-solutions">
            ${products.length
              ? products.map(makeSolutionHTML).join('')
              : '<div style="text-align:center;color:#888;padding:25px 10px;font-size:12px;">Sin soluciones registradas.</div>'}
          </div>
        </div>
      </div>`;
    return page;
  }

  function moneyCell(value, currency) {
    const clean = String(value || '').trim();
    if (!clean) return `0 ${esc(currency || '')}`.trim();

    // Los totales del formulario normalmente ya traen la moneda.
    if (currency && clean.toUpperCase().includes(currency.toUpperCase())) return esc(clean);
    return esc(`${clean}${currency ? ` ${currency}` : ''}`);
  }

  function buildEconomicRows(data) {
    if (!data.economicRows.length) {
      return '<tr><td colspan="4" style="text-align:center;color:#888;padding:18px;">Sin productos agregados.</td></tr>';
    }

    return data.economicRows.map(row => `
      <tr>
        <td>• ${esc(row.product)}</td>
        <td>${esc(row.qty || '1')}</td>
        <td>${moneyCell(row.unit || '0', data.totals.currency)}</td>
        <td style="text-align:right;font-weight:700;">${moneyCell(row.subtotal || '0', data.totals.currency)}</td>
      </tr>`).join('');
  }

  function buildTermsText(terms) {
    const lines = [];
    if (terms.payment) lines.push(`Condiciones de pago: ${terms.payment}`);
    if (terms.installation) lines.push(`Instalación y entrega: ${terms.installation}`);
    if (terms.validity) lines.push(`Vigencia: ${terms.validity}`);
    if (terms.warranty) lines.push(`Garantía: ${terms.warranty}`);
    if (terms.extra) {
      if (lines.length) lines.push('');
      lines.push('Consideraciones adicionales:');
      lines.push(terms.extra);
    }
    return lines.join('\n');
  }

  function socialIcon(type) {
    const map = {
      facebook: 'facebook',
      instagram: 'instagram',
      x: 'twitter-alt',
      twitter: 'twitter-alt',
      whatsapp: 'whatsapp',
      linkedin: 'linkedin',
      youtube: 'youtube',
      tiktok: 'tik-tok'
    };
    return map[String(type || '').toLowerCase()] || String(type || '');
  }

  function buildCountryContact(contact) {
    if (!contact?.web && !contact?.socials?.length) return '';

    const links = (contact.socials || []).map(item => `
      <a class="pdf-country-social-link" href="${esc(item.url)}" rel="noopener" target="_blank">
        <i class="fi fi-brands-${esc(socialIcon(item.type))}"></i>
      </a>`).join('');

    const webLabel = String(contact.web || '')
      .replace(/^https?:\/\//i, '')
      .replace(/\/$/, '');

    return `
      <div class="pdf-country-contact">
        <div class="pdf-country-contact-title">Síguenos en nuestras redes</div>
        ${links ? `<div class="pdf-country-social-links">${links}</div>` : ''}
        ${contact.web ? `<a class="pdf-country-web" href="${esc(contact.web)}" rel="noopener" target="_blank">${esc(webLabel)}</a>` : ''}
      </div>`;
  }

  function buildFinalPage(data, pageNumber) {
    const page = createPage(`pdf-download-page-${pageNumber}`, 'pdf-final-page');
    const taxPct = data.totals.taxPercent ? ` (${esc(data.totals.taxPercent)}%)` : '';
    const termsText = buildTermsText(data.terms);

    page.innerHTML = `
      <div class="pdf-inner">
        <div class="pdf-flow-group pdf-flow-economic">
          <h3 class="pdf-section-title">PROPUESTA <span class="red">ECONÓMICA</span></h3>

          <table class="pdf-table">
            <thead>
              <tr>
                <th style="width:50%">DESCRIPCIÓN</th>
                <th>CANT.</th>
                <th>PRECIO/U</th>
                <th style="text-align:right">TOTAL</th>
              </tr>
            </thead>
            <tbody>${buildEconomicRows(data)}</tbody>
          </table>

          <div class="pdf-econ-bottom">
            <div class="pdf-totals">
              <div class="pdf-total-row"><span>Subtotal</span><b>${moneyCell(data.totals.subtotal, data.totals.currency)}</b></div>
              <div class="pdf-total-row"><span>${esc(data.totals.taxLabel)}${taxPct}</span><b>${moneyCell(data.totals.tax, data.totals.currency)}</b></div>
              <div class="pdf-total-row final"><span>TOTAL CON IMPUESTO</span><b>${moneyCell(data.totals.total, data.totals.currency)}</b></div>
            </div>

            <div class="pdf-advisor-box">
              <h4>${esc(data.advisor.name || 'Asesor Comercial')}</h4>
              <div class="role">Asesor Comercial Corporativo</div>
              ${data.advisor.email ? `<p>${esc(data.advisor.email)}</p>` : ''}
              ${data.advisor.phone ? `<p>${esc(data.advisor.phone)}</p>` : ''}
            </div>
          </div>

          ${data.quote.observations
            ? `<div class="pdf-observation"><b>Observaciones generales:</b><span>${esc(data.quote.observations)}</span></div>`
            : ''}
        </div>

        <div class="pdf-flow-group pdf-flow-terms">
          ${termsText ? `<div class="pdf-terms-box">${esc(termsText)}</div>` : ''}
          <p class="pdf-confidential">Esta propuesta es confidencial y propiedad de Detektor hasta su aceptación formal. Su contenido no podrá ser divulgado ni utilizado con fines comerciales sin autorización. Comprometidos con la sostenibilidad, presentamos este documento en formato digital. Antes de imprimirlo, considere si es realmente necesario.</p>
        </div>

        <div class="pdf-flow-group pdf-flow-more">
          ${buildCountryContact(data.countryContact)}

          <div class="pdf-final-footer">
            <div class="pdf-page3-claim">SOLUCIONES PARA TU TRANQUILIDAD</div>
            <div class="pdf-footer-banner">
              <div><b>33</b><span>años de experiencia</span></div>
              <div><b>9</b><span>países en Latinoamérica</span></div>
              <div><b>500.000</b><span>usuarios activos</span></div>
              <div><img src="${CFG.footerLogo}" alt="Detektor Logo" crossorigin="anonymous" referrerpolicy="no-referrer" style="max-height:35px;width:auto;margin:0 auto;display:block;"></div>
            </div>
            <div class="pdf-countries">Colombia | Guatemala | El Salvador | Honduras | Nicaragua | Costa Rica | Panamá | Venezuela | Brasil</div>
          </div>
        </div>
      </div>`;

    return page;
  }

  function buildRenderDocument(data) {
    const source = $('#dtk-pdf-export-content');
    if (!source) throw new Error('No se encontró #dtk-pdf-export-content en el embed.');

    const clone = source.cloneNode(true);
    clone.id = 'dtk-pdf-download-document';

    // El downloader usa la portada existente SOLO como plantilla.
    const cover = $('.dtk-pdf-page#pdf-page-1', clone) || $('.dtk-pdf-page', clone);
    if (!cover) throw new Error('No se encontró la portada del PDF.');

    // Elimina del CLON las demás páginas. No toca la vista previa real.
    $$('.dtk-pdf-page', clone).forEach(page => {
      if (page !== cover) page.remove();
    });

    cover.id = 'pdf-download-page-1';
    syncCoverOnClone(clone, data);

    const chunks = [];
    const products = data.products || [];

    if (products.length) {
      for (let i = 0; i < products.length; i += CFG.solutionsPerPage) {
        chunks.push(products.slice(i, i + CFG.solutionsPerPage));
      }
    } else {
      chunks.push([]);
    }

    let pageNumber = 2;
    chunks.forEach((chunk, index) => {
      clone.appendChild(buildSolutionsPage(chunk, pageNumber++, index > 0));
    });

    clone.appendChild(buildFinalPage(data, pageNumber));
    return clone;
  }

  function loadScript(src, ready) {
    return new Promise((resolve, reject) => {
      if (ready()) return resolve();

      const existing = $$('script').find(script => script.src === src);
      if (existing) {
        if (ready()) return resolve();
        existing.addEventListener('load', resolve, { once: true });
        existing.addEventListener('error', () => reject(new Error(`No se pudo cargar ${src}`)), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = resolve;
      script.onerror = () => reject(new Error(`No se pudo cargar ${src}`));
      document.head.appendChild(script);
    });
  }

  async function ensureLibraries() {
    await loadScript(CFG.libs.html2canvas, () => typeof window.html2canvas === 'function');
    await loadScript(CFG.libs.jspdf, () => !!window.jspdf?.jsPDF);
  }

  async function waitForAssets(root) {
    if (document.fonts?.ready) {
      try { await document.fonts.ready; } catch (_) {}
    }

    const images = $$('img', root);
    await Promise.all(images.map(img => new Promise(resolve => {
      if (img.complete) return resolve();
      img.addEventListener('load', resolve, { once: true });
      img.addEventListener('error', resolve, { once: true });
    })));

    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }

  function ensureRenderHost() {
    let host = $('#dtk-render-host');
    if (host) return host;

    // Fallback: se crea un host invisible si el embed no lo trae.
    host = document.createElement('div');
    host.id = 'dtk-render-host';
    host.style.position = 'fixed';
    host.style.left = '-10000px';
    host.style.top = '0';
    host.style.width = `${CFG.pageWidth}px`;
    host.style.zIndex = '-1';
    document.body.appendChild(host);
    return host;
  }

  function filename(data) {
    const quote = slug(data.quote.number || 'propuesta');
    const client = slug(data.client.name || data.client.company || 'cliente');
    return `Detektor_${quote}_${client}.pdf`;
  }

  async function generateAndDownload(data) {
    await ensureLibraries();

    const host = ensureRenderHost();
    host.innerHTML = '';

    const renderDocument = buildRenderDocument(data);
    renderDocument.style.width = `${CFG.pageWidth}px`;
    renderDocument.style.margin = '0';
    host.appendChild(renderDocument);

    await waitForAssets(renderDocument);

    const pages = $$('.dtk-pdf-page', renderDocument);
    if (!pages.length) throw new Error('No hay páginas para exportar.');

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [CFG.pageWidth, CFG.pageHeight],
      compress: true,
      hotfixes: ['px_scaling']
    });

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];

      const canvas = await window.html2canvas(page, {
        scale: CFG.renderScale,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        width: CFG.pageWidth,
        height: CFG.pageHeight,
        windowWidth: CFG.pageWidth,
        windowHeight: CFG.pageHeight,
        scrollX: 0,
        scrollY: 0
      });

      if (i > 0) pdf.addPage([CFG.pageWidth, CFG.pageHeight], 'portrait');

      const image = canvas.toDataURL('image/jpeg', 0.96);
      pdf.addImage(image, 'JPEG', 0, 0, CFG.pageWidth, CFG.pageHeight, undefined, 'FAST');
    }

    host.innerHTML = '';
    pdf.save(filename(data));
  }

  async function downloadPdf(event) {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const button = $('#btn-download');
    const originalText = button?.textContent || '';

    try {
      if (button) {
        button.disabled = true;
        button.textContent = 'GENERANDO PDF...';
      }

      // 1) SOLO LEE los datos actuales.
      const data = collectData();

      // 2) SOLO GENERA Y DESCARGA.
      await generateAndDownload(data);
    } catch (error) {
      console.error('[DTK PDF DOWNLOAD]', error);
      alert(`No fue posible generar el PDF.\n\n${error.message || error}`);
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalText;
      }
    }
  }

  function init() {
    const button = $('#btn-download');
    if (!button) {
      console.warn('[DTK PDF DOWNLOAD] No se encontró #btn-download.');
      return;
    }

    if (!button.dataset.dtkDownloadOnlyBound) {
      button.dataset.dtkDownloadOnlyBound = '1';
      button.addEventListener('click', downloadPdf);
    }

    // API mínima, sin vista previa ni operaciones sobre el formulario.
    window.DTKPDF = Object.freeze({
      collect: collectData,
      download: () => downloadPdf()
    });

    console.info('[DTK PDF DOWNLOAD] Módulo listo: leer datos + descargar PDF.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
