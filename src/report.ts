import type { Solicitud, Estado } from './model.ts';
export type Conteo = { total: number } & Record<Estado, number>;
// Record<Estado, number> obliga al compilador a exigir un contador por cada estado del tipo.
export function resumir(solicitudes: Solicitud[]): Conteo {
  const conteo: Conteo = {total: solicitudes.length, pendiente: 0, en_proceso: 0, resuelta: 0};
  for (const solicitud of solicitudes) conteo[solicitud.estado]++;
  return conteo;
}
