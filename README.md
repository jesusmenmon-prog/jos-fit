# JOS Fit PWA v1.5 — Master de estabilidad y adaptación

## Cambios incluidos

### P0 · Estabilidad y persistencia
- `go()` cambia de pestaña y renderiza sin volver a registrar listeners; los cinco botones de navegación se enlazan una sola vez durante la inicialización.
- `getWorkoutPrevious()` consulta primero el historial real y después `exerciseBaselines`, para mostrar las referencias precargadas cuando aún no hay sesiones locales.
- `updateSet()`, `toggleSet()` y `addSet()` guardan mediante `save()` con el mismo `try/catch` de persistencia. En las ediciones de campos se omite el render para no perder el foco.
- La autorregulación de sueño usa únicamente el check-in de la fecha actual; no reutiliza un registro antiguo.
- Las metas iniciales de carbohidratos y grasas aparecen como `—` antes del primer render dinámico.

### P1 · Adaptación
- El detector de estancamiento reúne las últimas tres ejecuciones del ejercicio dentro de la misma división, aunque haya rotación de ejercicios entre sesiones.
- Excluye entrenamientos marcados `recoveryAdjusted` y prioriza los ejercicios multiarticulares frente a accesorios.
- Solo muestra una señal cuando el volumen no crece más de 2% entre apariciones y el RIR de la más reciente es ≤1.5. Es una alerta orientativa, no una orden de deload.
- Si la agenda confirma fútbol o el check-in del día lo confirma, se suman 250 kcal como aproximadamente 62 g extra de carbohidratos. El check-in puede anular la agenda seleccionando “No hubo fútbol hoy”. El objetivo semanal se evalúa con metas específicas por día.

### P2 · Control e interfaz
- Se puede editar una sesión guardada para corregir kg, repeticiones y RIR sin borrar la sesión completa.
- El historial conserva la acción de eliminar como alternativa.
- `Escape` cierra el editor de entrenamientos además del editor de rutinas.

## Instalación
1. Extrae todos los archivos del ZIP.
2. Publica el contenido de esta carpeta en un hosting HTTPS.
3. Abre la URL en Safari (iPhone) o Chrome (Android).
4. iPhone: Compartir → Añadir a pantalla de inicio. Android: menú ⋮ → Instalar aplicación.

## Migración desde v1.4
Se conserva la clave local `josfit_v01_data`, por lo que la actualización en el mismo navegador y dominio mantiene los datos existentes. Si cambias de dominio o navegador, exporta un JSON desde Perfil y vuelve a importarlo. El Service Worker usa un caché nuevo `josfit-pwa-v1-5` y elimina el caché anterior en activación.

## Límites
- El ajuste por fútbol es una regla fija configurable de +250 kcal (+62 g aproximados de carbohidratos); no estima el gasto real del partido ni su intensidad.
- El detector de estancamiento requiere tres apariciones válidas del mismo ejercicio con series completadas y RIR registrado; no sustituye el criterio del usuario.
- Los datos permanecen localmente en el navegador. No hay sincronización con Hevy, Fitia o Apple Salud ni backend en la nube.
- La instalación y funcionamiento offline deben probarse en el dominio HTTPS final; no se debe asumir que el archivo abierto como `file://` instala el Service Worker.
