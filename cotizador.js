/* Detektor Cotizador Regional - Frontend Webflow
   HTML/CSS viven en Webflow. Este archivo contiene datos + lógica JS.
*/

window.DTK_BUILD_VERSION = 'v22-formateo-y-datalist';

window.DTK_CONFIG = {
  // REEMPLAZA esta URL por la URL pública REAL de tu servicio Render, sin slash al final.
  apiBase: 'https://cotizador-regional.onrender.com',
  companyPrefix: 'DET',
  quoteCounterStorageKey: 'dtk_quote_counters_v2'
};

window.DTK_COUNTRY_CONTACTS = {
  'Costa Rica': {
    web: 'https://www.detektor.co.cr/',
    socials: [
      { type: 'facebook', label: 'f', url: 'https://www.facebook.com/detektorcostarica/' },
      { type: 'x', label: 'X', url: 'https://twitter.com/detektor' },
      { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorcr/' },
      { type: 'whatsapp', label: 'WA', url: 'https://wa.me/50684534331' }
    ]
  },
  'Panamá': {
    web: 'https://www.detektor.com.pa/',
    socials: [
      { type: 'facebook', label: 'f', url: 'https://www.facebook.com/detektorpanama/' },
      { type: 'x', label: 'X', url: 'https://twitter.com/detektor_pa' },
      { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorpa/' },
      { type: 'whatsapp', label: 'WA', url: 'https://wa.me/50762002871' }
    ]
  },
  'Guatemala': {
    web: 'https://www.detektor.com.gt/',
    socials: [
      { type: 'facebook', label: 'f', url: 'https://www.facebook.com/detektorguatemala/' },
      { type: 'x', label: 'X', url: 'https://twitter.com/detektor' },
      { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorgt/' },
      { type: 'whatsapp', label: 'WA', url: 'https://bit.ly/DetektorGTWhatsapp' }
    ]
  },
  'Honduras': {
    web: 'https://www.detektor.com.hn/',
    socials: [
      { type: 'facebook', label: 'f', url: 'https://www.facebook.com/detektorhonduras/' },
      { type: 'x', label: 'X', url: 'https://twitter.com/detektor_hn' },
      { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorhn/' },
      { type: 'whatsapp', label: 'WA', url: 'https://wa.me/50432416682' }
    ]
  },
  'El Salvador': {
    web: 'https://www.detektor.com.sv/',
    socials: [
      { type: 'facebook', label: 'f', url: 'https://www.facebook.com/detektorelsalvador/' },
      { type: 'x', label: 'X', url: 'https://twitter.com/detektor_sv' },
      { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorsv/' },
      { type: 'whatsapp', label: 'WA', url: 'https://wa.me/50370038712' }
    ]
  },
  'Nicaragua': {
    web: 'https://www.detektor.com.ni/',
    socials: [
      { type: 'facebook', label: 'f', url: 'https://www.facebook.com/detektornicaragua/' },
      { type: 'x', label: 'X', url: 'https://twitter.com/detektor_ni' },
      { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorni/' },
      { type: 'whatsapp', label: 'WA', url: 'https://wa.me/50586150778' }
    ]
  },
  'Venezuela': {
    web: 'https://www.detektor.com.ve/',
    socials: [
      { type: 'facebook', label: 'f', url: 'https://www.facebook.com/DetektorVE/' },
      { type: 'x', label: 'X', url: 'https://twitter.com/detektorVE' },
      { type: 'instagram', label: 'IG', url: 'https://www.instagram.com/detektorve/' }
    ]
  }
};

window.DTK_DATA = {
  countries: {
    'Costa Rica': {
      code: 'CR', currency: ['CRC', 'USD'], locale: 'es-CR', taxName: 'IVA', taxRates: [13, 0], phonePlaceholder: 'Ej. +506 8888 8888', cityPlaceholder: 'Ej. San José', advisorMode: 'list',
      agents: [
        { name: 'Ileana María Solera Obaldía', code: 'EMP041', role: 'Asesor Comercial' },
        { name: 'Lizbeth Gomez Muñoz', code: 'EMP375', role: 'Gerente Comercial' },
        { name: 'Yonder Ricardo Vega Nuñez', code: 'EMP362', role: 'Asesor Comercial' },
        { name: 'Gabriel Madrigal Blanco', code: 'EMP110', role: 'Analista Comercial' },
        { name: 'Josué Zúñiga Rodríguez', code: 'EMP622', role: 'Asesor Comercial' },
        { name: 'Cairo Alonso Pérez López', code: 'EMP634', role: 'Asesor Comercial' },
        { name: 'Anthony Chaves Montoya', code: 'EMP636', role: 'Asesor Comercial' },
        { name: 'Melissa Méndez Porras', code: 'EMP233', role: 'Asesor Comercial' },
        { name: 'Javier Alberto Rivera Quesada', code: 'EMP543', role: 'Asesor Comercial' },
        { name: 'Manfred Bogarin Matarrita', code: 'EMP610', role: 'Asesor Comercial' },
        { name: 'Freddy Manrique Anchia Aguilar', code: 'EMP420', role: 'Asesor Comercial' },
        { name: 'Joshua Esteban Mendez Salguero', code: 'EMP518', role: 'Asesor Comercial' },
        { name: 'María José Aguilar Brenes', code: 'EMP584', role: 'Asesor de Televentas' },
        { name: 'Valerie Solis Camacho', code: 'EMP589', role: 'Asesor Televentas Fidelizacion' },
        { name: 'Leornardo Mendez Campos', code: 'EMP614', role: 'Asesor Televentas Fidelizacion' },
        { name: 'Daniela Durán Saborío', code: 'EMP621', role: 'Asesor Televentas Fidelizacion' },
        { name: 'Shasling Francinie Brenes Avendaño', code: 'EMP516', role: 'Asesor de Televentas' },
        { name: 'Tatiana Soto Solano', code: 'EMP623', role: 'Asesor Televentas Fidelizacion' },
        { name: 'Kimberly Alfaro Rodriguez', code: 'EMP234', role: 'Asesor de Televentas' },
        { name: 'Katherine Nathalia Rojas Leiva', code: 'EMP472', role: 'Asesor de Televentas' },
        { name: 'Jose Joaquin Brenes Torres', code: 'EMP505', role: 'Asesor de Televentas' },
        { name: 'Mariana de los Ángeles Navarro Masis', code: 'EMP305', role: 'Coordinador de Televentas' },
        { name: 'Mario Josue Guzman Aguilar', code: 'EMP537', role: 'Asesor de Televentas' },
        { name: 'Andrés Gómez Fallas', code: 'EMP573', role: 'Asesor Televentas Fidelizacion' },
        { name: 'Natali Sanchez Benavides', code: 'EMP550', role: 'Asesor Backoffice Televentas' },
        { name: 'Steven Gonzalez Monge', code: 'EMP587', role: 'Asesor de Televentas' },
        { name: 'Stephanie Méndez Pizarro', code: 'EMP606', role: 'Asesor Televentas Fidelizacion' },
        { name: 'Emanuel Bejarano Chacón', code: 'EMP629', role: 'Asesor Televentas Fidelizacion' },
        { name: 'Maria Gabriela Moya Varela', code: 'EMP644', role: 'Asistente de Televentas' }
      ],
      terms: {
        installation: 'En disposición y coordinación con el cliente, luego de firmada la autorización de la presente oferta y el contrato de servicio.',
        payment: 'El pago del servicio lo puede realizar mediante transferencia electrónica a nuestras cuentas bancarias especificadas en el contrato de servicios o bien por descargo automático a tarjeta de crédito.',
        validity: 'El contrato de servicio comprende un período de meses (__), con permanencia mínima de __ meses. Precios y descuentos de esta propuesta son validos hasta el día de mes año.',
        warranty: 'La garantía y mantenimiento de los equipos se mantiene vigente por el tiempo de duración del contrato de servicios. En caso de que un dispositivo GPS no reporte información a plataforma debido a la manipulación de personas ajenas a Detektor la revisión tendrá un costo de $ USD',
        extra: 'Esta propuesta ha sido desarrollada por Detektor y se mantendrá bajo propiedad hasta el momento en que haya una aceptación formal, de esta forma, sus contenidos no podrán ser revelados a ningún tercero, así como tampoco los conceptos originales desarrollados para Detektor podrán ser utilizados con fines comerciales. Detektor cree en la sostenibilidad, por eso presentamos propuestas electrónicas en pro del medio ambiente. Antes de imprimir este documento, asegúrese que es realmente necesario'
      }
    },
    'Panamá': {
      code: 'PA', currency: ['PAB', 'USD'], locale: 'es-PA', taxName: 'ITBMS', taxRates: [7, 0], phonePlaceholder: 'Ej. +507 6000 0000', cityPlaceholder: 'Ej. Ciudad de Panamá', advisorMode: 'list',
      agents: [
        { name: 'Shayra Marielys Luque Castillo', code: 'PA0039', role: 'Asesor Comercial' },
        { name: 'Nancy Maria Pinto Trejos', code: 'PA0052', role: 'Asesor Comercial' },
        { name: 'Katherine Michelle Collazo Pilozo', code: 'PA0024', role: 'Asesor Comercial' },
        { name: 'Saul Antonio Acosta Molinar', code: 'PA0074', role: 'Asesor Comercial' },
        { name: 'Giovanna Astrid Leblanc Veliz', code: 'PA0072', role: 'Coordinador Comercial' }
      ],
      terms: {
        installation: 'En disposición y coordinación con el cliente, luego de firmada la autorización de la presente oferta y el contrato de servicio.',
        payment: 'El pago del servicio lo puede realizar mediante transferencia electrónica a nuestras cuentas bancarias especificadas en el contrato de servicios o bien por descargo automático a tarjeta de crédito.',
        validity: 'El contrato de servicio comprende un período de meses (__), con permanencia mínima de __ meses. Precios y descuentos de esta propuesta son validos hasta el día de mes año.',
        warranty: 'La garantía y mantenimiento de los equipos se mantiene vigente por el tiempo de duración del contrato de servicios. En caso de que un dispositivo GPS no reporte información a plataforma debido a la manipulación de personas ajenas a Detektor la revisión tendrá un costo de $ USD',
        extra: 'Esta propuesta ha sido desarrollada por Detektor y se mantendrá bajo propiedad hasta el momento en que haya una aceptación formal, de esta forma, sus contenidos no podrán ser revelados a ningún tercero, así como tampoco los conceptos originales desarrollados para Detektor podrán ser utilizados con fines comerciales. Detektor cree en la sostenibilidad, por eso presentamos propuestas electrónicas en pro del medio ambiente. Antes de imprimir este documento, asegúrese que es realmente necesario'
      }
    },
    'Guatemala': {
      code: 'GT', currency: ['GTQ', 'USD'], locale: 'es-GT', taxName: 'IVA', taxRates: [12, 0], phonePlaceholder: 'Ej. +502 5555 5555', cityPlaceholder: 'Ej. Ciudad de Guatemala', advisorMode: 'list',
      agents: [
        { name: 'Edgar Salazar', code: 'GT-001', department: 'Comercial' },
        { name: 'Mirna Arevalo', code: 'GT-002', department: 'Comercial / Digital' },
        { name: 'Patricia Estrada', code: 'GT-003', department: 'Comercial / Digital' },
        { name: 'Randy Ford', code: 'GT-004', department: 'Comercial' },
        { name: 'Dorian Perez', code: 'GT-005', department: 'Comercial / Digital' },
        { name: 'Lucia Hernandez', code: 'GT-006', department: 'Comercial / Digital' },
        { name: 'Jorge Fajardo', code: 'GT-007', department: 'Comercial / Financieras' },
        { name: 'Roberto Mendez', code: 'GT-008', department: 'Comercial / Comisionistas' },
        { name: 'Evelyn Foronda', code: 'GT-009', department: 'Televentas/ Digital' },
        { name: 'Sthepannie Izaguirre', code: 'GT-010', department: 'Televentas/ Digital' },
        { name: 'Andrea Andrino', code: 'GT-011', department: 'Televentas/ Digital' },
        { name: 'Andrea Perez', code: 'GT-012', department: 'Televentas/ Digital' },
        { name: 'Nerly Carrillo', code: 'GT-013', department: 'Televentas' },
        { name: 'Jeanie Lopez', code: 'GT-014', department: 'Televentas' },
        { name: 'Nancy Maldonado', code: 'GT-015', department: 'Televentas' },
        { name: 'Deyna Coronado', code: 'GT-016', department: 'Televentas' },
        { name: 'Karin Cruz', code: 'GT-017', department: 'Televentas' },
        { name: 'Hefer Valenzuela', code: 'GT-018', department: 'Televentas/ Digital' },
        { name: 'Raul Con', code: 'GT-019', department: 'Televentas/ Digital' },
        { name: 'Wilson Perez', code: 'GT-020', department: 'Cuentas Estrategicas' },
        { name: 'Mariela Valladares', code: 'GT-021', department: 'Cuentas Estrategicas' },
        { name: 'Denis Vasquez', code: 'GT-022', department: 'Cuentas Estrategicas' },
        { name: 'Juan Pirish', code: 'GT-023', department: 'Cuentas Estrategicas' },
        { name: 'Alberto Morales', code: 'GT-024', department: 'Cuentas Estrategicas' },
        { name: 'Marvin Suchi', code: 'GT-025', department: 'Cuentas Estrategicas' }
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
      code: 'HN', currency: ['HNL', 'USD'], locale: 'es-HN', taxName: 'ISV', taxRates: [15, 0], phonePlaceholder: 'Ej. +504 9999 9999', cityPlaceholder: 'Ej. Tegucigalpa', advisorMode: 'list',
      agents: [
        { name: 'Fanny Roxana Rodriguez Lagos', code: 'HD-0030', department: 'VENTAS' },
        { name: 'Cinthia Carolina Alcantara Padilla', code: 'HD-0077', department: 'VENTAS (Televentas)' },
        { name: 'Odilson Arturo Mendoza Fletes', code: 'HD-0085', department: 'VENTAS' },
        { name: 'Belky Carolina Valladares Medina', code: 'HN-0106', department: 'VENTAS (Televentas)' },
        { name: 'Jessy Carolina Burgos Fiallos', code: 'HN-0240', department: 'VENTAS' },
        { name: 'Jeniffer Estefania Herrera Montalban', code: 'HN-0241', department: 'VENTAS (Televentas)' },
        { name: 'Mario Alejandro Garcia Salgado', code: 'HN-0251', department: 'VENTAS (Televentas)' },
        { name: 'Samir Ivan Hernandez Lopez', code: 'HN-0312', department: 'VENTAS' },
        { name: 'Allison Maria Oyuela Flores', code: 'HN-0322', department: 'VENTAS' },
        { name: 'Blanca Vanessa Sanders Barrera', code: 'HN-0325', department: 'VENTAS' },
        { name: 'Cinthya Karina Garcia Rodriguez', code: 'HN-0331', department: 'VENTAS' },
        { name: 'Wendy Jessenia Zavalo Salgado', code: 'HN-0333', department: 'VENTAS (Televentas)' },
        { name: 'Cristian Adalid Molina Madrid', code: 'HN-0349', department: 'VENTAS' },
        { name: 'Stefany Mabel Martinez Sevilla', code: 'HN-0405', department: 'VENTAS (Televentas)' },
        { name: 'Steffany Jasmin Blanco Posadas', code: 'HN-0441', department: 'VENTAS (Televentas)' },
        { name: 'Yaritza Pamela Ruiz Contreras', code: 'HN-0443', department: 'VENTAS (Televentas)' },
        { name: 'David Alejandro Nuñez Mejia', code: 'HN-0452', department: 'VENTAS' },
        { name: 'Odeth Magdalena Osorio Rodriguez', code: 'HN-0460', department: 'VENTAS' },
        { name: 'Iris Adelaida Alvarenga Alvarenga', code: 'HN-0477', department: 'VENTAS' },
        { name: 'Nancy Magaly Mejia Funes', code: 'HN-0483', department: 'VENTAS (Televentas)' },
        { name: 'Emma Waleska Barahona Rios', code: 'HN-0489', department: 'VENTAS' },
        { name: 'Seidy Arlete Acosta Brito', code: 'HN-0492', department: 'VENTAS' },
        { name: 'Daniel Mauricio Aguilar Gonzalez', code: 'HN-0494', department: 'VENTAS' },
        { name: 'Bryan Oliver Dormes Paz', code: 'HN-0500', department: 'VENTAS' },
        { name: 'Sandra Amelia Zelaya Bautista', code: 'HN-0502', department: 'VENTAS' },
        { name: 'William David Escobar Irias', code: 'HN-0503', department: 'VENTAS (Televentas)' },
        { name: 'Tania Isabel Reyes Fiallos', code: 'HN-0505', department: 'VENTAS (Televentas)' },
        { name: 'Elvia Carolina Doblado Gonzales', code: 'HN-0508', department: 'VENTAS' },
        { name: 'Ruth Lizbeth Lopez Rodriguez', code: 'HN-0511', department: 'VENTAS' },
        { name: 'Victoria Alejandra Guevara Sabillon', code: 'HN-0516', department: 'VENTAS' },
        { name: 'Dora Maricela Vasquez Marquez', code: 'HN-0518', department: 'VENTAS' }
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
      code: 'SV', currency: ['USD'], locale: 'es-SV', taxName: 'IVA', taxRates: [13, 0], phonePlaceholder: 'Ej. +503 7777 7777', cityPlaceholder: 'Ej. San Salvador', advisorMode: 'list',
      agents: [
        { name: 'Patricia Veronica Cazun Vasquez', code: 'SL0189', department: 'VENTAS' },
        { name: 'Gerber Edgardo Navarro Ramirez', code: 'SL0281', department: 'VENTAS (Televentas)' },
        { name: 'Brenda Elizabeth Palacios Ruiz', code: 'SL0284', department: 'VENTAS (Televentas)' },
        { name: 'Javier Aaron Valdez Zelaya', code: 'SL0289', department: 'VENTAS' },
        { name: 'Milagro del Carmen Ferrufino de Duque', code: 'SL0292', department: 'VENTAS (Televentas)' },
        { name: 'Guillermo Ernesto Aquino Galan', code: 'SL0306', department: 'VENTAS (Televentas)' },
        { name: 'Nathaly Isela Sosa Guzman', code: 'SL0317', department: 'VENTAS' },
        { name: 'Jimmy Osmin Erazo Martinez', code: 'SL0321', department: 'VENTAS' },
        { name: 'Nestor Josue Guzman Salmeron', code: 'SL0327', department: 'VENTAS' },
        { name: 'Rene Arturo Lazo Velasquez', code: 'SL0328', department: 'VENTAS' },
        { name: 'Daniel Alexander Mejia Montano', code: 'SL0332', department: 'VENTAS' },
        { name: 'Miriam Elizabeth Rodriguez Escobar', code: 'SL0338', department: 'VENTAS' },
        { name: 'José Wilber Vides Alvarez', code: 'SL0340', department: 'VENTAS' },
        { name: 'Diego Josue Calderon Perez', code: 'SL0344', department: 'VENTAS' }
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
      code: 'NI', currency: ['NIO', 'USD'], locale: 'es-NI', taxName: 'IVA', taxRates: [15, 0], phonePlaceholder: 'Ej. +505 8888 8888', cityPlaceholder: 'Ej. Managua', advisorMode: 'list',
      agents: [
        { name: 'Madeling Martinez', code: 'NI-001', department: 'COMERCIAL' },
        { name: 'Manuel Toruño', code: 'NI-002', department: 'COMERCIAL' },
        { name: 'Xochil Moreno', code: 'NI-003', department: 'COMERCIAL' },
        { name: 'Amy Ramirez', code: 'NI-004', department: 'TELEVENTAS' }
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
      code: 'VE', currency: ['VES', 'USD'], locale: 'es-VE', taxName: 'IVA', taxRates: [16, 0], phonePlaceholder: 'Ej. +58 412 000 0000', cityPlaceholder: 'Ej. Caracas', advisorMode: 'manual', agents: [],
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
      id: 'cazador',
      name: 'Detektor El Cazador',
      image: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7b8d48e70aa94196be3df0_Productos-soluciones-detektor-cotizador%20(1).webp',
      imageLabel: 'IMG: RECUPERACIÓN VEHICULAR',
      description: 'Rastreo y localización vehicular en caso de hurto con tecnología exclusiva y equipo de reacción 24/7.',
      benefit: '✓ La solución más efectiva del mercado',
      pdfDescription: 'Tecnología especializada para localizar vehículos en caso de hurto, incluso donde otras señales no llegan.'
    },
    {
      id: 'gps',
      name: 'Detektor GPS',
      image: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7b8d482a0eec4e41112bc8_Productos-soluciones-detektor-cotizador%20(5).webp',
      imageLabel: 'IMG: MAPA GPS FLOTA',
      description: 'Rastreo satelital de alta precisión con geocercas y reportes de ruta.',
      benefit: '✓ Visibilidad total de tu flota, en cualquier momento.',
      pdfDescription: 'Dispositivo de rastreo de alta precisión. Permite monitoreo en tiempo real, histórico de rutas y geocercas.'
    },
    {
      id: 'roadview',
      name: 'Roadview IA',
      image: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7b8d481a47f3c932fec5b9_Productos-soluciones-detektor-cotizador%20(4).webp',
      imageLabel: 'IMG: CÁMARA IA VEHÍCULO',
      description: 'Cámaras con IA para prevención de accidentes a través del análisis en tiempo real.',
      benefit: '✓ Reduce accidentes con alertas en tiempo real.',
      pdfDescription: 'Cámara con inteligencia artificial para prevenir riesgos y mejorar la conducción.'
    },
    {
      id: 'plus',
      name: 'Detektor Plus',
      image: 'https://cdn.prod.website-files.com/6a73658b9794177dcea91af7/6a7b8d4880cacf3cb9ac7328_Productos-soluciones-detektor-cotizador%20(3).webp',
      imageLabel: 'IMG: SATÉLITE / FLOTA CARGA',
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
  const CONTACTS = window.DTK_COUNTRY_CONTACTS || {};
  const $ = (id) => document.getElementById(id);
  const els = {};
  
  let reservedKey = '';
  let reservedNumber = '';
  let quoteTimer = null;
  let noticeTimer = null;
  let pdfPage2BaseHtml = '';
  
  // Variables para el autoguardado (Borrador)
  let draftTimer = null;
  let isLoadingDraft = false;

  function initRefs() {
    [
      'quote-date','quote-number','quote-country','quote-advisor-select','quote-advisor-manual','quote-advisor-code',
      'quote-advisor-phone','quote-advisor-email','currency-select','select-tax','input-tax-manual','tax-manual-wrap','tax-label','dtk-calc-tbody',
      'val-subtotal','val-tax','val-total','advisor-select-wrap','advisor-manual-wrap','dtk-products-catalog',
      'dtk-preview-modal','modal-scroll-area','dtk-pdf-export-content','dtk-render-host','dtk-notice', 'dtk-app', 'btn-download', 'btn-modal-download'
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

  function productImageHtml(product, context = 'catalog') {
    if (!product?.image) {
      return `<span>${escapeHtml(product?.imageLabel || product?.name || 'Imagen')}</span>`;
    }

    const style = context === 'pdf'
      ? 'width:100%;height:100%;object-fit:cover;display:block;'
      : 'width:100%;height:100%;object-fit:cover;display:block;';

    return `<img
      src="${escapeHtml(product.image)}"
      alt="${escapeHtml(product.name || 'Producto Detektor')}"
      crossorigin="anonymous"
      loading="eager"
      referrerpolicy="no-referrer"
      style="${style}"
    >`;
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

  function currentTaxRate() {
    const mode = els['val-tax']?.dataset?.mode || 'auto';
    const rate = mode === 'manual'
      ? parseNum(els['input-tax-manual']?.value)
      : parseNum(els['select-tax']?.value);
    return Math.min(100, Math.max(0, rate));
  }

  function formatNumberOnly(value) {
    const number = Number(value) || 0;
    const country = getCountry();
    const locale = country?.locale || 'es-CO';
    return new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
  }

  function formatMoney(value) {
    return `${formatNumberOnly(value)} ${currentCurrency()}`.trim();
  }

  function getCountry() {
    return DATA.countries[els['quote-country']?.value] || null;
  }

  function countryHasAdvisorList(country) {
    return !!country && Array.isArray(country.agents) && country.agents.length > 0;
  }

  function getAdvisorName() {
    const c = getCountry();
    if (!c) return '';
    if (countryHasAdvisorList(c)) {
      const val = els['quote-advisor-select'].value || '';
      const parts = val.split(' - ');
      return parts.length > 1 ? parts.slice(1).join(' - ') : val;
    }
    return els['quote-advisor-manual']?.value.trim() || '';
  }

  function getAdvisorCode() {
    return sanitizeCode(els['quote-advisor-code']?.value || '');
  }

  function buildManualAdvisorCode(name) {
    const words = String(name || '')
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/\s+/)
      .map(w => w.replace(/[^A-Za-z0-9]/g, '').toUpperCase())
      .filter(Boolean);

    if (!words.length) return '';
    if (words.length === 1) return words[0].slice(0, 12);

    return sanitizeCode(`${words[0].charAt(0)}${words[words.length - 1]}`).slice(0, 12);
  }

  function syncManualAdvisorCode() {
    const country = getCountry();
    if (!country || countryHasAdvisorList(country)) return;

    const code = buildManualAdvisorCode(els['quote-advisor-manual']?.value || '');
    els['quote-advisor-code'].value = code;
    els['quote-advisor-code'].classList.remove('dtk-error');

    reservedKey = '';
    reservedNumber = '';
    if (els['quote-number']) els['quote-number'].value = '';

    if (code) scheduleQuoteNumber();
  }

  function quoteYear() {
    const val = els['quote-date']?.value;
    const y = val ? String(val).slice(0,4) : String(new Date().getFullYear());
    return /^\d{4}$/.test(y) ? y : String(new Date().getFullYear());
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
    
    scheduleSaveDraft();
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
        <div class="dtk-product-image" style="padding:0;overflow:hidden;">
          ${productImageHtml(p, 'catalog')}
        </div>
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
      els['quote-advisor-select'].value = '';
      els['quote-advisor-select'].placeholder = 'Seleccione el país primero';
      els['quote-advisor-code'].readOnly = false;
      els['currency-select'].innerHTML = '';
      els['select-tax'].innerHTML = '';
      $('dtk-advisor-list').innerHTML = '';

      if (els['quote-advisor-phone']) {
        els['quote-advisor-phone'].placeholder = 'Ej. +00 000 0000';
      }
      const clientPhone = $('client-phone');
      if (clientPhone) {
        clientPhone.placeholder = 'Ej. +00 000 0000';
      }
      const clientCity = $('client-city');
      if (clientCity) {
        clientCity.placeholder = 'Ej. Ciudad';
      }

      return;
    }

    if (countryHasAdvisorList(country)) {
      els['advisor-select-wrap'].classList.remove('dtk-hidden');
      els['advisor-manual-wrap'].classList.add('dtk-hidden');
      els['quote-advisor-manual'].value = '';
      els['quote-advisor-code'].readOnly = true;
      els['quote-advisor-select'].value = '';
      els['quote-advisor-select'].placeholder = 'Escribe para buscar...';
      
      // Llenamos el Datalist
      $('dtk-advisor-list').innerHTML = country.agents.map(a =>
        `<option value="${escapeHtml(a.code)} - ${escapeHtml(a.name)}"></option>`
      ).join('');
      
    } else {
      els['advisor-select-wrap'].classList.add('dtk-hidden');
      els['advisor-manual-wrap'].classList.remove('dtk-hidden');
      els['quote-advisor-select'].value = '';
      $('dtk-advisor-list').innerHTML = '';
      els['quote-advisor-code'].readOnly = true;
      syncManualAdvisorCode();
    }

    const phonePlaceholder = country.phonePlaceholder || 'Ej. +00 000 000 0000';
    const cityPlaceholder = country.cityPlaceholder || 'Ej. Ciudad';

    if (els['quote-advisor-phone']) {
      els['quote-advisor-phone'].placeholder = phonePlaceholder;
    }

    const clientPhone = $('client-phone');
    if (clientPhone) {
      clientPhone.placeholder = phonePlaceholder;
    }

    const clientCity = $('client-city');
    if (clientCity) {
      clientCity.placeholder = cityPlaceholder;
    }

    els['currency-select'].innerHTML = country.currency.map(c => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
    els['tax-label'].textContent = country.taxName;
    els['select-tax'].innerHTML = country.taxRates.map(r => `<option value="${r}">${r}%</option>`).join('');

    if (els['input-tax-manual']) {
      els['input-tax-manual'].value = String(country.taxRates?.[0] ?? 0);
    }

    $('terms-installation').value = country.terms.installation || '';
    $('terms-payment').value = country.terms.payment || '';
    $('terms-validity').value = country.terms.validity || '';
    $('terms-warranty').value = country.terms.warranty || '';
    $('terms-extra').value = country.terms.extra || '';
    calculateAll();
  }

  function onAdvisorSelect() {
    const country = getCountry();
    if (!country || !countryHasAdvisorList(country)) return;
    
    // Extracción inteligente del código desde el valor del datalist
    const val = els['quote-advisor-select'].value || '';
    const codeMatch = val.match(/^([A-Z0-9-]+)\s-/);
    const code = codeMatch ? codeMatch[1] : val;
    
    els['quote-advisor-code'].value = code;
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
    // Usamos type="text" con inputmode decimal y formatNumberOnly para que cargue la visual inicial con los separadores
    tr.innerHTML = `
      <td><input class="dtk-input dtk-prod-name" value="${escapeHtml(name)}" placeholder="Ej. Detektor GPS"></td>
      <td><input type="number" class="dtk-input dtk-qty" value="${qty}" min="0" step="any" aria-label="Cantidad"></td>
      <td><input type="text" inputmode="decimal" class="dtk-input dtk-price" value="${formatNumberOnly(price)}" aria-label="Valor unitario"></td>
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
    if (els['val-subtotal']?.dataset.mode === 'auto') els['val-subtotal'].textContent = formatMoney(rawSubtotal);
    else subtotal = parseNum(els['val-subtotal']?.textContent);

    const taxRate = currentTaxRate();
    const tax = subtotal * (taxRate / 100);

    if (els['val-tax']?.dataset.mode === 'auto') {
      els['val-tax'].textContent = formatMoney(tax);
    }

    if (els['val-total']?.dataset.mode === 'auto') {
      const taxAmount = els['val-tax']?.dataset.mode === 'manual' ? parseNum(els['val-tax'].textContent) : tax;
      els['val-total'].textContent = formatMoney(subtotal + taxAmount);
    }
    
    renderEmptyRow();
    scheduleSaveDraft(); // Autoguardado silencioso al recalcular
  }

  function setMode(target, mode) {
    const valEl =
      target === 'tax'
        ? els['val-tax']
        : target === 'subtotal'
        ? els['val-subtotal']
        : els['val-total'];

    if (!valEl) return;

    valEl.dataset.mode = mode;

    if (target === 'tax') {
      valEl.contentEditable = 'false';
      valEl.classList.remove('manual');

      if (mode === 'manual') {
        const listRate = parseNum(els['select-tax']?.value);

        if (!String(els['input-tax-manual']?.value || '').trim()) {
          els['input-tax-manual'].value = String(listRate);
        }

        els['select-tax'].classList.add('dtk-hidden');
        els['tax-manual-wrap'].classList.remove('dtk-hidden');

        setTimeout(() => {
          els['input-tax-manual']?.focus();
          els['input-tax-manual']?.select?.();
        }, 0);
      } else {
        els['select-tax'].classList.remove('dtk-hidden');
        els['tax-manual-wrap'].classList.add('dtk-hidden');
      }

      calculateAll();
      return;
    }

    valEl.contentEditable = mode === 'manual' ? 'true' : 'false';
    valEl.classList.toggle('manual', mode === 'manual');

    if (mode === 'manual') {
      valEl.textContent = formatMoney(parseNum(valEl.textContent));
      valEl.focus();
    } else {
      calculateAll();
    }
  }

  function clearErrors() {
    document.querySelectorAll('.dtk-error').forEach(el => el.classList.remove('dtk-error'));
  }

  async function validateForm({ requireFinalNumber = false } = {}) {
    clearErrors();
    if (!countryHasAdvisorList(getCountry())) syncManualAdvisorCode();
    let valid = true;
    
    const requiredIds = [
      'client-name',
      'client-email',
      'client-phone',
      'quote-date',
      'quote-country',
      'quote-advisor-code',
      'quote-advisor-email', 
      'terms-installation',
      'terms-payment',
      'terms-validity',
      'terms-warranty'
    ];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const id of requiredIds) {
      const el = $(id);
      const value = String(el?.value || '').trim();
      
      if (!el || !value) {
        el?.classList.add('dtk-error');
        valid = false;
      } else if ((id === 'client-email' || id === 'quote-advisor-email') && !emailRegex.test(value)) {
        el?.classList.add('dtk-error');
        valid = false;
      }
    }

    const country = getCountry();
    if (countryHasAdvisorList(country)) {
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
      showNotice('Revisa los campos en rojo. Falta información obligatoria (*) o un correo no es válido.', 'error');
      document.querySelector('.dtk-error')?.scrollIntoView({ behavior:'smooth', block:'center' });
      return false;
    }

    const number = await reserveQuoteNumber(false, { showError: requireFinalNumber });
    if (!number) {
      if (requireFinalNumber) {
        els['quote-number']?.classList.add('dtk-error');
        els['quote-number']?.scrollIntoView({ behavior:'smooth', block:'center' });
        return false;
      }
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

  function setPdfOptionalText(id, value, { row = true } = {}) {
    const el = $(id);
    if (!el) return;

    const clean = String(value || '').trim();
    el.textContent = clean;

    if (row) {
      const wrapper = el.closest('.pdf-info-row');
      if (wrapper) wrapper.style.display = clean ? 'grid' : 'none';
    } else {
      el.style.display = clean ? '' : 'none';
    }
  }

  function populateCountryContact() {
    const countryName = els['quote-country']?.value || '';
    const contact = CONTACTS[countryName] || null;
    const wrap = $('prev-country-contact');
    const links = $('prev-country-social-links');
    const web = $('prev-country-web');

    if (!wrap || !links || !web) return;

    if (!contact?.web) {
      wrap.style.display = 'none';
      links.innerHTML = '';
      web.textContent = '';
      web.removeAttribute('href');
      return;
    }

    wrap.style.display = '';

    links.innerHTML = (contact.socials || [])
      .filter(item => item?.url)
      .map(item => {
        let iconName = item.type;
        if (iconName === 'x') iconName = 'twitter-alt';
        
        return `
        <a
          class="pdf-country-social-link ${escapeHtml(item.type || '')}"
          href="${escapeHtml(item.url)}"
          target="_blank"
          rel="noopener"
          title="${escapeHtml(item.type || 'Red social')}"
        ><i class="fi fi-brands-${escapeHtml(iconName)}"></i></a>
      `}).join('');

    web.href = contact.web;
    web.textContent = contact.web
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '');
  }

  function populatePreview() {
    const gv = id => $(id)?.value?.trim() || '';
    setPdfOptionalText('prev-client-name', gv('client-name'));
    setPdfOptionalText('prev-client-company', gv('client-company'));
    setPdfOptionalText('prev-client-role', gv('client-role'));
    setPdfOptionalText('prev-client-email', gv('client-email'));
    setPdfOptionalText('prev-client-phone', gv('client-phone'));
    setPdfOptionalText('prev-client-city', gv('client-city'));
    setPdfOptionalText('prev-quote-date', gv('quote-date'));
    setPdfOptionalText('prev-quote-number', gv('quote-number'));
    setPdfOptionalText('prev-country', gv('quote-country'));
    setPdfOptionalText('prev-advisor', getAdvisorName());

    setText('prev-adv-name-box', getAdvisorName());
    setPdfOptionalText('prev-adv-mail-box', gv('quote-advisor-email'), { row: false });
    setPdfOptionalText('prev-adv-phone-box', gv('quote-advisor-phone'), { row: false });

    setText('prev-subtotal', els['val-subtotal']?.textContent);
    setText('prev-tax', els['val-tax']?.textContent);
    setText('prev-total', els['val-total']?.textContent);

    const obs = gv('quote-obs');
    const obsWrap = $('prev-obs')?.closest('.pdf-observation');
    if ($('prev-obs')) $('prev-obs').textContent = obs;
    if (obsWrap) obsWrap.style.display = obs ? '' : 'none';

    populateCountryContact();

    const country = getCountry();
    setText('prev-tax-label', country?.taxName || 'IVA');
    const taxRate = currentTaxRate();
    const taxPct = `(${taxRate}%)`;
    setText('prev-tax-percent', taxPct, '');

    const rows = rowData();
    const previewBody = $('prev-calc-tbody');
    if (previewBody) {
      previewBody.innerHTML = rows.map(item => `<tr><td>• ${escapeHtml(item.name)}</td><td>${item.qty}</td><td>${escapeHtml(formatMoney(item.price))}</td><td style="text-align:right;font-weight:700">${escapeHtml(formatMoney(item.subtotal))}</td></tr>`).join('');
    }

    const chosen = DATA.products.map(product => ({
      productId: product.id,
      name: product.name
    }));

    const solutions = $('prev-solutions');
    if (solutions) {
      const solutionsTitle = solutions.previousElementSibling;

      if (!chosen.length) {
        solutions.innerHTML = '';
        solutions.style.display = 'none';

        if (solutionsTitle?.classList?.contains('pdf-section-title')) {
          solutionsTitle.style.display = 'none';
        }
      } else {
        solutions.style.display = '';

        if (solutionsTitle?.classList?.contains('pdf-section-title')) {
          solutionsTitle.style.display = '';
        }

        const selectedProductIds = rows.map(r => r.productId).filter(Boolean);

        solutions.innerHTML = chosen.map((item, i) => {
          const product = DATA.products.find(p => p.id === item.productId);
          if (!product) return '';

          const title = product.name;
          const description = product.pdfDescription || 'Solución configurada de acuerdo con las necesidades de la operación.';
          
          const bullets =
            product.id === 'gps'
              ? ['● Monitoreo y recorridos', '● Geocercas y alertas', '● Reportes de operación']
              : ['● Tecnología especializada', '● Configuración según operación', '● Respaldo Detektor'];

          const isSelected = selectedProductIds.includes(product.id);

          return `<div class="pdf-solution ${isSelected ? 'is-selected' : ''}">
            <div class="pdf-solution-img" style="overflow:hidden;">
              ${productImageHtml(product, 'pdf')}
            </div>
            <div class="pdf-solution-copy">
              <h4>${escapeHtml(title)}</h4>
              <p>${escapeHtml(description)}</p>
              <div class="pdf-bullets">${bullets.map(b => `<span>${escapeHtml(b)}</span>`).join('')}</div>
            </div>
          </div>`;
        }).join('');
      }
    }

    const termsLines = [];

    if (gv('terms-payment')) {
      termsLines.push(`Condiciones de pago: ${gv('terms-payment')}`);
    }
    if (gv('terms-installation')) {
      termsLines.push(`Instalación y entrega: ${gv('terms-installation')}`);
    }
    if (gv('terms-validity')) {
      termsLines.push(`Vigencia: ${gv('terms-validity')}`);
    }
    if (gv('terms-warranty')) {
      termsLines.push(`Garantía: ${gv('terms-warranty')}`);
    }
    if (gv('terms-extra')) {
      if (termsLines.length) termsLines.push('');
      termsLines.push('Consideraciones adicionales:');
      termsLines.push(gv('terms-extra'));
    }

    const termsText = termsLines.join('\n');
    const termsBox = $('prev-terms');
    if (termsBox) {
      termsBox.textContent = termsText;
      termsBox.style.display = termsText ? '' : 'none';
    }
  }

  function restorePdfDynamicLayout() {
    const doc = els['dtk-pdf-export-content'];
    if (!doc) return;

    doc.querySelectorAll('.pdf-generated-page').forEach(page => page.remove());
    doc.querySelectorAll('.pdf-final-page').forEach(page => page.classList.remove('pdf-final-page'));

    const page2 = $('pdf-page-2');
    const inner = page2?.querySelector('.pdf-inner');

    if (inner && pdfPage2BaseHtml) {
      inner.innerHTML = pdfPage2BaseHtml;
    }
  }

  function createPdfContinuationPage(index) {
    const doc = els['dtk-pdf-export-content'];
    const page = document.createElement('section');

    page.className = 'dtk-pdf-page pdf-page2 pdf-generated-page';
    page.id = `pdf-page-${index}`;
    page.innerHTML = '<div class="pdf-inner"></div>';

    doc.appendChild(page);
    return page;
  }

  function currentPageFits(page, safety = 12) {
    const inner = page?.querySelector('.pdf-inner');
    if (!page || !inner) return true;

    return inner.scrollHeight <= ((page.clientHeight || 1123) - safety);
  }

  function continuationTitle(titleEl, suffix = 'CONT.') {
    const clone = titleEl.cloneNode(true);
    clone.classList.add('pdf-flow-continuation-title');

    const text = document.createElement('span');
    text.style.fontSize = '70%';
    text.style.fontWeight = '600';
    text.textContent = ` (${suffix})`;
    clone.appendChild(text);

    return clone;
  }

  function startNewPdfPage(state) {
    state.page = createPdfContinuationPage(++state.pageIndex);
    state.inner = state.page.querySelector('.pdf-inner');
  }

  function splitSolutionsGroup(group, state) {
    const title = group.querySelector('.pdf-section-title');
    const list = group.querySelector('.pdf-solutions');
    const items = [...(list?.children || [])];

    if (!title || !list || !items.length) {
      state.inner.appendChild(group);
      return;
    }

    let firstChunk = true;
    let chunk = null;
    let chunkList = null;

    const newChunk = () => {
      chunk = document.createElement('div');
      chunk.className = 'pdf-flow-group pdf-flow-solutions';

      chunk.appendChild(
        firstChunk ? title.cloneNode(true) : continuationTitle(title)
      );

      chunkList = document.createElement('div');
      chunkList.className = 'pdf-solutions';
      chunk.appendChild(chunkList);

      state.inner.appendChild(chunk);
      firstChunk = false;
    };

    newChunk();

    items.forEach(item => {
      chunkList.appendChild(item);

      if (!currentPageFits(state.page)) {
        chunkList.removeChild(item);

        if (!chunkList.children.length) {
          chunkList.appendChild(item);
          return;
        }

        startNewPdfPage(state);
        newChunk();
        chunkList.appendChild(item);
      }
    });
  }

  function createEconomicTable(originalTable) {
    const table = originalTable.cloneNode(false);
    table.removeAttribute('id');

    const thead = originalTable.querySelector('thead')?.cloneNode(true);
    const tbody = document.createElement('tbody');

    if (thead) table.appendChild(thead);
    table.appendChild(tbody);

    return { table, tbody };
  }

  function splitEconomicGroup(group, state) {
    const title = group.querySelector('.pdf-section-title');
    const sourceTable = group.querySelector('.pdf-table');
    const rows = [...(sourceTable?.querySelectorAll('tbody tr') || [])];
    const bottom = group.querySelector('.pdf-econ-bottom');
    const observation = group.querySelector('.pdf-observation');

    if (!title || !sourceTable) {
      state.inner.appendChild(group);
      return;
    }

    let firstChunk = true;
    let chunk = null;
    let shell = null;

    const newChunk = () => {
      chunk = document.createElement('div');
      chunk.className = 'pdf-flow-group pdf-flow-economic';

      chunk.appendChild(
        firstChunk ? title.cloneNode(true) : continuationTitle(title)
      );

      shell = createEconomicTable(sourceTable);
      chunk.appendChild(shell.table);

      state.inner.appendChild(chunk);
      firstChunk = false;
    };

    newChunk();

    rows.forEach(row => {
      shell.tbody.appendChild(row);

      if (!currentPageFits(state.page)) {
        shell.tbody.removeChild(row);

        if (!shell.tbody.children.length) {
          shell.tbody.appendChild(row);
          return;
        }

        startNewPdfPage(state);
        newChunk();
        shell.tbody.appendChild(row);
      }
    });

    if (bottom) {
      chunk.appendChild(bottom);

      if (!currentPageFits(state.page)) {
        chunk.removeChild(bottom);
        startNewPdfPage(state);

        const totalsGroup = document.createElement('div');
        totalsGroup.className = 'pdf-flow-group pdf-flow-economic';
        totalsGroup.appendChild(continuationTitle(title, 'TOTALES'));
        totalsGroup.appendChild(bottom);
        state.inner.appendChild(totalsGroup);

        chunk = totalsGroup;
      }
    }

    if (observation && observation.style.display !== 'none') {
      chunk.appendChild(observation);

      if (!currentPageFits(state.page)) {
        chunk.removeChild(observation);
        startNewPdfPage(state);

        const obsGroup = document.createElement('div');
        obsGroup.className = 'pdf-flow-group pdf-flow-economic';
        obsGroup.appendChild(observation);
        state.inner.appendChild(obsGroup);
      }
    }
  }

  function moveWholeGroup(group, state) {
    state.inner.appendChild(group);

    if (!currentPageFits(state.page) && state.inner.children.length > 1) {
      state.inner.removeChild(group);
      startNewPdfPage(state);
      state.inner.appendChild(group);
    }
  }

  function markFinalPdfPage() {
    const pages = [
      ...document.querySelectorAll('#dtk-pdf-export-content > .dtk-pdf-page')
    ];

    pages.forEach(page => page.classList.remove('pdf-final-page'));

    const lastPage = pages.at(-1);
    if (lastPage) {
      lastPage.classList.add('pdf-final-page');
    }
  }

  function rebuildPageNavigation() {
    const pages = [
      ...document.querySelectorAll('#dtk-pdf-export-content > .dtk-pdf-page')
    ];

    const dots = document.querySelector('.dtk-page-dots');
    if (!dots) return;

    dots.innerHTML = pages.map((page, index) => `
      <button
        class="dtk-nav-dot ${index === 0 ? 'active' : ''}"
        data-target="${page.id}"
      >${index + 1}</button>
    `).join('');

    dots.querySelectorAll('.dtk-nav-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        scrollToPage(dot.dataset.target, dot);
      });
    });
  }

  function paginatePdfDynamically() {
    const page2 = $('pdf-page-2');
    const sourceInner = page2?.querySelector('.pdf-inner');
    if (!page2 || !sourceInner) return;

    const groups = [
      ...sourceInner.querySelectorAll(':scope > .pdf-flow-group')
    ];

    sourceInner.innerHTML = '';

    const state = {
      page: page2,
      inner: sourceInner,
      pageIndex: 2
    };

    groups.forEach(group => {
      const type = group.dataset.flowGroup;

      if (
        type === 'solutions' &&
        group.querySelector('.pdf-solutions')?.style.display === 'none'
      ) {
        return;
      }

      if (type === 'solutions') {
        state.inner.appendChild(group);

        if (!currentPageFits(state.page)) {
          state.inner.removeChild(group);

          if (state.inner.children.length) {
            startNewPdfPage(state);
          }

          state.inner.appendChild(group);

          if (!currentPageFits(state.page)) {
            state.inner.removeChild(group);
            splitSolutionsGroup(group, state);
          }
        }

        return;
      }

      if (type === 'economic') {
        state.inner.appendChild(group);

        if (!currentPageFits(state.page)) {
          state.inner.removeChild(group);

          if (state.inner.children.length) {
            startNewPdfPage(state);
          }

          state.inner.appendChild(group);

          if (!currentPageFits(state.page)) {
            state.inner.removeChild(group);
            splitEconomicGroup(group, state);
          }
        }

        return;
      }

      moveWholeGroup(group, state);
    });

    [...document.querySelectorAll('.pdf-generated-page')].forEach(page => {
      const pageInner = page.querySelector('.pdf-inner');
      if (pageInner && !pageInner.children.length) {
        page.remove();
      }
    });

    markFinalPdfPage();
    rebuildPageNavigation();
  }

  async function ensurePdfMeasurable(callback) {
    const modal = els['dtk-preview-modal'];

    if (!modal) {
      callback();
      return;
    }

    const wasOpen = modal.classList.contains('open');
    const previousVisibility = modal.style.visibility;

    if (!wasOpen) {
      modal.style.visibility = 'hidden';
      modal.classList.add('open');
    }

    await new Promise(resolve =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    );

    callback();

    if (!wasOpen) {
      modal.classList.remove('open');
      modal.style.visibility = previousVisibility;
    }
  }

  async function openPreview() {
    if (!(await validateForm({ requireFinalNumber: false }))) return;

    restorePdfDynamicLayout();
    calculateAll();
    populatePreview();

    els['dtk-preview-modal'].classList.add('open');
    document.body.style.overflow = 'hidden';

    await new Promise(resolve =>
      requestAnimationFrame(() => requestAnimationFrame(resolve))
    );

    await waitForImages(els['dtk-pdf-export-content']);
    paginatePdfDynamically();

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
    const pages = [...document.querySelectorAll('#dtk-pdf-export-content > .dtk-pdf-page')];
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

      // 2. Validamos que todo esté lleno y aseguramos el número de propuesta final
      if (!(await validateForm({ requireFinalNumber: true }))) return;

      calculateAll();
      showNotice('Preparando datos de la cotización...', 'success');

      // 3. Empaquetamos toda la información en un JSON limpio
      const payload = {
        quoteData: {
          date: $('quote-date').value,
          number: els['quote-number'].value,
          country: els['quote-country'].value,
          advisorCode: getAdvisorCode(),
          advisorName: getAdvisorName(),
          advisorEmail: $('quote-advisor-email').value,
          advisorPhone: $('quote-advisor-phone').value,
          observations: $('quote-obs').value
        },
        clientData: {
          name: $('client-name').value,
          company: $('client-company').value,
          role: $('client-role').value,
          email: $('client-email').value,
          phone: $('client-phone').value,
          city: $('client-city').value
        },
        terms: {
          installation: $('terms-installation').value,
          payment: $('terms-payment').value,
          validity: $('terms-validity').value,
          warranty: $('terms-warranty').value,
          extra: $('terms-extra').value
        },
        financials: {
          currency: currentCurrency(),
          taxRate: currentTaxRate(),
          taxLabel: getCountry()?.taxName || 'IVA',
          subtotal: els['val-subtotal'].textContent,
          taxAmount: els['val-tax'].textContent,
          total: els['val-total'].textContent
        },
        products: rowData().map(item => ({
          productId: item.productId,
          name: item.name,
          qty: item.qty,
          price: item.price,
          discount: item.discount,
          subtotal: item.subtotal
        }))
      };

      console.log("🚀 Payload listo para enviar a Render:", payload);
      showNotice('Propuesta generada. Revisa la consola.', 'success');

    } finally {
      // 4. Restauramos los botones
      btn1.disabled = false; btn2.disabled = false;
      btn1.textContent = originalText1; btn2.textContent = originalText2;
    }
  }

  function resetModes() {
    document.querySelectorAll('.dtk-toggle').forEach(group => {
      const target = group.dataset.target;

      group.querySelectorAll('button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === 'auto');
      });

      setMode(target, 'auto');
    });

    if (els['tax-manual-wrap']) {
      els['tax-manual-wrap'].classList.add('dtk-hidden');
    }

    if (els['select-tax']) {
      els['select-tax'].classList.remove('dtk-hidden');
    }
  }

  function clearForm() {
    try { localStorage.removeItem('dtk_quote_draft'); } catch(e) {}

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

  // --- LÓGICA DE AUTOGUARDADO (BORRADOR) ---
  function saveDraft() {
    if (isLoadingDraft) return;
    
    const draft = {
      quoteDate: els['quote-date']?.value || '',
      quoteNumber: els['quote-number']?.value || '',
      reservedKeyState: reservedKey,
      reservedNumberState: reservedNumber,
      quoteCountry: els['quote-country']?.value || '',
      quoteAdvisorSelect: els['quote-advisor-select']?.value || '',
      quoteAdvisorManual: els['quote-advisor-manual']?.value || '',
      quoteAdvisorPhone: els['quote-advisor-phone']?.value || '',
      quoteAdvisorEmail: els['quote-advisor-email']?.value || '',
      quoteObs: $('quote-obs')?.value || '',
      clientName: $('client-name')?.value || '',
      clientCompany: $('client-company')?.value || '',
      clientRole: $('client-role')?.value || '',
      clientEmail: $('client-email')?.value || '',
      clientPhone: $('client-phone')?.value || '',
      clientCity: $('client-city')?.value || '',
      termsInst: $('terms-installation')?.value || '',
      termsPay: $('terms-payment')?.value || '',
      termsVal: $('terms-validity')?.value || '',
      termsWarr: $('terms-warranty')?.value || '',
      termsExtra: $('terms-extra')?.value || '',
      currency: els['currency-select']?.value || '',
      taxSelect: els['select-tax']?.value || '',
      taxManual: els['input-tax-manual']?.value || '',
      rows: rowData().map(r => ({ name: r.name, qty: r.qty, price: r.price, discount: r.discount, productId: r.productId })),
      modes: {
        subtotal: els['val-subtotal']?.dataset.mode || 'auto',
        tax: els['val-tax']?.dataset.mode || 'auto',
        total: els['val-total']?.dataset.mode || 'auto'
      },
      manualValues: {
        subtotal: els['val-subtotal']?.textContent || '0',
        tax: els['val-tax']?.textContent || '0',
        total: els['val-total']?.textContent || '0'
      }
    };
    
    try { localStorage.setItem('dtk_quote_draft', JSON.stringify(draft)); } catch(e) {}
  }

  function scheduleSaveDraft() {
    if (isLoadingDraft) return;
    clearTimeout(draftTimer);
    draftTimer = setTimeout(saveDraft, 800);
  }

  function loadDraft() {
    try {
      const raw = localStorage.getItem('dtk_quote_draft');
      if (!raw) return false;
      const draft = JSON.parse(raw);
      if (!draft) return false;

      isLoadingDraft = true;

      if (draft.quoteCountry) {
        els['quote-country'].value = draft.quoteCountry;
        applyCountry(); 
      }

      reservedKey = draft.reservedKeyState || '';
      reservedNumber = draft.reservedNumberState || '';
      const setVal = (id, val) => { const el = $(id); if (el && val !== undefined) el.value = val; };

      setVal('quote-date', draft.quoteDate);
      setVal('quote-number', draft.quoteNumber);
      if (reservedNumber) {
        els['quote-number'].value = reservedNumber;
      }
      
      setVal('quote-advisor-select', draft.quoteAdvisorSelect);
      setVal('quote-advisor-manual', draft.quoteAdvisorManual);
      if (draft.quoteCountry && countryHasAdvisorList(getCountry())) {
         onAdvisorSelect();
      } else {
         syncManualAdvisorCode();
      }

      setVal('quote-advisor-phone', draft.quoteAdvisorPhone);
      setVal('quote-advisor-email', draft.quoteAdvisorEmail);
      setVal('quote-obs', draft.quoteObs);
      setVal('client-name', draft.clientName);
      setVal('client-company', draft.clientCompany);
      setVal('client-role', draft.clientRole);
      setVal('client-email', draft.clientEmail);
      setVal('client-phone', draft.clientPhone);
      setVal('client-city', draft.clientCity);
      setVal('terms-installation', draft.termsInst);
      setVal('terms-payment', draft.termsPay);
      setVal('terms-validity', draft.termsVal);
      setVal('terms-warranty', draft.termsWarr);
      setVal('terms-extra', draft.termsExtra);

      if (draft.currency) els['currency-select'].value = draft.currency;
      if (draft.taxSelect) els['select-tax'].value = draft.taxSelect;
      if (draft.taxManual) els['input-tax-manual'].value = draft.taxManual;

      els['dtk-calc-tbody'].innerHTML = '';
      if (draft.rows && draft.rows.length) {
        draft.rows.forEach(r => appendRow(r.name, r.qty, r.price, r.discount, r.productId));
      } else {
        renderEmptyRow();
      }

      if (draft.modes) {
         if (draft.modes.subtotal === 'manual') { setMode('subtotal', 'manual'); els['val-subtotal'].textContent = draft.manualValues.subtotal; }
         if (draft.modes.tax === 'manual') { setMode('tax', 'manual'); els['val-tax'].textContent = draft.manualValues.tax; }
         if (draft.modes.total === 'manual') { setMode('total', 'manual'); els['val-total'].textContent = draft.manualValues.total; }
      }

      calculateAll();

      isLoadingDraft = false;
      return true;
    } catch(e) {
      console.error('No se pudo cargar el borrador.', e);
      isLoadingDraft = false;
      return false;
    }
  }

  function wireEvents() {
    const appEl = els['dtk-app'] || document.body;
    appEl.addEventListener('input', scheduleSaveDraft);
    appEl.addEventListener('change', scheduleSaveDraft);

    els['quote-country'].addEventListener('change', (event) => {
      event.stopImmediatePropagation();
      applyCountry();
    }, true);

    els['quote-advisor-select'].addEventListener('change', (event) => {
      event.stopImmediatePropagation();
      onAdvisorSelect();
    }, true);
    els['quote-advisor-manual'].addEventListener('input', () => {
      syncManualAdvisorCode();
    });
    els['quote-advisor-code'].addEventListener('input', e => {
      if (!countryHasAdvisorList(getCountry())) {
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

    els['input-tax-manual']?.addEventListener('input', () => {
      if (els['val-tax'].dataset.mode === 'manual') calculateAll();
    });

    els['input-tax-manual']?.addEventListener('blur', () => {
      if (els['val-tax'].dataset.mode === 'manual') {
        const safeRate = currentTaxRate();
        els['input-tax-manual'].value = String(safeRate);
        calculateAll();
      }
    });

    els['dtk-products-catalog'].addEventListener('click', e => {
      const add = e.target.closest('.dtk-btn-add');
      if (add) addCatalogProduct(add.dataset.productId);
      if (e.target.id === 'btn-add-custom') appendRow('', 1, 0, 0, '');
    });

    // LÓGICA DE FORMATEO EN TABLA (MÁSCARA DE MONEDA DINÁMICA)
    els['dtk-calc-tbody'].addEventListener('focusin', e => {
      if (e.target.matches('.dtk-price')) {
        // Al hacer clic, mostramos el número crudo para teclear fácilmente sin que el cursor salte
        const num = parseNum(e.target.value);
        e.target.value = num === 0 ? '' : num;
      }
    });
    
    els['dtk-calc-tbody'].addEventListener('focusout', e => {
      if (e.target.matches('.dtk-price')) {
        // Al salir del campo, formateamos el número según la moneda del país seleccionado
        const num = parseNum(e.target.value);
        e.target.value = formatNumberOnly(num);
        calculateAll();
      }
    });

    els['dtk-calc-tbody'].addEventListener('input', e => {
      if (e.target.matches('.dtk-prod-name,.dtk-qty,.dtk-price,.dtk-desc')) {
        e.target.classList.remove('dtk-error');
        // Calculamos todo por debajo (parseNum se encarga de leer bien aunque no esté formateado aún)
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

    [els['val-subtotal'], els['val-total']].forEach(el => {
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
    $('top-clear')?.addEventListener('click', askClear);
    $('btn-clear-cancel').addEventListener('click', () => {
      $('confirm-actions').classList.add('dtk-hidden');
      $('main-actions').classList.remove('dtk-hidden');
    });
    $('btn-clear-confirm').addEventListener('click', clearForm);
  }

  window.DTK_DEBUG_ADVISORS = function() {
    const names = ['Costa Rica','Panamá','Guatemala','Honduras','El Salvador','Nicaragua'];
    return Object.fromEntries(names.map(name => {
      const c = DATA.countries[name];
      return [name, {
        mode: countryHasAdvisorList(c) ? 'list' : 'manual',
        advisors: c?.agents?.length || 0
      }];
    }));
  };

  function init() {
    initRefs();

    const listCountries = ['Costa Rica','Panamá','Guatemala','Honduras','El Salvador','Nicaragua'];
    const advisorCounts = Object.fromEntries(
      listCountries.map(name => [name, DATA.countries[name]?.agents?.length || 0])
    );
    console.info('[Detektor Cotizador]', window.DTK_BUILD_VERSION, 'listas de asesores:', advisorCounts);

    populateCountries();
    populateProducts();

    const page2Inner = $('pdf-page-2')?.querySelector('.pdf-inner');
    if (page2Inner) {
      pdfPage2BaseHtml = page2Inner.innerHTML;
    }

    const isDraftLoaded = loadDraft();

    if (!isDraftLoaded) {
      els['quote-date'].value = todayLocal();
      els['dtk-calc-tbody'].innerHTML = '';
      renderEmptyRow();
      calculateAll();
    } else {
      setTimeout(() => {
        showNotice('Borrador previo cargado con éxito. No perdiste tus datos.', 'success');
      }, 500);
    }
    
    wireEvents();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
