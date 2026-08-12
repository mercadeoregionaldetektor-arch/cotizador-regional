// ==========================================
  // NUEVA RUTA: GENERACIÓN DE PDF
  // ==========================================
  if (req.method === 'POST' && pathname === '/api/generate-pdf') {
    try {
      const payload = await readBody(req);

      // Llamamos al archivo pdfdescargar.js
      const htmlContent = buildPdfTemplate(payload); 

      // 1. Lanzamos el navegador virtual (Configuración estable para Render)
      const browser = await puppeteer.launch({
        headless: "new",
        args: [
          '--no-sandbox', 
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--no-zygote'
        ]
      });
      
      const page = await browser.newPage();

      // 2. Renderizamos el HTML
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

      // 3. Imprimimos a PDF
      const pdfBuffer = await page.pdf({
        width: '794px',
        height: '1123px',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
      });

      await browser.close();

      // 4. Enviamos el archivo de vuelta
      res.writeHead(200, {
        ...cors,
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuffer.length
      });
      res.end(pdfBuffer);
      
      return;

    } catch (error) {
      // ESTE ES EL ERROR QUE HACE QUE TU BOTÓN SE PONGA ROJO
      console.error('Error interno de Puppeteer al generar PDF:', error);
      return sendJson(res, 500, { ok: false, error: 'Fallo al generar el documento PDF' }, cors);
    }
  }

  // Fallback para rutas no encontradas
  return sendJson(res, 404, { ok: false, error: 'Not found' }, cors);
});

server.listen(PORT, HOST, () => {
  console.log(`Detektor Cotizador API activa en puerto ${PORT}`);
});
