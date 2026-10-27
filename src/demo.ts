import { crearServicio } from './factory.ts';
const servicio = crearServicio();
console.log('1. Registrar', servicio.registrar({estudianteId:1,tipo:'certificado',detalle:'Alumno regular',prioridad:'normal'}));
console.log('2. Asignar', servicio.asignar(1,10));
console.log('3. Cambiar estado', servicio.cambiarEstado(1,'en_proceso'));
console.log('4. Filtrar', servicio.buscar('en_proceso'));
console.log('5. Reporte', servicio.reporte());
