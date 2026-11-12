# JOS Fit PWA v1.14 — Visuales de ejercicios

Base: v1.13.3 (el fix de `getMacroTargets` como declaración `function` se conserva). Misma clave `josfit_v01_data`.

## Cambios
1. **Visuales de ejercicios (Fase A).** Archivo nuevo `exercises-visuals.json` (21 ejercicios, 77 KB): SVG propio con un maniquí articulado; sin video, GIF ni Lottie.
   - **6 animados con CSS** (solo `transform`): press inclinado con mancuernas, press banca con mancuernas, press de hombro con mancuernas, sentadilla Smith, peso muerto rumano y prensa de piernas. Todos están en el catálogo.
   - **15 estáticos** con inicio punteado, final sólido y flecha de recorrido. Elevación lateral, pájaros y abducción de cadera usan vista frontal; el resto, vista lateral.
   - Músculo principal en azul `#168cff` y secundario en naranja `#ff9b45`, sobre fondo `#0d1118`.
   - Se carga bajo demanda al abrir una ficha, se guarda en memoria y está en `APP_SHELL` (funciona sin conexión tras la primera carga).
   - `prefers-reduced-motion`: se oculta la animación y se muestra inicio + final con flecha.
   - Ejercicios personalizados o fallo de lectura: tarjeta compacta (grupo, reps, descanso), nunca un recuadro vacío.
   - En la sesión, el nombre del ejercicio lleva un icono ⓘ y abre la ficha sin detener cronómetro, descanso ni series.
2. **Notas por sesión.** Campo «Notas de la sesión» en el resumen; se guarda en la sesión (`notes`) y va en el respaldo JSON. Se edita desde el historial abriendo el resumen de la sesión.
3. **Volumen con peso corporal.** Dominadas, fondos y flexiones cuentan peso corporal del día × repeticiones (+ lastre si lo hay). El resumen lo etiqueta «incluye peso corporal (estimado)». También se aplica a la progresión de cargas y al volumen por grupo muscular. La plancha queda fuera porque se mide en tiempo.

## No se tocó
Catálogo de alimentos, filtro de Open Food Facts, MET, suplementos, sueño, rutinas, OneSignal y Apple Health.

## Cómo verificar
- Abre Entrenar → toca el nombre de un ejercicio con ⓘ: ves el visual y, debajo, la técnica y tu historial.
- Activa «reducir movimiento» en el sistema: las animaciones se quedan quietas con inicio y final.
- Modo avión después de abrir una ficha una vez: el visual sigue apareciendo.
- Caché del Service Worker: `josfit-pwa-v1-14`; registro `./sw.js?v=1.14`.

## Pendiente
Prueba en Safari iOS y en dispositivo real. Solo se validó en Chromium sin cabeza.
