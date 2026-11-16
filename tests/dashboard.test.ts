// Offline tests for the "At a glance" dashboard's reducers: `npm test`.
// Fixtures pin the arithmetic; one test reads the real projects.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { fields, inProgress, projectResult, toolUsage } from '../src/lib/dashboard.ts';
import { cols, place, tracks } from '../src/lib/honeycomb.ts';

const studies = [
  { title: 'B', period: '2024 — Present', order: 2, stack: ['Python', 'AWS', 'Python'], impact: ['first impact'], metrics: [] },
  { title: 'A', period: '2023 — 2024', order: 1, stack: ['Python', 'Svelte'], impact: [], metrics: [{ label: 'Result', value: 'shipped' }] },
  { title: 'C', period: '2025 — present', order: 3, stack: ['AWS'], impact: [], metrics: [] },
];

test('toolUsage counts each tool once per study, most used first, ties by name', () => {
  assert.deepEqual(toolUsage(studies), [
    { name: 'AWS', count: 2 },
    { name: 'Python', count: 2 },
    { name: 'Svelte', count: 1 },
  ]);
});

test('projectResult prefers the Result metric, else the first impact line', () => {
  assert.equal(projectResult(studies[1]), 'shipped');
  assert.equal(projectResult(studies[0]), 'first impact');
  assert.equal(projectResult(studies[2]), undefined);
});

test('inProgress keeps periods ending in Present, in order', () => {
  assert.deepEqual(inProgress(studies).map((study) => study.title), ['B', 'C']);
});

test('fields group projects by category, most first, each list in order', () => {
  const grouped = fields([
    { title: 'B', category: 'Generative AI', order: 2 },
    { title: 'A', category: 'Generative AI', order: 1 },
    { title: 'C', category: 'Software Engineering', order: 3 },
    { title: 'D', category: 'Agentic AI', order: 4 },
  ]);
  assert.deepEqual(grouped.map((area) => [area.name, area.count]), [['Generative AI', 2], ['Agentic AI', 1], ['Software Engineering', 1]]);
  assert.deepEqual(grouped[0].studies.map((study) => study.title), ['A', 'B']);
});

test('the fields account for every real project', () => {
  const dir = new URL('../src/content/projects/', import.meta.url).pathname;
  const studies = readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => ({ title: name, category: /^category:\s*(.+)$/m.exec(readFileSync(join(dir, name), 'utf8'))?.[1]?.trim() ?? '' }));
  assert.ok(studies.every((study) => study.category), 'every project has a category');
  const grouped = fields(studies);
  assert.equal(grouped.reduce((sum, area) => sum + area.count, 0), studies.length);
  assert.equal(grouped.length, new Set(studies.map((study) => study.category)).size);
});

test('place lays cells out as a honeycomb', () => {
  assert.deepEqual([0, 1, 2, 3, 4, 5].map((i) => place(i, 4)), [
    { row: 1, col: 1 }, { row: 1, col: 3 }, { row: 1, col: 5 }, { row: 1, col: 7 },
    { row: 2, col: 2 }, { row: 2, col: 4 },
  ]);
  assert.deepEqual(place(2, 2), { row: 2, col: 2 });
});

test('tracks and cols size the honeycomb grid', () => {
  assert.equal(tracks(13, 6), 'calc(var(--h) * 0.75) calc(var(--h) * 0.75) var(--h)');
  assert.equal(tracks(1, 6), 'var(--h)');
  assert.equal(cols(13, 6), 13);
  assert.equal(cols(4, 6), 8);
});

