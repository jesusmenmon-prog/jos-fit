# JOS Fit PWA v1.11 — Fichas, tutorial y rutina editable

## Novedades de v1.11
- **21 fichas de ejercicios:** músculos principales/secundarios, equipo, preparación, pasos técnicos, puntos clave, errores frecuentes y variantes. Incluye esquemas SVG orientativos y un desplegable con historial/PRs cuando hay sesiones registradas.
- **Tutorial guiado:** seis pasos para Hoy, selección de rutina, registro de series, descanso y edición durante sesión, nutrición, progreso y respaldos. Se abre desde el botón `? Guía`; no interrumpe el primer uso con un popup.
- **Edición durante la sesión:** añade, quita, restaura y reordena ejercicios; modifica series de trabajo y descanso. Los valores se guardan en el borrador mientras reordenas o añades movimientos y se aplican al pulsar Guardar. Las series ya completadas se conservan al ocultar un ejercicio. Los descansos cambiados solo afectan la sesión actual, salvo que marques la opción para guardar la estructura y preferencias en la plantilla habitual. La sesión debe conservar al menos un ejercicio visible.
- **Glosario de fuerza:** RIR, RPE, 1RM estimado, volumen externo, serie efectiva, calentamiento, sobrecarga progresiva, deload, tempo y ROM.
- **Recomendador de rutina:** árbol orientativo por experiencia, días disponibles y duración; incluye una sugerencia de organización del volumen según el tiempo disponible. Al aplicar, actualiza la agenda semanal, no reescribe las plantillas.
- **Hojas apiladas:** abrir una ficha o glosario desde el editor de rutinas o desde la sesión mantiene la hoja anterior debajo. `Esc` cierra solo la hoja superior y ejecuta el cierre específico (por ejemplo, detener la cámara del lector). Se actualizan `aria-modal` y `aria-hidden` para exponer solo la hoja activa a tecnologías de asistencia.
- **Desplegables:** técnica, errores, variantes, historial y términos se presentan en secciones plegables para reducir saturación visual.
- **Fibra SiAgroBD:** se integra `Fibra dietaria total` solo cuando existe para el mismo `conabio_id` (que coincide con `registro_id` del archivo de nutrientes). No se usa `Fibra bruta` como sustituto de fibra dietaria; los registros sin dato permanecen en blanco. La nutrición muestra solo la fibra de alimentos registrados con dato disponible.

## Conservación de datos
- Se mantiene la clave local `josfit_v01_data` y el formato de datos anterior.
- Se conserva el catálogo de alimentos `foods-mx.json` con 250 registros.
- Antes de actualizar o cambiar de dominio/navegador, exporta un respaldo JSON desde Perfil. Los datos siguen siendo locales: no hay sincronización entre dispositivos.

## Archivos
- `index.html`: aplicación y fichas de ejercicios.
- `foods-mx.json`: catálogo mexicano, con `fiber` y `fiber_type` cuando hay fibra dietaria total documentada.
- `sw.js`: caché `josfit-pwa-v1-11`, catálogo e iconos offline.
- `manifest.json`, `icon-192.png`, `icon-512.png`.

## Uso de datos nutricionales
Fuente: Tabla de composición de alimentos extendida 2019, INCMNSZ, vía SiAgroBD/CONABIO. CONABIO. 2023. Sistema de Información sobre Agrobiodiversidad; Bourges Rodríguez, H. G. N., Camacho Parra, M. A., Morales Guerrero, J. C. 2019. Composición de alimentos mexicanos Base de Datos Extensa. INCMNSZ.

El archivo SiAgroBD de nutrientes asocia `registro_id` con `conabio_id`. Se prioriza `Fibra dietaria total` (unidad g o g / 100). La `Fibra bruta` no se presenta como fibra dietaria. Si no hay dato explícito, se deja nulo. La fuente no declara una licencia abierta en el material recibido; confirma condiciones de reutilización antes de distribución pública o comercial.

## Instalación / actualización
1. Exporta un respaldo JSON desde Perfil.
2. Publica todos los archivos de esta carpeta en el mismo dominio HTTPS de la versión anterior.
3. Abre la URL en Safari (iPhone) o Chrome (Android), con conexión la primera vez.
4. Cierra y vuelve a abrir la PWA para que se active el Service Worker `josfit-pwa-v1-11`.
5. En iPhone, si el icono no cambia, elimina el acceso de pantalla de inicio y vuelve a añadirlo.

## Validaciones automatizadas realizadas
- Sintaxis JavaScript validada con `node --check`.
- 21 nombres de la biblioteca coinciden con 21 fichas; se verifican secciones de ejecución y errores.
- Prueba funcional aislada del tutorial de seis pasos, recomendador, fichas desde el editor, apilado de hojas con ARIA y edición de sesión (reordenar, añadir, conservar valores y guardar).
- Integración de fibra cotejada contra SiAgroBD: se incorporan únicamente 18 valores explícitos de `Fibra dietaria total` en los 250 alimentos; no se sustituye con `Fibra bruta`.

## Pruebas pendientes en dispositivo real
- Abrir fichas y desplegables en Safari iOS y Chrome Android.
- Abrir una ficha desde otra hoja y comprobar el apilado/cierre con `Esc` (en teclado).
- Añadir/reordenar/ocultar/restaurar ejercicios durante sesión y verificar que las series completadas permanecen.
- Validar tutorial en pantalla pequeña, lector de pantalla y navegación con teclado.
- Validar cache/offline del Service Worker en Safari y Chrome reales.

Las fichas son material educativo general y no sustituyen supervisión de técnica, evaluación clínica ni indicaciones profesionales. Los esquemas SVG son ilustrativos, no animaciones anatómicas de precisión.
