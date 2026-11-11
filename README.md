# JOS Fit PWA v1.8 — Hidratación y recordatorios

## Novedades de v1.8
1. **Versión** corregida en título, pie y comentarios. Service Worker `josfit-pwa-v1-8`, registro `./sw.js?v=1.8`.
2. **Descanso editable** en el editor de rutina (campo de segundos junto a las series, 15–600 s). Se guarda en `restPrefs` y el temporizador lo usa; también se ajusta con ±15 s dentro de la sesión.
3. **Agua**: sección en Hoy con +250 ml, +500 ml, +1 L y *Quitar último*. Meta = 35 ml × peso (o la que fijes en Perfil). Se guarda por día (`days[fecha].waterMl`) y se refleja en el check-in (`waterMl`). Incluido en el respaldo JSON.
4. **Detalle de ejercicio**: toca el nombre de un ejercicio para ver gráfica de mayor peso (3 meses), récords (mayor peso, mejor 1RM estimado Epley, mejor volumen por serie y por sesión) e historial. Estado vacío sin sesiones.
5. **Límites al editar sesiones**: peso > 500 kg y repeticiones > 100 se rechazan. Además, un peso mayor a 2,5× tu marca anterior en ese ejercicio pide confirmación (así se atrapa 340 kg en lugar de 34).
6. **Solo día de deporte**: si el único día disponible es el de fútbol, la app explica que no hay días de gym asignados en vez de mostrar 0.
7. **Recordatorios**: interruptor en Perfil (el permiso se pide con un toque). Fase 1 local: aviso al terminar el descanso y al cerrar la rutina (frases del banco), más un aviso al abrir la app si falta el peso de la mañana. Fase 2 (push programado con OneSignal): código listo pero **desactivado** hasta que pegues tu App ID en `ONESIGNAL_APP_ID` (index.html).

## Activar OneSignal (fase 2)
1. Crea la app en OneSignal (Web Push → configuración personalizada), con la URL de tu sitio HTTPS.
2. Pega el App ID en `const ONESIGNAL_APP_ID=''` dentro de `index.html`.
3. El worker `sw.js` ya importa el SDK de OneSignal cuando se registra con `&push=1`; así conviven el caché offline y el push en un solo worker.
4. Prueba en iPhone (iOS 16.4+, app instalada en pantalla de inicio) y Android: envía un push de prueba desde el panel y verifica que al tocarlo abre la app y que el modo offline sigue funcionando.
5. Los avisos programados se redactan en OneSignal con las frases del banco; la app envía etiquetas (hora de entreno, hora de despertar, día de fútbol, objetivo) para segmentar.

## v1.7 (anterior)

## Novedades de v1.7
1. **Base mexicana de alimentos genéricos** (≈75 alimentos, valores aproximados por 100 g, disponible sin conexión). Al escribir se busca primero en genéricos (con plurales y sinónimos: «tortillas», «tomate», «pescado»), luego en *Mis alimentos* y *Productos comerciales guardados*. El botón **Marcas** consulta Open Food Facts solo para productos de marca.
2. **Alimentos editables**: botón *Editar* en cada alimento del día (nombre, comida, gramos y macros por 100 g, con vista previa). Puede guardar los valores corregidos en *Mis alimentos*.
3. **Descansos por ejercicio**: ±15 s en cada ejercicio, se recuerda para próximas sesiones (`restPrefs`, incluido en el respaldo). El temporizador usa hora real (no se desfasa con la pantalla bloqueada), vibra al terminar y muestra el ejercicio.
4. **Check-in**: guardar de nuevo ya no borra datos previos del día y el formulario se precarga con lo registrado.

## v1.6 (anterior)

## Novedades de v1.6

### 1. Edición dinámica de sesiones históricas
- En cada ejercicio de una sesión pasada se puede añadir una serie o quitar una existente.
- Cada ejercicio conserva al menos una serie.
- Las modificaciones se trabajan en un borrador; Cancelar/Cerrar descarta los cambios y Guardar confirma el conjunto completo.
- Se mantienen la edición de kg, repeticiones y RIR.

### 2. Caché local de alimentos
- Se conservan hasta 50 productos consultados o registrados manualmente.
- La búsqueda consulta primero la memoria local y, con conexión, busca nuevos resultados en Open Food Facts.
- Si el dispositivo está offline o falla la API, muestra coincidencias guardadas sin conexión.
- La caché forma parte del respaldo JSON y sobrevive a la actualización en el mismo navegador/origen.

### 3. Analítica semanal por grupo muscular
- Compara las últimas dos ventanas de siete días.
- Desglosa carga externa acumulada (kg × repeticiones), número de series y variación porcentual por grupo.
- Es una métrica descriptiva de carga externa; no equivale por sí sola a estímulo efectivo y no compara perfectamente ejercicios o máquinas diferentes.

### 4. Calibración energética basada en tendencia
- Compara el promedio de peso de los últimos 7 días con los 7 días previos.
- Requiere al menos 4 pesajes distintos por ventana y alimentos registrados en al menos 5 días de cada semana.
- Estima un TDEE observado a partir del promedio de ingesta registrada y el cambio de peso usando una aproximación de 7,700 kcal/kg.
- Compara la tendencia con un ritmo de referencia conservador según el objetivo y sugiere un ajuste de ±100 kcal/día solo cuando la desviación supera 0.30 kg/semana.
- El cambio requiere aprobación explícita y solo puede aplicarse una vez por ventana de 14 días.
- No cambia el objetivo de forma automática. Los registros incompletos pueden sesgar el TDEE observado.

### Estabilidad PWA
- El Service Worker usa un nuevo caché `josfit-pwa-v1-6` y elimina cachés anteriores de JOS Fit al activarse.
- `skipWaiting()` y `clients.claim()` permiten activar la versión nueva sin esperar a cerrar todas las pestañas.
- La app solicita una actualización del registro al cargar cuando hay conexión; ante un cambio de controlador, recarga una sola vez para cargar el nuevo shell.

## Instalación
1. Extrae el ZIP y publica el contenido de esta carpeta en un hosting HTTPS.
2. Abre la URL en Safari (iPhone) o Chrome (Android).
3. iPhone: Compartir → Añadir a pantalla de inicio. Android: menú ⋮ → Instalar aplicación.

## Migración
- Se conserva la clave local `josfit_v01_data` y se mantiene `foodCache` en los respaldos JSON.
- Para conservar datos, actualiza en el mismo navegador y dominio.
- Si cambias de dominio o navegador, exporta un respaldo desde Perfil antes y vuelve a importarlo después.

## Límites y notas
- El TDEE observado es una estimación basada en el registro de alimentos y la tendencia de peso; no es una medición directa del metabolismo.
- El umbral de 0.30 kg/semana y el ajuste de 100 kcal son reglas de coaching orientativas y deben revisarse junto con hambre, energía, rendimiento y salud.
- La comparación kg × repeticiones es tonelaje/carga externa, no una medida completa de volumen efectivo.
- La caché de alimentos almacena valores consultados; no reemplaza etiquetas ni verifica porciones reales.
- No existe sincronización con Hevy, Fitia o Apple Salud ni backend en la nube.
- La instalación/offline real debe probarse en el dominio HTTPS de despliegue; abrir el HTML como `file://` no activa Service Worker.
