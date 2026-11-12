# JOS Fit PWA v1.9 — Base mexicana

## Contenido
- `index.html`: aplicación con búsqueda prioritaria de genéricos mexicanos, recientes, favoritos, comidas recientes, pestaña de creados, código de barras, rango calórico ±10%, agua en vasos y desglose ilustrativo de ejercicio + actividad restante.
- `foods-mx.json`: 250 alimentos genéricos curados de la tabla INCMNSZ / SiAgroBD / CONABIO, con `conabio_id` trazable.
- `sw.js`: caché `josfit-pwa-v1-9`, shell offline, catálogo y lector `html5-qrcode` 2.3.8.
- `manifest.json`, `icon-192.png`, `icon-512.png`.

## Datos de composición
Fuente: Tabla de composición de alimentos extendida 2019, INCMNSZ, vía SiAgroBD/CONABIO. CONABIO. 2023. Sistema de Información sobre Agrobiodiversidad; Bourges Rodríguez, H. G. N., Camacho Parra, M. A., Morales Guerrero, J. C. 2019. Composición de alimentos mexicanos Base de Datos Extensa. INCMNSZ.

La extracción compartida contiene 3,930 registros de alimentos y 45,619 filas de nutrientes. Aplicando el criterio estricto (energía en kcal + proteína bruta, hidratos de carbono y extracto etéreo en gramos, todos presentes), el conteo reproducible es **2,719 registros completos**. El catálogo incluido selecciona 250 alimentos, incluido aceite de oliva extra virgen con porción doméstica orientativa de 1 cucharada (10 g). Cada genérico conserva `source.conabio_id`, la descripción y procedencia cuando están disponibles.

No se imputan macros ausentes. Fibra y sodio permanecen `null` cuando no constan. El estado crudo/cocido se asigna solo cuando la descripción fuente lo permite; cuando no, se conserva una etiqueta genérica de estado. Las porciones domésticas son aproximaciones para facilitar la captura (por ejemplo, tortilla, huevo, arroz, manzana y aceite de oliva), se muestran en gramos y pueden editarse. Los registros con discrepancia >10% entre energía declarada y fórmula 4/4/9 se marcan en el resultado como dato para revisar, sin corregir valores fuente.

La fuente no declara una licencia abierta de redistribución en el material recibido. Este paquete mantiene atribución para una beta personal; antes de publicarlo o usarlo comercialmente, confirma los términos de reutilización con la fuente.

## Búsqueda y productos comerciales
Orden de resultados: base mexicana → alimentos frecuentes → alimentos creados → productos comerciales guardados. `Marcas` consulta Open Food Facts. Los productos guardados (hasta 50) conservan código de barras y macros para consulta local posterior. La búsqueda de códigos usa `https://world.openfoodfacts.org/api/v0/product/<código>.json`.

## Escáner de códigos
El lector usa `html5-qrcode` 2.3.8 (Apache-2.0), fijado por versión y precargado por el Service Worker desde jsDelivr cuando se instala con conexión. Requiere HTTPS y permiso explícito de cámara. La compatibilidad de cámara documentada por el paquete para Safari en iOS es iOS 15.1 o posterior; no se debe asumir que iOS 14.3 está soportado. Si la librería no pudo cachearse durante la instalación, la cámara puede necesitar conexión la primera vez. Escaneo físico en dispositivos reales sigue pendiente de prueba.

## Agua
1 vaso = 250 ml. El objetivo se mantiene en 35 ml × peso (salvo que el usuario haya definido una meta manual). El total se presenta en ml y vasos.

## Calorías y actividad
El rango aceptable de calorías se muestra como ±10% del objetivo; el informe semanal cuenta días dentro de ese intervalo. Los otros macros mantienen una meta única.

El desglose de actividad utiliza un estimado de ejercicio de 5 MET con la duración de sesiones registradas durante los últimos 28 días y asigna el residual del factor de actividad a estilo de vida / NEAT. Es un desglose ilustrativo; no modifica el TDEE ni la meta energética y no constituye una medición de gasto individual.

## Datos y privacidad
La app conserva información en `localStorage` del navegador (`josfit_v01_data`). No hay backend ni sincronización entre dispositivos/evaluadores. Exporta un respaldo JSON antes de cambiar de dispositivo o navegador.

## Instalación / actualización
1. Publica el contenido completo de esta carpeta en un dominio HTTPS (por ejemplo, el mismo sitio Netlify).
2. Abre la URL en Safari (iOS) o Chrome (Android).
3. En iPhone: Compartir → Agregar a pantalla de inicio. En Android: menú → Instalar aplicación / Agregar a pantalla principal.
4. Cierra y vuelve a abrir la PWA para que el Service Worker v1.9 tome el control.
5. Si el navegador conserva assets antiguos, abre la URL una vez con conexión y espera a que el nuevo worker se active.

## Alcance v1.9
Incluye únicamente los seis cambios del brief: catálogo mexicano, escáner de código de barras, agua en vasos, recientes/favoritos/comidas, rango calórico ±10% y desglose de actividad. El módulo de recetas, push, deporte/cardio, nuevos ejercicios, animaciones y tarjeta compartible siguen diferidos.
