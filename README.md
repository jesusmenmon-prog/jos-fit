# JOS Fit PWA v1.17 — Interfaz, registro rápido y OneSignal

Base: los 8 archivos de `JOS_Fit_PWA_v1_16.zip`. Misma clave `josfit_v01_data`; sin migración de datos. No se borró ninguna declaración de función: los cambios de comportamiento envuelven funciones existentes (`startRest`, `toggleSet`, `updateSet`, `renderHome`, `renderProgress`) al final del script, después de los demás overrides, y llaman a la original.

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
- `sw.js` importa primero el worker oficial v16 de OneSignal con `importScripts('https://cdn.onesignal.com/sdks/web/v16/SDK del worker de OneSignal')`. El SDK importado instala sus propios listeners de push; el worker de JOS Fit conserva sin cambios la caché offline, `install`/`activate`/`fetch` y el `notificationclick` local.
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


## Historial v1.16 — Cambios de la versión base (superados por los cambios de v1.17)
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


---

# v1.17 — Fase A + corrección del worker de OneSignal

## Cambios de interfaz

1. **Topbar y navegación.** La leyenda superior ahora dice «Fuerza · Nutrición · Progreso» y el indicador de privacidad queda en «🔒 Local». Las cinco pestañas mantienen sus identificadores y acciones; sus iconos son SVG lineales inline de 20×20 px con trazo redondeado. El texto de navegación sube a 10.5 px.
2. **Explorar antes de completar el perfil.** En el primer paso del onboarding aparece «Explorar la app primero →». Guarda únicamente el borrador que ya estaba en curso y el estado de que el onboarding fue pospuesto; no genera datos demo ni rellena medidas. Hoy muestra un recordatorio mientras `onboardingComplete` sea falso y Perfil ofrece «Completar mi perfil», que reanuda el paso guardado.
3. **Hoy aplanado.** Después de «Energía hoy» aparece «Energía consumida» con las barras existentes y el restante de kcal, proteína, carbohidratos y grasa. Los excedentes se presentan en ámbar suave. La racha y los suplementos se muestran directamente bajo el resumen. Cuerpo y hábitos permanece plegable; comidas y horario se consolidan en un solo acordeón «Comidas de hoy y horarios». Los datos, metas, cálculos y renderizados originales se conservan.
4. **Check-in rápido.** Recuperación se elige con cuatro botones: Baja, Normal, Buena y Top. Los botones escriben los valores existentes en el `<select>` oculto (`Baja`, `Normal`, `Buena`, `Muy buena`), y `saveCheckin()` conserva el guardado original. Se retiró «Muy baja» de las opciones visibles. Los botones −0.1 / +0.1 kg ajustan el campo usando el valor escrito o el último peso disponible. El botón «Completar check-in» abre también el grupo padre Cuerpo y hábitos.
5. **Nutrición en menos pasos.** Seleccionar un resultado o frecuente abre una tarjeta compacta con comida, cantidad, macros de la porción y botón «Agregar a [comida]». El formulario de creación manual queda plegado en «Crear alimento personalizado». «Tus frecuentes» usa `frequentFoods()` y muestra los cinco alimentos con mayor uso real; se mantiene visible mientras se busca. La cita INCMNSZ / SiAgroBD / CONABIO sigue visible al final de la pestaña Nutrición. Las cuatro tarjetas muestran el restante o excedente de sus metas.
6. **Zoom iOS.** Los campos numéricos de `.routine-editor-row` usan 16 px para evitar el zoom automático de Safari al editar series y repeticiones.

## Corrección de OneSignal: worker fusionado

El diagnóstico de la v1.16 en el dispositivo mostraba que el SDK, el permiso y el worker de la PWA estaban activos, pero el ID de suscripción estaba vacío y el SDK reportaba un fallo al cargar `OneSignalSDKWorker.js`. La causa descrita en el informe de integración es que OneSignal Web SDK 16.08.01 solicita su worker por defecto con ese nombre en la raíz y no respeta el `serviceWorkerPath` que se había apuntado a `sw.js`; ese archivo no estaba desplegado y respondía 404. Por eso `optedIn` podía aparecer como verdadero localmente sin que existiera una suscripción push real.

El arreglo mantiene un único worker de entrada en la raíz: `OneSignalSDKWorker.js` contiene exactamente dos imports, primero el SDK de OneSignal y después `./sw.js?v=1.17`. Se retiró la importación de OneSignal de la primera línea de `sw.js`; su caché queda en `josfit-pwa-v1-17` y su lógica de caché/offline/notificación local se conserva. `ONESIGNAL_SW_PATH` ahora apunta a `./OneSignalSDKWorker.js`; tanto `O.init` como el único `navigator.serviceWorker.register` usan esa misma ruta y mantienen el scope `./`. El bloque de diagnóstico `#pushDiag`, `renderPushDiagV116`, `window.__pushDiag`, `initPush`, `ensurePushSubscription`, `pushTags` y `toggleNotifications` se dejaron intactos.

## Pruebas y límites

- `node --check` ejecutado sobre el JavaScript inline, `sw.js` y `OneSignalSDKWorker.js`.
- El JavaScript inline también se comprobó con `'use strict'`; el escaneo de identificadores no resueltos no reportó nombres desconocidos (se declararon como globales externos los dos identificadores que carga la librería del escáner).
- Los JSON del manifest y catálogos se parsearon correctamente; se verificó que la clave `josfit_v01_data` sigue presente y que `addFood()` conserva su implementación.
- Verificación estructural: cinco botones de navegación con SVG; una sola llamada propia a `navigator.serviceWorker.register`; `O.init` y el registro usan el mismo worker; el SDK de worker aparece una sola vez, en el worker fusionado; el worker tiene exactamente dos líneas; la caché y las rutas usan v1.17.
- Se verificaron los bloques nuevos y la ausencia de IDs HTML duplicados. Se revisó la estructura responsive para 390 px, pero Chromium headless no pudo iniciar correctamente en el entorno de construcción; por tanto, no se afirma una prueba visual real a 390 px ni una prueba de interacción completa en navegador.
- **No se probó el push en vivo.** La validación definitiva debe hacerse en el iPhone de Jesús después del despliegue HTTPS: en Perfil → Recordatorios, «Último error» debe decir «sin errores registrados» y el ID de suscripción debe tener un valor no vacío; después, el dashboard de OneSignal debe mostrar al menos una suscripción. No se afirma que esa suscripción o la entrega remota ya hayan ocurrido.

## Archivos incluidos

`index.html`, `manifest.json`, `sw.js`, `OneSignalSDKWorker.js`, `foods-mx.json`, `exercises-visuals.json`, `icon-192.png`, `icon-512.png` y este README.
