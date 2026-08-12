// ==========================================
// CATÁLOGO DE PRODUCTOS (BACKEND)
// ==========================================
const ALL_PRODUCTS = [
  {
    id: 'cazador',
    name: 'Detektor El Cazador',
    img: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7b8d48e70aa94196be3df0_Productos-soluciones-detektor-cotizador%20(1).webp',
    desc: 'Tecnología especializada para localizar vehículos en caso de hurto, incluso donde otras señales no llegan.',
    bullets: ['● Tecnología especializada', '● Configuración según operación', '● Respaldo Detektor']
  },
  {
    id: 'gps',
    name: 'Detektor GPS',
    img: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7b8d482a0eec4e41112bc8_Productos-soluciones-detektor-cotizador%20(5).webp',
    desc: 'Dispositivo de rastreo de alta precisión. Permite monitoreo en tiempo real, histórico de rutas y geocercas.',
    bullets: ['● Monitoreo y recorridos', '● Geocercas y alertas', '● Reportes de operación']
  },
  {
    id: 'roadview',
    name: 'Roadview IA',
    img: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7b8d481a47f3c932fec5b9_Productos-soluciones-detektor-cotizador%20(4).webp',
    desc: 'Cámara con inteligencia artificial para prevenir riesgos y mejorar la conducción.',
    bullets: ['● Tecnología especializada', '● Configuración según operación', '● Respaldo Detektor']
  },
  {
    id: 'smart-track',
    name: 'Detektor Smart Track',
    img: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7b8d48cd2fcdddf06b6212_Productos-soluciones-detektor-cotizador%20(2).webp',
    desc: 'Aplicación de centro de control basada en la nube. Interfaz intuitiva para gestión de flotas, reportes y alertas automatizadas.',
    bullets: ['● Administración centralizada', '● Reportes personalizables', '● Alertas y app móvil']
  },
  {
    id: 'plus',
    name: 'Detektor Plus',
    img: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7b8d4880cacf3cb9ac7328_Productos-soluciones-detektor-cotizador%20(3).webp',
    desc: 'Combina GPS + El Cazador para monitoreo diario y localización especializada en caso de hurto.',
    bullets: ['● Tecnología especializada', '● Configuración según operación', '● Respaldo Detektor']
  }
];

// ==========================================
// REDES SOCIALES POR PAÍS
// ==========================================
const COUNTRY_CONTACTS = {
  'Colombia': { web: 'www.detektor.com.co', socials: [{ type: 'facebook'}, { type: 'linkedin'}, { type: 'instagram'}] },
  'Costa Rica': { web: 'www.detektor.co.cr', socials: [{ type: 'facebook'}, { type: 'twitter-alt'}, { type: 'instagram'}, { type: 'whatsapp'}] },
  'Panamá': { web: 'www.detektor.com.pa', socials: [{ type: 'facebook'}, { type: 'twitter-alt'}, { type: 'instagram'}, { type: 'whatsapp'}] },
  'Guatemala': { web: 'www.detektor.com.gt', socials: [{ type: 'facebook'}, { type: 'twitter-alt'}, { type: 'instagram'}, { type: 'whatsapp'}] },
  'Honduras': { web: 'www.detektor.com.hn', socials: [{ type: 'facebook'}, { type: 'twitter-alt'}, { type: 'instagram'}, { type: 'whatsapp'}] },
  'El Salvador': { web: 'www.detektor.com.sv', socials: [{ type: 'facebook'}, { type: 'twitter-alt'}, { type: 'instagram'}, { type: 'whatsapp'}] },
  'Nicaragua': { web: 'www.detektor.com.ni', socials: [{ type: 'facebook'}, { type: 'twitter-alt'}, { type: 'instagram'}, { type: 'whatsapp'}] },
  'Venezuela': { web: 'www.detektor.com.ve', socials: [{ type: 'facebook'}, { type: 'twitter-alt'}, { type: 'instagram'}] }
};

