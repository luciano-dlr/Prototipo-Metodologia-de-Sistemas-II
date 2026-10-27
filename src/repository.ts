import type { Solicitud } from './model.ts';
export interface RepositorioSolicitudes {
  siguienteId(): number;
  guardar(solicitud: Solicitud): void;
  obtener(id: number): Solicitud | undefined;
  listar(): Solicitud[];
}
export class RepositorioMemoria implements RepositorioSolicitudes {
  #datos = new Map<number, Solicitud>();
  #secuencia = 1;
  siguienteId() { return this.#secuencia++; }
  guardar(solicitud: Solicitud) { this.#datos.set(solicitud.id, {...solicitud}); }
  obtener(id: number) { const s = this.#datos.get(id); return s ? {...s} : undefined; }
  listar() { return [...this.#datos.values()].map(s => ({...s})); }
}
