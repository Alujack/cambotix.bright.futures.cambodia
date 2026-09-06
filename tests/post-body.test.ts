import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseBody, parseInline } from '../app/lib/post-body';

test('paragraphs are separated by blank lines and joined across single line breaks', () => {
  const blocks = parseBody('First line\nsame paragraph\n\nSecond paragraph');
  assert.equal(blocks.length, 2);
  assert.deepEqual(blocks[0], { type: 'paragraph', inline: [{ type: 'text', text: 'First line same paragraph' }] });
});

test('headings, bullets, and quotes are recognised', () => {
  const blocks = parseBody('## Heading\n- one\n- two\n> quoted\n### Sub');
  assert.deepEqual(blocks.map((block) => block.type), ['heading', 'list', 'quote', 'heading']);
  assert.equal(blocks[0].type === 'heading' && blocks[0].level, 2);
  assert.equal(blocks[3].type === 'heading' && blocks[3].level, 3);
  assert.equal(blocks[1].type === 'list' && blocks[1].items.length, 2);
});

test('bold and safe links are parsed inline', () => {
  assert.deepEqual(parseInline('Say **hi** to [us](https://example.org) now'), [
    { type: 'text', text: 'Say ' }, { type: 'strong', text: 'hi' }, { type: 'text', text: ' to ' },
    { type: 'link', text: 'us', href: 'https://example.org' }, { type: 'text', text: ' now' },
  ]);
});

test('unsafe link targets fall back to plain text', () => {
  const unsafe = parseInline('[click](javascript:alert(1))');
  assert.ok(unsafe.every((part) => part.type === 'text'));
  assert.equal(unsafe.map((part) => part.text).join(''), 'click)');
  assert.deepEqual(parseInline('[x](//evil.example)'), [{ type: 'text', text: 'x' }]);
  assert.deepEqual(parseInline('[ok](/contact#donate)'), [{ type: 'link', text: 'ok', href: '/contact#donate' }]);
});

test('raw html stays literal text', () => {
  const blocks = parseBody('<script>alert(1)</script>');
  assert.deepEqual(blocks, [{ type: 'paragraph', inline: [{ type: 'text', text: '<script>alert(1)</script>' }] }]);
});
