# JOS Fit PWA v1.14.4 — Rutinas ordenables y catálogo de pescados

**Base:** JOS Fit PWA v1.14.3 (8 archivos). Se conservaron la arquitectura, los recursos visuales y la clave `localStorage` `josfit_v01_data`. No se migran ni modifican datos existentes.

## Cambios

1. **Frases de racha:** se reescribieron cinco frases con placeholders para evitar plurales fijos incorrectos con valores 1. No se modificaron el filtro ni la matemática de rachas.
2. **Espacio de métrica:** el número y la unidad de la tarjeta de racha ahora están separados con un espacio no separable; se conserva singular/plural.
3. **Detalle de alimentos:** inspección del código no encontró ninguna etiqueta `100g` sin espacio; el botón sigue diciendo «Agregar alimento» y las porciones usan «100 g». No se cambió esta área.
4. **Versionado:** title, pie, comentarios, manifest, caché `josfit-pwa-v1-14-4` y registros `./sw.js?v=1.14.4` actualizados.
5. **Orden de ejercicios:** ambos editores muestran primero los ejercicios seleccionados en el orden guardado. Añaden tirador Pointer Events apto para touch, feedback visual y controles ↑/↓ accesibles. El guardado sigue leyendo el DOM en orden; no se modificó el recomendador.
6. **Pescados:** catálogo ampliado de 501 a 510 registros. Se añadieron seis entradas SiAgroBD y tres USDA FDC SR Legacy con sus fuentes y macros especificados. Se añadió el alias «pescado» a pescados nuevos y entradas existentes de atún, sardina y camarón; para la búsqueda «pescado», los resultados de categoría PESCADOS Y MARISCOS se priorizan frente a productos procesados.

## Datos añadidos y control energético

Los nueve alimentos nuevos tienen carbohidratos y fibra en 0 g/100 g. La comprobación `4P + 4C + 9F` contra kcal declaradas da desviaciones absolutas menores al 10% para los nueve registros. No se añadieron jurel toro ni bagre.

- SiAgroBD / CONABIO: Mojarra, Robalo, Trucha, Pargo, Sierra y Mero crudos.
- USDA FoodData Central · SR Legacy: Tilapia cruda (FDC 175176), Huachinango crudo / snapper mixed species (FDC 173698) y Salmón del Atlántico de granja crudo (FDC 175167).

## Fuera de alcance

No se modificaron cálculos, notificaciones, catálogo previo, persistencia, clave localStorage ni selección temporal de división. No se modificó la lógica del recomendador.

## Verificación ejecutada

- JavaScript inline extraído: `node --check` — PASS.
- JavaScript inline con prefijo `'use strict'`: `node --check` — PASS.
- `sw.js`: `node --check` — PASS.
- JSON de manifest, catálogo y visuales: válido.
- Catálogo: 510 IDs únicos; los nueve alimentos nuevos cumplen ±10% de energía.
- Búsqueda estática: alias `pescado` y prioridad de categoría para pescado común; tilapia, huachinango y salmón tienen alias directos.
- Persistencia: `josfit_v01_data` sin cambios.
- ZIP: 8 archivos exactos, integridad CRC verificada.

## Pruebas de aceptación pendientes en Safari iOS

No se ejecutó un navegador iOS real en este entorno. En viewport CSS de 390 px comprobar: arrastrar un ejercicio de posición 3 a 1 en editor de división y rutina personalizada; guardar, cerrar y reabrir; confirmar orden en sesión; probar botones ↑/↓; verificar que el tirador no activa checkbox/Ficha/campos ni desplaza la hoja. Probar búsqueda `pescado`, `tilapia`, `huachinango` y `salmón`; confirmar macros y fuente en detalle. Probar racha 1 y 5 y comprobar espacio visible en «1 día activo».


## v1.14.5 — 12 nov 2026

### Cambios
- Corregidas las frases de racha con `{racha}` y `{mejor}` que producían singular/plural incorrecto; se auditó el arreglo completo.
- Configurado el App ID de OneSignal Web Push: `0a9df6e2-d2a0-4fc9-a74b-802a0a9c8743`. No se enviaron notificaciones de prueba.
- Simplificado el editor de rutinas: se retiraron tirador y botones ↑/↓; la fila se reordena mediante deslizamiento horizontal, manteniendo el scroll vertical nativo. Los controles interactivos no inician el arrastre.
- Recuperado `flex:1; min-width:0` en el nombre del ejercicio y compactados los campos para pantallas estrechas.
- Añadida una indicación de uso en ambos editores de rutina.
- Actualizados title/footer/manifest/Service Worker a v1.14.5 y caché `josfit-pwa-v1-14-5`.
- Se conserva `josfit_v01_data`; no se ejecuta migración de datos.

### Verificación
- `node --check` del JavaScript inline y `sw.js`.
- JSON de manifest y catálogo parseables.
- Auditoría de `V113_STREAK_PHRASES` para placeholders numéricos seguidos de unidades plurales fijas.
- Confirmación estática de que no quedan botones ni tirador de orden en `routineEditorRow`.
- Confirmación estática de App ID y versión en los archivos.
- La interacción real en Safari/iPhone y la recepción de push deben validarse en el dispositivo y en el sitio desplegado; no se simulan como pruebas superadas.
