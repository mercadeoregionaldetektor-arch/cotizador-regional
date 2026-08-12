/* LÓGICA SEPARADA: Exclusiva para el botón de Generar y Descargar PDF */
(() => {
  'use strict';

  async function handleDownloadClick(e) {
    e.preventDefault();
    
    // Verificamos que cotizador.js esté activo para darnos los datos
    if (!window.dtkGetPayload || !window.dtkShowNotice || !window.dtkApiBase) {
      console.error('Error: cotizador.js no está cargado correctamente.');
      return;
    }

    console.log('1. Botón de descarga presionado. Solicitando validación a cotizador.js...');
    
    // Le pedimos a cotizador.js que valide el formulario y nos dé los datos listos
    const payload = await window.dtkGetPayload();
    
    if (!payload) {
      console.log('2. Validación fallida. Descarga cancelada.');
      return;
    }

    console.log('3. Datos validados. Conectando con el servidor...', payload);
    window.dtkShowNotice('Enviando datos al servidor para generar la propuesta...', 'success');

    try {
      // Enviamos la petición a Render
      const response = await fetch(`${window.dtkApiBase}/api/generate-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`Error en el servidor: ${response.status}`);

      const blob = await response.blob();
      console.log('4. PDF recibido. Forzando descarga en el navegador...');
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Cotizacion_${payload.quoteData.number}.pdf`;
      
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      
      window.dtkShowNotice('PDF generado y descargado con éxito.', 'success');
    } catch (error) {
      console.error('Error en la descarga:', error);
      window.dtkShowNotice('No fue posible conectar con el servidor para generar el PDF.', 'error');
    }
  }

  // Asignar el evento a los dos botones de descarga en cuanto cargue la página
  document.addEventListener('DOMContentLoaded', () => {
    const btnMain = document.getElementById('btn-download');
    const btnModal = document.getElementById('btn-modal-download');
    
    if (btnMain) btnMain.addEventListener('click', handleDownloadClick);
    if (btnModal) btnModal.addEventListener('click', handleDownloadClick);
    
    console.log('Módulo de descarga PDF separado inicializado correctamente.');
  });
})();
