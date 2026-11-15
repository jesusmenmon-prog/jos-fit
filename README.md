# JOS Fit PWA v1.16 — Comidas, readiness y mapa muscular

Base: v1.15.1. Misma clave `josfit_v01_data`; no se migró ni se tocó ningún dato. No se borró ninguna declaración de función: los cambios de comportamiento envuelven funciones existentes (`startRest`, `toggleSet`, `updateSet`, `renderHome`, `renderProgress`) al final del script, después de los demás overrides, y llaman a la original.

## Cambios
1. **Inicio simplificado (Hoy).** Arriba: «PLAN DE HOY» + botón grande **Empezar entrenamiento de hoy** (inicia la rutina del día; si ya hay sesión activa dice «Continuar sesión en curso» y lleva a Entrenar; si hoy no hay rutina asignada abre Entrenar con un aviso). Todo lo demás está agrupado en 3 secciones plegables, cerradas, con el patrón `tab-disclosure` existente: *Cuerpo y hábitos* (peso, check-in, agua), *Nutrición y comidas* (las 3 secciones que ya existían) y *Coach, racha y nivel* (coach, racha, nivel, suplementos). Ninguna tarjeta se eliminó; conservan sus ids. **Guía de primer uso** («Empieza en 3 pasos»): tarjeta con ✕, solo si no hay sesiones registradas. Nota: la sección de nutrición ahora empieza cerrada (antes abierta); así lo pide este brief.
2. **Descanso visible.** Tras marcar una serie de trabajo aparece en la tarjeta un botón grande «⏱ Descanso m:ss» (reutiliza `startRestFor`). Al iniciar cualquier descanso, la barra de sesión se despliega y queda visible con el temporizador. La lógica del temporizador, los tiempos por ejercicio y `josfit_rest_v1` no cambiaron.
3. **Récord personal en vivo.** Al completar una serie de trabajo que supera el mejor peso o el mejor 1RM estimado anterior (misma regla que `countRecords`, sin la sesión en curso), sale «¡Nuevo récord!» en la tarjeta, una ★ en la serie, un aviso corto y vibración. Si se edita la serie, el badge se actualiza. El calentamiento no cuenta. El resumen al terminar no cambió.
4. **Progresión de fuerza.** Progreso → «Progresión de fuerza»: volumen total por semana de las últimas 12 semanas (calculado desde `data.workouts` con `statsForWorkout`, misma gráfica del detalle de ejercicio). Con menos de 2 semanas: «Registra al menos 2 semanas para ver tu tendencia». En cada tarjeta de ejercicio de la sesión, «Ver mi progresión» abre el mismo detalle que la ⓘ.
5. **Reordenar con pulsación larga** (reemplaza la activación horizontal). En táctil: mantener ~250 ms levanta la fila (vibración si el dispositivo la soporta); después el arrastre es libre y la fila sigue al dedo mientras las demás se reacomodan; con el mouse el arrastre inicia a los 5 px y un movimiento corto a la fila adyacente ya intercambia. Los controles (checkbox, botones, campos) no inician el arrastre; moverse >10 px antes de los 250 ms cancela (es scroll); un toque rápido no hace nada; el menú contextual está suprimido en la fila. Texto del modal: «Mantén presionada una fila para reordenar». Mismo renderizador para divisiones y «Mis rutinas».
6. **Menú ⋮ por ejercicio en la sesión.** Subir / Bajar, Reemplazar (sin los ya presentes en la sesión; primero el mismo grupo muscular) y Eliminar. Reutiliza `moveSessionExercise`, `toggleSessionExercise`, `addExerciseToSession` del editor de sesión: con series completadas pide confirmación y el ejercicio queda oculto con sus series conservadas. Sin superserie. El editor de sesión sigue igual.

## Cómo se probó
Chromium sin cabeza (Playwright), viewports 390×844 y 360×844, servido por HTTP. Táctil simulado con eventos `Input.dispatchTouchEvent` (CDP): toque rápido, deslizamiento vertical rápido (no levanta), pulsación larga de 380 ms + arrastre de la fila 3 a la 1, guardar y reabrir (el orden se conserva), mouse con arrastre corto, y contextmenu prevenido. Editor de rutinas sin desbordamiento horizontal a 390 y 360 px (el campo de descanso queda dentro de la pantalla). Las 5 pestañas cargan sin errores de consola; `node --check` OK en el JS inline y en `sw.js`; escaneo de asignaciones a nombres no declarados limpio; `getMacroTargets` sigue declarada como `function`.

## No probado
Safari/iPhone real y vibración (iOS no la soporta). El gesto de pulsación larga se simuló en Chromium: conviene confirmarlo con el dedo en el teléfono.

Versión de esta entrega: v1.16 (título, pie, manifest, caché `josfit-pwa-v1-16`, registro compartido `./sw.js?v=1.16`).


