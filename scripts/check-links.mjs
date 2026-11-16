#!/usr/bin/env node
// Checks every internal link in the built site (dist/): each page it points to
// exists, each #anchor exists on its page, and each file (image, icon) exists.
// Run after `npm run build`: `npm run check:links`. Exits 1 on a broken link.
// Outside links (LinkedIn, mailto) are not fetched: the check stays offline.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const config = readFileSync(join(root, '..', 'astro.config.mjs'), 'utf8');
const base = (/base:\s*'([^']*)'/.exec(config)?.[1] ?? '').replace(/\/$/, '');

const pages = new Map();
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith('.html')) {
      const url = `/${relative(root, path)}`.replace(/index\.html$/, '');
      pages.set(url, readFileSync(path, 'utf8'));
    }
  }
};
if (!existsSync(root)) {
  console.error('dist/ is missing: run `npm run build` first');
  process.exit(2);
}
walk(root);

const ids = new Map([...pages].map(([url, html]) => [url, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]));
const broken = [];
let checked = 0;
for (const [url, html] of pages) {
  for (const [, href] of html.matchAll(/\shref="([^"]+)"/g)) {
    if (href.startsWith('#')) {
      checked++;
      if (href.length > 1 && !ids.get(url).has(decodeURIComponent(href.slice(1)))) broken.push(`${url} → ${href}`);
      continue;
    }
    if (!href.startsWith(`${base}/`)) continue;
    checked++;
    const [path, fragment] = href.slice(base.length).split('#');
    if (/\.[a-z0-9]+$/i.test(path)) {
      if (!existsSync(join(root, path))) broken.push(`${url} → ${href}`);
      continue;
    }
    const target = path.endsWith('/') ? path : `${path}/`;
    if (!pages.has(target)) broken.push(`${url} → ${href}`);
    else if (fragment && !ids.get(target).has(decodeURIComponent(fragment))) broken.push(`${url} → ${href}`);
  }
}

console.log(`${pages.size} pages, ${checked} internal links checked, ${broken.length} broken`);
for (const line of broken) console.log(`  broken: ${line}`);
process.exit(broken.length ? 1 : 0);
