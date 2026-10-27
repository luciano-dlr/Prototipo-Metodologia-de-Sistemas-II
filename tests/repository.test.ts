import test from 'node:test';
import assert from 'node:assert/strict';
import { RepositorioMemoria } from '../src/repository.ts';
test('repositorio: aísla entrada y salida', () => {
  const r = new RepositorioMemoria();
  const s = {id:r.siguienteId(), estudianteId:1,tipo:'tipo',detalle:'detalle',prioridad:'normal' as const,estado:'pendiente' as const,responsableId:null};
  r.guardar(s);s.detalle='alterado';assert.equal(r.obtener(1)?.detalle,'detalle');
  const obtenido=r.obtener(1)!;obtenido.detalle='otro';assert.equal(r.obtener(1)?.detalle,'detalle');
  r.listar()[0].detalle='tercero';assert.equal(r.obtener(1)?.detalle,'detalle');
});
test('repositorio: ids y ausencia', () => {const r=new RepositorioMemoria();assert.equal(r.siguienteId(),1);assert.equal(r.siguienteId(),2);assert.equal(r.obtener(99),undefined);});
