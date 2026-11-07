# Solicitudes académicas · TPI

Prototipo didáctico de Metodología de Sistemas II. TypeScript y Node.js 24, sin paquetes externos.

## Uso

Instalar Node.js 24 y ejecutar desde esta carpeta:

```sh
npm test          # 29 pruebas: 12 escenarios por versión, 2 del repositorio y 3 de errores
npm run demo      # recorrido de las cinco operaciones
```

Pruebas y demo no requieren `npm install`: Node elimina las anotaciones de TypeScript al ejecutar.
Para la verificación estática de tipos (TypeScript strict):

```sh
npm install
npm run typecheck
```

## Funcionalidades

Registrar solicitud, asignar responsable, cambiar estado, filtrar y obtener reporte.
Entidades: estudiante, responsable y solicitud. Datos sintéticos. Memoria volátil, sin interfaz web.

## Tecnologías

TypeScript 5.9 (verificación estática), Node.js 24 (ejecución y `node:test`), sin dependencias de ejecución.

## Estructura

- src/base.ts: implementación inicial con debilidades deliberadas (no se modifica: es la referencia del "antes").
- src/service.ts: casos de uso refactorizados.
- src/repository.ts: contrato e implementación en memoria.
- src/report.ts: cálculo del resumen.
- src/errores.ts: errores de dominio.
- src/model.ts y factory.ts: tipos, constantes del dominio, datos y composición.
- tests/: 12 escenarios en cada versión, 2 pruebas del repositorio y 3 de errores.
- docs/: diagnóstico, decisiones, revisión, uso de IA, evidencias y diagramas Mermaid.

## Historial y ramas

- `main`: entrega con los tags de la consigna: estado-inicial, etapa-diagnostico, etapa-refactoring, etapa-pruebas, etapa-docs y estadorefactorizado (también estado-refactorizado).
- `develop`: mejoras surgidas de la segunda revisión de código (ver docs/code-review.md).

```sh
git log --oneline --decorate --all
git diff estado-inicial estadorefactorizado -- src
git diff estadorefactorizado develop -- src
```

## Limitaciones

Sin persistencia durable, concurrencia, autenticación, API HTTP ni validación de JSON externo.
La firma de registrar cambia de parámetros posicionales a Registro. La equivalencia comprobada es funcional.
Uso de IA declarado en docs/uso-ia.md. Cada integrante debe comprender el código antes de defenderlo.
