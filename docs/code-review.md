# 7. Code review profesional

La revisión corresponde a una revisión técnica asistida por IA del prototipo entregado. No se atribuye a un compañero ni representa una aprobación docente. La revisión humana y la defensa siguen a cargo de quien presenta el trabajo.

CR1. Responsabilidades separadas: conforme. Evidencia: service.ts, repository.ts y report.ts. Feedback: mantener el cálculo sin dependencia del almacenamiento concreto. Acción incorporada: resumir recibe una lista de solicitudes.

CR2. Cambios de firma explícitos: conforme con adaptación. Evidencia: Registro y adaptador en contrato.test.ts. Feedback: actualizar cualquier cliente antes de reemplazar la base. Criterio: conservar salidas y errores del contrato funcional.

CR3. Mutaciones controladas: conforme en el alcance. Evidencia: #datos y copias de entrada/salida. Feedback: devolver también copias en obtener y listar. Acción incorporada: pruebas de aislamiento específicas.

CR4. Manejo de errores: conforme en las operaciones documentadas. Evidencia: validaciones previas a guardar y pruebas negativas. CR5. Datos de prueba: conforme, nombres sintéticos. CR6. Trazabilidad: conforme localmente, con etiquetas y salidas de ejecución. CR7. Publicación: pendiente de completar en GitHub y en el enlace del video.

CR8. Tipado estático y entrada externa: mejora pendiente. Feedback: incorporar tsc --noEmit y validación de frontera antes de exponer el módulo por HTTP. No se declara realizada una comprobación que no forma parte de las ejecuciones adjuntas.

Criterio de aceptación técnica local: mantener los doce escenarios compartidos, aprobar las dos pruebas adicionales, conservar la demo y registrar decisiones y límites. El criterio no equivale a una certificación productiva ni a la entrega académica completa sin sus enlaces.

## Segunda revisión (rama develop)

Revisión realizada al contrastar el trabajo con la consigna. Cada observación indica la acción tomada y el commit.

OBS-1. Literal de prioridades duplicado en validarRegistro: el mismo problema que D8, ahora con prioridades. Acción: constante PRIORIDADES en model.ts. Estado: corregido.

OBS-2. Errores genéricos (Error) y pruebas que dependen solo del texto del mensaje. Acción: ErrorDeValidacion y ErrorNoEncontrado, que heredan de ErrorDeDominio y conservan los mensajes. Tres pruebas nuevas. Estado: corregido.

OBS-3. ESTADOS estaba definido en report.ts pero lo usa el servicio para validar: es una regla del dominio. Acción: se movió a model.ts. Estado: corregido.

OBS-4. El conteo de resumir debía ampliarse a mano al agregar un estado (corrección parcial de D8). Acción: tipo Conteo = {total} & Record<Estado, number>; si se agrega un estado al tipo, tsc exige su contador. Estado: corregido.

OBS-5. No había verificación estática (CR8). Acción: tsconfig.json en modo strict con erasableSyntaxOnly y script npm run typecheck. Estado: corregido.

OBS-6. El historial y los tags estaban solo en historial.bundle; GitHub tenía un único commit. Acción: se publicaron los cinco commits y los tags. Se agregó estado-refactorizado por la grafía ambigua de la consigna. Estado: corregido.

OBS-7. Los commits de main figuran con el autor "Asistencia técnica IA". Acción: los aportes nuevos se suben con el usuario de cada integrante. Estado: en curso.

Pendientes fuera de alcance: validación de entrada externa (un registro sin tipo produciría TypeError) y separar los datos de ejemplo de model.ts sin modificar base.ts.

Criterio de aceptación de develop: 29 pruebas aprobadas, npm run typecheck sin errores y src/base.ts sin cambios respecto de estado-inicial.

