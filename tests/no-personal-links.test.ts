// The company site never sends a visitor to the founder's personal pages
// (Stefan, 2026-11-16): no link to the portfolio or the personal GitHub in the
// code, the content or the public files. LinkedIn is the one allowed profile.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const scanned = ['src', 'public'];
const personal = [/manse404\.github\.io\/webpage/i, /github\.com\/ManSe404/i, /\]\(\/webpage\//];

function* files(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* files(path);
    else if (/\.(astro|ts|md|css|svg|json|txt)$/.test(name)) yield path;
  }
}

test('no link to the founder\'s personal pages', () => {
  const hits: string[] = [];
  for (const dir of scanned) {
    for (const path of files(join(root, dir))) {
      readFileSync(path, 'utf8')
        .split('\n')
        .forEach((line, index) => {
          if (personal.some((pattern) => pattern.test(line))) hits.push(`${path.slice(root.length)}:${index + 1}: ${line.trim()}`);
        });
    }
  }
  assert.deepEqual(hits, []);
});
