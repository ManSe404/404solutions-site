// Fails when a partner's or client's name appears in the repository's files.
// The work is under NDA (ADR 0008): the site names no company it delivered
// with or for, and neither do its code, data and documents, which are public
// once the repository is. The names are stored only as SHA-256 hashes of their
// lowercase words (one word, or two words with and without the space), so this
// file does not leak them either. To add a name, add the hash of its lowercase
// form (`printf %s 'name' | sha256sum`).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const HASHES = new Set([
  '22498404e249ba381b346ba79bff2e5234258ffe6282e5398ecb90adede6d15a',
  '24f970c259121ffd0d0d7497d48864b44e2e495e26acdafbea369432e9dbc9a3',
  '373617573cabce7ab198bcd582aa7d6d7684ca1bde51c73d26b3de435946b63e',
  '38a1fbee722b7b4dfe512b01f21c9c889cec20ba0b28ff5f8ae0f1205acd7c32',
  '6291c857c2292e358f01acacac27580f30d9c1019dac8d10f42079cdea580fa0',
  '838232c6b09409ffa96ec6d43148fb964401d1dcea00c81238b330324c98e71c',
  '87b2ec466eb3e300bae462ee46a5131edfd0f74d847129cf451deb3abcaf19f3',
  '97e5166a1cd1f044a5300b480fd4292d4a90165e3e8ebb07fc1f58c4af4642ae',
  'a63209ec2c2ff349b5b97fa5123af5a57a31a6a25af74eb45825d27cedd95149',
  'c1659651de38ad3d3d2c77ff7597cf36cd2cad66a321a45c7cf2b1e576d81382',
  'c3b73a6bc1b6578d4d138030c0eafd135bb4ee7bd9fee591f2eec8f551711c58',
  'c96e5da43284ab4ce9cc60f66bbf48eb84e9f8113c60a66a16c522f55d3fe8dc',
  'cfeb435820e2a3acbaa373c4e20d3a41f9dc86b3d0b6cee9a041a52d28bb4fdc',
  'd3a66d4b1a6216d5c5bf0de29e1c5c67824486ef85932d19f765609be971089a',
  'e73892245f95ece4cb51de102809939dac07c4d0c9f2ff8a10df83ab12105b1e',
  'eae8e3404182477f008479b38a6629ee86b23cefe2c418c5dc5c2f0d02af5475',
]);

const root = new URL('..', import.meta.url).pathname;
const ROOTS = ['src', 'public', 'scripts', 'docs', 'tests', '.github', 'README.md', 'AGENTS.md', 'astro.config.mjs', 'package.json'];
const TEXT = /\.(astro|ts|mjs|js|json|md|css|svg|yml|yaml|txt|html)$/;

function* files(path: string): Generator<string> {
  if (statSync(path).isDirectory()) {
    for (const name of readdirSync(path)) yield* files(join(path, name));
  } else if (TEXT.test(path)) yield path;
}

const sha = (text: string) => createHash('sha256').update(text).digest('hex');

test('no partner or client name appears in the repository', () => {
  const hits: string[] = [];
  for (const top of ROOTS) {
    let exists = true;
    try { statSync(join(root, top)); } catch { exists = false; }
    if (!exists) continue;
    for (const file of files(join(root, top))) {
      const words = readFileSync(file, 'utf8').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
      words.forEach((word, i) => {
        const next = words[i + 1];
        const candidates = [word, ...(next ? [`${word} ${next}`, `${word}${next}`] : [])];
        if (candidates.some((candidate) => HASHES.has(sha(candidate)))) hits.push(`${file.slice(root.length)}: word ${i + 1}`);
      });
    }
  }
  assert.deepEqual(hits, []);
});
