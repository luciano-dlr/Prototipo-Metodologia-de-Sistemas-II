import { ESTADOS, PRIORIDADES } from './model.ts';
import type { Estado, Registro, Solicitud } from './model.ts';
import type { RepositorioSolicitudes } from './repository.ts';
import { resumir } from './report.ts';
import { ErrorDeValidacion, ErrorNoEncontrado } from './errores.ts';
export interface Catalogos {
  existeEstudiante(id: number): boolean;
  existeResponsable(id: number): boolean;
}
export class ServicioSolicitudes {
  private readonly repositorio: RepositorioSolicitudes;
  private readonly catalogos: Catalogos;
  constructor(repositorio: RepositorioSolicitudes, catalogos: Catalogos) {
    this.repositorio = repositorio;
    this.catalogos = catalogos;
  }
  registrar(registro: Registro) {
    this.validarRegistro(registro);
    const solicitud: Solicitud = {id: this.repositorio.siguienteId(), estudianteId: registro.estudianteId,
      tipo: registro.tipo.trim(), detalle: registro.detalle.trim(), prioridad: registro.prioridad,
      estado: 'pendiente', responsableId: null};
    this.repositorio.guardar(solicitud);
    return {...solicitud};
  }
  private validarRegistro(registro: Registro) {
    if (!this.catalogos.existeEstudiante(registro.estudianteId)) throw new ErrorNoEncontrado('Estudiante inexistente');
    if (!registro.tipo.trim() || !registro.detalle.trim()) throw new ErrorDeValidacion('Campos obligatorios');
    if (!PRIORIDADES.includes(registro.prioridad)) throw new ErrorDeValidacion('Prioridad inválida');
  }
  private obtenerObligatoria(id: number) {
    const solicitud = this.repositorio.obtener(id);
    if (!solicitud) throw new ErrorNoEncontrado('Solicitud inexistente');
    return solicitud;
  }
  cambiarEstado(id: number, estado: Estado) {
    const solicitud = this.obtenerObligatoria(id);
    if (!ESTADOS.includes(estado)) throw new ErrorDeValidacion('Estado inválido');
    solicitud.estado = estado;
    this.repositorio.guardar(solicitud);
    return {...solicitud};
  }
  asignar(id: number, responsableId: number) {
    const solicitud = this.obtenerObligatoria(id);
    if (!this.catalogos.existeResponsable(responsableId)) throw new ErrorNoEncontrado('Responsable inexistente');
    solicitud.responsableId = responsableId;
    this.repositorio.guardar(solicitud);
    return {...solicitud};
  }
  buscar(estado?: Estado) { return this.repositorio.listar().filter(s => !estado || s.estado === estado); }
  reporte() { return resumir(this.repositorio.listar()); }
}
