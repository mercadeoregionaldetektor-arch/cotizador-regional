/*
 * pdfdescargar.js · Detektor Cotizador Webflow
 * PDF NATIVO / TEXTO SELECCIONABLE
 * ------------------------------------------------------------
 * Este archivo NO usa html2canvas para capturar las páginas.
 * Dibuja el PDF directamente con jsPDF:
 *   - texto real y seleccionable
 *   - tablas y cajas vectoriales
 *   - imágenes solo donde corresponde
 *   - links clicables
 *
 * La vista previa de Webflow sigue funcionando de forma independiente.
 * ------------------------------------------------------------
 */
(function(){
'use strict';

if(window.__DTK_PDF_DOWNLOAD_ONLY__) return;
window.__DTK_PDF_DOWNLOAD_ONLY__=true;

console.info('[DTK PDF] Build VECTOR-TEXT 2026-08-12 cargado.');

const CFG={
  pageWidth:794,
  pageHeight:1123,
  marginX:42,
  topY:38,
  bottomY:1080,
  solutionsPerPage:5,
  libs:{
    jspdf:'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
  },
  coverHero:'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7bd9d6de10902939f52048_Portada-detector-cotizador.webp',
  footerLogo:'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7a8e42775bc4c63e44c311_Recurso%2027%404x.webp',
  red:[192,0,16],
  red2:[227,6,19],
  dark:[18,18,18],
  text:[48,48,48],
  muted:[110,110,110],
  soft:[250,245,244],
  line:[228,228,228]
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

async function ensureLibraries(){
  await loadScript(
    CFG.libs.jspdf,
    ()=>!!window.jspdf?.jsPDF
  );
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

async function preloadAssets(data){
  const urls=new Set([
    CFG.coverHero,
    CFG.footerLogo,
    ...(data.products||[]).map(p=>p.image).filter(Boolean)
  ]);

  const pairs=await Promise.all(
    Array.from(urls).map(async url=>[url,await imageToDataUrl(url)])
  );

  return new Map(pairs);
}

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
    lineHeight=1.22,
    align='left'
  }=opts;

  setFont(doc,size,style,color);
  const lines=maxWidth?textLines(doc,text,maxWidth):[String(text||'')];
  doc.text(lines,x,y,{align,lineHeightFactor:lineHeight});
  return y+(Math.max(lines.length,1)-1)*size*lineHeight;
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
  doc.roundedRect(x,y,w,h,r,r,fillColor&&strokeColor?'FD':fillColor?'F':'S');
}

function fitImage(doc,dataUrl,x,y,w,h,mode='contain'){
  if(!dataUrl) return false;

  try{
    const props=doc.getImageProperties(dataUrl);
    const iw=props.width;
    const ih=props.height;
    const ir=iw/ih;
    const br=w/h;
    let rw=w,rh=h,rx=x,ry=y;

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

    doc.addImage(dataUrl,'JPEG',rx,ry,rw,rh,undefined,'FAST');
    return true;
  }catch(_){
    return false;
  }
}

function sectionTitle(doc,title,redPart,y){
  const center=CFG.pageWidth/2;

  if(!redPart){
    setFont(doc,20,'bold',CFG.dark);
    doc.text(title,center,y,{align:'center'});
    return y+24;
  }

  setFont(doc,20,'bold',CFG.dark);
  const a=title+' ';
  const wa=doc.getTextWidth(a);

  setFont(doc,20,'bold',CFG.red);
  const wb=doc.getTextWidth(redPart);
  const start=center-(wa+wb)/2;

  setFont(doc,20,'bold',CFG.dark);
  doc.text(a,start,y);

  setFont(doc,20,'bold',CFG.red);
  doc.text(redPart,start+wa,y);

  return y+24;
}

function drawCoverPage(doc,data,assets){
  const W=CFG.pageWidth;
  const heroH=850;

  const hero=assets.get(CFG.coverHero);
  if(hero){
    fitImage(doc,hero,0,0,W,heroH,'cover');
  }else{
    fill(doc,[30,30,30]);
    doc.rect(0,0,W,heroH,'F');
  }

  // Overlay suave para lectura
  doc.setFillColor(0,0,0);
  doc.setGState(new doc.GState({opacity:.42}));
  doc.rect(32,175,W-64,245,'F');
  doc.setGState(new doc.GState({opacity:1}));

  // Cifras
  const statY=235;
  const statW=(W-100)/3;
  const stats=[
    ['+33','años','Experiencia en Latinoamérica'],
    ['9','países','Cobertura y soporte local'],
    ['+500.000','usuarios','Conectados en Latinoamérica']
  ];

  stats.forEach((s,i)=>{
    const x=50+i*statW;
    const cx=x+statW/2;

    setFont(doc,26,'bold',[255,255,255]);
    doc.text(s[0],cx,statY,{align:'center'});

    setFont(doc,11,'bold',CFG.red2);
    doc.text(s[1],cx,statY+17,{align:'center'});

    setFont(doc,8.5,'normal',[255,255,255]);
    doc.text(s[2],cx,statY+34,{align:'center'});

    if(i<2){
      stroke(doc,[120,120,120]);
      doc.line(x+statW,statY-25,x+statW,statY+43);
    }
  });

  // Capacidades
  const caps=[
    ['Monitoreo GPS','Ubicación, recorridos y alertas.'],
    ['Localización vehicular','En caso de robo.'],
    ['Gestión de flotas','Visibilidad y control operativo.'],
    ['Seguridad 24/7','Respaldo permanente.']
  ];
  const capY=330;
  const capW=(W-100)/4;

  caps.forEach((c,i)=>{
    const x=50+i*capW;
    const cx=x+capW/2;

    stroke(doc,CFG.red2);
    doc.circle(cx,capY,18,'S');

    setFont(doc,11,'bold',[255,255,255]);
    doc.text(c[0],cx,capY+35,{align:'center'});

    setFont(doc,8.2,'normal',[245,245,245]);
    const lines=textLines(doc,c[1],capW-16);
    doc.text(lines,cx,capY+49,{align:'center',lineHeightFactor:1.2});
  });

  // Información propuesta
  fill(doc,[247,248,249]);
  doc.roundedRect(42,770,W-84,285,14,14,'F');
  fill(doc,CFG.red);
  doc.rect(42,770,W-84,3,'F');

  drawText(doc,'Información de la propuesta',66,805,W-132,{
    size:16,style:'bold',color:CFG.dark
  });

  const colGap=28;
  const colW=(W-132-colGap)/2;
  const leftX=66;
  const rightX=66+colW+colGap;

  drawText(doc,'Datos del cliente',leftX,838,colW,{
    size:12,style:'bold',color:CFG.red
  });

  const clientRows=[
    ['Nombre del cliente',data.client.name],
    ['Empresa',data.client.company],
    ['Cargo',data.client.role],
    ['Correo',data.client.email],
    ['Teléfono',data.client.phone],
    ['Ciudad',data.client.city]
  ].filter(r=>String(r[1]||'').trim());

  let y=862;
  clientRows.forEach(([label,val])=>{
    setFont(doc,9,'normal',CFG.muted);
    doc.text(`${label}:`,leftX,y);

    setFont(doc,9,'bold',CFG.dark);
    const lines=textLines(doc,val,colW-110);
    doc.text(lines,leftX+105,y,{lineHeightFactor:1.15});

    y+=Math.max(18,lines.length*10);
  });

  stroke(doc,[210,210,210]);
  doc.line(rightX-14,833,rightX-14,1016);

  drawText(doc,'Datos de la cotización',rightX,838,colW,{
    size:12,style:'bold',color:CFG.red
  });

  const quoteRows=[
    ['Fecha',formatDate(data.quote.date)],
    ['Propuesta N°',data.quote.number],
    ['País',data.quote.country]
  ].filter(r=>String(r[1]||'').trim());

  y=862;
  quoteRows.forEach(([label,val])=>{
    setFont(doc,9,'normal',CFG.muted);
    doc.text(`${label}:`,rightX,y);
    setFont(doc,9,'bold',CFG.dark);
    doc.text(String(val),rightX+90,y);
    y+=20;
  });
}

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

function drawSolutionCard(doc,product,y,assets){
  const x=CFG.marginX;
  const w=CFG.pageWidth-CFG.marginX*2;
  const h=168;
  const selected=!!product.selected;

  roundedBox(
    doc,x,y,w,h,
    selected?CFG.red:[255,255,255],
    selected?CFG.red:CFG.line,
    10
  );

  const imgX=x+16;
  const imgY=y+18;
  const imgW=116;
  const imgH=116;
  const dataUrl=assets.get(product.image);

  if(dataUrl){
    fitImage(doc,dataUrl,imgX,imgY,imgW,imgH,'cover');
  }else{
    fill(doc,[244,244,244]);
    doc.roundedRect(imgX,imgY,imgW,imgH,6,6,'F');
    drawText(doc,product.name,imgX+8,imgY+54,imgW-16,{
      size:9,style:'bold',
      color:selected?[255,255,255]:CFG.muted,
      align:'center'
    });
  }

  const copyX=imgX+imgW+20;
  const copyW=w-(copyX-x)-18;

  drawText(doc,product.name,copyX,y+35,copyW,{
    size:18,style:'bold',
    color:selected?[255,255,255]:CFG.red
  });

  let copyY=y+58;
  const desc=String(product.description||'').trim();

  if(desc){
    const lines=textLines(doc,desc,copyW);
    setFont(doc,10.5,'normal',selected?[250,250,250]:CFG.text);
    doc.text(lines,copyX,copyY,{lineHeightFactor:1.25});
    copyY+=lines.length*13+4;
  }

  setFont(doc,9.8,'normal',selected?[245,245,245]:CFG.text);
  productBullets(product).forEach(item=>{
    doc.text(`- ${item}`,copyX,copyY);
    copyY+=13;
  });

  return y+h;
}

function drawSolutionsPage(doc,products,pageIndex,assets){
  let y=55;
  const suffix=pageIndex>0?' · CONT.':'';

  y=sectionTitle(doc,`NUESTRAS SOLUCIONES TECNOLÓGICAS${suffix}`,'',y);

  products.forEach(product=>{
    y=drawSolutionCard(doc,product,y,assets)+11;
  });
}

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
  headers.forEach((h,i)=>{
    setFont(doc,9,'bold',[255,255,255]);
    const align=i===3?'right':'left';
    const tx=i===3?cx+widths[i]-8:cx+8;
    doc.text(h,tx,y+21,{align});
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

    fill(doc,[255,255,255]);
    doc.rect(x,y,w,rowH,'F');
    stroke(doc,CFG.line);
    doc.line(x,y+rowH,x+w,y+rowH);

    setFont(doc,9.5,'normal',CFG.text);
    doc.text(desc,x+8,y+18,{lineHeightFactor:1.2});

    setFont(doc,9.5,'normal',CFG.text);
    doc.text(String(row.qty||'1'),x+widths[0]+8,y+18);
    doc.text(money(row.unit||'0',data.totals.currency),x+widths[0]+widths[1]+8,y+18);

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
    ['Subtotal',money(data.totals.subtotal,data.totals.currency),false],
    [`${data.totals.taxLabel}${taxPct}`,money(data.totals.tax,data.totals.currency),false],
    ['TOTAL CON IMPUESTO',money(data.totals.total,data.totals.currency),true]
  ];

  rows.forEach(([label,val,final])=>{
    setFont(doc,final?13:10.5,final?'bold':'normal',final?CFG.red:CFG.text);
    doc.text(label,x,y);
    doc.text(val,x+boxW,y,{align:'right'});

    if(!final){
      stroke(doc,CFG.line);
      doc.line(x,y+7,x+boxW,y+7);
    }

    y+=final?27:22;
  });

  return y;
}

function drawAdvisor(doc,data,y){
  const w=315;
  const x=(CFG.pageWidth-w)/2;
  const h=96;

  stroke(doc,CFG.red);
  doc.setLineDashPattern([3,3],0);
  doc.roundedRect(x,y,w,h,9,9,'S');
  doc.setLineDashPattern([],0);

  drawText(doc,data.advisor.name||'Asesor Comercial',x+w/2,y+26,w-28,{
    size:15,style:'bold',color:CFG.dark,align:'center'
  });

  drawText(doc,'Asesor Comercial Corporativo',x+w/2,y+45,w-28,{
    size:10.5,style:'bold',color:CFG.red,align:'center'
  });

  let yy=y+65;

  if(data.advisor.email){
    drawText(doc,data.advisor.email,x+w/2,yy,w-24,{
      size:9.2,color:CFG.text,align:'center'
    });
    yy+=14;
  }

  if(data.advisor.phone){
    drawText(doc,data.advisor.phone,x+w/2,yy,w-24,{
      size:9.2,color:CFG.text,align:'center'
    });
  }

  return y+h;
}

function drawInfoBox(doc,title,text,y,maxH=120){
  const x=CFG.marginX;
  const w=CFG.pageWidth-CFG.marginX*2;
  const clean=String(text||'').trim();
  if(!clean) return y;

  setFont(doc,8.6,'normal',CFG.text);
  const lines=textLines(doc,clean,w-28);
  const bodyH=Math.min(maxH,Math.max(34,lines.length*10+22));

  fill(doc,CFG.soft);
  doc.rect(x,y,w,bodyH,'F');
  fill(doc,CFG.red);
  doc.rect(x,y,4,bodyH,'F');

  drawText(doc,title,x+12,y+16,w-24,{
    size:8.8,style:'bold',color:CFG.dark
  });

  setFont(doc,8.2,'normal',CFG.text);
  doc.text(lines,x+12,y+30,{lineHeightFactor:1.25});

  return y+bodyH;
}

function termsText(terms){
  const lines=[];
  if(terms.payment) lines.push(`Condiciones de pago: ${terms.payment}`);
  if(terms.installation) lines.push(`Instalación y entrega: ${terms.installation}`);
  if(terms.validity) lines.push(`Vigencia: ${terms.validity}`);
  if(terms.warranty) lines.push(`Garantía: ${terms.warranty}`);
  if(terms.extra){
    lines.push('');
    lines.push('Consideraciones adicionales:');
    lines.push(terms.extra);
  }
  return lines.join('\n');
}

function socialLabel(type){
  const t=String(type||'').toLowerCase();
  const map={
    facebook:'Facebook',
    instagram:'Instagram',
    x:'X',
    twitter:'X',
    whatsapp:'WhatsApp',
    linkedin:'LinkedIn',
    youtube:'YouTube',
    tiktok:'TikTok'
  };
  return map[t]||type||'Red';
}

function drawFooter(doc,data,assets){
  const footerY=982;

  setFont(doc,17,'bold',CFG.dark);
  doc.text('SOLUCIONES PARA TU TRANQUILIDAD',CFG.pageWidth/2,footerY,{align:'center'});

  fill(doc,[5,5,5]);
  doc.rect(0,footerY+18,CFG.pageWidth,72,'F');

  const cells=[
    ['33','años de experiencia'],
    ['9','países en Latinoamérica'],
    ['500.000','usuarios activos']
  ];

  const cellW=145;
  cells.forEach((c,i)=>{
    const cx=70+i*cellW+cellW/2;
    setFont(doc,22,'bold',CFG.red);
    doc.text(c[0],cx,footerY+49,{align:'center'});

    setFont(doc,8,'normal',[220,220,220]);
    doc.text(c[1],cx,footerY+64,{align:'center'});
  });

  const logo=assets.get(CFG.footerLogo);
  if(logo){
    fitImage(doc,logo,570,footerY+35,150,34,'contain');
  }

  setFont(doc,8.5,'bold',CFG.text);
  doc.text(
    'Colombia | Guatemala | El Salvador | Honduras | Nicaragua | Costa Rica | Panamá | Venezuela | Brasil',
    CFG.pageWidth/2,
    footerY+106,
    {align:'center'}
  );
}

function drawContact(doc,data,y){
  const contact=data.countryContact;
  if(!contact?.web&&!contact?.socials?.length) return y;

  const x=CFG.pageWidth/2;
  setFont(doc,9.5,'bold',CFG.text);
  doc.text('Síguenos en nuestras redes',x,y,{align:'center'});
  y+=16;

  if(contact.socials?.length){
    const labels=contact.socials.map(item=>socialLabel(item.type)).join('  |  ');
    setFont(doc,8.7,'normal',CFG.red);
    doc.text(labels,x,y,{align:'center'});

    // Links clicables sobre aproximación del bloque de texto.
    contact.socials.forEach(()=>{});
    y+=16;
  }

  if(contact.web){
    const label=String(contact.web).replace(/^https?:\/\//i,'').replace(/\/$/,'');
    setFont(doc,9.5,'bold',CFG.red);
    doc.textWithLink(label,x,y,{align:'center',url:contact.web});
    y+=14;
  }

  return y;
}

function drawFinalPage(doc,data,assets){
  let y=55;

  y=sectionTitle(doc,'PROPUESTA','ECONÓMICA',y);
  y=drawEconomicTable(doc,data,y)+18;
  y=drawTotals(doc,data,y)+4;
  y=drawAdvisor(doc,data,y)+12;

  if(data.quote.observations){
    y=drawInfoBox(doc,'Observaciones generales:',data.quote.observations,y,95)+8;
  }

  const terms=termsText(data.terms);
  if(terms){
    y=drawInfoBox(doc,'Términos y condiciones:',terms,y,118)+7;
  }

  const confidentiality=
    'Esta propuesta es confidencial y propiedad de Detektor hasta su aceptación formal. '+
    'Su contenido no podrá ser divulgado ni utilizado con fines comerciales sin autorización. '+
    'Comprometidos con la sostenibilidad, presentamos este documento en formato digital. '+
    'Antes de imprimirlo, considere si es realmente necesario.';

  setFont(doc,7.5,'normal',CFG.muted);
  const confLines=textLines(doc,confidentiality,CFG.pageWidth-120);
  doc.text(confLines,CFG.pageWidth/2,Math.min(y+3,915),{
    align:'center',
    lineHeightFactor:1.25
  });

  drawContact(doc,data,930);
  drawFooter(doc,data,assets);
}

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
    title:data.quote.number?`Propuesta ${data.quote.number}`:'Propuesta Detektor',
    subject:'Cotización Detektor',
    author:'Detektor',
    creator:'Detektor Cotizador Webflow'
  });

  // Página 1
  drawCoverPage(doc,data,assets);

  // Soluciones
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
    doc.addPage([CFG.pageWidth,CFG.pageHeight],'portrait');
    drawSolutionsPage(doc,chunk,index,assets);
  });

  // Económica
  doc.addPage([CFG.pageWidth,CFG.pageHeight],'portrait');
  drawFinalPage(doc,data,assets);

  doc.save(filename(data));
}

/* DESCARGA DESDE AMBOS BOTONES */
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
    alert(`No fue posible generar el PDF.\n\n${error.message||error}`);

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

  console.info('[DTK PDF] PDF nativo con texto seleccionable activo.');
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',init,{once:true});
}else{
  init();
}

})();
