import { test } from 'node:test';
import assert from 'node:assert/strict';
import { blank, itemLabel, labelFor, sampleAt, setAt } from '../app/lib/cms/json';

test('setAt returns a new tree with one value replaced', () => {
  const original = { list: [{ name: 'a' }, { name: 'b' }] };
  const updated = setAt(original, ['list', 1, 'name'], 'c') as typeof original;
  assert.equal(updated.list[1].name, 'c');
  assert.equal(original.list[1].name, 'b');
  assert.equal(updated.list[0], original.list[0]);
});

test('blank empties text and zeroes numbers while keeping shape', () => {
  assert.deepEqual(blank({ title: 'x', amount: 3, tags: ['a', 'b'], nested: { ok: true } }), { title: '', amount: 0, tags: ['', ''], nested: { ok: false } });
});

test('sampleAt follows the first element of every array', () => {
  assert.deepEqual(sampleAt({ list: [{ inner: ['x'] }] }, ['list', 4, 'inner', 9]), 'x');
  assert.equal(sampleAt({ list: [] }, ['list', 0, 'name']), undefined);
});

test('labels read naturally', () => {
  assert.equal(labelFor('imageAlt'), 'Image Alt');
  assert.equal(labelFor('whatWeProvide'), 'What We Provide');
  assert.equal(labelFor('006 href: /contact#donate'), 'href: /contact#donate');
  assert.equal(itemLabel({ title: 'Story' }, 0), 'Story');
  assert.equal(itemLabel(['Question?', 'Answer'], 0), 'Question?');
  assert.equal(itemLabel({ amount: 3 }, 2), 'Item 3');
});
