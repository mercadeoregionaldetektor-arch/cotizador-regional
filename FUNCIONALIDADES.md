# Funcionalidades reconstruidas

## Formulario y cotización
- Datos de cliente con validación de obligatorios y ejemplos/placeholder en cada campo.
- Fecha del día automática y editable.
- País del cotizante con configuración por país.
- Número automático de propuesta con país + año + identificador del asesor + consecutivo.
- Asesor por lista únicamente para: Honduras, El Salvador, Nicaragua, Costa Rica y Guatemala.
- Asesor manual para: Colombia, Panamá y Venezuela.
- Identificador obligatorio de asesor manual; en listas se completa solo.
- Celular y correo de asesor editables.
- Observaciones generales editables.
- Términos por país, precargados y siempre editables.

## Productos
- Catálogo de Detektor El Cazador, Detektor GPS, Roadview IA, Detektor Smart Track y Detektor Plus.
- Textos comerciales conservados de la referencia entregada.
- Ningún producto tiene precio precargado.
- Producto personalizado ilimitado.
- Prevención de duplicado para los productos del catálogo.
- Cantidad, valor unitario y descuento editables.
- Eliminación de líneas.

## Propuesta económica
- Subtotal automático o manual.
- Impuesto por lista o manual.
- Total automático o manual.
- Monedas e impuestos configurables por país desde `frontend/js/data.js`.
- Formateo monetario y recálculo inmediato.

## Vista previa y PDF
- Modal a pantalla completa.
- 3 páginas A4 visualmente alineadas con la referencia.
- Scroll interno del modal.
- Botones 1, 2 y 3 con desplazamiento suave a cada página.
- Indicador activo cambia también al hacer scroll manual.
- Datos de cliente/cotización reflejados en la página 1.
- Soluciones seleccionadas, tabla económica, asesor y totales en página 2.
- Términos, cross-sell y pie regional en página 3.
- Descarga PDF desde el formulario y desde el modal.
- El PDF se construye a partir de un clon exacto de la misma vista previa para evitar diferencias por ocultamiento del modal.

## Limpieza y privacidad
- Botón Limpiar superior e inferior.
- Confirmación antes de borrar.
- Reinicio completo de cotización, líneas, modos de cálculo y número.
- Los datos del cliente no se persisten en el navegador.
- Cuando no hay backend, solo el contador del consecutivo se guarda en localStorage como respaldo.

## Backend
- Node.js sin dependencias externas.
- Endpoint `GET /api/health`.
- Endpoint `POST /api/quote-number`.
- Consecutivos serializados para reducir colisiones dentro de una misma instancia.
- CORS configurable por `ALLOWED_ORIGINS`.
- Sirve también el frontend para pruebas/local.
