# 5. Refactoring seguro

R1. Extract Method. Antes: cambiarEstado y asignar repiten la búsqueda y el error. Después: ambos llaman a obtenerObligatoria(id). Motivo: una sola política de recuperación. Verificación: casos de id inexistente en las dos versiones. También se extrae validarRegistro para separar precondiciones del alta.

R2. Move Method o reubicación de responsabilidad. Antes: reporte calcula conteos sobre this.datos. Después: reporte delega en resumir(this.repositorio.listar()). Motivo: separar el cálculo puro del acceso a datos. Verificación: reporte vacío y reporte de dos solicitudes con estados diferentes.

R3. Introduce Parameter Object. Antes: registrar(1, "certificado", "Alumno regular", "normal"). Después: registrar({ estudianteId: 1, tipo: "certificado", detalle: "Alumno regular", prioridad: "normal" }). Motivo: nombres visibles en la llamada. Verificación: el adaptador de pruebas traduce la firma antigua y conserva el resultado exacto.

R4. Encapsulate Collection y Extract Class. Antes: datos y n son públicos. Después: RepositorioMemoria conserva #datos y #secuencia y devuelve copias. Motivo: controlar la escritura y evitar referencias compartidas. Verificación: respuestas aisladas y pruebas específicas de entrada/salida del repositorio.

R5. Inyección de dependencias. Antes: validaciones buscan en catálogos importados. Después: el servicio depende de Catalogos. Motivo: separar reglas y fuente de datos. Verificación: rechazo de estudiante y responsable desconocidos, sin alteración del estado.

La seguridad del proceso se apoya en pruebas de caracterización previas al cambio, commits acotados y comparación de resultados. Las pruebas no prueban ausencia total de defectos. El alcance cubre entradas tipadas y operaciones sin concurrencia; no incluye payloads JSON arbitrarios ni contratos HTTP.
