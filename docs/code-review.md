# 7. Code review profesional

La revisión corresponde a una revisión técnica asistida por IA del prototipo entregado. No se atribuye a un compañero ni representa una aprobación docente. La revisión humana y la defensa siguen a cargo de quien presenta el trabajo.

CR1. Responsabilidades separadas: conforme. Evidencia: service.ts, repository.ts y report.ts. Feedback: mantener el cálculo sin dependencia del almacenamiento concreto. Acción incorporada: resumir recibe una lista de solicitudes.

CR2. Cambios de firma explícitos: conforme con adaptación. Evidencia: Registro y adaptador en contrato.test.ts. Feedback: actualizar cualquier cliente antes de reemplazar la base. Criterio: conservar salidas y errores del contrato funcional.

CR3. Mutaciones controladas: conforme en el alcance. Evidencia: #datos y copias de entrada/salida. Feedback: devolver también copias en obtener y listar. Acción incorporada: pruebas de aislamiento específicas.

CR4. Manejo de errores: conforme en las operaciones documentadas. Evidencia: validaciones previas a guardar y pruebas negativas. CR5. Datos de prueba: conforme, nombres sintéticos. CR6. Trazabilidad: conforme localmente, con etiquetas y salidas de ejecución. CR7. Publicación: pendiente de completar en GitHub y en el enlace del video.

CR8. Tipado estático y entrada externa: mejora pendiente. Feedback: incorporar tsc --noEmit y validación de frontera antes de exponer el módulo por HTTP. No se declara realizada una comprobación que no forma parte de las ejecuciones adjuntas.

Criterio de aceptación técnica local: mantener los doce escenarios compartidos, aprobar las dos pruebas adicionales, conservar la demo y registrar decisiones y límites. El criterio no equivale a una certificación productiva ni a la entrega académica completa sin sus enlaces.
