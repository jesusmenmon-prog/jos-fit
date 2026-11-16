# JOS Fit PWA v1.18 — Navegación estable y correcciones

## Base y compatibilidad

- Base de trabajo: `JOS_Fit_PWA_v1_17_fix_repetir.zip` (9 archivos).
- Entrega: **v1.18**.
- Se conserva la clave de almacenamiento local `josfit_v01_data`.
- No se borra ni migra información del usuario.
- No se han eliminado declaraciones de funciones existentes.
- Se conserva el arreglo de OneSignal de v1.17, el check-in de cuatro opciones, el acceso rápido a alimentos frecuentes y las secciones restauradas de alimentos y comidas recientes.
- Esta entrega contiene código; no se ha desplegado.

## Cambios de v1.18

### 1. La app ya no fuerza recargas

**Causa raíz descrita en el diagnóstico:** la app escuchaba `controllerchange` y ejecutaba `window.location.reload()`. La inicialización de OneSignal podía actualizar el worker y provocar el evento; al recargar, la app volvía a su vista inicial (`Hoy`).

**Cambio:** se eliminó el listener que recargaba la página. No quedan llamadas a `location.reload()` en `index.html`. Las actualizaciones del worker quedan para el ciclo normal del navegador y una carga natural posterior; no se invoca `reg.update()` en cada carga.

### 2. Un registro del service worker para el alcance `./`

La app registra el worker con la URL que OneSignal Web SDK v16.08.01 utiliza para su worker:

`./OneSignalSDKWorker.js?appId=0a9df6e2-d2a0-4fc9-a74b-802a0a9c8743&sdkVersion=160801`

Se mantiene `ONESIGNAL_SW_PATH='./OneSignalSDKWorker.js'` como ruta base entregada a `O.init`; el registro explícito de la app usa la URL completa con los parámetros del SDK. Se conserva el alcance `./`.

`OneSignalSDKWorker.js` sigue importando el worker de OneSignal y después `./sw.js?v=1.18`, por lo que el caché offline continúa integrado. `sw.js` solo cambia el identificador de caché a `josfit-pwa-v1-18`.

### 3. Navegación y temporizador de sesión

- Se quitó la recarga automática que interrumpía la navegación entre Hoy, Entrenar, Nutrición, Progreso y Perfil.
- El reloj de sesión calcula el tiempo transcurrido desde `active.start` usando `Date.now()`. El intervalo se mantiene global y no depende de que la vista Entrenar esté visible.
- El reloj también recupera la sesión persistida (`data.activeWorkout`) si la referencia en memoria no está disponible.
- El check-in conserva cuatro opciones: **Baja, Normal, Buena y Muy buena**. No existe una opción «Muy baja» en el control.

### 4. Cancelar una sesión

La función ahora toma la sesión de `active` o, como respaldo, de `data.activeWorkout`. Después de la confirmación limpia ambos estados, reinicia el temporizador y el descanso, guarda sin render intermedio y lleva al usuario a Entrenar para mostrar el estado actualizado.

Esto cubre el estado recién iniciado y el estado recuperado desde el almacenamiento local después de una recarga. La aceptación interactiva debe confirmarse en un dispositivo.

### 5. Fuente real en la lista de alimentos

La lista ya no presenta todos los alimentos genéricos bajo una etiqueta fija INCMNSZ. Los genéricos se agrupan según `source.name`, y cada fila muestra su fuente real. Se aplica tanto al buscador normal como a la ruta de consulta de marcas (Open Food Facts).

En `foods-mx.json`, la avena (`usda:fdc:169705`) y la tilapia (`usda:fdc:175176`) tienen `source.name = USDA FoodData Central · SR Legacy`; por ello la lista ahora debe identificarlas como USDA, igual que la ficha de detalle.

### 6. Récords personales en Progreso

Se agregó una sección propia en la pestaña Progreso. En cada render calcula las mejores marcas por ejercicio a partir de las sesiones guardadas y muestra la mejor carga y el 1RM estimado. No depende de un render inicial ni de estado temporal: se reconstruye desde `data.workouts` en cada visita y recarga.

