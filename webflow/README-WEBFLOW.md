# Integración exacta en Webflow

La solución está separada para que Webflow mantenga el HTML y GitHub/CDN mantenga CSS + JS.

## 1. Publica `frontend/` en GitHub Pages
La URL final debería quedar parecida a:
`https://TU_USUARIO.github.io/TU_REPO/`

## 2. Configura el backend
En `frontend/js/config.js`, cambia `apiBase` por la URL pública del servidor Node si quieres un consecutivo central para todos los asesores. Si se deja vacío y el API no existe en Webflow, la app usa el contador local del navegador como respaldo.

## 3. En Webflow
- En **Page Settings > Custom Code > Inside `<head>`**, pega `HEAD.html` y reemplaza `TU_USUARIO/TU_REPO`.
- En el contenedor/Embed de la página, pega `EMBED_BODY.html`.
- En **Page Settings > Custom Code > Before `</body>`**, pega `BEFORE_BODY.html` y reemplaza `TU_USUARIO/TU_REPO`.
- Publica el sitio.

## 4. Si quieres mantener todo dentro de Webflow
También puedes copiar el CSS de `frontend/css/cotizador.css`, el HTML de `EMBED_BODY.html` y los JS de `frontend/js/` directamente en Custom Code. La versión separada es más mantenible.

## Reglas de asesores ya aplicadas
- Lista: Costa Rica, Guatemala, Honduras, El Salvador, Nicaragua.
- Manual: Colombia, Panamá, Venezuela.
