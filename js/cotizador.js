document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.getElementById('dtk-calc-tbody');
  const valSubtotal = document.getElementById('val-subtotal');
  const valIva = document.getElementById('val-iva');
  const valTotal = document.getElementById('val-total');
  const selectIva = document.getElementById('select-iva');
  const currencySelect = document.getElementById('currency-select');
  
  const STORAGE_KEY_FORM = 'dtk_quote_form_data_v11';
  const STORAGE_KEY_ROWS = 'dtk_quote_table_rows_v11';
  const STORAGE_KEY_COUNTERS = 'dtk_quote_counters'; 

  const countryData = {
    'Colombia': {
      currency: ['COP', 'USD'],
      taxName: 'IVA',
      taxRates: [19, 0],
      agents: [
        { name: 'Andrés', code: 'CO-001' }, 
        { name: 'Xime', code: 'CO-002' }, 
        { name: 'Asesor Comercial Colombia', code: 'CO-003' }
      ],
      terms: {
        installation: 'En disposición y coordinación con el cliente',
        payment: '30 días crédito',
        validity: '30 días calendario',
        warranty: '1 año por defectos de fábrica',
        extra: 'Esta propuesta es confidencial y propiedad de Detektor hasta su aceptación formal. Su contenido no podrá ser divulgado ni utilizado con fines comerciales sin autorización. Comprometidos con la sostenibilidad, presentamos este documento en formato digital. Antes de imprimirlo, considere si es realmente necesario.'
      }
    },
    'Costa Rica': {
      currency: ['CRC', 'USD'],
      taxName: 'IVA',
      taxRates: [13, 0],
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
        installation: 'Pendiente de actualización CR',
        payment: 'Pendiente de actualización CR',
        validity: 'Pendiente de actualización CR',
        warranty: 'Pendiente de actualización CR',
        extra: 'Pendiente de actualización CR'
      }
    },
    'Panamá': {
      currency: ['USD'],
      taxName: 'ITBMS',
      taxRates: [7, 0],
      agents: [
        { name: 'Shayra Marielys Luque Castillo', code: 'PA0039' },
        { name: 'Nancy Maria Pinto Trejos', code: 'PA0052' },
        { name: 'Katherine Michelle Collazo Pilozo', code: 'PA0024' },
        { name: 'Saul Antonio Acosta Molinar', code: 'PA0074' },
        { name: 'Giovanna Astrid Leblanc Veliz', code: 'PA0072' }
      ],
      terms: {
        installation: 'Pendiente de actualización PA',
        payment: 'Pendiente de actualización PA',
        validity: 'Pendiente de actualización PA',
        warranty: 'Pendiente de actualización PA',
        extra: 'Pendiente de actualización PA'
      }
    },
    'Guatemala': {
      currency: ['GTQ', 'USD'],
      taxName: 'IVA',
      taxRates: [12, 0],
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
        validity: 'La presente propuesta de productos y servicios tiene una validez hasta el 23 de junio 2026',
        warranty: '1 año por defectos de fábrica',
        extra: 'POLÍTICA DE REVISIONES Y TRABAJOS TÉCNICOS: Toda revisión técnica de equipos fuera de garantía, así como aquellas derivadas de manipulación, accidentes o negligencia, tendrán un costo adicional. El valor de revisión es de Q160.00 por visita y, en caso de requerirse reemplazo de equipos, aplicarán los siguientes precios de referencia: Detektor El Cazador US$180 + IVA, Detektor GPS US$60 + IVA, y accesorios conforme a lista vigente. Las revisiones preventivas programadas y los desperfectos cubiertos por garantía no generan costo para el cliente.'
      }
    },
    'Honduras': {
      currency: ['HNL', 'USD'],
      taxName: 'ISV',
      taxRates: [15, 0],
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
      currency: ['USD'],
      taxName: 'IVA',
      taxRates: [13, 0],
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
      currency: ['NIO', 'USD'],
      taxName: 'IVA',
      taxRates: [15, 0],
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
    }
  };

  const defaultValues = {
    'client-name': '',
    'client-company': '',
    'client-role': '',
    'client-email': '',
    'client-phone': '',
    'client-city': '',
    'quote-date': new Date().toISOString().split('T')[0],
    'quote-number': '',
    'quote-country': '',
    'quote-advisor': '',
    'quote-advisor-phone': '',
    'quote-advisor-email': '',
    'quote-obs': 'Crezca con Detektor: cuando su operación lo requiera, podrá complementar esta solución con nuevas tecnologías de monitoreo, seguridad, gestión de flotas y localización vehicular.'
  };

  const getBaseCode = (countryStr) => {
    if(countryStr === 'Colombia') return 'CO';
    if(countryStr === 'Panamá') return 'PA';
    if(countryStr === 'Costa Rica') return 'CR';
    if(countryStr === 'Guatemala') return 'GT';
    if(countryStr === 'Honduras') return 'HN';
    if(countryStr === 'El Salvador') return 'SV';
    if(countryStr === 'Nicaragua') return 'NI';
    return 'XX';
  };

  const updateQuoteNumber = (countryStr) => {
    if(!countryStr) return;
    const baseCode = getBaseCode(countryStr);
    let counters = JSON.parse(localStorage.getItem(STORAGE_KEY_COUNTERS)) || { CO: 1, CR: 1, PA: 1, GT: 1, HN: 1, SV: 1, NI: 1 };
    const numStr = String(counters[baseCode] || 1).padStart(4, '0');
    const year = new Date().getFullYear();
    const quoteNumberEl = document.getElementById('quote-number');
    if (quoteNumberEl) quoteNumberEl.value = `DET-${baseCode}-${year}-${numStr}`;
  };

  let notifTimeout;
  const showNotification = (msg, type = 'error') => {
    const notifBar = document.getElementById('dtk-notif-bar');
    if (!notifBar) return;
    notifBar.innerText = msg;
    notifBar.className = `dtk-notification-msg ${type}`;
    clearTimeout(notifTimeout);
    notifTimeout = setTimeout(() => { notifBar.className = 'dtk-notification-msg'; }, 4500);
  };

  const formatCurrency = (num) => {
    const currency = currencySelect?.value || '';
    return new Intl.NumberFormat('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num) + ' ' + currency;
  };

  const parseNum = (str) => {
    if (!str) return 0;
    let val = String(str).replace(/[^\d.,-]/g, ''); 
    const lastComma = val.lastIndexOf(',');
    const lastDot = val.lastIndexOf('.');
    if (lastComma > lastDot) val = val.replace(/\./g, '').replace(',', '.');
    else if (lastDot > lastComma) val = val.replace(/,/g, '');
    return parseFloat(val) || 0;
  };

  const calculateAll = () => {
    if (!tbody || !valSubtotal || !valIva || !valTotal) return;
    let rawSubtotal = 0;
    
    tbody.querySelectorAll('tr').forEach(row => {
      const qtyEl = row.querySelector('.dtk-qty');
      const priceEl = row.querySelector('.dtk-price');
      const descEl = row.querySelector('.dtk-desc');
      const subtotalEl = row.querySelector('.dtk-row-subtotal');
      
      const qty = qtyEl ? parseNum(qtyEl.value) : 0;
      const price = priceEl ? parseNum(priceEl.value) : 0;
      const desc = descEl ? parseNum(descEl.value) : 0;
      
      const rowSub = (qty * price) * (1 - (desc / 100));
      if (subtotalEl) subtotalEl.innerText = formatCurrency(rowSub);
      rawSubtotal += rowSub;
    });

    const subMode = valSubtotal.getAttribute('data-mode') || 'auto';
    const ivaMode = valIva.getAttribute('data-mode') || 'auto';
    const totalMode = valTotal.getAttribute('data-mode') || 'auto';

    let finalSubtotal = subMode === 'auto' ? rawSubtotal : parseNum(valSubtotal.innerText);
    if(subMode === 'auto') valSubtotal.innerText = formatCurrency(rawSubtotal);

    let finalIva = 0;
    if(ivaMode === 'auto' && selectIva) {
      finalIva = finalSubtotal * (parseNum(selectIva.value) / 100);
      valIva.innerText = formatCurrency(finalIva);
    } else { 
      finalIva = parseNum(valIva.innerText); 
    }

    let finalTotal = totalMode === 'auto' ? (finalSubtotal + finalIva) : parseNum(valTotal.innerText);
    if(totalMode === 'auto') valTotal.innerText = formatCurrency(finalTotal);

    saveState();
  };

  document.getElementById('quote-country')?.addEventListener('change', function(e) {
    const c = e.target.value;
    const data = countryData[c];
    if(!data) return;

    const advSelect = document.getElementById('quote-advisor');
    if (advSelect) {
      advSelect.innerHTML = '<option value="" disabled selected>Seleccione un asesor</option>';
      data.agents.forEach(agent => {
        advSelect.innerHTML += `<option value="${agent.name}">${agent.code} - ${agent.name}</option>`;
      });
    }

    const curSelect = document.getElementById('currency-select');
    if (curSelect) {
      curSelect.innerHTML = '';
      data.currency.forEach(cur => {
        curSelect.innerHTML += `<option value="${cur}">${cur}</option>`;
      });
    }

    const ivaLabelText = document.getElementById('iva-label-text');
    const prevIvaLabel = document.getElementById('prev-iva-label');
    const taxSelect = document.getElementById('select-iva');
    
    if (ivaLabelText) ivaLabelText.innerText = data.taxName;
    if (prevIvaLabel) prevIvaLabel.innerText = data.taxName;
    
    if (taxSelect) {
      taxSelect.innerHTML = '';
      data.taxRates.forEach(rate => {
        taxSelect.innerHTML += `<option value="${rate}">${rate}%</option>`;
      });
    }

    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
    setVal('terms-installation', data.terms.installation);
    setVal('terms-payment', data.terms.payment);
    setVal('terms-validity', data.terms.validity);
    setVal('terms-warranty', data.terms.warranty);
    setVal('terms-extra', data.terms.extra);

    updateQuoteNumber(c);
    calculateAll();
  });

  const appendRow = (name, price, qty = 1, desc = 0) => {
    if (!tbody) return;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="dtk-input dtk-prod-name dtk-required" value="${name}"></td>
      <td><input type="number" class="dtk-input dtk-qty" value="${qty}" min="0" step="any"></td>
      <td><input type="number" class="dtk-input dtk-price" value="${price}" step="any"></td>
      <td><input type="number" class="dtk-input dtk-desc" value="${desc}" min="0" max="100" step="any"></td>
      <td style="text-align:right; font-weight:700;" class="dtk-row-subtotal">0</td>
      <td style="text-align:right;"><button class="dtk-remove-item">×</button></td>
    `;
    tr.querySelector('.dtk-prod-name')?.addEventListener('input', function() { this.classList.remove('dtk-error'); });
    tbody.appendChild(tr);
  };

  const saveState = () => {
    const formData = {};
    document.querySelectorAll('.dtk-persist').forEach(input => { formData[input.id] = input.value; });
    localStorage.setItem(STORAGE_KEY_FORM, JSON.stringify(formData));

    const rowsData = [];
    if (tbody) {
      tbody.querySelectorAll('tr').forEach(row => {
        rowsData.push({
          name: row.querySelector('.dtk-prod-name')?.value || '',
          qty: row.querySelector('.dtk-qty')?.value || 0,
          price: row.querySelector('.dtk-price')?.value || 0,
          desc: row.querySelector('.dtk-desc')?.value || 0
        });
      });
    }
    localStorage.setItem(STORAGE_KEY_ROWS, JSON.stringify(rowsData));
  };

  const loadState = () => {
    const savedForm = localStorage.getItem(STORAGE_KEY_FORM);
    if(savedForm) {
      try {
        const parsedForm = JSON.parse(savedForm);
        if(parsedForm['quote-country']) {
          const cSelect = document.getElementById('quote-country');
          if (cSelect) {
            cSelect.value = parsedForm['quote-country'];
            cSelect.dispatchEvent(new Event('change'));
          }
        }
        setTimeout(() => {
          Object.keys(parsedForm).forEach(id => {
            const el = document.getElementById(id);
            if(el) el.value = parsedForm[id];
          });
          calculateAll();
        }, 100); // Aumentado el tiempo de espera para evitar condiciones de carrera en el DOM
      } catch (e) {
        console.error("Error parsing saved form", e);
      }
    } else {
      Object.keys(defaultValues).forEach(id => {
        const el = document.getElementById(id);
        if(el) el.value = defaultValues[id];
      });
    }

    const savedRows = localStorage.getItem(STORAGE_KEY_ROWS);
    if (tbody) tbody.innerHTML = '';
    if(savedRows) {
      try {
        const parsedRows = JSON.parse(savedRows);
        if(parsedRows.length > 0) {
          parsedRows.forEach(item => { appendRow(item.name, item.price, item.qty, item.desc); });
        } else { appendRow('Recovery Response', 0); }
      } catch (e) {
        appendRow('Recovery Response', 0);
      }
    } else { 
      appendRow('Recovery Response', 0); 
    }

    setTimeout(calculateAll, 150);
  };

  const validateForm = () => {
    let isValid = true;
    document.querySelectorAll('.dtk-required').forEach(field => {
      if (!field.value.trim()) { field.classList.add('dtk-error'); isValid = false; } 
      else { field.classList.remove('dtk-error'); }
    });
    if (tbody && tbody.querySelectorAll('tr').length === 0) { 
      showNotification("Debes agregar al menos un producto a la cotización.", "error"); 
      return false; 
    }
    if (!isValid) {
      showNotification("Revisa los campos en rojo. Falta información obligatoria (*).", "error");
      const firstError = document.querySelector('.dtk-error');
      if(firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return isValid;
  };

  document.querySelectorAll('.dtk-required').forEach(input => { input.addEventListener('input', function() { this.classList.remove('dtk-error'); }); });
  document.querySelectorAll('.dtk-btn-add').forEach(btn => { btn.addEventListener('click', (e) => { appendRow(e.target.getAttribute('data-name'), e.target.getAttribute('data-price')); calculateAll(); }); });
  
  document.getElementById('btn-add-custom')?.addEventListener('click', () => { appendRow('', '0'); calculateAll(); });
  
  tbody?.addEventListener('input', (e) => { if(e.target.classList.contains('dtk-input')) calculateAll(); });
  tbody?.addEventListener('click', (e) => { if(e.target.classList.contains('dtk-remove-item')) { e.target.closest('tr').remove(); calculateAll(); } });
  
  document.querySelectorAll('.dtk-persist').forEach(input => { 
    input.addEventListener('input', saveState); 
    input.addEventListener('change', () => calculateAll()); 
  });

  const toggleGroups = document.querySelectorAll('.dtk-toggle-group');
  toggleGroups.forEach(group => {
    group.addEventListener('click', (e) => {
      if(e.target.classList.contains('dtk-toggle-btn')) {
        group.querySelectorAll('.dtk-toggle-btn').forEach(b => { b.classList.remove('active'); b.classList.add('inactive'); });
        e.target.classList.remove('inactive'); e.target.classList.add('active');
        const targetId = group.getAttribute('data-target');
        const valElement = document.getElementById(`val-${targetId}`);
        if (!valElement) return;

        const mode = e.target.getAttribute('data-mode');
        valElement.setAttribute('data-mode', mode);
        
        if (targetId === 'iva' && selectIva) { 
          selectIva.style.display = mode === 'manual' ? 'none' : 'inline-block'; 
        }
        
        if(mode === 'manual') { 
          valElement.contentEditable = "true"; 
          valElement.focus(); 
        } else { 
          valElement.contentEditable = "false"; 
          calculateAll(); 
        }
      }
    });
  });

  [valSubtotal, valIva, valTotal].forEach(el => {
    if (!el) return;
    el.addEventListener('input', calculateAll);
    el.addEventListener('blur', function() { 
      if (this.getAttribute('data-mode') === 'manual') { 
        this.innerText = formatCurrency(parseNum(this.innerText)); 
        calculateAll(); 
      } 
    });
  });

  selectIva?.addEventListener('change', calculateAll);
  currencySelect?.addEventListener('change', calculateAll);

  const mainBtnRow = document.getElementById('main-btn-row');
  const confirmBtnRow = document.getElementById('confirm-btn-row');
  
  document.getElementById('btn-clear-form')?.addEventListener('click', () => { 
    if (mainBtnRow) mainBtnRow.style.display = 'none'; 
    if (confirmBtnRow) confirmBtnRow.style.display = 'flex'; 
  });
  
  document.getElementById('btn-confirm-no')?.addEventListener('click', () => { 
    if (confirmBtnRow) confirmBtnRow.style.display = 'none'; 
    if (mainBtnRow) mainBtnRow.style.display = 'flex'; 
  });
  
  document.getElementById('btn-confirm-yes')?.addEventListener('click', () => {
    const currentCountry = document.getElementById('quote-country')?.value;
    if(currentCountry) {
      const baseCode = getBaseCode(currentCountry);
      let counters = JSON.parse(localStorage.getItem(STORAGE_KEY_COUNTERS)) || { CO: 1, CR: 1, PA: 1, GT: 1, HN: 1, SV: 1, NI: 1 };
      counters[baseCode] = (counters[baseCode] || 1) + 1;
      localStorage.setItem(STORAGE_KEY_COUNTERS, JSON.stringify(counters));
    }

    localStorage.removeItem(STORAGE_KEY_FORM); 
    localStorage.removeItem(STORAGE_KEY_ROWS);

    document.querySelectorAll('.dtk-persist').forEach(input => {
      if (input.tagName === 'SELECT') { input.selectedIndex = 0; } 
      else { input.value = defaultValues[input.id] !== undefined ? defaultValues[input.id] : ''; }
      input.classList.remove('dtk-error');
    });

    if (tbody) {
      tbody.innerHTML = ''; 
      appendRow('Recovery Response', 0); 
    }
    calculateAll();

    if (confirmBtnRow) confirmBtnRow.style.display = 'none'; 
    if (mainBtnRow) mainBtnRow.style.display = 'flex';
    showNotification("Cotización guardada. Nuevo lienzo listo.", "success");
  });

  const modal = document.getElementById('dtk-preview-modal');
  const modalScrollArea = document.getElementById('modal-scroll-area');
  
  const populateModal = () => {
    const setHtml = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };
    const setText = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    const getVal = (id) => document.getElementById(id)?.value || '';

    setText('prev-client-name', getVal('client-name'));
    setText('prev-client-company', getVal('client-company') || '-');
    setText('prev-client-role', getVal('client-role') || '-');
    setText('prev-client-email', getVal('client-email'));
    setText('prev-client-phone', getVal('client-phone'));
    setText('prev-client-city', getVal('client-city') || '-');
    setText('prev-quote-date', getVal('quote-date'));
    setText('prev-quote-number', getVal('quote-number'));

    const advSelect = document.getElementById('quote-advisor');
    const selectedAdvText = advSelect && advSelect.selectedIndex >= 0 ? advSelect.options[advSelect.selectedIndex].text : '';
    setText('prev-quote-advisor', selectedAdvText);

    const prevTbody = document.getElementById('prev-calc-tbody');
    if (prevTbody) {
      prevTbody.innerHTML = '';
      const currency = getVal('currency-select');
      const isIvaAuto = valIva?.getAttribute('data-mode') === 'auto';
      
      const countrySelected = getVal('quote-country');
      const taxNameStr = countrySelected ? countryData[countrySelected].taxName : 'IVA';
      const ivaValue = isIvaAuto ? getVal('select-iva') + '%' : 'Manual';

      document.querySelectorAll('#dtk-calc-tbody tr').forEach(row => {
        const name = row.querySelector('.dtk-prod-name')?.value || '';
        const qty = row.querySelector('.dtk-qty')?.value || '';
        const price = parseFloat(row.querySelector('.dtk-price')?.value || 0).toLocaleString('es-CO');
        const subtotal = row.querySelector('.dtk-row-subtotal')?.innerText || '0';
        prevTbody.innerHTML += `<tr><td>• ${name}</td><td>${qty}</td><td>$ ${price} ${currency}</td><td>${ivaValue === '0%' ? 'NA' : ivaValue}</td><td style="text-align:right; font-weight:700;">${subtotal}</td></tr>`;
      });
    }

    setText('prev-adv-name-box', getVal('quote-advisor'));
    setText('prev-adv-mail-box', getVal('quote-advisor-email'));
    setText('prev-adv-phone-box', getVal('quote-advisor-phone'));
    setText('prev-subtotal', valSubtotal?.innerText || '0');
    setText('prev-iva-percent', valIva?.getAttribute('data-mode') === 'auto' ? `(${getVal('select-iva')}%)` : '');
    setText('prev-iva', valIva?.innerText || '0');
    setText('prev-total', valTotal?.innerText || '0');
    setText('prev-obs', getVal('quote-obs'));

    const extraTermsFormat = getVal('terms-extra').replace(/\n/g, '<br>');
    const termsHtml = `<strong>Condiciones de pago:</strong> ${getVal('terms-payment')}.<br><strong>Instalación y entrega:</strong> ${getVal('terms-installation')}.<br><strong>Vigencia:</strong> ${getVal('terms-validity')}.<br><strong>Garantía:</strong> ${getVal('terms-warranty')}.<br><br><strong>Consideraciones adicionales:</strong><br>${extraTermsFormat}`;
    setHtml('prev-terms-merged', termsHtml);
  };

  document.getElementById('btn-preview-pdf')?.addEventListener('click', (e) => {
    if(!validateForm()) return;
    populateModal();
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  });

  document.getElementById('btn-close-modal')?.addEventListener('click', () => {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  document.querySelectorAll('.dtk-nav-dot').forEach(dot => {
    dot.addEventListener('click', function(e) {
      e.preventDefault();
      
      document.querySelectorAll('.dtk-nav-dot').forEach(d => d.classList.remove('active'));
      this.classList.add('active');
      
      const targetId = this.getAttribute('data-target');
      const targetPage = document.getElementById(targetId);
      
      if (targetPage) {
        targetPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const downloadPDF = () => {
    if (typeof html2pdf === 'undefined') {
      showNotification("La librería de generación de PDF aún no se ha cargado en la web.", "error");
      return;
    }

    if(!validateForm()) return;
    populateModal();
    showNotification("Generando PDF, por favor espere...", "success");
    
    const element = document.getElementById('dtk-pdf-export-content');
    if (!element) {
      showNotification("Error: No se encontró el contenedor del PDF.", "error");
      return;
    }

    const docName = document.getElementById('quote-number')?.value || 'Documento';
    
    const opt = {
      margin:       0,
      filename:     `Cotizacion_${docName.replace(/[^a-zA-Z0-9-]/g, '')}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  document.getElementById('btn-generate-pdf-direct')?.addEventListener('click', downloadPDF);
  document.getElementById('btn-modal-generate')?.addEventListener('click', downloadPDF);

  loadState();
});
