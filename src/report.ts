import type { Solicitud, Estado } from './model.ts';
export const ESTADOS: Estado[] = ['pendiente', 'en_proceso', 'resuelta'];
export function resumir(solicitudes: Solicitud[]) {
  const conteo = {total: solicitudes.length, pendiente: 0, en_proceso: 0, resuelta: 0};
  for (const solicitud of solicitudes) conteo[solicitud.estado]++;
  return conteo;
}
