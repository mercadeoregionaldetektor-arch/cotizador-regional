# Cotizador Detektor LATAM — Webflow + GitHub

Proyecto funcional del cotizador manual reconstruido a partir del front actual y de las referencias visuales suministradas.

## Qué incluye
- `frontend/`: aplicación completa en HTML/CSS/JS, usable de forma independiente o embebida en Webflow.
- `backend/`: API Node.js sin dependencias para consecutivos centrales de cotización.
- `webflow/`: instrucciones y snippet para integrar el front en Webflow.
- `reference/`: capturas suministradas como referencia visual.

## Reglas implementadas
- Fecha automática al abrir la cotización y editable por el usuario.
- Número automático con formato `DET-PAIS-AÑO-ASESOR-0001`.
- El identificador del asesor forma parte del número tanto si el asesor es manual como si viene de lista.
- Lista de asesores **solo** en Costa Rica, Guatemala, Honduras, El Salvador y Nicaragua.
- Asesor manual en Colombia, Panamá y Venezuela.
- Venezuela incluida con monedas USD/VES e IVA general del 16% (editable desde configuración).
- Productos sin precios precargados: todos entran en `0` y el asesor debe completar el valor.
- Limpieza con confirmación.
- Vista previa de 3 páginas con navegación 1/2/3 y scroll suave.
- Descarga PDF desde el formulario o desde el modal.
- El PDF se genera desde la misma maqueta de la vista previa para maximizar fidelidad.
- Los datos del cliente no se guardan en `localStorage`; solo se usa almacenamiento local como respaldo del consecutivo cuando no hay backend.

## Ejecutar inmediatamente
### Opción A — sin instalar nada
Abra `frontend/index.html` en Chrome/Edge. Todo funciona; el consecutivo usa respaldo local del navegador.

### Opción B — con backend centralizado
```bash
cd backend
npm start
```
Abra `http://localhost:8787`.

## Importante sobre GitHub
GitHub sirve para alojar/versionar el código, pero **GitHub Pages no ejecuta Node.js**. El `frontend` sí puede publicarse en GitHub Pages. Para un consecutivo único compartido entre todos los asesores, despliegue `backend/` en Render, Railway, Fly.io, Vercel Functions u otro servicio Node y coloque su URL en `frontend/js/config.js`.

## Personalización rápida
- Países, asesores, monedas, impuestos y términos: `frontend/js/data.js`.
- URL del backend: `frontend/js/config.js`.
- Diseño: `frontend/css/cotizador.css`.
- Lógica: `frontend/js/app.js`.

## Nota de producción
El backend incluido usa `backend/data/counters.json`, ideal para servidor Node con disco persistente. Si se despliega en infraestructura efímera/serverless, reemplace ese almacenamiento por una base de datos (Supabase, PostgreSQL, Redis, etc.) para garantizar consecutivos globales sin reinicios.
