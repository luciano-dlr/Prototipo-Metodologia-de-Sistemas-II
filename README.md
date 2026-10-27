# Solicitudes académicas · TPI

Prototipo didáctico de Metodología de Sistemas II. TypeScript y Node.js 24, sin paquetes externos.

## Uso

Instalar Node.js 24 y ejecutar desde esta carpeta:

```sh
npm test
npm run demo
```

No requiere npm install. Node elimina anotaciones de TypeScript al ejecutar; no comprueba tipos estáticamente.

## Funcionalidades

Registrar solicitud, asignar responsable, cambiar estado, filtrar y obtener reporte.
Entidades: estudiante, responsable y solicitud. Datos sintéticos. Memoria volátil, sin interfaz web.

## Estructura

- src/base.ts: implementación inicial con debilidades deliberadas.
- src/service.ts: casos de uso refactorizados.
- src/repository.ts: contrato e implementación en memoria.
- src/report.ts: cálculo del resumen.
- src/model.ts y factory.ts: tipos, datos y composición.
- tests/: 12 escenarios en cada versión y 2 pruebas del repositorio.
- docs/: diagnóstico, decisiones, revisión, uso de IA y evidencia.

## Historial

Este directorio distribuido omite .git. El archivo historial.bundle permite recuperar todos los commits y tags:

```sh
git clone historial.bundle solicitudes-con-historial
cd solicitudes-con-historial
git tag
git log --oneline --decorate
git diff estado-inicial estadorefactorizado -- src
```

Etiquetas: estado-inicial, estadorefactorizado, etapa-diagnostico, etapa-refactoring, etapa-pruebas y etapa-docs.
Los commits identifican asistencia técnica IA y no simulan aportes de compañeros.

## Limitaciones

Sin persistencia durable, concurrencia, autenticación, API HTTP, validación de JSON externo ni chequeo con tsc.
La firma de registrar cambia de parámetros posicionales a Registro. La equivalencia comprobada es funcional.
La IA intervino sustancialmente: ver docs/uso-ia.md. Revisar y comprender antes de defender.
