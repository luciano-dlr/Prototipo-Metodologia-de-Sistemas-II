# Guion de defensa · 12 min 35 s orientativos

Cámara encendida al presentarse y voz propia. Las notas del PowerPoint contienen el mismo guion. Ensayar y ampliar la explicación mostrando el código.

## 1. Calidad y refactoring (40 s)

Me presento con nombre completo y cámara encendida. Este trabajo estudia un prototipo didáctico de solicitudes académicas. El objetivo es conservar sus operaciones mientras mejoramos la organización interna. La base fue construida para esta actividad, con debilidades intencionales. No corresponde a un producto real en producción.

## 2. Sistema y alcance (55 s)

Explico que un operador registra una solicitud, asigna un responsable, cambia su estado y consulta listados o reportes. Los datos son sintéticos. El proceso pierde la información al terminar porque la persistencia es simulada, algo permitido por la consigna. No incluimos una interfaz web ni autenticación. La demostración usa consola.

## 3. Calidad externa e interna (55 s)

Muestro src/base.ts. Desde el usuario, la versión inicial cumple las operaciones. Sin embargo, dentro de SistemaBase se mezclan responsabilidades y se expone estado mutable. Esta diferencia explica por qué un programa que funciona puede ser difícil de mantener. No afirmamos una mejora porcentual de calidad: justificamos cambios concretos en responsabilidades y pruebas.

## 4. Diagnóstico prioritario (65 s)

Señalo registrar, cambiarEstado y asignar en la base. Tipo y detalle son strings consecutivos que pueden intercambiarse sin que TypeScript lo detecte. En dos métodos se repite la recuperación por id. Los campos datos y n son públicos. Priorizamos estas debilidades porque permiten errores o amplían el impacto de un cambio. La tabla completa está en docs/diagnostico.md.

## 5. Otras debilidades del diseño (50 s)

Explico que nombres como e, t y d dificultan comprender una llamada. Los catálogos importados acoplan la validación a una fuente concreta. El reporte conoce la colección y repite los estados. La solución centraliza parte de esta información, pero el conteo todavía requiere actualización si incorporamos otro estado. No presentamos la corrección como una eliminación absoluta de toda deuda.

## 6. Responsabilidades en la versión final (65 s)

Abro service.ts, repository.ts y report.ts. Explico SRP mediante responsabilidades. DIP se ve en las interfaces que recibe el constructor. OCP permite agregar implementaciones compatibles, aunque el contrato sincrónico limita la sustitución por una base asíncrona. ISP mantiene contratos pequeños. Para LSP describimos el contrato, pero no demostramos sustitución entre dos repositorios porque solo implementamos uno.

## 7. Comparación del registro (65 s)

Muestro Introduce Parameter Object. El contenido de la solicitud se mantiene, pero la firma de la API cambia. Las propiedades nombradas reducen la ambigüedad. Las pruebas usan un adaptador para ejecutar el mismo contrato en ambas versiones. Aclaro que un cliente que use la firma anterior debe actualizarse: equivalencia funcional no significa compatibilidad de firma.

## 8. Refactorings aplicados (75 s)

Muestro obtenerObligatoria y comparo con los dos bloques repetidos de la base. Después abro resumir, que recibe datos y devuelve el conteo. Finalmente explico #datos y las copias al guardar y consultar. La secuencia fue caracterizar primero, modificar después y volver a ejecutar. Cada mejora tiene un motivo y un escenario de prueba relacionado.

## 9. Verificación del comportamiento (75 s)

Ejecuto npm test. Explico que 24 no significa 24 escenarios distintos: son doce casos aplicados a dos versiones. Las otras dos pruebas comprueban aislamiento del repositorio e ids. Destaco alta inválida sin consumir id, estado inválido sin mutación y respuestas aisladas. Los resultados completos están en docs/evidencias. No medimos cobertura, carga ni seguridad y no ejecutamos un chequeo estático con tsc.

## 10. Demostración del sistema (95 s)

Comparto la consola y ejecuto npm run demo. Recorro los cinco bloques. El alta recibe id 1, la asignación usa responsable 10 y el cambio produce en_proceso. El filtro retorna la misma solicitud y el reporte muestra total 1 y en_proceso 1. Abro el código de demo.ts para mostrar las llamadas. Después muestro git log --oneline --decorate y las etiquetas. Esta parte requiere ejecutar y explicar con voz propia.

## 11. Revisión técnica y límites (60 s)

Aclaro que la revisión incluida es asistida por IA, no una aprobación de un compañero. Reviso los puntos de docs/code-review.md. Los criterios locales se cumplen con el contrato y las pruebas, mientras que la publicación de GitHub y el video debe completarse. Otros límites son almacenamiento volátil, ausencia de validación HTTP y falta de chequeo estático.

## 12. Conclusiones (55 s)

Concluyo que la calidad interna facilita localizar y revisar los cambios. La decisión central fue mantener la funcionalidad acotada. Reconozco la asistencia sustancial de ChatGPT/Codex en código, pruebas y redacción. Quien presenta debe revisar, ejecutar y justificar el material. Menciono como mejoras futuras tipado estático, validación de frontera y persistencia durable. Cierro con cámara encendida y voz propia.