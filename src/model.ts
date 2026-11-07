export type Estado = 'pendiente' | 'en_proceso' | 'resuelta';
export type Prioridad = 'normal' | 'alta';
export const ESTADOS: readonly Estado[] = ['pendiente', 'en_proceso', 'resuelta'];
export const PRIORIDADES: readonly Prioridad[] = ['normal', 'alta'];
export interface Estudiante { id: number; nombre: string }
export interface Responsable { id: number; nombre: string }
export interface Solicitud { id: number; estudianteId: number; tipo: string; detalle: string; prioridad: Prioridad; estado: Estado; responsableId: number | null }
export interface Registro { estudianteId: number; tipo: string; detalle: string; prioridad: Prioridad }
export const estudiantes: Estudiante[] = [{id: 1, nombre: 'Estudiante de prueba'}];
export const responsables: Responsable[] = [{id: 10, nombre: 'Área de prueba'}];