// ==========================================
// CONSTRUCTOR DEL HTML DEL PDF
// ==========================================
function buildPdfTemplate(data) {
  const selectedProductIds = (data.products || []).map(p => p.productId);
  const taxLabel = data.financials?.taxLabel || 'IVA';
  const taxRate = data.financials?.taxRate || '0';

  // 1. Construir listado de TODOS los productos (Rojo = Seleccionado, Blanco = No seleccionado)
  const solutionsHtml = ALL_PRODUCTS.map(prod => {
    const isSelected = selectedProductIds.includes(prod.id);
    const selectedClass = isSelected ? 'is-selected' : '';
    return `
      <div class="pdf-solution ${selectedClass}">
        <div class="pdf-solution-img">
          <img src="${prod.img}" alt="${prod.name}">
        </div>
        <div class="pdf-solution-copy">
          <h4>${prod.name}</h4>
          <p>${prod.desc}</p>
          <div class="pdf-bullets">${prod.bullets.map(b => `<span>${b}</span>`).join('')}</div>
        </div>
      </div>
    `;
  }).join('');

  // 2. Construir tabla económica
  const tableRowsHtml = (data.products || []).map(p => `
    <tr>
      <td>• ${p.name}</td>
      <td style="text-align:center;">${p.qty}</td>
      <td style="text-align:center;">${p.price}</td>
      <td style="text-align:center;">${taxRate}%</td>
      <td style="text-align:right; font-weight:700;">${p.subtotal}</td>
    </tr>
  `).join('');

  // 3. Construir observaciones y términos
  let termsHtml = '';
  if (data.terms?.payment) termsHtml += `Condiciones de pago: ${data.terms.payment}<br>`;
  if (data.terms?.installation) termsHtml += `Instalación y entrega: ${data.terms.installation}<br>`;
  if (data.terms?.validity) termsHtml += `Vigencia: ${data.terms.validity}<br>`;
  if (data.terms?.warranty) termsHtml += `Garantía: ${data.terms.warranty}<br><br>`;
  if (data.terms?.extra) termsHtml += `Consideraciones adicionales:<br>${data.terms.extra}`;

  // 4. Redes sociales dinámicas
  const contactInfo = COUNTRY_CONTACTS[data.quoteData?.country] || { web: 'www.detektor.com', socials: [] };
  const socialHtml = contactInfo.socials.map(s => `
    <div class="pdf-country-social-link"><i class="fi fi-brands-${s.type}"></i></div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet"/>
      <link href="https://cdn-uicons.flaticon.com/3.0.0/uicons-brands/css/uicons-brands.css" rel="stylesheet"/>
      <link href="https://cdn-uicons.flaticon.com/3.0.0/uicons-regular-rounded/css/uicons-regular-rounded.css" rel="stylesheet"/>
      <style>
        :root { --dtk-red: #c00010; --dtk-red-2: #e30613; }
        body { margin: 0; padding: 0; font-family: 'Open Sans', sans-serif; background: #fff; -webkit-print-color-adjust: exact; print-color-adjust: exact; color: #333; }
        * { box-sizing: border-box; }
        
        /* Sistema de Paginación Nativa de Puppeteer */
        .pdf-page-wrapper { width: 794px; margin: 0 auto; background: #fff; }
        .page-break { page-break-after: always; height: 0; display: block; clear: both; }
        .pdf-flow-group { width: 100%; break-inside: avoid; page-break-inside: avoid; margin-bottom: 20px; }
        
        /* Portada */
        .pdf-cover-top { height: 850px; background-image: url('https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7bd9d6de10902939f52048_Portada-detector-cotizador.webp'); background-size: cover; background-position: center top; color: #fff; padding: 24px 30px 0; }
        .pdf-hero { height: 130px; }
        .pdf-stats { display: grid; grid-template-columns: repeat(3, 1fr); border-bottom: 1px solid rgba(255,255,255,0.15); padding: 20px 0 16px; margin: 0 8px; background: rgba(0,0,0,0.65); backdrop-filter: blur(8px); border-radius: 16px 16px 0 0; }
        .pdf-stat { text-align: center; border-right: 1px solid rgba(255,255,255,0.2); }
        .pdf-stat:last-child { border-right: 0; }
        .pdf-stat b { font-size: 26px; }
        .pdf-stat b span { font-size: 12px; color: var(--dtk-red); }
        .pdf-stat small { display: block; margin-top: 5px; color: #fff; font-size: 9px; }
        .pdf-capabilities { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; padding: 22px 3px 30px; margin: 0 8px; background: rgba(0,0,0,0.65); backdrop-filter: blur(8px); border-radius: 0 0 16px 16px; text-align:center; color:#fff; font-size:9px; }
        .pdf-cap-icon{ width:42px; height:42px; margin:0 auto 8px; border:1px solid rgba(230,6,19,.7); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--dtk-red); font-size:20px; }
        .pdf-capabilities strong { display: block; font-size: 11px; margin-bottom: 2px; }
        
        .pdf-info-zone { height: 273px; background: #fff; position: relative; }
        .pdf-info-box { position: absolute; top: -78px; left: 42px; right: 42px; background: #f5f6f7; border-radius: 14px 14px 0 0; border-top: 3px solid var(--dtk-red); padding: 18px 24px 21px; box-shadow: 0 -10px 25px rgba(0,0,0,.25); min-height: 244px; }
        .pdf-info-title { font-size: 16px; font-weight: 700; margin-bottom: 16px; }
        .pdf-info-title:before { content: '◉'; color: var(--dtk-red); margin-right: 7px; }
        .pdf-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
        .pdf-info-col:first-child { padding-right: 20px; border-right: 1px solid #d1d1d1; }
        .pdf-info-col h5 { margin: 0 0 11px; color: var(--dtk-red); font-size: 12px; }
        .pdf-info-row { display: grid; grid-template-columns: 115px 1fr; gap: 6px; font-size: 10px; margin: 6px 0; }
        .pdf-info-row span:last-child { font-weight: 700; overflow-wrap: anywhere; }

        /* Contenido Interior */
        .pdf-inner { padding: 40px; display: block; }
        .pdf-section-title { text-align: center; margin: 0 0 22px; font-size: 20px; letter-spacing: .2px; font-weight: 700; color: #111; }
        .pdf-section-title .red { color: var(--dtk-red); }
        
        /* Soluciones (Rojas y Blancas) */
        .pdf-solutions { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
        .pdf-solution { display: grid; grid-template-columns: 140px 1fr; gap: 20px; align-items: center; min-height: 145px; padding: 20px; border-radius: 8px; margin-bottom: 0; background: #ffffff; border: 1px solid #e8e8e8; }
        .pdf-solution.is-selected { background: var(--dtk-red); border: 1px solid var(--dtk-red-2); }
        .pdf-solution-img { width: 140px; aspect-ratio: 1 / 1; height: auto; border-radius: 6px; overflow: hidden; background: #f4d9d5; }
        .pdf-solution-img img { width: 100%; height: 100%; display: block; object-fit: cover; object-position: center; }
        .pdf-solution-copy h4 { margin: 0 0 8px; font-size: 20px; color: var(--dtk-red); }
        .pdf-solution-copy p { margin: 0 0 10px; color: #555; font-size: 13px; line-height: 1.5; }
        .pdf-bullets { font-size: 12px; color: #444; line-height: 1.5; }
        .pdf-bullets span { display: block; }
        .pdf-solution.is-selected .pdf-solution-copy h4 { color: #ffffff; }
        .pdf-solution.is-selected .pdf-solution-copy p { color: rgba(255,255,255,0.9); }
        .pdf-solution.is-selected .pdf-bullets { color: rgba(255,255,255,0.85); }

        /* Tabla y Económico */
        .pdf-table { width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 10px; }
        .pdf-table th { background: #070707; color: #fff; text-align: center; padding: 12px 10px; font-size: 9.5px; }
        .pdf-table th:first-child { text-align: left; }
        .pdf-table td { padding: 9px 10px; border-bottom: 1px solid #eee; font-size: 11px; }
        .pdf-econ-bottom { margin-top: 10px; }
        .pdf-totals { width: 320px; margin-left: auto; font-size: 12px; }
        .pdf-total-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e7e1df; }
        .pdf-total-row.final { font-size: 15px; font-weight: 700; border-bottom: 0; padding-top: 10px; color: var(--dtk-red); }
        
        .pdf-advisor-box { margin: 20px auto 10px; padding: 18px 30px; background: #fff; border: 1px dashed var(--dtk-red); border-radius: 8px; text-align: center; width: max-content; min-width: 320px; }
        .pdf-advisor-box h4 { font-size: 18px; margin: 0 0 4px; color: #111; }
        .pdf-advisor-box .role { color: var(--dtk-red); font-size: 12px; font-weight: 600; margin-bottom: 10px; }
        .pdf-advisor-box p { font-size: 11px; margin: 4px 0; color: #555; }

        .pdf-terms-box, .pdf-observation { background: #fdf5f4; border-left: 3px solid var(--dtk-red); padding: 8px 12px; font-size: 7.5px; line-height: 1.35; color: #4a4240; margin-bottom: 10px; }
        .pdf-confidential { text-align: center; color: #777; font-size: 7.5px; line-height: 1.4; margin: 0 28px 14px; }
        
        /* Redes Sociales y Footer Final */
        .pdf-country-contact { width: max-content; max-width: 350px; margin: 16px auto 20px; padding: 14px 24px 16px; text-align: center; background: #fff1ee; border-radius: 8px; }
        .pdf-country-contact-title { font-size: 10px; font-weight: 700; color: #5f514d; margin-bottom: 10px; }
        .pdf-country-social-links { display: flex; justify-content: center; align-items: center; gap: 12px; margin-bottom: 10px; }
        .pdf-country-social-link { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--dtk-red); color: #fff; font-size: 14px; }
        .pdf-country-web { display: block; color: var(--dtk-red); text-decoration: none; font-size: 11px; font-weight: 700; }

        .pdf-final-footer { width: 100%; background: #fff; margin-top: auto; }
        .pdf-page3-claim { margin:0; padding: 12px 20px 9px; text-align: center; font-size: 17px; font-weight: 700; background: #ffffff; }
        .pdf-footer-banner { width: 100%; height: 68px; background: #050505; color: #fff; display: grid; grid-template-columns: repeat(4, 1fr); align-items: center; text-align: center; padding: 0 28px; }
        .pdf-footer-banner b { font-size: 22px; color: var(--dtk-red); }
        .pdf-footer-banner span { display: block; font-size: 8px; color: #ddd; }
        .pdf-countries { width: 100%; text-align: center; font-size: 11px; font-weight: 700; padding: 9px 16px 11px; background: #ffffff; }
      </style>
    </head>
    <body>
      <div class="pdf-page-wrapper">
        
        <!-- HOJA 1: PORTADA -->
        <div class="pdf-cover-top">
          <div class="pdf-hero"></div>
          <div class="pdf-stats">
            <div class="pdf-stat"><b>+33 <span>años</span></b><small>Experiencia en Latinoamérica</small></div>
            <div class="pdf-stat"><b>9 <span>países</span></b><small>Cobertura y soporte local</small></div>
            <div class="pdf-stat"><b>+500.000 <span>usuarios</span></b><small>Conectados en Latinoamérica</small></div>
          </div>
          <div class="pdf-capabilities">
            <div class="pdf-capability"><div class="pdf-cap-icon"><i class="fi fi-rr-map-marker"></i></div><strong>Monitoreo GPS</strong>Ubicación, recorridos y alertas.</div>
            <div class="pdf-capability"><div class="pdf-cap-icon"><i class="fi fi-rr-search-alt"></i></div><strong>Localización vehicular</strong>En caso de robo.</div>
            <div class="pdf-capability"><div class="pdf-cap-icon"><i class="fi fi-rr-dashboard"></i></div><strong>Gestión de flotas</strong>Visibilidad y control operativo.</div>
            <div class="pdf-capability"><div class="pdf-cap-icon"><i class="fi fi-rr-headset"></i></div><strong>Seguridad 24/7</strong>Respaldo permanente.</div>
          </div>
        </div>
        <div class="pdf-info-zone">
          <div class="pdf-info-box">
            <div class="pdf-info-title">Información de la propuesta</div>
            <div class="pdf-info-grid">
              <div class="pdf-info-col">
                <h5>Datos del cliente</h5>
                <div class="pdf-info-row"><span>Nombre del cliente:</span><span>${data.clientData?.name || ''}</span></div>
                <div class="pdf-info-row"><span>Empresa:</span><span>${data.clientData?.company || '-'}</span></div>
                <div class="pdf-info-row"><span>Cargo:</span><span>${data.clientData?.role || '-'}</span></div>
                <div class="pdf-info-row"><span>Correo:</span><span>${data.clientData?.email || ''}</span></div>
                <div class="pdf-info-row"><span>Teléfono:</span><span>${data.clientData?.phone || ''}</span></div>
                ${data.clientData?.city ? `<div class="pdf-info-row"><span>Ciudad:</span><span>${data.clientData.city}</span></div>` : ''}
              </div>
              <div class="pdf-info-col">
                <h5>Datos de la cotización</h5>
                <div class="pdf-info-row"><span>Fecha:</span><span>${data.quoteData?.date || ''}</span></div>
                <div class="pdf-info-row"><span>Propuesta N°:</span><span>${data.quoteData?.number || ''}</span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- SALTO DE PÁGINA AUTOMÁTICO -->
        <div class="page-break"></div>

        <!-- CONTENIDO INTERIOR -->
        <div class="pdf-inner">
          <div class="pdf-flow-group">
            <h3 class="pdf-section-title">NUESTRAS SOLUCIONES TECNOLÓGICAS</h3>
            <div class="pdf-solutions">
              ${solutionsHtml}
            </div>
          </div>

          <div class="pdf-flow-group">
            <h3 class="pdf-section-title">PROPUESTA <span class="red">ECONÓMICA</span></h3>
            <table class="pdf-table">
              <thead>
                <tr>
                  <th style="width:42%">DESCRIPCIÓN</th>
                  <th style="width:10%">CANT.</th>
                  <th style="width:17%">PRECIO/U</th>
                  <th style="width:15%">IMPUESTO</th>
                  <th style="text-align:right">TOTAL</th>
                </tr>
              </thead>
              <tbody>
                ${tableRowsHtml}
              </tbody>
            </table>

            <div class="pdf-econ-bottom">
              <div class="pdf-totals">
                <div class="pdf-total-row"><span>Subtotal</span><b>${data.financials?.subtotal || '0'}</b></div>
                <div class="pdf-total-row"><span>${taxLabel} (${taxRate}%)</span><b>${data.financials?.taxAmount || '0'}</b></div>
                <div class="pdf-total-row final"><span>TOTAL CON IMPUESTO</span><b>${data.financials?.total || '0'}</b></div>
              </div>
            </div>
          </div>

          <div class="pdf-flow-group">
            <div class="pdf-advisor-box">
              <h4>${data.quoteData?.advisorName || 'Asesor'}</h4>
              <div class="role">Asesor Comercial Corporativo</div>
              ${data.quoteData?.advisorEmail ? `<p>${data.quoteData.advisorEmail}</p>` : ''}
              ${data.quoteData?.advisorPhone ? `<p>${data.quoteData.advisorPhone}</p>` : ''}
            </div>
            
            ${data.quoteData?.observations ? `<div class="pdf-observation"><b>Observaciones generales:</b><br>${data.quoteData.observations}</div>` : ''}
            ${termsHtml ? `<div class="pdf-terms-box">${termsHtml}</div>` : ''}
            
            <p class="pdf-confidential">Esta propuesta es confidencial y propiedad de Detektor hasta su aceptación formal. Su contenido no podrá ser divulgado ni utilizado con fines comerciales sin autorización. Comprometidos con la sostenibilidad, presentamos este documento en formato digital. Antes de imprimirlo, considere si es realmente necesario.</p>
          </div>
          
          <div class="pdf-flow-group">
            <div class="pdf-country-contact">
              <div class="pdf-country-contact-title">Síguenos en nuestras redes</div>
              <div class="pdf-country-social-links">${socialHtml}</div>
              <span class="pdf-country-web">${contactInfo.web}</span>
            </div>
          </div>
        </div>
        
        <!-- FOOTER (AL FINAL DEL DOCUMENTO) -->
        <div class="pdf-final-footer">
          <div class="pdf-page3-claim">SOLUCIONES PARA TU TRANQUILIDAD</div>
          <div class="pdf-footer-banner">
            <div><b>33</b><span>años de experiencia</span></div>
            <div><b>9</b><span>países en Latinoamérica</span></div>
            <div><b>500.000</b><span>usuarios activos</span></div>
            <div><img src="https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7a8e42775bc4c63e44c311_Recurso%2027%404x.webp" style="max-height:35px; margin: 0 auto; display:block;"></div>
          </div>
          <div class="pdf-countries">Colombia | Guatemala | El Salvador | Honduras | Nicaragua | Costa Rica | Panamá | Venezuela | Brasil</div>
        </div>

      </div>
    </body>
    </html>
  `;
}

// Exportamos la función para que server.js la utilice
module.exports = buildPdfTemplate;
