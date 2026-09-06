import { test } from 'node:test';
import assert from 'node:assert/strict';
import { localMedia, postSchema, safeLink, validateSection } from '../app/lib/cms/validation';
import { defaults } from '../app/lib/cms/defaults';

const basePost = { id: 'new', revision: 0, kind: 'article', slug: 'first-story', title: 'First story', excerpt: '', body: 'Hello', image: '', image_alt: '', status: 'draft', placement: '', show_in_nav: false };

test('post slugs must be lowercase words joined by single hyphens', () => {
  assert.ok(postSchema.safeParse(basePost).success);
  for (const slug of ['Bad Slug', 'double--hyphen', '-leading', 'trailing-', 'ünïcode', '']) {
    assert.equal(postSchema.safeParse({ ...basePost, slug }).success, false, slug);
  }
});

test('reserved addresses cannot be used for custom pages but can for articles', () => {
  assert.equal(postSchema.safeParse({ ...basePost, kind: 'page', slug: 'admin' }).success, false);
  assert.equal(postSchema.safeParse({ ...basePost, kind: 'page', slug: 'articles' }).success, false);
  assert.ok(postSchema.safeParse({ ...basePost, kind: 'article', slug: 'about' }).success);
});

test('an image needs a description', () => {
  assert.equal(postSchema.safeParse({ ...basePost, image: '/images/hero.jpg' }).success, false);
  assert.ok(postSchema.safeParse({ ...basePost, image: '/images/hero.jpg', image_alt: 'Children at the center' }).success);
});

test('media addresses must be local paths', () => {
  assert.ok(localMedia.safeParse('').success);
  assert.ok(localMedia.safeParse('/images/hero.jpg').success);
  assert.ok(localMedia.safeParse('/media/4105ab61-4977-4240-bd60-027025fa57a4').success);
  for (const bad of ['//evil.example/x.jpg', 'https://evil.example/x.jpg', 'javascript:alert(1)', '/images/with space.jpg', 'images/relative.jpg']) {
    assert.equal(localMedia.safeParse(bad).success, false, bad);
  }
});

test('links allow local paths, anchors, https and mailto only', () => {
  for (const good of ['/contact#donate', '#donate', 'https://t.me/example', 'mailto:hello@example.org']) assert.ok(safeLink.safeParse(good).success, good);
  for (const bad of ['http://insecure.example', 'javascript:alert(1)', '//evil.example', 'ftp://x']) assert.equal(safeLink.safeParse(bad).success, false, bad);
});

test('section validation keeps the original shape and rejects unknown keys', () => {
  assert.deepEqual(validateSection('stats', defaults.stats), defaults.stats);
  assert.throws(() => validateSection('stats', [{ ...defaults.stats[0], extra: 'x' }]));
  assert.throws(() => validateSection('stats', [{ value: '1' }]));
});

test('projects and activities must have unique identifiers', () => {
  assert.throws(() => validateSection('projects', [defaults.projects[0], defaults.projects[0]]), /unique/);
  assert.throws(() => validateSection('activities', [defaults.activities[0], defaults.activities[0]]), /unique/);
  assert.ok(validateSection('activities', defaults.activities));
});

test('a project without a feeding budget or image is valid', () => {
  const { feedingBudget: _budget, image: _image, imageAlt: _alt, ...minimal } = defaults.projects[0];
  void _budget; void _image; void _alt;
  assert.ok(validateSection('projects', [{ ...minimal, slug: 'new-project', emoji: '🌱' }]));
});

test('hero slides need at least one slide with an image', () => {
  assert.throws(() => validateSection('heroSlides', []));
  assert.throws(() => validateSection('heroSlides', [{ image: '', alt: 'x' }]));
  assert.ok(validateSection('heroSlides', [{ image: '/images/hero.jpg', alt: 'Community' }]));
});
