# JOS Fit PWA v1.22 · correcciones de revisión

## Base y compatibilidad
- Base entregada por el usuario: `JOS_Fit_PWA_v1_20_fix_dark_theme.zip` (último ZIP disponible en esta conversación; README original lo identificaba como v1.20 con tema oscuro).
- Se conserva `localStorage` con clave `josfit_v01_data`.
- No se desplegó la aplicación.
- OneSignal App ID y Site URL del panel no se modificaron.

## Cambios incluidos en esta candidata
1. OneSignal: inicialización con `path: '/jos-fit'`, worker relativo al path, scope `/jos-fit/`, registro manual absoluto bajo `/jos-fit/` y `sdkVersion=160900`.
2. Reparación de suscripción atascada: si el SDK indica `optedIn` pero no devuelve ID, se intenta una sola secuencia `optOut()`/`optIn()` por carga.
3. Diagnóstico push en lenguaje normal; detalles técnicos quedan plegados e incluye URL del controlador cuando está disponible.
4. Título de pestaña simplificado a `JOS Fit`; marcadores de tutorial/cache/worker y manifest actualizados a v1.22 · correcciones de revisión.
5. Metas estáticas sin números supuestos; Hoy y Nutrición muestran una meta calórica única marcada como estimada. El Coach ya no afirma que las metas no son supuestas.
6. Accesos al glosario desde Hoy y Perfil; texto de dato fisiológico aclarado.
7. La propuesta de rutina del onboarding se explica en Hoy; el selector de coach se retiró del onboarding y el campo antiguo se ignora para compatibilidad.
8. Insignia Local abre explicación de almacenamiento local y exportación; guía de instalación iPhone en Perfil y Recordatorios; recordatorio mensual de respaldo.
9. Recuperación muestra el mismo nombre que el valor (`Muy buena`); actividad por defecto explica que sigue los días programados.
10. Etiqueta de porción simplificada; la selección de alimento preselecciona la primera porción doméstica disponible y las filas identifican valores por 100 g.
11. Fuente nutricional resumida con referencia completa desplegable.
12. Check-in: pasos, recuperación y actividad quedan bajo «Más datos (opcional)»; peso y sueño siguen visibles.
13. Coach sin datos ofrece primeros pasos; racha inicial usa mensaje de bienvenida.
14. Horarios sugeridos identifican que se basan en las horas habituales declaradas.
15. Fichas de ejercicio muestran «En palabras simples» abierto inicialmente.
16. Nueva rutina incorpora búsqueda y filtro básico por grupo muscular y una guía de selección de ejercicios.
17. Se eliminaron las marcas de ejercicio de demostración precargadas en instalaciones/perfiles sin entrenamientos reales; se limpia esa semilla al migrar datos que no tienen entrenamientos.
18. Ajustes de contraste para chips de hora en tema oscuro.
19. Correcciones parciales al texto del resumen para evitar afirmaciones de cierre semanal sin contexto y marcas previas vacías.

## Auditoría estática
- JavaScript inline de `index.html`: `node --check` PASS.
- `sw.js`: `node --check` PASS.
- `OneSignalSDKWorker.js`: `node --check` PASS.
- Caché: `josfit-pwa-v1-22`.
- Worker OneSignal importa `./sw.js?v=1.22`.
- Paquete: 9 archivos.

## Pendiente de validar o completar
- Push real en GitHub Pages y entrega efectiva al iPhone: requiere instalar/abrir la PWA y prueba desde el panel OneSignal. La configuración de URL es un cambio de código, no prueba de entrega.
- Modo ejemplo temporal sin contaminar datos reales.
- Advertencia de peso objetivo por IMC/ritmo semanal.
- Ayudantes `?` junto a cada término específico del glosario (se añadieron accesos generales, no todos los anclajes inline).
- Indicador visible y dinámico de fuente de metas manual/calculada y fecha de actualización.
- Porciones en cada fila con conversión específica por alimento; las filas indican por 100 g y la ficha permite porciones domésticas.
- Corrección exhaustiva de decimales/textos rotos y resumen de sesión; revisar todas las frases dinámicas con datos reales.
- Temporizador: reposicionar barra para no cubrir navegación/contenido y unificar todos los controles a min:seg.
- Ajustar recomendaciones de rutina a todos los casos de nivel/días/minutos, horas de desayuno/cena y eliminación definitiva de avisos OneSignal durante onboarding.
- Verificación visual en Safari iOS, teclado, persistencia de onboarding, migración con datos existentes y tutorial de una sola apertura.

