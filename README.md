# JOS Fit PWA v1.13.3

## Correcciones
- Restaurada la declaración de `getMacroTargets` como función para evitar `ReferenceError` en modo estricto. El cuerpo MET y la redistribución semanal permanecen intactos.
- Actualizado el mensaje de Open Food Facts para reflejar el criterio de aceptación: calorías y proteína válidas.

## Conservación
- Se mantiene la clave de almacenamiento `josfit_v01_data`.
- Se conserva el catálogo mexicano, las rutinas personalizadas y los demás componentes existentes sin cambios funcionales.
- Caché del Service Worker: `josfit-pwa-v1-13-3`.
- Registro: `./sw.js?v=1.13.3`.

## Validación
- Incluye validaciones estáticas y prueba automatizada de arranque.
- Pendiente de prueba funcional en Safari iOS y dispositivo real.
