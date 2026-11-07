// Errores de dominio: conservan los mensajes del contrato original y permiten
// distinguir el tipo de falla sin depender del texto.
export class ErrorDeDominio extends Error {
  constructor(mensaje: string) {
    super(mensaje);
    this.name = new.target.name;
  }
}
/** Datos de entrada inválidos: campos vacíos, prioridad o estado desconocidos. */
export class ErrorDeValidacion extends ErrorDeDominio {}
/** Referencia a un estudiante, responsable o solicitud que no existe. */
export class ErrorNoEncontrado extends ErrorDeDominio {}
