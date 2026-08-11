# Detektor Cotizador API

Este repositorio contiene SOLO el backend del cotizador. El frontend (HTML, CSS y JavaScript) vive en Webflow.

## Render
- Language: Node
- Root Directory: dejar vacío si estos archivos están en la raíz del repositorio.
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`
- Environment variable: `ALLOWED_ORIGINS=https://detektorlatam-com.webflow.io`

Si mantienes estos archivos dentro de una carpeta `backend/`, usa Root Directory `backend`, Build Command `npm install` y Start Command `npm start`.

## Persistencia
`data/counters.json` guarda los consecutivos. En producción, usa almacenamiento persistente (Persistent Disk o base de datos) para evitar reinicios del consecutivo al redeployar.