## Fix v1.15.1 — Fusión OneSignal
- `sw.js` importa primero el worker oficial v16 de OneSignal con `importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js')`. El SDK importado instala sus propios listeners de push; el worker de JOS Fit conserva sin cambios la caché offline, `install`/`activate`/`fetch` y el `notificationclick` local.
- La app y OneSignal usan la misma constante `ONESIGNAL_SW_PATH` (`./sw.js?v=1.15.1`) y el mismo scope `./`; se elimina la URL anterior con `&push=1` para evitar registros distintos.
- Al conceder permiso y activar recordatorios, `ensurePushSubscription()` llama a `OneSignal.User.PushSubscription.optIn()` si el SDK todavía no marca `optedIn`. Solo después de confirmar la suscripción se envían las etiquetas `training_time`, `wake_time`, `football_day` y `goal`. Un evento `change` vuelve a sincronizarlas cuando cambia el estado de suscripción.
- Al desactivar recordatorios se solicita `optOut()` cuando la suscripción está activa. La clave de almacenamiento `josfit_v01_data` y el modelo de datos no cambian.
- App ID configurado: `0a9df6e2-d2a0-4fc9-a74b-802a0a9c8743`.

## Cómo verificar OneSignal después del despliegue
1. Desplegar por HTTPS y abrir JOS Fit. En la tarjeta de recordatorios, activar recordatorios y aceptar el permiso del navegador/sistema.
2. En la consola del navegador, consultar `OneSignal.User.PushSubscription.id` y `OneSignal.User.PushSubscription.optedIn`. El ID debe tener valor y `optedIn` debe ser `true`.
3. En el panel de OneSignal, comprobar que la suscripción aparece y enviar un push de prueba.
4. Verificar también el aviso local de prueba, el fin de descanso y el fin de rutina; activar modo avión y confirmar que la app y el catálogo siguen abriendo desde caché.

## Validación de construcción v1.15.1
`node --check` se ejecutó sobre el JavaScript inline y `sw.js`; los JSON se parsearon correctamente. Se verificó que `sw.js` importa el SDK v16 antes de registrar los listeners de JOS Fit, que el handler local conserva el filtro `data.josLocal`, que ambas inicializaciones usan la misma URL de worker y que se mantiene `josfit_v01_data`. Los archivos de catálogo, visuales e iconos se conservaron byte por byte respecto a v1.15.

## No probado en el entorno de construcción
No se concedió permiso en un dispositivo real, no se confirmó una suscripción en el panel de OneSignal ni se recibió un push remoto en iPhone. Esas comprobaciones requieren desplegar el ZIP en el dominio HTTPS configurado y aceptar el permiso en el dispositivo. Tampoco se afirma haber probado Safari/iOS ni el modo avión físico en esta construcción.


## v1.16 — Cambios
1. **Comidas por tipo:** Hoy y Nutrición muestran Desayuno, Comida, Cena y Snack en bloques plegables. Los bloques con alimentos empiezan abiertos; los vacíos empiezan cerrados. Cada bloque resume kcal y P/C/G y ofrece su propio botón +. El formulario conserva `#foodType` y `addFood()`; no se modificó el objeto guardado ni el modelo de datos.
2. **Energía / readiness:** tarjeta compacta en Hoy basada únicamente en el check-in de hoy. Alta requiere sueño ≥7.5 h y recuperación Buena/Muy buena; Recuperación se activa con sueño <6 h o recuperación Baja; el resto es Moderada. Sin sueño ni recuperación se muestra el estado vacío y un acceso al check-in. El ajuste de una serie menos se menciona como activo solo cuando la lógica existente de sueño lo activa.
3. **Mapa muscular:** SVG inline frontal y posterior que usa `getWeeklyVolumeByGroup(6,0)` y las series completadas. La intensidad azul es proporcional al grupo más entrenado; “Otros” no se dibuja. La gráfica existente se conserva.
4. **Colores de macros:** barras de proteína azul, carbohidratos verde y grasas ámbar en Hoy y Nutrición. La app no modifica valores ni metas.
5. **Diagnóstico push:** dentro de Recordatorios en Perfil muestra estado del SDK, permiso, suscripción e ID, controlador del worker y último error capturado de `O.init()` / `optIn()`. No agrega botones ni cambia el flujo de suscripción.

## Validación de construcción
- `node --check` aplicado al JavaScript inline y a `sw.js`, también con el script inline precedido por `'use strict'`.
- Escaneo estático de identificadores no resueltos con TypeScript; los únicos globales permitidos son `Html5Qrcode` y `Html5QrcodeSupportedFormats`, cargados en tiempo de ejecución por la biblioteca del escáner.
- JSON parseados correctamente; `getMacroTargets` sigue declarada como `function`.
- Service Worker conserva el `importScripts` de OneSignal v16 como primera instrucción y mantiene el resto de la lógica offline / `notificationclick` local; solo cambia el nombre de caché a `josfit-pwa-v1-16`.
- OneSignal y el registro propio comparten `ONESIGNAL_SW_PATH='./sw.js?v=1.16'`.
- Catálogo, visuales e iconos se mantienen byte por byte respecto a v1.15.1.

## Pruebas de interfaz y límites
Se validó estáticamente el contenido y la estructura responsiva. Se intentó iniciar Chromium headless para 390×844 y 360×844, pero el entorno no pudo crear un proceso GPU y la segunda ejecución quedó bloqueada; por eso no se considera completada la prueba visual ni se afirma que las cinco pestañas se hayan probado en navegador. Tampoco se pudo probar Safari/iPhone, vibración, gesto táctil, entrega de push remoto ni modo avión físico. Estas pruebas deben completarse después del despliegue; la suscripción y entrega de push requieren el dominio HTTPS y el dispositivo real.
