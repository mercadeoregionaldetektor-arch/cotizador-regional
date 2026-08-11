# Subir a GitHub y publicar

## Repositorio
```bash
git init
git add .
git commit -m "Cotizador Detektor LATAM"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

## Frontend con GitHub Pages
En GitHub: **Settings > Pages**. Publica la carpeta `frontend/` usando el método de despliegue que prefieras (rama dedicada, GitHub Actions o un CDN conectado al repositorio).

Para Webflow, toma las URLs finales de `frontend/css/` y `frontend/js/` y reemplaza `TU_USUARIO/TU_REPO` en los archivos de `webflow/`.

## Backend
GitHub almacena el código, pero no ejecuta servidores Node en GitHub Pages. Despliega `backend/` en un host Node con almacenamiento persistente y luego coloca esa URL en `frontend/js/config.js`.

Variables opcionales:
- `PORT`: puerto del servidor.
- `HOST`: host de escucha, por defecto `0.0.0.0`.
- `ALLOWED_ORIGINS`: dominios separados por coma, por ejemplo `https://detektorlatam-com.webflow.io,https://www.detektorlatam.com`.
