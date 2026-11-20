# JOS Fit PWA v1.20 — Rediseño de experiencia y entrenamiento

## Base y compatibilidad
- Base obligatoria: JOS Fit PWA v1.18.
- Se conserva `localStorage` con la clave `josfit_v01_data`.
- No se despliega automáticamente.
- Se mantienen sin cambios los archivos de datos y la configuración de OneSignal.

## Cambios implementados
1. Onboarding con tema claro, tipografía más legible, progreso visible y tarjetas táctiles.
2. Objetivo principal convertido en tarjetas visuales.
3. Se agregan obstáculos seleccionables (multiselección).
4. Se agrega preferencia de estilo de entrenador (John, Jennifer, Sarah y Chris); son estilos de comunicación, no personas ni agentes IA.
5. Se separa `genderIdentity` de `sex`: la primera es identidad declarada; `sex` sigue siendo el dato opcional de la ecuación metabólica.
6. Se eliminan validaciones bloqueantes de experiencia, días, trabajo, sueño y alimentación; edad, estatura y peso mantienen validación mínima para crear estimaciones coherentes.
7. Temporizador: se conserva la hoja inferior y se agrega control deslizante de 5 segundos, manteniendo persistencia por marca temporal.
8. Mejoras de jerarquía visual para tarjetas y controles de series sin cambiar el modelo de entrenamiento.
9. Versión PWA, caché y tutorial actualizados a v1.20.

## Persistencia
- La clave `josfit_v01_data` no cambia.
- Nuevos campos de perfil: `genderIdentity`, `obstacles`, `coachStyle`.
- Los perfiles anteriores reciben valores predeterminados al abrir el onboarding; no se borra información existente.
- `sex` conserva los valores `male` / `female` / vacío para no alterar la ecuación metabólica.

## Auditoría
- `node --check` del JavaScript principal: PASS.
- Conteo de funciones declaradas: 350 en base y 350 en entrega; no se perdió ninguna declaración. Los IDs generados dinámicamente requieren revisión visual adicional.
- Pruebas reales en Safari iOS: pendientes (onboarding, navegación, teclado, sesión y temporizador).
- Push/OneSignal: no modificado ni probado en vivo.
