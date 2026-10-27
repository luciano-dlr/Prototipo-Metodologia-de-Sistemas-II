import { estudiantes, responsables } from './model.ts';
import type { Solicitud, Estado, Prioridad } from './model.ts';
// Prototipo didáctico: defectos estructurales intencionales para el diagnóstico.
export class SistemaBase {
  datos: Solicitud[] = [];
  n = 1;
  registrar(e: number, t: string, d: string, p: Prioridad) {
    if (!estudiantes.find(x => x.id === e)) throw new Error('Estudiante inexistente');
    if (!t.trim() || !d.trim()) throw new Error('Campos obligatorios');
    if (!['normal', 'alta'].includes(p)) throw new Error('Prioridad inválida');
    const s: Solicitud = {id: this.n++, estudianteId: e, tipo: t.trim(), detalle: d.trim(), prioridad: p, estado: 'pendiente', responsableId: null};
    this.datos.push(s);
    return {...s};
  }
  cambiarEstado(id: number, estado: Estado) {
    const s = this.datos.find(x => x.id === id);
    if (!s) throw new Error('Solicitud inexistente');
    if (!['pendiente', 'en_proceso', 'resuelta'].includes(estado)) throw new Error('Estado inválido');
    s.estado = estado;
    return {...s};
  }
  asignar(id: number, responsableId: number) {
    const s = this.datos.find(x => x.id === id);
    if (!s) throw new Error('Solicitud inexistente');
    if (!responsables.find(x => x.id === responsableId)) throw new Error('Responsable inexistente');
    s.responsableId = responsableId;
    return {...s};
  }
  buscar(estado?: Estado) {
    return this.datos.filter(s => !estado || s.estado === estado).map(s => ({...s}));
  }
  reporte() {
    return {total: this.datos.length, pendiente: this.datos.filter(s => s.estado === 'pendiente').length,
      en_proceso: this.datos.filter(s => s.estado === 'en_proceso').length,
      resuelta: this.datos.filter(s => s.estado === 'resuelta').length};
  }
}
