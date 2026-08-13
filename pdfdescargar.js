/*
 * pdfdescargar.js · Detektor Cotizador Webflow
 * Build VECTOR-TEXT + UICONS + SPACING · 2026-08-12
 * ------------------------------------------------------------
 * PDF nativo con:
 * - texto real, seleccionable y buscable
 * - tablas/cajas vectoriales
 * - imágenes solo para portada/productos/iconos
 * - iconos desde Flaticon UIcons
 * - productos personalizados SOLO en Propuesta Económica
 * - Validación 100% UI (sin alertas nativas del navegador)
 * ------------------------------------------------------------
 */
(function(){
'use strict';

if(window.__DTK_PDF_DOWNLOAD_ONLY__) return;
window.__DTK_PDF_DOWNLOAD_ONLY__=true;

console.info('[DTK PDF] Build VECTOR-TEXT + UICONS + SPACING 2026-08-12 cargado.');

const CFG={
  pageWidth:794,
  pageHeight:1123,
  marginX:42,
  solutionsPerPage:5,
  libs:{
    jspdf:'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
  },
  css:{
    uiconsRegular:'https://cdn-uicons.flaticon.com/3.0.0/uicons-regular-rounded/css/uicons-regular-rounded.css',
    uiconsBrands:'https://cdn-uicons.flaticon.com/3.0.0/uicons-brands/css/uicons-brands.css'
  },
  coverHero:'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7bd9d6de10902939f52048_Portada-detector-cotizador.webp',
  footerLogo:'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7a8e42775bc4c63e44c311_Recurso%2027%404x.webp',
  red:[192,0,16],
  red2:[227,6,19],
  dark:[20,20,20],
  text:[52,52,52],
  muted:[115,115,115],
  soft:[250,246,245],
  line:[228,228,228],
  white:[255,255,255]
};

const $=(selector,root=document)=>root.querySelector(selector);
const $$=(selector,root=document)=>Array.from(root.querySelectorAll(selector));
const valueOf=(selector,root=document)=>{
  const el=$(selector,root);
  return el?String(el.value??'').trim():'';
};
const textOf=(selector,root=document)=>{
  const el=$(selector,root);
  return el?String(el.textContent??'').trim():'';
};

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

  if(!manualMode&&raw.includes(' - ')){
    name=raw.split(' - ').slice(1).join(' - ').trim();
  }

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

  return products;
}

function readCountryContact(countryName){
  const contact=window.DTK_COUNTRY_CONTACTS?.[countryName]||null;
  if(!contact) return{web:'',socials:[]};

  return{
    web:String(contact.web||''),
    socials:Array.isArray(contact.socials)
      ?contact.socials.filter(item=>item?.url).map(item=>({
          type:item.type||'',
          url:item.url||''
        }))
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

function filename(data){
  const quote=slug(data.quote.number||'propuesta');
  const client=slug(data.client.name||data.client.company||'cliente');
  return `Detektor_${quote}_${client}.pdf`;
}

/* =========================================================
   DEPENDENCIAS
   ========================================================= */

function loadScript(src,ready){
  return new Promise((resolve,reject)=>{
    if(ready()) return resolve();

    const existing=$$('script').find(script=>script.src===src);

    if(existing){
      existing.addEventListener('load',()=>resolve(),{once:true});
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

function ensureStylesheet(href){
  return new Promise(resolve=>{
    const existing=$$('link[rel="stylesheet"]').find(link=>link.href===href);

    if(existing){
      if(existing.sheet) return resolve();
      existing.addEventListener('load',resolve,{once:true});
      existing.addEventListener('error',resolve,{once:true});
      return;
    }

    const link=document.createElement('link');
    link.rel='stylesheet';
    link.href=href;
    link.crossOrigin='anonymous';
    link.onload=resolve;
    link.onerror=resolve;
    document.head.appendChild(link);
  });
}

async function ensureLibraries(){
  await Promise.all([
    loadScript(CFG.libs.jspdf,()=>!!window.jspdf?.jsPDF),
    ensureStylesheet(CFG.css.uiconsRegular),
    ensureStylesheet(CFG.css.uiconsBrands)
  ]);

  if(document.fonts?.ready){
    try{ await document.fonts.ready; }catch(_){}
  }
}

/* =========================================================
   IMÁGENES E ICONOS UICONS
   ========================================================= */

function dataFormat(dataUrl){
  if(/^data:image\/png/i.test(dataUrl||'')) return 'PNG';
  return 'JPEG';
}

async function imageToDataUrl(url){
  if(!url) return null;
  if(/^data:/i.test(url)) return url;

  return new Promise(resolve=>{
    const img=new Image();
    img.crossOrigin='anonymous';
    img.referrerPolicy='no-referrer';

    img.onload=()=>{
      try{
        const canvas=document.createElement('canvas');
        canvas.width=img.naturalWidth||img.width;
        canvas.height=img.naturalHeight||img.height;
        const ctx=canvas.getContext('2d');
        ctx.drawImage(img,0,0);
        resolve(canvas.toDataURL('image/jpeg',0.92));
      }catch(_){
        resolve(null);
      }
    };

    img.onerror=()=>resolve(null);
    img.src=url;
  });
}

function parseCssContent(content){
  let value=String(content||'').trim();
  if(!value||value==='none'||value==='normal') return '';

  if(
    (value.startsWith('"')&&value.endsWith('"'))||
    (value.startsWith("'")&&value.endsWith("'"))
  ){
    value=value.slice(1,-1);
  }

  return value.replace(/\\([0-9a-fA-F]{1,6})\s?/g,(_,hex)=>
    String.fromCodePoint(parseInt(hex,16))
  );
}

async function uiconToDataUrl(className,color='#c00010',fontPx=56,canvasSize=96){
  const cacheKey=`${className}|${color}|${fontPx}|${canvasSize}`;
  uiconToDataUrl.cache=uiconToDataUrl.cache||new Map();

  if(uiconToDataUrl.cache.has(cacheKey)){
    return uiconToDataUrl.cache.get(cacheKey);
  }

  const el=document.createElement('i');
  el.className=`fi ${className}`;
  Object.assign(el.style,{
    position:'fixed',
    left:'-10000px',
    top:'0',
    fontSize:`${fontPx}px`,
    lineHeight:'1',
    color,
    visibility:'hidden'
  });

  document.body.appendChild(el);

  await new Promise(resolve=>
    requestAnimationFrame(()=>requestAnimationFrame(resolve))
  );

  let result=null;

  try{
    const pseudo=getComputedStyle(el,'::before');
    const normal=getComputedStyle(el);
    const glyph=parseCssContent(pseudo.content);

    if(glyph){
      const family=pseudo.fontFamily&&pseudo.fontFamily!=='none'
        ?pseudo.fontFamily
        :normal.fontFamily;

      const weight=pseudo.fontWeight||normal.fontWeight||'400';

      const canvas=document.createElement('canvas');
      canvas.width=canvasSize;
      canvas.height=canvasSize;

      const ctx=canvas.getContext('2d');
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle=color;
      ctx.textAlign='center';
      ctx.textBaseline='middle';
      ctx.font=`${weight} ${fontPx}px ${family}`;
      ctx.fillText(glyph,canvas.width/2,canvas.height/2+1);

      result=canvas.toDataURL('image/png');
    }
  }catch(_){
    result=null;
  }finally{
    el.remove();
  }

  uiconToDataUrl.cache.set(cacheKey,result);
  return result;
}

function brandIconClass(type){
  const map={
    facebook:'fi-brands-facebook',
    instagram:'fi-brands-instagram',
    x:'fi-brands-twitter-alt',
    twitter:'fi-brands-twitter-alt',
    whatsapp:'fi-brands-whatsapp',
    linkedin:'fi-brands-linkedin',
    youtube:'fi-brands-youtube',
    tiktok:'fi-brands-tik-tok'
  };

  return map[String(type||'').toLowerCase()]||'';
}

async function preloadAssets(data){
  const urls=new Set([
    CFG.coverHero,
    CFG.footerLogo,
    ...(data.products||[]).map(p=>p.image).filter(Boolean)
  ]);

  const imagePairs=await Promise.all(
    Array.from(urls).map(async url=>[url,await imageToDataUrl(url)])
  );

  const assets=new Map(imagePairs);

  const regularIcons={
    'icon:monitor':'fi-rr-map-marker',
    'icon:locate':'fi-rr-search-alt',
    'icon:fleet':'fi-rr-dashboard',
    'icon:support':'fi-rr-headset'
  };

  for(const [key,className] of Object.entries(regularIcons)){
    assets.set(key,await uiconToDataUrl(className,'#e30613',48,84));
  }

  for(const item of data.countryContact?.socials||[]){
    const cls=brandIconClass(item.type);
    if(!cls) continue;
    assets.set(
      `social:${String(item.type||'').toLowerCase()}`,
      await uiconToDataUrl(cls,'#ffffff',42,72)
    );
  }

  return assets;
}

/* =========================================================
   HELPERS PDF
   ========================================================= */

function setFont(doc,size=10,style='normal',color=CFG.text){
  doc.setFont('helvetica',style);
  doc.setFontSize(size);
  doc.setTextColor(...color);
}

function textLines(doc,text,maxWidth){
  const clean=String(text||'').trim();
  if(!clean) return [];
  return doc.splitTextToSize(clean,maxWidth);
}

function drawText(doc,text,x,y,maxWidth,opts={}){
  const {
    size=10,
    style='normal',
    color=CFG.text,
    lineHeight=1.2,
    align='left'
  }=opts;

  setFont(doc,size,style,color);
  const lines=maxWidth?textLines(doc,text,maxWidth):[String(text||'')];

  if(lines.length){
    doc.text(lines,x,y,{align,lineHeightFactor:lineHeight});
  }

  return {
    lines,
    bottom:y+(Math.max(lines.length,1)-1)*size*lineHeight
  };
}

function fill(doc,color){
  doc.setFillColor(...color);
}

function stroke(doc,color){
  doc.setDrawColor(...color);
}

function roundedBox(doc,x,y,w,h,fillColor,strokeColor,r=8){
  if(fillColor) fill(doc,fillColor);
  if(strokeColor) stroke(doc,strokeColor);

  doc.roundedRect(
    x,y,w,h,r,r,
    fillColor&&strokeColor?'FD':fillColor?'F':'S'
  );
}

function fitImage(doc,dataUrl,x,y,w,h,mode='contain'){
  if(!dataUrl) return false;

  try{
    const props=doc.getImageProperties(dataUrl);
    const iw=props.width;
    const ih=props.height;
    const ir=iw/ih;
    const br=w/h;

    let rw=w;
    let rh=h;
    let rx=x;
    let ry=y;

    if(mode==='cover'){
      if(ir>br){
        rh=h;
        rw=h*ir;
        rx=x-(rw-w)/2;
      }else{
        rw=w;
        rh=w/ir;
        ry=y-(rh-h)/2;
      }
    }else{
      if(ir>br){
        rw=w;
        rh=w/ir;
        ry=y+(h-rh)/2;
      }else{
        rh=h;
        rw=h*ir;
        rx=x+(w-rw)/2;
      }
    }

    doc.addImage(
      dataUrl,
      dataFormat(dataUrl),
      rx,ry,rw,rh,
      undefined,
      'FAST'
    );

    return true;
  }catch(_){
    return false;
  }
}

function sectionTitle(doc,left,red,y){
  const center=CFG.pageWidth/2;

  if(!red){
    setFont(doc,21,'bold',CFG.dark);
    doc.text(left,center,y,{align:'center'});
    return y+28;
  }

  setFont(doc,21,'bold',CFG.dark);
  const leftText=`${left} `;
  const w1=doc.getTextWidth(leftText);

  setFont(doc,21,'bold',CFG.red);
  const w2=doc.getTextWidth(red);

  const start=center-(w1+w2)/2;

  setFont(doc,21,'bold',CFG.dark);
  doc.text(leftText,start,y);

  setFont(doc,21,'bold',CFG.red);
  doc.text(red,start+w1,y);

  return y+28;
}

/* =========================================================
   PÁGINA 1
   ========================================================= */

function drawCoverPage(doc,data,assets){
  const W=CFG.pageWidth;
  const heroH=850;
  const hero=assets.get(CFG.coverHero);

  if(hero){
    fitImage(doc,hero,0,0,W,heroH,'cover');
  }else{
    fill(doc,[28,28,28]);
    doc.rect(0,0,W,heroH,'F');
  }

  doc.setFillColor(0,0,0);
  if(typeof doc.GState==='function'){
    doc.setGState(new doc.GState({opacity:.46}));
    doc.roundedRect(34,170,W-68,255,14,14,'F');
    doc.setGState(new doc.GState({opacity:1}));
  }else{
    doc.roundedRect(34,170,W-68,255,14,14,'F');
  }

  const statY=228;
  const statW=(W-100)/3;
  const stats=[
    ['+33','años','Experiencia en Latinoamérica'],
    ['9','países','Cobertura y soporte local'],
    ['+500.000','usuarios','Conectados en Latinoamérica']
  ];

  stats.forEach((s,i)=>{
    const x=50+i*statW;
    const cx=x+statW/2;

    setFont(doc,27,'bold',CFG.white);
    doc.text(s[0],cx,statY,{align:'center'});

    setFont(doc,11,'bold',CFG.red2);
    doc.text(s[1],cx,statY+18,{align:'center'});

    setFont(doc,8.5,'normal',CFG.white);
    doc.text(s[2],cx,statY+35,{align:'center'});

    if(i<2){
      stroke(doc,[125,125,125]);
      doc.line(x+statW,statY-27,x+statW,statY+48);
    }
  });

  const caps=[
    ['icon:monitor','Monitoreo GPS','Ubicación, recorridos y alertas.'],
    ['icon:locate','Localización vehicular','En caso de robo.'],
    ['icon:fleet','Gestión de flotas','Visibilidad y control operativo.'],
    ['icon:support','Seguridad 24/7','Respaldo permanente.']
  ];

  const capY=331;
  const capW=(W-100)/4;

  caps.forEach((c,i)=>{
    const x=50+i*capW;
    const cx=x+capW/2;

    stroke(doc,CFG.red2);
    doc.circle(cx,capY,20,'S');

    const icon=assets.get(c[0]);
    if(icon){
      fitImage(doc,icon,cx-13,capY-13,26,26,'contain');
    }

    setFont(doc,11,'bold',CFG.white);
    doc.text(c[1],cx,capY+38,{align:'center'});

    setFont(doc,8.2,'normal',[245,245,245]);
    const lines=textLines(doc,c[2],capW-14);
    doc.text(lines,cx,capY+53,{align:'center',lineHeightFactor:1.18});
  });

  // Caja información
  fill(doc,[247,248,249]);
  doc.roundedRect(42,770,W-84,285,14,14,'F');
  fill(doc,CFG.red);
  doc.rect(42,770,W-84,3,'F');

  drawText(doc,'Información de la propuesta',66,805,W-132,{
    size:16,
    style:'bold',
    color:CFG.dark
  });

  const colGap=28;
  const colW=(W-132-colGap)/2;
  const leftX=66;
  const rightX=66+colW+colGap;

  drawText(doc,'Datos del cliente',leftX,838,colW,{
    size:12,
    style:'bold',
    color:CFG.red
  });

  const clientRows=[
    ['Nombre del cliente',data.client.name],
    ['Empresa',data.client.company],
    ['Cargo',data.client.role],
    ['Correo',data.client.email],
    ['Teléfono',data.client.phone],
    ['Ciudad',data.client.city]
  ].filter(row=>String(row[1]||'').trim());

  let y=862;

  clientRows.forEach(([label,val])=>{
    setFont(doc,9,'normal',CFG.muted);
    doc.text(`${label}:`,leftX,y);

    setFont(doc,9,'bold',CFG.dark);
    const lines=textLines(doc,val,colW-115);
    doc.text(lines,leftX+112,y,{lineHeightFactor:1.15});
    y+=18+(Math.max(lines.length,1)-1)*12;
  });

  stroke(doc,[210,210,210]);
  doc.line(rightX-14,833,rightX-14,1016);

  drawText(doc,'Datos de la cotización',rightX,838,colW,{
    size:12,
    style:'bold',
    color:CFG.red
  });

  const quoteRows=[
    ['Fecha',formatDate(data.quote.date)],
    ['Propuesta N°',data.quote.number],
    ['País',data.quote.country]
  ].filter(row=>String(row[1]||'').trim());

  y=862;

  quoteRows.forEach(([label,val])=>{
    setFont(doc,9,'normal',CFG.muted);
    doc.text(`${label}:`,rightX,y);

    setFont(doc,9,'bold',CFG.dark);
    const lines=textLines(doc,String(val),colW-94);
    doc.text(lines,rightX+88,y,{lineHeightFactor:1.15});
    y+=18+(Math.max(lines.length,1)-1)*12;
  });
}

/* =========================================================
   PÁGINA SOLUCIONES
   ========================================================= */

function productBullets(product){
  const n=normalize(product.name);

  if(n.includes('gps')){
    return ['Monitoreo y recorridos','Geocercas y alertas','Reportes de operación'];
  }

  if(n.includes('roadview')){
    return ['Prevención de riesgos','Alertas de conducción','Analítica para la operación'];
  }

  if(n.includes('cazador')){
    return ['Localización especializada','Tecnología de radiofrecuencia','Respaldo operativo'];
  }

  if(n.includes('plus')){
    return ['GPS + localización','Monitoreo diario','Mayor respaldo'];
  }

  return ['Tecnología especializada','Configuración según operación','Respaldo Detektor'];
}

function drawSolutionCard(doc,product,y,assets,cardH=176){
  const x=CFG.marginX;
  const w=CFG.pageWidth-CFG.marginX*2;
  const selected=!!product.selected;

  roundedBox(doc,x,y,w,cardH,selected?CFG.red:CFG.white,selected?CFG.red:CFG.line,10);

  const imgSize=Math.min(122,cardH-34);
  const imgX=x+16;
  const imgY=y+(cardH-imgSize)/2;
  const dataUrl=assets.get(product.image);

  if(dataUrl){
    fitImage(doc,dataUrl,imgX,imgY,imgSize,imgSize,'cover');
  }else{
    fill(doc,[244,244,244]);
    doc.roundedRect(imgX,imgY,imgSize,imgSize,6,6,'F');
  }

  const copyX=imgX+imgSize+20;
  const copyW=w-(copyX-x)-18;
  const titleSize=17.5;
  const titleLineHeight=1.12;
  const titleY=y+32;

  setFont(doc,titleSize,'bold',selected?CFG.white:CFG.red);
  const titleLines=textLines(doc,product.name,copyW);
  doc.text(titleLines,copyX,titleY,{lineHeightFactor:titleLineHeight});

  const titleStep=titleSize*titleLineHeight;
  let copyY=titleY+(Math.max(titleLines.length,1)-1)*titleStep+27;
  const desc=String(product.description||'').trim();

  if(desc){
    const descSize=10.4;
    const descLineHeight=1.32;
    const descStep=descSize*descLineHeight;
    setFont(doc,descSize,'normal',selected?[250,250,250]:CFG.text);
    const lines=textLines(doc,desc,copyW);
    doc.text(lines,copyX,copyY,{lineHeightFactor:descLineHeight});
    copyY+=(Math.max(lines.length,1)-1)*descStep+20;
  }

  const bulletSize=9.7;
  const bulletLineHeight=1.28;
  const bulletStep=bulletSize*bulletLineHeight;
  setFont(doc,bulletSize,'normal',selected?[245,245,245]:CFG.text);

  productBullets(product).forEach(item=>{
    const lines=textLines(doc,`- ${item}`,copyW);
    doc.text(lines,copyX,copyY,{lineHeightFactor:bulletLineHeight});
    copyY+=(Math.max(lines.length,1)-1)*bulletStep+16;
  });

  return y+cardH;
}

function drawSolutionsPage(doc,products,pageIndex,assets){
  let y=55;
  const suffix=pageIndex>0?' · CONT.':'';

  y=sectionTitle(doc,`NUESTRAS SOLUCIONES TECNOLÓGICAS${suffix}`,'',y);

  const count=Math.max(products.length,1);
  const gap=12;
  const available=1015-y;
  const cardH=Math.min(188,Math.max(168,(available-(count-1)*gap)/count));

  if(!products.length){
    roundedBox(doc,CFG.marginX,y,CFG.pageWidth-CFG.marginX*2,90,[250,250,250],CFG.line,10);
    drawText(doc,'Sin soluciones del catálogo.',CFG.pageWidth/2,y+48,400,{
      size:12,color:CFG.muted,align:'center'
    });
    return;
  }

  products.forEach(product=>{
    y=drawSolutionCard(doc,product,y,assets,cardH)+gap;
  });
}

/* =========================================================
   PROPUESTA ECONÓMICA
   ========================================================= */

function money(value,currency){
  const clean=String(value||'').trim()||'0';
  if(currency&&clean.toUpperCase().includes(currency.toUpperCase())) return clean;
  return `${clean}${currency?` ${currency}`:''}`;
}

function drawEconomicTable(doc,data,y){
  const x=CFG.marginX;
  const w=CFG.pageWidth-CFG.marginX*2;
  const widths=[360,70,135,145];
  const headers=['DESCRIPCIÓN','CANT.','PRECIO/U','TOTAL'];
  const headerH=34;

  fill(doc,[7,7,7]);
  doc.rect(x,y,w,headerH,'F');

  let cx=x;

  headers.forEach((header,i)=>{
    setFont(doc,9,'bold',CFG.white);
    const align=i===3?'right':'left';
    const tx=i===3?cx+widths[i]-8:cx+8;
    doc.text(header,tx,y+21,{align});
    cx+=widths[i];
  });

  y+=headerH;

  const rows=data.economicRows.length?data.economicRows:[{
    product:'Sin productos agregados.',
    qty:'',
    unit:'',
    subtotal:''
  }];

  rows.forEach(row=>{
    const desc=textLines(doc,`- ${row.product}`,widths[0]-16);
    const rowH=Math.max(31,desc.length*12+12);

    fill(doc,CFG.white);
    doc.rect(x,y,w,rowH,'F');

    stroke(doc,CFG.line);
    doc.line(x,y+rowH,x+w,y+rowH);

    setFont(doc,9.5,'normal',CFG.text);
    doc.text(desc,x+8,y+18,{lineHeightFactor:1.18});

    doc.text(String(row.qty||'1'),x+widths[0]+8,y+18);

    doc.text(
      money(row.unit||'0',data.totals.currency),
      x+widths[0]+widths[1]+8,
      y+18
    );

    setFont(doc,9.5,'bold',CFG.text);

    doc.text(
      money(row.subtotal||'0',data.totals.currency),
      x+w-8,
      y+18,
      {align:'right'}
    );

    y+=rowH;
  });

  return y;
}

function drawTotals(doc,data,y){
  const boxW=320;
  const x=CFG.pageWidth-CFG.marginX-boxW;
  const taxPct=data.totals.taxPercent?` (${data.totals.taxPercent}%)`:'';
  const rows=[
    {label:'Subtotal',value:money(data.totals.subtotal,data.totals.currency),final:false,height:26},
    {label:`${data.totals.taxLabel}${taxPct}`,value:money(data.totals.tax,data.totals.currency),final:false,height:26},
    {label:'TOTAL CON IMPUESTO',value:money(data.totals.total,data.totals.currency),final:true,height:38}
  ];

  rows.forEach(row=>{
    const baseline=y+(row.final?25:18);
    setFont(doc,row.final?14:10.5,row.final?'bold':'normal',row.final?CFG.red:CFG.text);
    doc.text(row.label,x,baseline);
    doc.text(row.value,x+boxW,baseline,{align:'right'});
    if(!row.final){
      stroke(doc,CFG.line);
      doc.line(x,y+row.height-2,x+boxW,y+row.height-2);
    }
    y+=row.height;
  });

  return y;
}

function drawAdvisor(doc,data,y){
  const w=330;
  const x=(CFG.pageWidth-w)/2;
  const name=String(data.advisor.name||'Asesor Comercial').trim();

  setFont(doc,14.5,'bold',CFG.dark);
  const nameLines=textLines(doc,name,w-34);
  const contacts=[data.advisor.email,data.advisor.phone].filter(Boolean);

  const h=22+nameLines.length*18+24+contacts.length*16+16;

  stroke(doc,CFG.red);
  doc.setLineDashPattern([3,3],0);
  doc.roundedRect(x,y,w,h,9,9,'S');
  doc.setLineDashPattern([],0);

  let yy=y+27;
  setFont(doc,14.5,'bold',CFG.dark);
  doc.text(nameLines,x+w/2,yy,{align:'center',lineHeightFactor:1.18});

  yy+=nameLines.length*18+3;
  setFont(doc,10.5,'bold',CFG.red);
  doc.text('Asesor Comercial Corporativo',x+w/2,yy,{align:'center'});
  yy+=21;

  contacts.forEach(value=>{
    setFont(doc,9.1,'normal',CFG.text);
    const lines=textLines(doc,value,w-30);
    doc.text(lines,x+w/2,yy,{align:'center',lineHeightFactor:1.18});
    yy+=Math.max(16,lines.length*11);
  });

  return y+h;
}

function drawLabeledBox(doc,label,text,x,y,w,opts={}){
  const {fontSize=7.7,minH=58,maxH=128}=opts;
  const clean=String(text||'').trim()||'-';
  const bodyLineHeight=1.30;
  const bodyStep=fontSize*bodyLineHeight;

  setFont(doc,fontSize,'normal',CFG.text);
  const lines=textLines(doc,clean,w-24);
  const desired=38+(Math.max(lines.length,1)-1)*bodyStep+fontSize+12;
  const h=Math.min(maxH,Math.max(minH,desired));

  fill(doc,CFG.soft);
  doc.roundedRect(x,y,w,h,5,5,'F');

  fill(doc,CFG.red);
  doc.rect(x,y,3,h,'F');

  setFont(doc,8.3,'bold',CFG.dark);
  doc.text(label,x+11,y+18);

  setFont(doc,fontSize,'normal',CFG.text);
  doc.text(lines,x+11,y+37,{
    lineHeightFactor:bodyLineHeight
  });

  return h;
}

function drawObservation(doc,text,y){
  if(!String(text||'').trim()) return y;

  const x=CFG.marginX;
  const w=CFG.pageWidth-CFG.marginX*2;
  const fontSize=8;
  const lineHeight=1.30;
  const lineStep=fontSize*lineHeight;

  setFont(doc,fontSize,'normal',CFG.text);
  const lines=textLines(doc,text,w-26);
  const h=Math.max(52,34+(Math.max(lines.length,1)-1)*lineStep+fontSize+12);

  fill(doc,CFG.soft);
  doc.roundedRect(x,y,w,h,5,5,'F');
  fill(doc,CFG.red);
  doc.rect(x,y,4,h,'F');

  setFont(doc,8.6,'bold',CFG.dark);
  doc.text('Observaciones generales:',x+12,y+17);

  setFont(doc,fontSize,'normal',CFG.text);
  doc.text(lines,x+12,y+33,{lineHeightFactor:lineHeight});

  return y+h;
}

function drawTermsSection(doc,data,y,maxBottom){
  const x=CFG.marginX;
  const w=CFG.pageWidth-CFG.marginX*2;
  const gap=12;
  const colW=(w-gap)/2;

  setFont(doc,11,'bold',CFG.dark);
  doc.text('Términos y condiciones',x,y);
  y+=24;

  const leftItems=[
    ['Condiciones de pago',data.terms.payment],
    ['Vigencia',data.terms.validity]
  ];

  const rightItems=[
    ['Instalación y entrega',data.terms.installation],
    ['Garantía',data.terms.warranty]
  ];

  function measureBox(text){
    const fontSize=7.6;
    const lineHeight=1.30;
    const lineStep=fontSize*lineHeight;
    setFont(doc,fontSize,'normal',CFG.text);
    const lines=textLines(doc,text||'-',colW-24);
    return Math.min(128,Math.max(
      58,
      38+(Math.max(lines.length,1)-1)*lineStep+fontSize+12
    ));
  }

  function measureColumn(items){
    let total=0;
    items.forEach((item,index)=>{
      total+=measureBox(item[1]);
      if(index<items.length-1) total+=12;
    });
    return total;
  }

  const target=Math.max(measureColumn(leftItems),measureColumn(rightItems));

  function drawColumn(items,cx){
    let cy=y;
    items.forEach((item,index)=>{
      const h=drawLabeledBox(doc,item[0],item[1],cx,cy,colW,{
        fontSize:7.6,minH:58,maxH:128
      });
      cy+=h;
      if(index<items.length-1) cy+=12;
    });
  }

  drawColumn(leftItems,x);
  drawColumn(rightItems,x+colW+gap);
  y+=target+14;

  const extra=String(data.terms.extra||'').trim();

  if(extra){
    const available=Math.max(66,maxBottom-y);
    const fontSize=available<95?6.9:7.3;
    const lineHeight=1.27;
    const lineStep=fontSize*lineHeight;

    setFont(doc,fontSize,'normal',CFG.text);
    const lines=textLines(doc,extra,w-24);
    const desired=39+(Math.max(lines.length,1)-1)*lineStep+fontSize+12;
    const h=Math.min(available,Math.max(66,desired));

    fill(doc,CFG.soft);
    doc.roundedRect(x,y,w,h,5,5,'F');
    fill(doc,CFG.red);
    doc.rect(x,y,3,h,'F');

    setFont(doc,8.3,'bold',CFG.dark);
    doc.text('Consideraciones adicionales',x+11,y+18);

    setFont(doc,fontSize,'normal',CFG.text);
    doc.text(lines,x+11,y+38,{
      lineHeightFactor:lineHeight,
      maxWidth:w-24
    });

    y+=h;
  }

  return y;
}

function shouldAddConfidentiality(extra){
  const n=normalize(extra);
  if(!n) return true;

  return !(
    n.includes('confidencial')||
    (n.includes('propiedad')&&n.includes('detektor'))
  );
}

function drawConfidentiality(doc,y){
  const text=
    'Esta propuesta es confidencial y propiedad de Detektor hasta su aceptación formal. '+
    'Su contenido no podrá ser divulgado ni utilizado con fines comerciales sin autorización.';

  setFont(doc,6.8,'normal',CFG.muted);
  const lines=textLines(doc,text,CFG.pageWidth-110);

  doc.text(lines,CFG.pageWidth/2,y,{
    align:'center',
    lineHeightFactor:1.18
  });
}

function drawContact(doc,data,assets,y){
  const contact=data.countryContact;
  if(!contact?.web&&!contact?.socials?.length) return y;

  setFont(doc,9.4,'bold',CFG.text);
  doc.text('Síguenos en nuestras redes',CFG.pageWidth/2,y,{align:'center'});
  y+=20;

  const socials=contact.socials||[];

  if(socials.length){
    const size=23;
    const gap=10;
    const total=socials.length*size+(socials.length-1)*gap;
    let x=(CFG.pageWidth-total)/2;

    socials.forEach(item=>{
      fill(doc,CFG.red);
      doc.circle(x+size/2,y+size/2,size/2,'F');

      const key=`social:${String(item.type||'').toLowerCase()}`;
      const icon=assets.get(key);

      if(icon){
        fitImage(doc,icon,x+5,y+5,size-10,size-10,'contain');
      }

      if(item.url){
        doc.link(x,y,size,size,{url:item.url});
      }

      x+=size+gap;
    });

    y+=size+15;
  }

  if(contact.web){
    const label=String(contact.web).replace(/^https?:\/\//i,'').replace(/\/$/,'');
    setFont(doc,9.5,'bold',CFG.red);
    doc.textWithLink(label,CFG.pageWidth/2,y,{
      align:'center',
      url:contact.web
    });
    y+=18;
  }

  return y;
}

function drawFooter(doc,assets){
  const claimY=986;

  setFont(doc,17,'bold',CFG.dark);
  doc.text('SOLUCIONES PARA TU TRANQUILIDAD',CFG.pageWidth/2,claimY,{align:'center'});

  const bannerY=1008;
  fill(doc,[5,5,5]);
  doc.rect(0,bannerY,CFG.pageWidth,70,'F');

  const cells=[
    ['33','años de experiencia'],
    ['9','países en Latinoamérica'],
    ['500.000','usuarios activos']
  ];

  const cellW=145;

  cells.forEach((cell,i)=>{
    const cx=70+i*cellW+cellW/2;
    setFont(doc,21,'bold',CFG.red);
    doc.text(cell[0],cx,bannerY+31,{align:'center'});
    setFont(doc,7.8,'normal',[220,220,220]);
    doc.text(cell[1],cx,bannerY+47,{align:'center'});
  });

  const logo=assets.get(CFG.footerLogo);
  if(logo){
    fitImage(doc,logo,570,bannerY+18,150,34,'contain');
  }

  setFont(doc,8.2,'bold',CFG.text);
  doc.text(
    'Colombia | Guatemala | El Salvador | Honduras | Nicaragua | Costa Rica | Panamá | Venezuela | Brasil',
    CFG.pageWidth/2,
    1100,
    {align:'center'}
  );
}

function drawFinalPage(doc,data,assets){
  let y=52;

  y=sectionTitle(doc,'PROPUESTA','ECONÓMICA',y);
  y=drawEconomicTable(doc,data,y)+18;
  y=drawTotals(doc,data,y)+10;
  y=drawAdvisor(doc,data,y)+16;
  y=drawObservation(doc,data.quote.observations,y)+18;

  const termsBottom=850;
  y=drawTermsSection(doc,data,y,termsBottom);

  if(shouldAddConfidentiality(data.terms.extra)){
    drawConfidentiality(doc,Math.min(y+14,865));
  }

  drawContact(doc,data,assets,900);
  drawFooter(doc,assets);
}

/* =========================================================
   GENERACIÓN
   ========================================================= */

async function generateAndDownload(data){
  await ensureLibraries();
  const assets=await preloadAssets(data);

  const {jsPDF}=window.jspdf;

  const doc=new jsPDF({
    orientation:'portrait',
    unit:'px',
    format:[CFG.pageWidth,CFG.pageHeight],
    compress:true,
    hotfixes:['px_scaling']
  });

  doc.setProperties({
    title:data.quote.number
      ?`Propuesta ${data.quote.number}`
      :'Propuesta Detektor',
    subject:'Cotización Detektor',
    author:'Detektor',
    creator:'Detektor Cotizador Webflow'
  });

  drawCoverPage(doc,data,assets);

  const products=data.products||[];
  const chunks=[];

  if(products.length){
    for(let i=0;i<products.length;i+=CFG.solutionsPerPage){
      chunks.push(products.slice(i,i+CFG.solutionsPerPage));
    }
  }else{
    chunks.push([]);
  }

  chunks.forEach((chunk,index)=>{
    doc.addPage(
      [CFG.pageWidth,CFG.pageHeight],
      'portrait'
    );

    drawSolutionsPage(
      doc,
      chunk,
      index,
      assets
    );
  });

  doc.addPage(
    [CFG.pageWidth,CFG.pageHeight],
    'portrait'
  );

  drawFinalPage(doc,data,assets);

  doc.save(filename(data));
}

/* =========================================================
   BOTONES
   ========================================================= */

let isDownloading=false;

async function downloadPdf(event){
  event?.preventDefault?.();
  event?.stopPropagation?.();

  if(isDownloading) return;
  isDownloading=true;

  const buttons=[
    $('#btn-download'),
    $('#btn-modal-download')
  ].filter(Boolean);

  const states=buttons.map(button=>({
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
    console.error('[DTK PDF VECTOR]',error);

    const notice = document.getElementById('dtk-notice');
    if (notice) {
      notice.textContent = `No fue posible generar el PDF. ${error.message||error}`;
      notice.className = 'dtk-notice error';
    }

  }finally{
    states.forEach(({button,text,disabled})=>{
      button.disabled=disabled;
      button.textContent=text;
      button.style.cursor='';
      button.style.opacity='';
    });

    isDownloading=false;
  }
}

function delegatedDownloadClick(event){
  const button=event.target?.closest?.(
    '#btn-download, #btn-modal-download'
  );

  if(!button) return;

  const notice = document.getElementById('dtk-notice');
  if (notice) {
    notice.textContent = '';
    notice.className = 'dtk-notice';
  }

  const prevErrors = document.querySelectorAll('.dtk-error');
  prevErrors.forEach(el => el.classList.remove('dtk-error'));

  const requiredElements = Array.from(document.querySelectorAll('.dtk-required, [required]'));
  let hasError = false;
  let firstErrorField = null;

  for (const el of requiredElements) {
    if (el.offsetParent === null) continue;

    if (String(el.value).trim() === '') {
      hasError = true;
      el.classList.add('dtk-error');
      if (!firstErrorField) firstErrorField = el;
    }
  }

  const economicRows = readEconomicRows();
  const hasProducts = economicRows.length > 0;

  if (hasError || !hasProducts) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    if (hasError) {
      if (notice) {
        notice.textContent = 'Por favor, completa los campos obligatorios marcados en rojo.';
        notice.className = 'dtk-notice error';
      }
      
      firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstErrorField.focus();

    } else if (!hasProducts) {
      if (notice) {
        notice.textContent = 'Debes agregar al menos un producto a la Propuesta Económica antes de generar el PDF.';
        notice.className = 'dtk-notice error';
      }

      const productsSection = document.querySelector('.dtk-products') || document.querySelector('#dtk-calc-tbody');
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return; 
  }

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  downloadPdf(event);
}

function init(){
  if(!window.__DTK_PDF_DELEGATED_CLICK_BOUND__){
    window.__DTK_PDF_DELEGATED_CLICK_BOUND__=true;
    document.addEventListener(
      'click',
      delegatedDownloadClick,
      true
    );

    const clearError = (e) => {
      if (e.target && e.target.classList && e.target.classList.contains('dtk-error')) {
        if (String(e.target.value).trim() !== '') {
          e.target.classList.remove('dtk-error');
          const notice = document.getElementById('dtk-notice');
          if (notice) {
             notice.textContent = '';
             notice.className = 'dtk-notice';
          }
        }
      }
    };

    document.addEventListener('input', clearError);
    document.addEventListener('change', clearError);
  }

  const mainButton=$('#btn-download');
  const modalButton=$('#btn-modal-download');

  if(mainButton) mainButton.setAttribute('type','button');
  if(modalButton) modalButton.setAttribute('type','button');

  window.DTKPDF=Object.freeze({
    collect:collectData,
    download:()=>downloadPdf()
  });

  console.info(
    '[DTK PDF] PDF nativo + UIcons activo.'
  );
}

if(document.readyState==='loading'){
  document.addEventListener(
    'DOMContentLoaded',
    init,
    {once:true}
  );
}else{
  init();
}

})();
