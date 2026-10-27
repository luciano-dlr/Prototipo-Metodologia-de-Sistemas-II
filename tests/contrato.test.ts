import test from 'node:test';
import assert from 'node:assert/strict';
import { SistemaBase } from '../src/base.ts';
import type { Estado, Prioridad } from '../src/model.ts';
const fabricas: Record<string, () => Pick<SistemaBase, 'registrar'|'cambiarEstado'|'asignar'|'buscar'|'reporte'>> = {base: () => new SistemaBase()};
import { crearServicio } from '../src/factory.ts';
fabricas.refactorizada = () => {
  const servicio = crearServicio();
  return {
    registrar: (estudianteId, tipo, detalle, prioridad) => servicio.registrar({estudianteId, tipo, detalle, prioridad}),
    cambiarEstado: (id, estado) => servicio.cambiarEstado(id, estado),
    asignar: (id, responsableId) => servicio.asignar(id, responsableId),
    buscar: estado => servicio.buscar(estado), reporte: () => servicio.reporte()
  };
};
for (const [version, crear] of Object.entries(fabricas)) {
  test(`${version}: alta normaliza y asigna id`, () => {
    const s = crear();
    assert.deepEqual(s.registrar(1,' certificado ',' alumno regular ','alta'), {id:1, estudianteId:1, tipo:'certificado', detalle:'alumno regular', prioridad:'alta', estado:'pendiente', responsableId:null});
    assert.equal(s.registrar(1,'otro','detalle','normal').id,2);
  });
  test(`${version}: rechaza estudiante desconocido`, () => assert.throws(() => crear().registrar(99,'tipo','detalle','normal'), /Estudiante inexistente/));
  test(`${version}: rechaza campos vacíos sin consumir id`, () => {
    const s=crear(); assert.throws(()=>s.registrar(1,' ','detalle','normal'), /Campos obligatorios/);
    assert.throws(()=>s.registrar(1,'tipo',' ','normal'), /Campos obligatorios/);
    assert.equal(s.registrar(1,'tipo','detalle','normal').id,1);
  });
  test(`${version}: rechaza prioridad inválida`, () => assert.throws(()=>crear().registrar(1,'tipo','detalle','urgente' as Prioridad), /Prioridad inválida/));
  test(`${version}: asigna responsable`, () => {const s=crear(); s.registrar(1,'tipo','detalle','normal'); assert.equal(s.asignar(1,10).responsableId,10);});
  test(`${version}: responsable inválido conserva estado`, () => {const s=crear();s.registrar(1,'tipo','detalle','normal');assert.throws(()=>s.asignar(1,99), /Responsable inexistente/);assert.equal(s.buscar()[0].responsableId,null);});
  test(`${version}: cambia estado`, () => {const s=crear();s.registrar(1,'tipo','detalle','normal');assert.equal(s.cambiarEstado(1,'resuelta').estado,'resuelta');});
  test(`${version}: estado inválido no modifica datos`, () => {const s=crear();s.registrar(1,'tipo','detalle','normal');assert.throws(()=>s.cambiarEstado(1,'otro' as Estado), /Estado inválido/);assert.equal(s.buscar()[0].estado,'pendiente');});
  test(`${version}: operaciones sobre id inexistente`, () => {const s=crear();assert.throws(()=>s.asignar(99,10), /Solicitud inexistente/);assert.throws(()=>s.cambiarEstado(99,'resuelta'), /Solicitud inexistente/);});
  test(`${version}: filtro y reporte`, () => {const s=crear();s.registrar(1,'tipo','detalle','alta');s.registrar(1,'tipo','detalle','normal');s.cambiarEstado(2,'en_proceso');assert.deepEqual(s.buscar('pendiente').map(x=>x.id),[1]);assert.deepEqual(s.reporte(),{total:2,pendiente:1,en_proceso:1,resuelta:0});});
  test(`${version}: reporte vacío`, () => assert.deepEqual(crear().reporte(),{total:0,pendiente:0,en_proceso:0,resuelta:0}));
  test(`${version}: respuestas aisladas`, () => {const s=crear();const a=s.registrar(1,'tipo','detalle','normal');a.detalle='cambio externo';s.buscar()[0].estado='resuelta';assert.equal(s.buscar()[0].detalle,'detalle');assert.equal(s.buscar()[0].estado,'pendiente');});
}
