# JOS Fit PWA v1.14.2 — Atribución nutricional y barra superior fija

**Base:** ZIP original de JOS Fit PWA v1.14.1 (8 archivos).  
**Persistencia:** se conserva `localStorage` con la clave `josfit_v01_data`; no se migran, borran ni modifican datos del usuario.

## Cambios implementados

1. **Fuente nutricional por alimento.** `renderFoodDetail` ahora prioriza `d.source.name` cuando el alimento trae una fuente. El nombre de fuente SiAgroBD almacenado con barras se presenta con separadores medios (`INCMNSZ · SiAgroBD · CONABIO`) para coincidir con la atribución solicitada, sin alterar el catálogo. Si no existe fuente, conserva el fallback anterior por tipo (`generic`, `commercial` o creado por el usuario). Así, «Avena en hojuelas» atribuye USDA FoodData Central · SR Legacy; los alimentos SiAgroBD conservan INCMNSZ · SiAgroBD · CONABIO; productos comerciales conservan Open Food Facts / etiqueta del producto; y los alimentos personalizados conservan «Alimento creado por ti». No se modificaron valores nutricionales ni el encabezado general de Nutrición.
2. **Barra superior fija.** El `header.topbar` pasa de `position: sticky` a `position: fixed`, centrado y limitado a 980 px para conservar la alineación de escritorio. Se compensa el espacio en `.main` con una altura basada en el alto de la barra y `env(safe-area-inset-top)`, con ajuste específico para viewports de hasta 420 px. Se mantienen el padding seguro, fondo translúcido y blur existentes. La barra inferior y la barra de sesión no se modificaron.
3. **Título duplicado de división.** Se eliminó el `<h2>` interior «Selecciona tu división». El `summary` permanece como único título; se conserva la pista «Rutinas editables» y la sección «Mis rutinas» sin cambios.

## Fuera de alcance respetado

- No se persiste `selectedSplit`; la división conserva el comportamiento de sesión existente.
- No se modificaron catálogo, rutinas, cálculos, notificaciones ni datos nutricionales.
- No se modificó `localStorage` ni se añadió migración.

## Versionado

- `index.html`: title, pie y comentarios a v1.14.2.
- `manifest.json`: nombre v1.14.2.
- `sw.js`: caché `josfit-pwa-v1-14-2`.
- Registros del Service Worker: `./sw.js?v=1.14.2`, incluida la ruta de OneSignal.

## Verificación ejecutada

- JavaScript inline: `node --check` — PASS.
- `sw.js`: `node --check` — PASS.
- JavaScript inline parseado también con prefijo `'use strict'` — PASS; revisión estática dirigida de asignaciones `nombre = function` frente a declaraciones existentes — sin nombres faltantes.
- `manifest.json` y `foods-mx.json`: JSON válido.
- `exercises-visuals.json`: JSON válido.
- Verificación estática de atribución: usa primero `d.source.name` y mantiene los tres fallbacks por tipo.
- Verificación estática de la barra: `position: fixed`, centrada, ancho máximo 980 px y compensación responsive de `.main`.
- Verificación estática del desplegable: `summary` conserva el título; ya no existe el `<h2>` duplicado; «Mis rutinas» permanece.
- Verificación de persistencia: clave `josfit_v01_data` sin cambios.
- ZIP: 8 archivos exactos.

## Prueba de aceptación pendiente

El entorno de construcción permite validaciones de código y estructura, pero no confirma el comportamiento visual en Safari iOS. Probar en iPhone con viewport CSS de 390 px:
1. Abrir detalle de «Avena en hojuelas»: debe mostrar `Fuente: USDA FoodData Central · SR Legacy`.
2. Abrir detalle de «Tortilla de maíz»: debe mostrar `Fuente: INCMNSZ · SiAgroBD · CONABIO`.
3. Confirmar los fallbacks de producto comercial y alimento personalizado.
4. Desplazarse en Perfil y Progreso: la barra JOS FIT debe permanecer fija, respetar el área segura y no tapar títulos.
5. Abrir/cerrar el selector de división: debe iniciar cerrado, mostrar un solo título y actualizar el `summary` al seleccionar.
6. Confirmar que navegación inferior, barra de sesión, seis tarjetas de división, agua, búsqueda de alimentos, racha y nivel siguen funcionando.
