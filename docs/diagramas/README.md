# Diagramas de clases (Mermaid)

Fuentes editables: diagrama-antes.mmd y diagrama-despues.mmd. GitHub muestra los bloques de abajo como diagramas.

## Versión inicial (estado-inicial)

```mermaid
---
title: Versión inicial (tag estado-inicial) — una clase concentra todas las responsabilidades
---
classDiagram
    direction TB
    class Consumidor["Consumidor (demo, tests, cliente)"] {
        accede a la API y a los campos públicos
    }
    class SistemaBase {
        +datos: Solicitud[]
        +n: number
        +registrar(e, t, d, p)
        +cambiarEstado(id, estado)
        +asignar(id, responsableId)
        +buscar(estado?)
        +reporte()
    }
    class model_ts["model.ts"] {
        estudiantes: Estudiante[]
        responsables: Responsable[]
        Solicitud · Estado · Prioridad
    }
    Consumidor ..> SistemaBase : escribe datos / n sin validar (D4)
    SistemaBase ..> model_ts : import directo de catálogos (D6)
    note for SistemaBase "D1 · valida, almacena, busca y reporta en una sola clase<br/>D2 · búsqueda y error repetidos en cambiarEstado y asignar<br/>D3 / D5 · registrar(e, t, d, p): posicionales, nombres de una letra<br/>D4 · datos y n públicos y mutables<br/>D7 / D8 · reporte recorre la colección con literales de estado"
    style SistemaBase fill:#FBE9E7,stroke:#9E3A2B,stroke-width:2px
```

## Versión refactorizada (estadorefactorizado)

```mermaid
---
title: Versión refactorizada (tag estadorefactorizado) — responsabilidades separadas y dependencias por contrato
---
classDiagram
    direction TB
    class factory_ts["factory.ts"] {
        crearServicio() ServicioSolicitudes
    }
    class ServicioSolicitudes {
        -repositorio: RepositorioSolicitudes
        -catalogos: Catalogos
        +registrar(registro: Registro)
        +cambiarEstado(id, estado)
        +asignar(id, responsableId)
        +buscar(estado?)
        +reporte()
        -validarRegistro(registro)
        -obtenerObligatoria(id)
    }
    class RepositorioSolicitudes {
        <<interface>>
        siguienteId() number
        guardar(solicitud) void
        obtener(id) Solicitud | undefined
        listar() Solicitud[]
    }
    class RepositorioMemoria {
        #datos: Map~number, Solicitud~
        #secuencia: number
        siguienteId() number
        guardar(solicitud) void
        obtener(id) copia
        listar() copias
    }
    class Catalogos {
        <<interface>>
        existeEstudiante(id) boolean
        existeResponsable(id) boolean
    }
    class report_ts["report.ts"] {
        ESTADOS: Estado[]
        resumir(solicitudes) conteo
    }
    class model_ts["model.ts"] {
        Registro · Solicitud
        Estado · Prioridad
    }
    factory_ts ..> ServicioSolicitudes : crea
    factory_ts ..> RepositorioMemoria : crea
    factory_ts ..> Catalogos : crea (funciones)
    ServicioSolicitudes --> RepositorioSolicitudes : depende
    ServicioSolicitudes --> Catalogos : depende
    ServicioSolicitudes ..> report_ts : usa resumir()
    ServicioSolicitudes ..> model_ts : usa tipos
    RepositorioMemoria ..|> RepositorioSolicitudes : implementa
    style ServicioSolicitudes fill:#E2EFDA,stroke:#548235,stroke-width:2px
```
