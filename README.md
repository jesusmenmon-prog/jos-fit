# JOS Fit PWA v1.13.2

## Alcance de esta entrega
- Corrige la ubicación de las tarjetas: racha solo en Hoy; nivel completo y pila de suplementos solo en Perfil; barra compacta de nivel, suplementos de hoy y cardio solo en Hoy; aviso de creatina solo en Progreso. Los contenedores ahora son HTML estático y no se duplican por inyección o espejos.
- Corrige la frase de racha para evitar números fijos contradictorios y pluraliza correctamente “1 día” / “N días”.
- Compacta los controles `input[type=time]` a 48 px manteniendo 16 px de fuente y el selector nativo.
- Open Food Facts admite carbohidratos o grasa ausentes como 0, etiqueta esos resultados con “Revisa etiqueta” y sigue exigiendo kcal y proteína válidas no negativas.
- Amplía `foods-mx.json` a 500 alimentos, con macros extraídos de SiAgroBD y trazabilidad por `conabio_id`. Incluye quesos lácteos, yogures, carnes y derivados, pan de caja, tortillas de harina y otras categorías. Se excluyen falsos amigos y preparados con queso.
- Añade rutinas personalizadas: crear, elegir, editar y borrar; se pueden usar en sesiones normales y guardar cambios de sesión en la rutina de origen. El recomendador continúa limitado a las seis plantillas.
- Elimina la función antigua de ajuste fijo +250 kcal y el catálogo MET de cardio que no era necesario para el cálculo; conserva el modelo MET y su redistribución semanal.
- Confirma la convención de mancuernas por peso combinado (18 + 18 = 36 kg), conserva la nota de remo a una mano y aclara “remo en polea” para el registro de 73 kg.

## Datos y compatibilidad
- Se conserva la clave `localStorage`: `josfit_v01_data`.
- `customRoutines` se incorpora como colección nueva; si no existe en datos anteriores, se inicializa como `[]`.
- El catálogo local se construyó únicamente con los archivos SiAgroBD proporcionados: `registros.json`, `nutrientes.jsonl` y `resumen.json`. Se usan Energía (kcal), Proteína bruta, Hidratos de carbono y Extracto etéreo; fibra solo cuando existe Fibra dietaria total. Los registros con desviación energética mayor a 10% se marcan para revisar energía.
- Fuente: CONABIO. 2023. Sistema de Información sobre Agrobiodiversidad; Bourges Rodríguez, H. G. N., Camacho Parra, M. A., Morales Guerrero, J. C. 2019. Composición de alimentos mexicanos Base de Datos Extensa. INCMNSZ.

## Verificaciones realizadas
- `node --check` del JavaScript inline y `sw.js`: correcto.
- `manifest.json`: JSON válido.
- `foods-mx.json`: 500 registros, IDs únicos, sin discrepancias de macros frente a SiAgroBD; Queso Panela (conabio_id 1626): 237.88 kcal, 23 g proteína, 2.18 g carbohidratos, 15.24 g grasa y 523.1 mg sodio por 100 g.
- La sintaxis conserva el registro `./sw.js?v=1.13.2`, caché `josfit-pwa-v1-13-2` y el precache de `foods-mx.json`.
- Pendiente de validación manual en Safari iOS: medidas reales de los campos de hora, modal a 390 px, conteo visual de tarjetas y flujo completo de crear/usar/editar/borrar rutina personalizada. Las comprobaciones estáticas no sustituyen estas pruebas de dispositivo.
