# JOS Fit PWA v1.13.1 — Coach personal

## Cambios incluidos
- Corrige el desbordamiento horizontal: `html/body` limitan el overflow, los campos `time` y los elementos de grid/flex pueden encogerse, y las hojas modales respetan el ancho disponible. El scroll horizontal intencional de las pestañas se conserva.
- El mapa muscular del resumen de rutina ahora es un gráfico de barras horizontales, ordenado por series e incluye porcentaje del total.
- Añade el botón **Ver tutorial** en Perfil y recupera la frase exacta pendiente del rubro 5: “Cada récord empieza con un \"voy a intentarlo\".”
- Añade racha individual: cuentan sesiones con al menos una serie efectiva y deportes programados/confirmados; tolera hasta dos días inactivos y reinicia tras tres. Guarda el máximo histórico, no un contador diario. Usa frases del rubro 4.
- Añade niveles individuales basados en el total de e1RM estimados (Epley) de press inclinado con mancuernas, sentadilla Smith y peso muerto rumano, dividido entre el peso corporal. Si faltan datos se informa cuáles; no se inventan marcas.
- Amplía `sportActivities` con intensidad suave/moderada/intensa. La migración conserva el deporte y los días guardados y asigna moderado + 60 min cuando faltan esos datos. La estimación usa `(MET − 1) × kg × horas × 0.80`, tope 500 kcal/día, y redistribuye la energía dentro de la semana. El factor 0.80 es una regla de diseño conservadora; Pádel y “Otro” usan MET operativos estimados.
- Añade registro de cardio ad hoc con tipo, duración e intensidad. No modifica calorías automáticamente; el usuario puede activar un bono del mismo día con la misma fórmula/factor. Los registros alimentan el resumen de actividad de 28 días.
- Añade catálogo de nueve suplementos, pila personal en Perfil y registro de un toque en Hoy. Incluye avisos de cafeína a menos de 8.5 h del sueño, nota de agua intracelular durante 21 días tras iniciar creatina y nota de whey para registrar sus macros en Nutrición. Se excluyen sustancias y productos indicados en el brief; no se muestran precios.
- Actualiza la versión visible, el manifiesto, el registro del Service Worker y la caché a `v1.13.1`. Se conserva `localStorage` bajo `josfit_v01_data`; no hay backend ni sincronización.

## Notas de diseño
- El valor 0.80 de la fórmula MET es una decisión conservadora de producto, no una constante fisiológica. El margen real de error puede rondar ±15–30%.
- Pádel y “Otro” son estimaciones operativas, no mediciones del Compendium.
- El aviso de creatina de 21 días es una salvaguarda de diseño para evitar interpretar el agua intracelular como grasa o estancamiento; no es un algoritmo clínico.
- La meta semanal se conserva mediante redistribución entera a días sin deporte. Si los siete días tienen deporte programado, no existen días receptores para redistribuir.
- Los MET de cardio ad hoc usan los niveles operativos de la investigación: suave 4.5, moderado 7.0 e intenso 9.5.

## Cómo verificar
1. Antes de actualizar, exporta un respaldo JSON desde Perfil. Descomprime el ZIP y publica los siete archivos juntos en el mismo dominio HTTPS.
2. Revisa los campos de hora y la hoja de resumen a 360, 390 y 430 px; no debe existir scroll horizontal fuera de las pestañas.
3. Abre el resumen de una sesión Push y comprueba barras musculares, series y porcentajes.
4. En Perfil, abre el tutorial y revisa el configurador de deportes: intensidad por deporte. Comprueba que un fútbol moderado de 60 min a 71 kg estima ~341 kcal y uno intenso de 90 min se limita a 500 kcal.
5. Comprueba migración de un deporte existente sin perder día/hora: debe asignar moderado y 60 min si no había intensidad/duración.
6. Registra cardio ad hoc sin bono (no cambia la meta) y después con bono (solo cambia el día actual).
7. En Perfil, añade creatina 5 g; en Hoy, tócala para registrar hora. Prueba cafeína cuando falten menos de 8.5 h para dormir; revisa el aviso de creatina y la ficha de whey.
8. Revisa que no aparezcan productos excluidos y que no se muestren precios.
9. Valida racha con huecos de 2 y 3 días inactivos, un día de deporte, y un perfil sin básicos. Comprueba niveles con marcas guardadas.
10. Ejecuta `node --check` sobre el script de `index.html` y `sw.js`; valida `manifest.json`.

## Pruebas pendientes en dispositivo real
La validación automatizada en este entorno no sustituyó las tres pruebas finales en iPhone: búsqueda en modo avión, escaneo de un producto físico y cerrar/reabrir la PWA desde la pantalla de inicio. También se recomienda confirmar Safari iOS con las capturas de 390 px.


## Corrección v1.13.1
- Los textos del coach y de Nutrición muestran el aumento MET real del día y su equivalente aproximado en carbohidratos (kcal ÷ 4).
- La nota de Nutrición identifica el deporte o los deportes programados; no asume que toda actividad es fútbol.
- No se modifica la fórmula MET, la redistribución semanal ni la clave `localStorage` (`josfit_v01_data`).
