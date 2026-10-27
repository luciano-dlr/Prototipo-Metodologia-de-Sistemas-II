import { ServicioSolicitudes } from './service.ts';
import { RepositorioMemoria } from './repository.ts';
import { estudiantes, responsables } from './model.ts';
export function crearServicio() {
  return new ServicioSolicitudes(new RepositorioMemoria(), {
    existeEstudiante: id => estudiantes.some(e => e.id === id),
    existeResponsable: id => responsables.some(r => r.id === id)
  });
}
