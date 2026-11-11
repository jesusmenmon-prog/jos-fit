# JOS Fit PWA v1.4 — Evaluación inicial adaptativa

## Novedad principal: conoce al usuario antes de proponer un plan
En el primer ingreso aparece una evaluación guiada de seis apartados:
1. **Punto de partida corporal:** edad, dato opcional para la ecuación metabólica, estatura, peso, cintura y % de grasa opcional.
2. **Objetivos:** pérdida gradual, mantenimiento/recomposición o ganancia muscular, prioridad y horizonte.
3. **Entrenamiento:** experiencia, equipo disponible, preferencia de división, tiempo por sesión, días posibles y hora de entrenamiento.
4. **Trabajo y actividad:** tipo de trabajo, horario, días laborales, pasos, otros deportes y fútbol.
5. **Sueño y recuperación:** hora de despertar/dormir, duración habitual y calidad.
6. **Nutrición y horarios:** comidas por día, patrón alimentario, horarios habituales y restricciones/preferencias.

## Qué personaliza
- Recomienda una frecuencia y una división inicial según experiencia, disponibilidad y preferencia.
- Si se selecciona entrenamiento en casa o sin equipo, adapta los nombres y plantillas iniciales a variantes de mancuernas/bandas o peso corporal; la persona puede seguir editándolas.
- El horario de comidas respeta las 2–5 comidas seleccionadas y los horarios preferidos introducidos.
- Distribuye los días disponibles en una semana y guarda un mapa de división por día (p. ej. Upper/Lower o PPL + UL).
- Usa el trabajo, pasos y deporte para sugerir un factor de actividad inicial conservador.
- Propone horarios de comidas basados en despertar, trabajo, horario de comida y entrenamiento.
- Actualiza el perfil energético cuando hay datos suficientes para Mifflin–St Jeor.
- Permite repetir la evaluación desde Perfil sin borrar entrenamientos, comidas ni mediciones.

## Privacidad y funcionamiento
- La evaluación y los registros se guardan en localStorage del navegador del dispositivo. No se envían a un servidor ni a un modelo de IA.
- Los campos opcionales se pueden dejar vacíos. En particular, el dato de sexo de fórmula se usa solo para el coeficiente de la ecuación energética. Sin él no se muestra una cifra energética puntual.
- La opción “Completar después” permite usar la app sin cerrar la evaluación definitivamente; se puede continuar desde Perfil.
- La evaluación no es un diagnóstico médico. Los cálculos de IMC, metabolismo basal y mantenimiento son referencias aproximadas. Ajustar la energía requiere observar tendencias reales durante 2–3 semanas.
- Si se anotan lesiones, dolor o restricciones, la app los conserva como contexto; no prescribe rehabilitación ni sustituye valoración profesional.

## Recomendación inicial de entrenamiento
- Principiante: hasta 3 sesiones semanales por defecto, normalmente Full Body.
- Intermedio: hasta 4 sesiones por defecto, normalmente Upper/Lower.
- Avanzado: hasta 5 sesiones por defecto, normalmente PPL + Upper/Lower.
- La selección de rutina es editable y respeta la preferencia del usuario cuando es viable. Esta es una heurística inicial, no una valoración presencial de técnica o capacidad.

## Instalación
1. Extrae el ZIP.
2. Publica el contenido en un hosting HTTPS.
3. Abre la URL en Safari (iOS) o Chrome (Android).
4. En iPhone: Compartir → Añadir a pantalla de inicio. En Android: menú ⋮ → Instalar aplicación.

## Migración desde v1.3
La clave local de datos se mantiene (`josfit_v01_data`). El perfil se amplía sin borrar comidas, entrenamientos o mediciones. Al primer inicio con v1.4 se abrirá la evaluación para completar las nuevas variables. Antes de migrar de dominio o navegador, exporta un respaldo JSON.

## Límites actuales
No existe sincronización automática con Apple Salud/Watch, Hevy o Fitia; tampoco hay backend ni nube. El buscador de Open Food Facts requiere internet. El factor de actividad, horarios y rutina recomendada son estimaciones ajustables.
