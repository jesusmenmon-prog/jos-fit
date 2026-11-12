# JOS Fit PWA v1.14.1 — Interfaz, cardio y catálogo

**Base:** `JOS_Fit_para_Claude_v1.14.1.zip` (8 archivos originales).  
**Persistencia:** se conserva `localStorage` con la clave `josfit_v01_data`; no se migran ni modifican datos del usuario.

## Cambios implementados

1. **Cardio solo en Entrenar.** El único nodo `#v113Cardio` se movió desde Hoy al final de Entrenar, después del panel de sesión. Se conserva `renderCardioCard()` y toda su lógica; el bono calórico sigue apagado por defecto.
2. **Separación en Hoy.** Se añadió separación vertical de 12 px a las tarjetas y bloques v1.13 que son hijos directos de Hoy. Los bloques vacíos de suplementos/racha no reservan espacio.
3. **Perfil sin título duplicado.** Se eliminó el `<h2>` interior de «Tu rutina diaria»; el `summary` queda como único título.
4. **Hoja de ejercicio.** El fondo ahora es más oscuro y desenfocado; la hoja permite hasta 92vh y tiene un tirador superior visible. El topbar conserva `safe-area-inset-top`; está en el flujo sticky y el contenido principal conserva padding, por lo que no se añadió un desplazamiento artificial a Perfil.
5. **Desplegables.** El selector de divisiones y rutinas personalizadas de Entrenar queda dentro de `#trainingDivisionDisclosure`, cerrado al inicio; el resumen se actualiza con la división o rutina seleccionada. La rutina seleccionada, últimas sesiones y sesión activa quedan fuera. En Hoy, «Nutrición de hoy» y «Comidas» usan el patrón `tab-disclosure` y empiezan abiertos. «Tu horario de comidas» no se modificó.
6. **Leyenda muscular condicional.** La leyenda naranja solo aparece cuando el SVG del ejercicio contiene `#ff9b45`. No se editaron los SVG.
7. **Filtro de racha.** Se excluyen frases con «fallaste» y «falló»; no se tocó el cálculo de racha.
8. **Avena.** Se añadió «Avena en hojuelas» seca por 100 g desde USDA FoodData Central, SR Legacy 169705: 389 kcal, 16.9 g proteína, 66.3 g carbohidratos, 6.9 g grasa y 10.6 g fibra. La energía estimada por 4P+4C+9G es 395.3 kcal (desviación aproximada 1.6%, dentro del umbral del 10%). No se añadieron registros incompletos de SiAgroBD ni harina de avena.

## Catálogo: chequeo de básicos

Se encontraron registros para arroz, huevo, plátano, papa, aceite, jamón, leche, tortilla, frijol y pollo. La búsqueda de «avena» devuelve el nuevo registro USDA.

## Versionado

- `index.html` title y pie: v1.14.1.
- `manifest.json`: nombre v1.14.1.
- `sw.js`: caché `josfit-pwa-v1-14-1`.
- Registro: `./sw.js?v=1.14.1` (incluida la ruta de Service Worker de OneSignal).

## Verificación realizada

- `node --check` del JavaScript inline: PASS.
- `node --check sw.js`: PASS.
- Escaneo de identificadores en modo estricto: sin nombres de aplicación no declarados; los únicos identificadores externos no resueltos son `Html5Qrcode` y `Html5QrcodeSupportedFormats`, provistos por la librería de escaneo de código de barras cargada bajo demanda.
- `manifest.json` y `foods-mx.json`: JSON válido.
- Conteo de archivos y ZIP: 8 archivos exactos.
- Verificación estática: un único `#v113Cardio`, ubicado dentro de Entrenar; no aparece en Hoy.
- Verificación estática: selector de Entrenar sin atributo `open`; las dos secciones de Hoy con `open`.
- Verificación estática: leyenda naranja condicional, filtro de racha ampliado, `localStorage` sin cambios.
- Viewport objetivo de aceptación: 390 px. Se revisaron reglas CSS y estructura DOM para ese ancho; no se declara prueba en Safari iOS ni prueba física en iPhone. El intento de navegador automatizado Chromium quedó bloqueado por la política del entorno, por lo que no se reporta como prueba superada.

## Pendiente de prueba en dispositivo

Abrir la PWA en Safari iOS a 390 px y confirmar visualmente: separación de tarjetas en Hoy, safe area de Perfil, hoja de ejercicio, apertura/cierre de desplegables, selección de rutina, render del cardio solo en Entrenar y búsqueda de avena. El entorno de construcción valida código y estructura, no sustituye esa prueba de dispositivo.