La causa del síntoma reportado no pudo confirmarse con una prueba en vivo. En la base inspeccionada, `renderProgress` tenía varios wrappers y no existía un contenedor de récords en el DOM de Progreso; los récords se mostraban en la ficha individual del ejercicio y en el resumen post-entreno. La solución hace explícita la sección y la alimenta de forma determinista desde los entrenamientos persistidos.

### 7. Versión y detalles

- Título y pie actualizados a v1.18.
- `manifest.json` declara `JOS Fit v1.18`.
- Caché del service worker: `josfit-pwa-v1-18`.
- Se actualizó el import offline a `sw.js?v=1.18`.
- Se normalizó el carácter de más de ancho completo `＋` a `+`.
- No se modificó la Fase B (carrusel de rutinas, miniaturas ni tarjeta de atleta).

## Validaciones realizadas

**Validaciones estáticas realizadas en esta entrega:**

- `node --check` sobre el JavaScript inline de `index.html`, `sw.js` y `OneSignalSDKWorker.js`.
- Búsqueda global en `index.html`: cero llamadas a `location.reload()`.
- Búsqueda global: una llamada explícita a `navigator.serviceWorker.register(...)`, con la URL de registro que incluye `appId` y `sdkVersion`.
- Se conserva el listener `controllerchange` usado por `renderPushDiagV116`; ya no contiene una recarga.
- Se comprobó que la clave `josfit_v01_data` permanece sin cambios.
- Se comprobó que el control de recuperación tiene exactamente cuatro opciones y no contiene «Muy baja».
- Se comprobó que las secciones «Ingresado recientemente» y «Comidas recientes · repetir en un toque» siguen presentes en `renderFoodQuickAccess`.
- Se comprobó en el catálogo que avena y tilapia conservan la fuente USDA.
- Se comprobó que los cuatro recursos estáticos (catálogo de alimentos, visuales e iconos) se conservaron respecto a la base.
- Se compararon las declaraciones de funciones antes y después: no se eliminó ninguna. Las tres declaraciones nuevas corresponden a los helpers de fuente y récords de v1.18.

**No se afirma que se hayan completado estas pruebas:** no se ejecutó la PWA en un iPhone ni en un navegador real durante 60 segundos por pestaña; no se validó una suscripción push real; tampoco se probó de forma interactiva cancelar una sesión antes y después de recargar. Esas pruebas siguen siendo necesarias antes de desplegar.

## Propuesta para una próxima versión (no implementada)

Ordenadas por valor esperado para el usuario:

1. **Respaldo y restauración guiados.** Exportar e importar datos con validación y vista previa antes de reemplazar el almacenamiento. Coste/riesgo: bajo–medio; sigue siendo local, sin backend ni créditos de despliegue adicionales.
2. **Prueba de integridad de datos al abrir.** Detectar registros incompletos o incompatibles y ofrecer reparación no destructiva. Coste/riesgo: medio; local, pero requiere pruebas cuidadosas para no alterar datos válidos.
3. **Historial de peso y medidas con anotaciones.** Relacionar cambios de peso, cintura, entrenamiento y adherencia en una vista temporal. Coste/riesgo: medio; local, con riesgo moderado de interfaz y cálculos.
4. **Plantillas de comidas y días completos.** Guardar combinaciones de alimentos y repetir un día o una comida con confirmación de cantidades. Coste/riesgo: medio; local, con cuidado especial para evitar duplicados.
5. **Sincronización multidispositivo opcional.** Mantener datos entre iPhone y otros dispositivos. Coste/riesgo: alto; requiere backend, autenticación, política de privacidad y resolución de conflictos; puede añadir coste operativo.

## Despliegue y rollback

El despliegue queda a decisión del usuario. Según el contexto de proyecto proporcionado para esta entrega, los créditos de Netlify están agotados hasta el 10 de diciembre salvo cambio de plan. La v1.16 se conserva como versión buena conocida para rollback; no se ha modificado ni desplegado desde este paquete.