## Pruebas para el teléfono
1. Confirmar v1.22 · correcciones de revisión, abrir la app desde la PWA instalada y probar el diagnóstico push.
2. Confirmar que aparece un UUID de suscripción, no solo «activado»; enviar una notificación real desde OneSignal.
3. Completar onboarding; revisar chips de hora, tarjetas, regreso entre pasos y ausencia de selector de coach.
4. Confirmar que perfiles sin entrenamientos no muestran «Anterior», PR ni nivel calculado por datos de demostración.
5. Registrar comida con porción doméstica y verificar gramos/macros.
6. Probar check-in, respaldo local y restauración en copia de prueba.
7. Crear una rutina usando búsqueda/filtro.
8. Entrenar, terminar sesión y comprobar resumen, temporizador y navegación.

**Estado:** candidata v1.22 · correcciones de revisión con validación estática; no declarar lista para producción hasta completar las pruebas pendientes, en especial push real y prueba en Safari iOS.

## Correcciones de revisión — v1.22 · correcciones de revisión
- Añadido modo ejemplo con datos temporales en memoria; las llamadas a `save()` quedan bloqueadas durante el ejemplo y se restaura el objeto de datos original al salir.
- Añadidas advertencias no bloqueantes de IMC bajo y ritmo de pérdida estimado al guardar perfil y avanzar en onboarding.
- Nota de fuente nutricional abreviada con cita completa en un desplegable.
- Recomendación de rutina toma experiencia, días disponibles y duración del perfil como valores iniciales.
- Eliminada la acción duplicada de añadir deporte en el paso de onboarding.
- OneSignal ya no intenta crear la suscripción al inicializar el SDK; el opt-in queda en el control explícito de Perfil → Recordatorios.
- Resúmenes de macros muestran gramos enteros; horario flexible ya no deja un guion colgando.
- Los términos de glosario detectados muestran ayuda contextual `?`.
- La ficha de alimento prioriza la primera porción doméstica disponible.
- Perfil refresca la nota de origen de metas al renderizar.
- Se añadió margen inferior a la página activa mientras el banner de descanso está visible.
- Nota: la verificación de interacción visual y push real en iOS sigue pendiente.

## Fix final de revisión v1.22
- `fmt()` redondea a enteros para los resúmenes diarios y el texto de calorías restantes.
- `durText(0)` devuelve "menos de 1 min"; el resumen de sesión usa esa función para evitar "0 min".
- Se eliminó el argumento fijo de 100 g en las listas de búsqueda/favoritos/frecuentes; las porciones domésticas aparecen antes de "100 g".
- El editor de rutina muestra descanso en min:seg y convierte la entrada a segundos al guardar.
- Los descansos del dossier se presentan en min:seg y el parser acepta tanto segundos como min:seg.
- Las frases de cierre filtran placeholders vacíos y disponen de texto singular/plural para sesiones.


### Correcciones de revisión 3 (v1.22)
- Nutrición: nota de fuente compacta y cita extendida dentro del desplegable «Fuente».
- Frases: se excluyen antes del sorteo las plantillas con placeholders vacíos o sin valor.
- Ficha de alimento: las porciones domésticas aparecen antes de la opción «100 g».
- Ficha de ejercicio: el descanso especial del Crunch en polea se ajusta desde el texto original a 1:00 antes de formatear min:seg.
