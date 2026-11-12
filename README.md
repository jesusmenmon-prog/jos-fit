# JOS Fit PWA v1.12 — Coach personal

## Cambios principales
- Resumen de fin de rutina y resumen consultable desde el historial: duración, volumen externo, mejores series, PR, grupos musculares y comparación con la sesión anterior del mismo split. Las frases de celebración/progreso proceden de los rubros 8 y 5 del banco proporcionado.
- Hoja de detalle de alimento apilada sobre el buscador: macros por 100 g, reparto energético, fibra dietaria total y sodio solo si hay dato, porciones, selector de comida y favoritos.
- Desplegables nativos en Hoy, Nutrición, Progreso y Perfil; el check-in se compacta después de guardar. Entrenar mantiene la lista de ejercicios sin colapsar.
- Tutorial automático una sola vez al completar onboarding; también se puede reabrir desde Perfil.
- Las 21 fichas conservan su estructura y suman los textos exactos de “En palabras simples” del dossier de evidencia. Crunch en polea conserva el descanso validado de 60 s.
- Ajuste de safe-area para la barra superior e inferior en iOS.
- Deportes múltiples con varios días, hora y duración en horas/minutos; se migran los datos football* y se mantienen los campos antiguos por compatibilidad. El ajuste energético sigue siendo +250 kcal por día de deporte, redistribuido en la semana; el modelo MET queda para una versión posterior.
- Tarjetas de sueño en Hoy y Perfil, ancladas a la hora de despertar. Se distinguen 7.5 h estándar y 8 h cuando aplica la regla de diseño de JOS Fit (déficit, 5+ sesiones o preferencia de dormir más). Latencia asumida: 15 min; ventana de acostarse ±15 min; desconexión 45 min antes.
- Check-in de sueño: ≥7 h normal; 6–6.9 h conserva series y sugiere RIR ≥2; <6 h aplica una serie menos por ejercicio (mínimo una), RIR ≥3 y siesta breve; dos noches seguidas <6 h muestran fatiga acumulada.

## Instalación / actualización
1. Exporta un respaldo JSON desde Perfil antes de actualizar.
2. Descomprime el ZIP y publica los siete archivos en el mismo dominio HTTPS de la versión anterior.
3. En iPhone, si el icono o la versión no se actualiza, elimina la PWA de la pantalla de inicio y vuelve a añadirla desde Safari.
4. Los datos viven en `localStorage` bajo `josfit_v01_data`; no hay backend ni sincronización entre dispositivos.

## Comprobaciones
- Validar resumen al terminar y al abrir sesiones históricas.
- Abrir un alimento desde la búsqueda, cerrar la hoja y comprobar que la búsqueda permanece debajo.
- Probar tutorial automático con perfil nuevo y volver a abrirlo desde Perfil.
- Revisar ejercicio Press inclinado, Peso muerto rumano y Crunch en polea.
- Configurar fútbol martes/sábado 1 h 30 min y añadir otro deporte en días distintos.
- Probar sueño con 6.5 h, 5.5 h y dos noches consecutivas bajo 6 h.
- En iPhone: validar safe-area, búsqueda en modo avión, escaneo físico y cerrar/reabrir desde pantalla de inicio.

## Nota de sueño
La investigación aportada propone 7–9 horas como rango general para adultos y utiliza una regla de 7.5–8.0 horas para organizar el horario. El extra de 0.5 h en déficit es una **regla de diseño de JOS Fit**, no una prescripción médica. La app no usa ciclos exactos de 90 minutos, ni fases de sueño estimadas por wearables, ni diagnostica trastornos del sueño. Las recomendaciones son orientativas y no sustituyen consejo clínico.

## Límites conocidos
- La validación automatizada no sustituye pruebas reales en Safari iOS/Chrome Android. Cámara, instalación offline y recarga del Service Worker deben probarse en dispositivo.
- La calibración de recomendaciones depende de la calidad de los registros que introduzca el usuario.
- Push programado / OneSignal y sincronización en la nube no forman parte de esta versión.
