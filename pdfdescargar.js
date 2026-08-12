/*
 * pdfdescargar.js · Detektor Cotizador Webflow
 * Lee datos del cotizador y descarga el PDF.
 * Versión corregida: layout A4 estable, menos espacio en blanco y texto sin superposición.
 */
(function(){
'use strict';

if(window.__DTK_PDF_DOWNLOAD_ONLY__) return;
window.__DTK_PDF_DOWNLOAD_ONLY__=true;

const CFG={
  pageWidth:794,
  pageHeight:1123,
  renderScale:2,
  solutionsPerPage:5,
  libs:{
    html2canvas:'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
    jspdf:'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
  },
  footerLogo:'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7a8e42775bc4c63e44c311_Recurso%2027%404x.webp'
};

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const valueOf=(selector,root=document)=>{const el=$(selector,root);return el?String(el.value??'').trim():''};
const textOf=(selector,root=document)=>{const el=$(selector,root);return el?String(el.textContent??'').trim():''};

const esc=value=>String(value??'')
  .replace(/&/g,'&amp;')
  .replace(/</g,'&lt;')
  .replace(/>/g,'&gt;')
  .replace(/"/g,'&quot;')
  .replace(/'/g,'&#039;');

const normalize=value=>String(value??'')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g,'')
  .toLowerCase()
  .replace(/\s+/g,' ')
  .trim();

const slug=value=>String(value||'cotizacion')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g,'')
  .replace(/[^a-zA-Z0-9_-]+/g,'-')
  .replace(/-+/g,'-')
  .replace(/^-|-$/g,'')
  .slice(0,80)||'cotizacion';

function formatDate(dateISO){
  if(!dateISO) return '';
  const parts=dateISO.split('-');
  return parts.length===3?`${parts[2]}/${parts[1]}/${parts[0]}`:dateISO;
}

function readAdvisor(){
  const manualWrap=$('#advisor-manual-wrap');
  const manualMode=!!manualWrap&&!manualWrap.classList.contains('dtk-hidden');
  const raw=manualMode?valueOf('#quote-advisor-manual'):valueOf('#quote-advisor-select');
  const code=valueOf('#quote-advisor-code');
  let name=raw;

  if(!manualMode&&raw.includes(' - ')) name=raw.split(' - ').slice(1).join(' - ').trim();

  const countryName=valueOf('#quote-country');
  const country=window.DTK_DATA?.countries?.[countryName];

  if(!manualMode&&code&&Array.isArray(country?.agents)){
    const advisor=country.agents.find(a=>String(a.code||'')===code);
    if(advisor?.name) name=advisor.name;
  }

  return{
    name,
    code,
    phone:valueOf('#quote-advisor-phone'),
    email:valueOf('#quote-advisor-email')
  };
}

function readEconomicRows(){
  const tbody=$('#dtk-calc-tbody');
  if(!tbody) return [];

  return $$('tr[data-row]',tbody).map(row=>({
    productId:row.dataset.productId||'',
    product:String($('.dtk-prod-name',row)?.value||'').trim(),
    qty:String($('.dtk-qty',row)?.value||'').trim(),
    unit:String($('.dtk-price',row)?.value||'').trim(),
    discount:String($('.dtk-desc',row)?.value||'').trim(),
    subtotal:String($('.dtk-row-subtotal',row)?.textContent||'').trim()
  })).filter(row=>row.product);
}

function readCatalogProducts(economicRows){
  const selectedIds=new Set(economicRows.map(row=>row.productId).filter(Boolean));
  const selectedNames=new Set(economicRows.map(row=>normalize(row.product)));
  const dataProducts=Array.isArray(window.DTK_DATA?.products)?window.DTK_DATA.products:[];
  const cards=$$('.dtk-product-card',$('#dtk-products-catalog')||document);

  let products=cards.map(card=>{
    const name=textOf('.dtk-product-name',card)||card.dataset.name||'';
    const productButton=card.querySelector('[data-product-id]');
    const cardProductId=productButton?.dataset.productId||'';

    const dataProduct=dataProducts.find(p=>
      normalize(p.name)===normalize(name)||
      (cardProductId&&p.id===cardProductId)
    );

    const img=$('img',card);
    const id=dataProduct?.id||cardProductId;

    return{
      id,
      name:dataProduct?.name||name,
      image:dataProduct?.image||img?.currentSrc||img?.src||'',
      description:dataProduct?.pdfDescription||textOf('.dtk-product-desc',card)||'',
      benefit:textOf('.dtk-product-benefit',card)||dataProduct?.benefit||'',
      selected:(id&&selectedIds.has(id))||selectedNames.has(normalize(dataProduct?.name||name))
    };
  }).filter(p=>p.name);

  if(!products.length&&dataProducts.length){
    products=dataProducts.map(p=>({
      id:p.id||'',
      name:p.name||'',
      image:p.image||'',
      description:p.pdfDescription||p.description||'',
      benefit:p.benefit||'',
      selected:(p.id&&selectedIds.has(p.id))||selectedNames.has(normalize(p.name))
    })).filter(p=>p.name);
  }

  economicRows.forEach(row=>{
    const exists=products.some(p=>
      (row.productId&&p.id===row.productId)||
      normalize(p.name)===normalize(row.product)
    );

    if(!exists){
      products.push({
        id:row.productId||'',
        name:row.product,
        image:'',
        description:'Producto incluido en esta propuesta.',
        benefit:'',
        selected:true
      });
    }
  });

  return products;
}

function readCountryContact(countryName){
  const contact=window.DTK_COUNTRY_CONTACTS?.[countryName]||null;
  if(!contact) return{web:'',socials:[]};

  return{
    web:String(contact.web||''),
    socials:Array.isArray(contact.socials)
      ?contact.socials.filter(item=>item?.url).map(item=>({type:item.type||'',url:item.url||''}))
      :[]
  };
}

function readTotals(){
  const manualTaxWrap=$('#tax-manual-wrap');
  const manualTaxVisible=!!manualTaxWrap&&!manualTaxWrap.classList.contains('dtk-hidden');

  return{
    currency:valueOf('#currency-select'),
    subtotal:textOf('#val-subtotal')||'0',
    tax:textOf('#val-tax')||'0',
    total:textOf('#val-total')||'0',
    taxLabel:textOf('#tax-label')||'IVA',
    taxPercent:manualTaxVisible?valueOf('#input-tax-manual'):valueOf('#select-tax')
  };
}

function collectData(){
  const country=valueOf('#quote-country');
  const economicRows=readEconomicRows();

  return{
    quote:{
      date:valueOf('#quote-date'),
      number:valueOf('#quote-number'),
      country,
      observations:valueOf('#quote-obs')
    },
    advisor:readAdvisor(),
    client:{
      name:valueOf('#client-name'),
      company:valueOf('#client-company'),
      role:valueOf('#client-role'),
      email:valueOf('#client-email'),
      phone:valueOf('#client-phone'),
      city:valueOf('#client-city')
    },
    terms:{
      installation:valueOf('#terms-installation'),
      payment:valueOf('#terms-payment'),
      validity:valueOf('#terms-validity'),
      warranty:valueOf('#terms-warranty'),
      extra:valueOf('#terms-extra')
    },
    economicRows,
    totals:readTotals(),
    products:readCatalogProducts(economicRows),
    countryContact:readCountryContact(country)
  };
}

function setOptionalCloneText(root,selector,value){
  const el=$(selector,root);
  if(!el) return;

  const clean=String(value||'').trim();
  el.textContent=clean;

  const row=el.closest('.pdf-info-row');
  if(row) row.style.display=clean?'grid':'none';
}

function syncCoverOnClone(clone,data){
  setOptionalCloneText(clone,'#prev-client-name',data.client.name);
  setOptionalCloneText(clone,'#prev-client-company',data.client.company);
  setOptionalCloneText(clone,'#prev-client-role',data.client.role);
  setOptionalCloneText(clone,'#prev-client-email',data.client.email);
  setOptionalCloneText(clone,'#prev-client-phone',data.client.phone);
  setOptionalCloneText(clone,'#prev-client-city',data.client.city);
  setOptionalCloneText(clone,'#prev-quote-date',formatDate(data.quote.date));
  setOptionalCloneText(clone,'#prev-quote-number',data.quote.number);
}

function makeSolutionHTML(product){
  const selectedClass=product.selected?' is-selected':'';

  const imageHTML=product.image
    ?`<div class="pdf-solution-img"><img src="${esc(product.image)}" alt="${esc(product.name)}" crossorigin="anonymous" referrerpolicy="no-referrer"></div>`
    :`<div class="pdf-solution-img" style="display:flex;align-items:center;justify-content:center;text-align:center;padding:14px;color:#777;font-size:11px;">${esc(product.name)}</div>`;

  const bullets=normalize(product.name).includes('gps')
    ?['Monitoreo y recorridos','Geocercas y alertas','Reportes de operación']
    :['Tecnología especializada','Configuración según operación','Respaldo Detektor'];

  return`
    <div class="pdf-solution${selectedClass}">
      ${imageHTML}
      <div class="pdf-solution-copy">
        <h4>${esc(product.name)}</h4>
        ${product.description?`<p>${esc(product.description)}</p>`:''}
        <div class="pdf-bullets">${bullets.map(item=>`<span>• ${esc(item)}</span>`).join('')}</div>
      </div>
    </div>`;
}

function createPage(id,extraClass=''){
  const page=document.createElement('section');
  page.className=`dtk-pdf-page pdf-page2 pdf-generated-page ${extraClass}`.trim();
  page.id=id;
  return page;
}

function buildSolutionsPage(products,pageNumber,continuation){
  const page=createPage(`pdf-download-page-${pageNumber}`);

  page.innerHTML=`
    <div class="pdf-inner">
      <div class="pdf-flow-group pdf-flow-solutions">
        <h3 class="pdf-section-title">
          NUESTRAS SOLUCIONES TECNOLÓGICAS${continuation?' <span class="red">· CONT.</span>':''}
        </h3>
        <div class="pdf-solutions">
          ${products.length
            ?products.map(makeSolutionHTML).join('')
            :'<div style="text-align:center;color:#888;padding:25px 10px;font-size:12px;">Sin soluciones registradas.</div>'}
        </div>
      </div>
    </div>`;

  return page;
}

function moneyCell(value,currency){
  const clean=String(value||'').trim();
  if(!clean) return `0 ${esc(currency||'')}`.trim();
  if(currency&&clean.toUpperCase().includes(currency.toUpperCase())) return esc(clean);
  return esc(`${clean}${currency?` ${currency}`:''}`);
}

function buildEconomicRows(data){
  if(!data.economicRows.length){
    return '<tr><td colspan="4" style="text-align:center;color:#888;padding:18px;">Sin productos agregados.</td></tr>';
  }

  return data.economicRows.map(row=>`
    <tr>
      <td>• ${esc(row.product)}</td>
      <td>${esc(row.qty||'1')}</td>
      <td>${moneyCell(row.unit||'0',data.totals.currency)}</td>
      <td style="text-align:right;font-weight:700;">${moneyCell(row.subtotal||'0',data.totals.currency)}</td>
    </tr>`
  ).join('');
}

function buildTermsText(terms){
  const lines=[];

  if(terms.payment) lines.push(`Condiciones de pago: ${terms.payment}`);
  if(terms.installation) lines.push(`Instalación y entrega: ${terms.installation}`);
  if(terms.validity) lines.push(`Vigencia: ${terms.validity}`);
  if(terms.warranty) lines.push(`Garantía: ${terms.warranty}`);

  if(terms.extra){
    if(lines.length) lines.push('');
    lines.push('Consideraciones adicionales:');
    lines.push(terms.extra);
  }

  return lines.join('\n');
}

function socialIcon(type){
  const map={
    facebook:'facebook',
    instagram:'instagram',
    x:'twitter-alt',
    twitter:'twitter-alt',
    whatsapp:'whatsapp',
    linkedin:'linkedin',
    youtube:'youtube',
    tiktok:'tik-tok'
  };

  return map[String(type||'').toLowerCase()]||String(type||'');
}

function buildCountryContact(contact){
  if(!contact?.web&&!contact?.socials?.length) return '';

  const links=(contact.socials||[]).map(item=>`
    <a class="pdf-country-social-link" href="${esc(item.url)}" rel="noopener" target="_blank">
      <i class="fi fi-brands-${esc(socialIcon(item.type))}"></i>
    </a>`
  ).join('');

  const webLabel=String(contact.web||'')
    .replace(/^https?:\/\//i,'')
    .replace(/\/$/,'');

  return`
    <div class="pdf-country-contact">
      <div class="pdf-country-contact-title">Síguenos en nuestras redes</div>
      ${links?`<div class="pdf-country-social-links">${links}</div>`:''}
      ${contact.web?`<a class="pdf-country-web" href="${esc(contact.web)}" rel="noopener" target="_blank">${esc(webLabel)}</a>`:''}
    </div>`;
}

function buildFinalPage(data,pageNumber){
  const page=createPage(`pdf-download-page-${pageNumber}`,'pdf-final-page');
  const taxPct=data.totals.taxPercent?` (${esc(data.totals.taxPercent)}%)`:'';
  const termsText=buildTermsText(data.terms);

  page.innerHTML=`
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
            <div class="pdf-total-row">
              <span>Subtotal</span>
              <b>${moneyCell(data.totals.subtotal,data.totals.currency)}</b>
            </div>
            <div class="pdf-total-row">
              <span>${esc(data.totals.taxLabel)}${taxPct}</span>
              <b>${moneyCell(data.totals.tax,data.totals.currency)}</b>
            </div>
            <div class="pdf-total-row final">
              <span>TOTAL CON IMPUESTO</span>
              <b>${moneyCell(data.totals.total,data.totals.currency)}</b>
            </div>
          </div>

          <div class="pdf-advisor-box">
            <h4>${esc(data.advisor.name||'Asesor Comercial')}</h4>
            <div class="role">Asesor Comercial Corporativo</div>
            ${data.advisor.email?`<p>${esc(data.advisor.email)}</p>`:''}
            ${data.advisor.phone?`<p>${esc(data.advisor.phone)}</p>`:''}
          </div>
        </div>

        ${data.quote.observations
          ?`<div class="pdf-observation"><b>Observaciones generales:</b><span>${esc(data.quote.observations)}</span></div>`
          :''}
      </div>

      <div class="pdf-flow-group pdf-flow-terms">
        ${termsText?`<div class="pdf-terms-box">${esc(termsText)}</div>`:''}
        <p class="pdf-confidential">
          Esta propuesta es confidencial y propiedad de Detektor hasta su aceptación formal. Su contenido no podrá ser divulgado ni utilizado con fines comerciales sin autorización. Comprometidos con la sostenibilidad, presentamos este documento en formato digital. Antes de imprimirlo, considere si es realmente necesario.
        </p>
      </div>

      <div class="pdf-flow-group pdf-flow-more">
        ${buildCountryContact(data.countryContact)}

        <div class="pdf-final-footer">
          <div class="pdf-page3-claim">SOLUCIONES PARA TU TRANQUILIDAD</div>

          <div class="pdf-footer-banner">
            <div><b>33</b><span>años de experiencia</span></div>
            <div><b>9</b><span>países en Latinoamérica</span></div>
            <div><b>500.000</b><span>usuarios activos</span></div>
            <div>
              <img src="${CFG.footerLogo}" alt="Detektor Logo" crossorigin="anonymous" referrerpolicy="no-referrer" style="max-height:35px;width:auto;margin:0 auto;display:block;">
            </div>
          </div>

          <div class="pdf-countries">
            Colombia | Guatemala | El Salvador | Honduras | Nicaragua | Costa Rica | Panamá | Venezuela | Brasil
          </div>
        </div>
      </div>
    </div>`;

  return page;
}

function buildRenderDocument(data){
  const source=$('#dtk-pdf-export-content');
  if(!source) throw new Error('No se encontró #dtk-pdf-export-content en el embed.');

  const clone=source.cloneNode(true);
  clone.id='dtk-pdf-download-document';

  // CSS exclusivo para la exportación PDF.
  // Se inyecta dentro del clon para no alterar el diseño normal de Webflow.
  const fixStyles=document.createElement('style');
  fixStyles.innerHTML=`
    #dtk-pdf-download-document,
    #dtk-pdf-download-document *{
      box-sizing:border-box !important;
      text-rendering:auto !important;
      font-kerning:auto !important;
      font-variant-ligatures:none !important;
      letter-spacing:normal !important;
      word-spacing:normal !important;
      -webkit-font-smoothing:antialiased !important;
      -moz-osx-font-smoothing:grayscale !important;
    }

    /* Fuente estable para html2canvas. Evita superposición de caracteres. */
    #dtk-pdf-download-document,
    #dtk-pdf-download-document *{
      font-family:Arial,Helvetica,sans-serif !important;
    }

    #dtk-pdf-download-document .dtk-pdf-page{
      width:${CFG.pageWidth}px !important;
      height:${CFG.pageHeight}px !important;
      min-height:${CFG.pageHeight}px !important;
      max-height:${CFG.pageHeight}px !important;
      position:relative !important;
      display:block !important;
      margin:0 !important;
      padding:0 !important;
      overflow:hidden !important;
      background:#fff !important;
      transform:none !important;
      zoom:1 !important;
    }

    #dtk-pdf-download-document .pdf-generated-page .pdf-inner{
      width:100% !important;
      height:100% !important;
      padding:34px 34px 28px !important;
      display:flex !important;
      flex-direction:column !important;
    }

    #dtk-pdf-download-document h1,
    #dtk-pdf-download-document h2,
    #dtk-pdf-download-document h3,
    #dtk-pdf-download-document h4,
    #dtk-pdf-download-document p,
    #dtk-pdf-download-document span,
    #dtk-pdf-download-document td,
    #dtk-pdf-download-document th,
    #dtk-pdf-download-document div{
      text-overflow:clip !important;
    }

    #dtk-pdf-download-document p,
    #dtk-pdf-download-document td,
    #dtk-pdf-download-document span{
      overflow-wrap:break-word !important;
      word-break:normal !important;
    }

    #dtk-pdf-download-document .pdf-section-title{
      margin:0 0 22px !important;
      padding:0 !important;
      font-size:23px !important;
      line-height:1.1 !important;
      font-weight:800 !important;
      text-align:center !important;
      color:#151515 !important;
    }

    #dtk-pdf-download-document .pdf-section-title .red{
      color:#d00012 !important;
    }

    /* SOLUCIONES */
    #dtk-pdf-download-document .pdf-flow-solutions{
      width:100% !important;
    }

    #dtk-pdf-download-document .pdf-solutions{
      width:100% !important;
      display:flex !important;
      flex-direction:column !important;
      gap:13px !important;
    }

    #dtk-pdf-download-document .pdf-solution{
      width:100% !important;
      min-height:164px !important;
      height:164px !important;
      display:grid !important;
      grid-template-columns:128px minmax(0,1fr) !important;
      align-items:center !important;
      column-gap:18px !important;
      padding:14px 17px !important;
      border:1px solid #e1e1e1 !important;
      border-radius:13px !important;
      background:#fff !important;
      color:#252525 !important;
      overflow:hidden !important;
    }

    #dtk-pdf-download-document .pdf-solution.is-selected{
      background:#ce0014 !important;
      border-color:#ce0014 !important;
      color:#fff !important;
    }

    #dtk-pdf-download-document .pdf-solution-img{
      width:112px !important;
      height:112px !important;
      border-radius:9px !important;
      overflow:hidden !important;
      background:#f2f2f2 !important;
    }

    #dtk-pdf-download-document .pdf-solution-img img{
      width:100% !important;
      height:100% !important;
      display:block !important;
      object-fit:cover !important;
    }

    #dtk-pdf-download-document .pdf-solution-copy{
      min-width:0 !important;
      width:100% !important;
    }

    #dtk-pdf-download-document .pdf-solution-copy h4{
      margin:0 0 5px !important;
      font-size:21px !important;
      line-height:1.08 !important;
      font-weight:800 !important;
      white-space:normal !important;
    }

    #dtk-pdf-download-document .pdf-solution-copy p{
      margin:0 0 7px !important;
      font-size:12px !important;
      line-height:1.28 !important;
      white-space:normal !important;
    }

    #dtk-pdf-download-document .pdf-bullets{
      display:flex !important;
      flex-direction:column !important;
      gap:2px !important;
    }

    #dtk-pdf-download-document .pdf-bullets span{
      display:block !important;
      font-size:11.5px !important;
      line-height:1.25 !important;
      white-space:normal !important;
    }

    /* TABLA ECONÓMICA */
    #dtk-pdf-download-document .pdf-table{
      width:100% !important;
      table-layout:fixed !important;
      border-collapse:collapse !important;
      margin:0 0 19px !important;
    }

    #dtk-pdf-download-document .pdf-table th{
      height:35px !important;
      padding:8px 10px !important;
      background:#080808 !important;
      color:#fff !important;
      font-size:11px !important;
      line-height:1.1 !important;
      font-weight:700 !important;
      white-space:normal !important;
    }

    #dtk-pdf-download-document .pdf-table td{
      min-height:34px !important;
      padding:9px 10px !important;
      border-bottom:1px solid #e3e3e3 !important;
      font-size:11.5px !important;
      line-height:1.2 !important;
      white-space:normal !important;
    }

    /* TOTALES */
    #dtk-pdf-download-document .pdf-econ-bottom{
      display:flex !important;
      flex-direction:column !important;
      align-items:flex-end !important;
      width:100% !important;
    }

    #dtk-pdf-download-document .pdf-totals{
      width:320px !important;
      margin:0 0 18px auto !important;
    }

    #dtk-pdf-download-document .pdf-total-row{
      display:flex !important;
      justify-content:space-between !important;
      align-items:center !important;
      min-height:31px !important;
      gap:18px !important;
      border-bottom:1px solid #ddd !important;
      font-size:12px !important;
      line-height:1.15 !important;
    }

    #dtk-pdf-download-document .pdf-total-row span{
      flex:1 1 auto !important;
    }

    #dtk-pdf-download-document .pdf-total-row b{
      flex:0 0 auto !important;
      white-space:nowrap !important;
    }

    #dtk-pdf-download-document .pdf-total-row.final{
      min-height:40px !important;
      border-bottom:0 !important;
      color:#c90016 !important;
      font-size:16px !important;
      font-weight:800 !important;
    }

    /* ASESOR */
    #dtk-pdf-download-document .pdf-advisor-box{
      width:315px !important;
      min-height:118px !important;
      margin:0 auto 18px !important;
      padding:18px 20px !important;
      border:1px dashed #ba0014 !important;
      border-radius:12px !important;
      text-align:center !important;
    }

    #dtk-pdf-download-document .pdf-advisor-box h4{
      margin:0 0 5px !important;
      font-size:18px !important;
      line-height:1.15 !important;
      font-weight:800 !important;
      white-space:normal !important;
      overflow-wrap:anywhere !important;
    }

    #dtk-pdf-download-document .pdf-advisor-box .role{
      margin-bottom:6px !important;
      color:#c50016 !important;
      font-size:12px !important;
      font-weight:700 !important;
    }

    #dtk-pdf-download-document .pdf-advisor-box p{
      margin:2px 0 !important;
      font-size:11px !important;
      line-height:1.2 !important;
      white-space:normal !important;
      overflow-wrap:anywhere !important;
    }

    /* OBSERVACIONES */
    #dtk-pdf-download-document .pdf-observation{
      width:100% !important;
      margin-top:4px !important;
      padding:10px 12px !important;
      display:block !important;
      border-left:4px solid #cb0017 !important;
      background:#fff4f4 !important;
      font-size:9.5px !important;
      line-height:1.35 !important;
      white-space:normal !important;
    }

    #dtk-pdf-download-document .pdf-observation b{
      display:block !important;
      margin-bottom:4px !important;
    }

    /* TÉRMINOS */
    #dtk-pdf-download-document .pdf-flow-terms{
      width:100% !important;
      margin-top:10px !important;
    }

    #dtk-pdf-download-document .pdf-terms-box{
      width:100% !important;
      padding:11px 12px !important;
      border-left:4px solid #cb0017 !important;
      background:#fffafa !important;
      font-size:8.8px !important;
      line-height:1.32 !important;
      white-space:pre-line !important;
      overflow-wrap:anywhere !important;
    }

    #dtk-pdf-download-document .pdf-confidential{
      margin:9px 15px 0 !important;
      text-align:center !important;
      color:#777 !important;
      font-size:8px !important;
      line-height:1.25 !important;
    }

    /* CONTACTO + FOOTER */
    #dtk-pdf-download-document .pdf-flow-more{
      width:100% !important;
      margin-top:auto !important;
    }

    #dtk-pdf-download-document .pdf-country-contact{
      margin:8px auto 14px !important;
      text-align:center !important;
    }

    #dtk-pdf-download-document .pdf-country-contact-title{
      margin-bottom:7px !important;
      font-size:11px !important;
      font-weight:700 !important;
    }

    #dtk-pdf-download-document .pdf-country-social-links{
      display:flex !important;
      justify-content:center !important;
      align-items:center !important;
      gap:12px !important;
      margin-bottom:6px !important;
    }

    #dtk-pdf-download-document .pdf-country-web{
      color:#c80018 !important;
      font-size:11px !important;
      font-weight:700 !important;
      text-decoration:none !important;
    }

    #dtk-pdf-download-document .pdf-final-footer{
      width:calc(100% + 68px) !important;
      margin-left:-34px !important;
      margin-right:-34px !important;
      margin-bottom:-28px !important;
    }

    #dtk-pdf-download-document .pdf-page3-claim{
      margin-bottom:6px !important;
      text-align:center !important;
      font-size:19px !important;
      line-height:1.1 !important;
      font-weight:800 !important;
    }

    #dtk-pdf-download-document .pdf-footer-banner{
      min-height:72px !important;
      padding:9px 30px !important;
      display:grid !important;
      grid-template-columns:1fr 1fr 1.25fr 1.35fr !important;
      align-items:center !important;
      background:#050505 !important;
      color:#fff !important;
    }

    #dtk-pdf-download-document .pdf-footer-banner > div{
      min-width:0 !important;
      text-align:center !important;
    }

    #dtk-pdf-download-document .pdf-footer-banner b{
      display:block !important;
      margin-bottom:1px !important;
      color:#dc0018 !important;
      font-size:24px !important;
      line-height:1 !important;
      font-weight:800 !important;
    }

    #dtk-pdf-download-document .pdf-footer-banner span{
      display:block !important;
      font-size:8px !important;
      line-height:1.15 !important;
      white-space:normal !important;
    }

    #dtk-pdf-download-document .pdf-countries{
      padding:8px 15px !important;
      text-align:center !important;
      color:#333 !important;
      font-size:8.5px !important;
      line-height:1.2 !important;
      white-space:nowrap !important;
    }

    /* PORTADA */
    #dtk-pdf-download-document #pdf-download-page-1 [id^="prev-"]{
      min-width:0 !important;
      max-width:100% !important;
      font-family:Arial,Helvetica,sans-serif !important;
      letter-spacing:normal !important;
      word-spacing:normal !important;
      white-space:normal !important;
      overflow-wrap:anywhere !important;
      line-height:1.25 !important;
      transform:none !important;
    }

    #dtk-pdf-download-document #pdf-download-page-1 .pdf-info-row{
      min-width:0 !important;
    }

    #dtk-pdf-download-document img{
      max-width:100% !important;
    }
  `;
  clone.prepend(fixStyles);

  const cover=$('.dtk-pdf-page#pdf-page-1',clone)||$('.dtk-pdf-page',clone);
  if(!cover) throw new Error('No se encontró la portada del PDF.');

  $$('.dtk-pdf-page',clone).forEach(page=>{
    if(page!==cover) page.remove();
  });

  cover.id='pdf-download-page-1';
  syncCoverOnClone(clone,data);

  const chunks=[];
  const products=data.products||[];

  if(products.length){
    for(let i=0;i<products.length;i+=CFG.solutionsPerPage){
      chunks.push(products.slice(i,i+CFG.solutionsPerPage));
    }
  }else{
    chunks.push([]);
  }

  let pageNumber=2;

  chunks.forEach((chunk,index)=>{
    clone.appendChild(
      buildSolutionsPage(
        chunk,
        pageNumber++,
        index>0
      )
    );
  });

  clone.appendChild(buildFinalPage(data,pageNumber));
  return clone;
}

function loadScript(src,ready){
  return new Promise((resolve,reject)=>{
    if(ready()) return resolve();

    const existing=$$('script').find(script=>script.src===src);

    if(existing){
      if(ready()) return resolve();

      existing.addEventListener('load',resolve,{once:true});
      existing.addEventListener('error',()=>reject(new Error(`No se pudo cargar ${src}`)),{once:true});
      return;
    }

    const script=document.createElement('script');
    script.src=src;
    script.async=true;
    script.crossOrigin='anonymous';
    script.onload=resolve;
    script.onerror=()=>reject(new Error(`No se pudo cargar ${src}`));

    document.head.appendChild(script);
  });
}

async function ensureLibraries(){
  await loadScript(
    CFG.libs.html2canvas,
    ()=>typeof window.html2canvas==='function'
  );

  await loadScript(
    CFG.libs.jspdf,
    ()=>!!window.jspdf?.jsPDF
  );
}

async function waitForAssets(root){
  if(document.fonts?.ready){
    try{
      await document.fonts.ready;
    }catch(_){}
  }

  const images=$$('img',root);

  await Promise.all(
    images.map(img=>new Promise(resolve=>{
      if(img.complete) return resolve();

      img.addEventListener('load',resolve,{once:true});
      img.addEventListener('error',resolve,{once:true});
    }))
  );

  await new Promise(resolve=>
    requestAnimationFrame(()=>
      requestAnimationFrame(resolve)
    )
  );
}

function ensureRenderHost(){
  let host=$('#dtk-render-host');

  if(host){
    host.innerHTML='';
    host.style.position='fixed';
    host.style.top='0';
    host.style.left='-10000px';
    host.style.width=`${CFG.pageWidth}px`;
    host.style.opacity='1';
    host.style.visibility='visible';
    host.style.zIndex='-1';
    host.style.pointerEvents='none';
    host.style.overflow='visible';
    return host;
  }

  host=document.createElement('div');
  host.id='dtk-render-host';
  host.style.position='fixed';
  host.style.top='0';
  host.style.left='-10000px';
  host.style.width=`${CFG.pageWidth}px`;
  host.style.opacity='1';
  host.style.visibility='visible';
  host.style.zIndex='-1';
  host.style.pointerEvents='none';
  host.style.overflow='visible';

  document.body.appendChild(host);
  return host;
}

function filename(data){
  const quote=slug(data.quote.number||'propuesta');
  const client=slug(data.client.name||data.client.company||'cliente');

  return `Detektor_${quote}_${client}.pdf`;
}

async function generateAndDownload(data){
  await ensureLibraries();

  const host=ensureRenderHost();
  const renderDocument=buildRenderDocument(data);
  host.appendChild(renderDocument);

  await waitForAssets(renderDocument);

  // Tiempo breve para que Webflow termine de calcular fuentes, imágenes y layout.
  await new Promise(resolve=>setTimeout(resolve,500));

  const pages=$$('.dtk-pdf-page',renderDocument);

  if(!pages.length){
    throw new Error('No hay páginas para exportar.');
  }

  const {jsPDF}=window.jspdf;
  let pdf=null;

  for(let i=0;i<pages.length;i++){
    const page=pages[i];

    // Todas las páginas mantienen exactamente el mismo tamaño A4 en píxeles.
    page.style.width=`${CFG.pageWidth}px`;
    page.style.height=`${CFG.pageHeight}px`;
    page.style.minHeight=`${CFG.pageHeight}px`;
    page.style.maxHeight=`${CFG.pageHeight}px`;

    await new Promise(resolve=>
      requestAnimationFrame(()=>
        requestAnimationFrame(resolve)
      )
    );

    const canvas=await window.html2canvas(page,{
      scale:CFG.renderScale,
      useCORS:true,
      allowTaint:false,
      backgroundColor:'#ffffff',
      logging:false,
      width:CFG.pageWidth,
      height:CFG.pageHeight,
      windowWidth:CFG.pageWidth,
      windowHeight:CFG.pageHeight,
      scrollX:0,
      scrollY:0,
      removeContainer:true,
      imageTimeout:15000,
      onclone(clonedDoc){
        const style=clonedDoc.createElement('style');
        style.textContent=`
          html,
          body{
            margin:0 !important;
            padding:0 !important;
          }

          #dtk-pdf-download-document{
            width:${CFG.pageWidth}px !important;
          }

          #dtk-pdf-download-document .dtk-pdf-page{
            width:${CFG.pageWidth}px !important;
            height:${CFG.pageHeight}px !important;
            min-height:${CFG.pageHeight}px !important;
            max-height:${CFG.pageHeight}px !important;
            transform:none !important;
            zoom:1 !important;
          }

          #dtk-pdf-download-document *,
          #dtk-pdf-download-document *::before,
          #dtk-pdf-download-document *::after{
            animation:none !important;
            transition:none !important;
            caret-color:transparent !important;
          }
        `;
        clonedDoc.head.appendChild(style);
      }
    });

    const imgData=canvas.toDataURL('image/jpeg',0.95);

    if(i===0){
      pdf=new jsPDF({
        orientation:'portrait',
        unit:'px',
        format:[CFG.pageWidth,CFG.pageHeight],
        compress:true,
        hotfixes:['px_scaling']
      });
    }else{
      pdf.addPage([CFG.pageWidth,CFG.pageHeight],'portrait');
    }

    pdf.addImage(
      imgData,
      'JPEG',
      0,
      0,
      CFG.pageWidth,
      CFG.pageHeight,
      undefined,
      'FAST'
    );
  }

  host.innerHTML='';
  pdf.save(filename(data));
}

/* DESCARGA DESDE AMBOS BOTONES */
let isDownloading=false;

async function downloadPdf(event){
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if(isDownloading) return;
  isDownloading=true;

  const mainButton=$('#btn-download');
  const modalButton=$('#btn-modal-download');
  const buttons=[mainButton,modalButton].filter(Boolean);

  const originalStates=buttons.map(button=>({
    button,
    text:button.textContent,
    disabled:button.disabled
  }));

  try{
    buttons.forEach(button=>{
      button.disabled=true;
      button.textContent='GENERANDO PDF...';
      button.style.cursor='wait';
      button.style.opacity='0.65';
    });

    const data=collectData();
    await generateAndDownload(data);

  }catch(error){
    console.error('[DTK PDF DOWNLOAD]',error);
    alert(`No fue posible generar el PDF.\n\n${error.message||error}`);

  }finally{
    originalStates.forEach(({button,text,disabled})=>{
      button.disabled=disabled;
      button.textContent=text;
      button.style.cursor='';
      button.style.opacity='';
    });

    isDownloading=false;
  }
}

function delegatedDownloadClick(event){
  const button=event.target?.closest?.('#btn-download, #btn-modal-download');
  if(!button) return;

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  downloadPdf(event);
}

function init(){
  if(!window.__DTK_PDF_DELEGATED_CLICK_BOUND__){
    window.__DTK_PDF_DELEGATED_CLICK_BOUND__=true;
    document.addEventListener('click',delegatedDownloadClick,true);
  }

  const mainButton=$('#btn-download');
  const modalButton=$('#btn-modal-download');

  if(mainButton) mainButton.setAttribute('type','button');
  if(modalButton) modalButton.setAttribute('type','button');

  window.DTKPDF=Object.freeze({
    collect:collectData,
    download:()=>downloadPdf()
  });

  console.info('[DTK PDF DOWNLOAD] Descarga activa para #btn-download y #btn-modal-download.');
}

init();
})();
