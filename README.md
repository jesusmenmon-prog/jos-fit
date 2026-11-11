# JOS Fit PWA v1.6 — Coach adaptativo

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
