# Diagnóstico
Prototipo construido para el TPI. Los defectos iniciales son intencionales, no deuda observada en un sistema productivo.

| ID | Ubicación base.ts | Evidencia e impacto | Prioridad |
|---|---|---|---|
| D1 | SistemaBase | Mezcla validación, almacenamiento y reporte. Cambios con motivos distintos afectan la clase. | Alta |
| D2 | cambiarEstado/asignar | Repite búsqueda y error de solicitud. Riesgo de mensajes divergentes. | Alta |
| D3 | registrar | Cuatro parámetros posicionales, dos strings contiguos. Riesgo de intercambiar tipo y detalle. | Alta |
| D4 | datos/n | Estado mutable público. Un consumidor puede alterar ids y registros sin validación. | Alta |
| D5 | registrar | e, t, d y p ocultan intención. Dificulta revisar llamadas. | Media |
| D6 | validaciones | Acoplamiento a catálogos importados. Complica reemplazarlos por datos de prueba. | Media |
| D7 | reporte | Conoce directamente la colección interna. Mezcla consultas y reglas de resumen. | Media |
| D8 | cambiarEstado/reporte | Estados como literales repetidos. Riesgo de omisiones al evolucionar. | Media |
