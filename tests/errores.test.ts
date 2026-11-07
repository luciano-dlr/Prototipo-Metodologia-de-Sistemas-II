import test from 'node:test';
import assert from 'node:assert/strict';
import { crearServicio } from '../src/factory.ts';
import { ErrorDeDominio, ErrorDeValidacion, ErrorNoEncontrado } from '../src/errores.ts';
import type { Estado, Prioridad } from '../src/model.ts';

const alta = {estudianteId: 1, tipo: 'tipo', detalle: 'detalle', prioridad: 'normal' as const};

test('errores: referencias inexistentes son ErrorNoEncontrado', () => {
  const s = crearServicio();
  assert.throws(() => s.registrar({...alta, estudianteId: 99}), ErrorNoEncontrado);
  assert.throws(() => s.asignar(99, 10), ErrorNoEncontrado);
  s.registrar(alta);
  assert.throws(() => s.asignar(1, 99), ErrorNoEncontrado);
});

test('errores: datos inválidos son ErrorDeValidacion', () => {
  const s = crearServicio();
  assert.throws(() => s.registrar({...alta, tipo: ' '}), ErrorDeValidacion);
  assert.throws(() => s.registrar({...alta, prioridad: 'urgente' as Prioridad}), ErrorDeValidacion);
  s.registrar(alta);
  assert.throws(() => s.cambiarEstado(1, 'otro' as Estado), ErrorDeValidacion);
});

test('errores: conservan mensaje y jerarquía', () => {
  const error = new ErrorNoEncontrado('Solicitud inexistente');
  assert.ok(error instanceof ErrorDeDominio && error instanceof Error);
  assert.equal(error.message, 'Solicitud inexistente');
  assert.equal(error.name, 'ErrorNoEncontrado');
});
