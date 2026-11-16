#!/usr/bin/env node
// Copies the projects 404 Solutions delivered from the portfolio repository
// (ManSe404/webpage) into src/content/projects/.
//
//   PROJECT_ORGS='<org>,<org>' node scripts/sync-projects.mjs <portfolio-checkout> [git-ref]
//
// <portfolio-checkout> is a local clone of ManSe404/webpage; [git-ref] defaults
// to origin/main, so the copy follows what the portfolio has published, never a
// branch in progress. PROJECT_ORGS lists the portfolio `org:` values whose
// projects belong on this site; it is a setting, not code, because those names
// are confidential (ADR 0008) and the list lives in the owner's private notes.
// Each copied file records its source commit (`source:`), which makes the copy
// declared and traceable (ADR 0006).
//
// What the copy changes:
// - keeps only the frontmatter: the site shows each project in a short form,
//   never the long write-up;
// - drops `org`, `client`, `featured`, `home` and `link`: no company or client
//   is named on this site (ADR 0008);
// - applies scripts/project-edits.json: whole fields replaced where the
//   portfolio's text would identify a client (each replacement records the
//   SHA-256 of the source text it replaces, so a change in the source is
//   reported, never silently overwritten, and the source text itself is not
//   kept in this repository), then exact phrase replacements for the company's
//   voice ("the team I led" becomes "the team we led");
// - lists first-person lines that are left, and deletes copies whose source no
//   longer exists or no longer belongs here.

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const [checkout, ref = 'origin/main'] = process.argv.slice(2);
const orgs = (process.env.PROJECT_ORGS ?? '').split(',').map((org) => org.trim()).filter(Boolean);
if (!checkout || orgs.length === 0) {
  console.error("usage: PROJECT_ORGS='<org>,<org>' node scripts/sync-projects.mjs <portfolio-checkout> [git-ref]");
  process.exit(2);
}

const PROJECTS = 'website/src/content/projects';
const here = dirname(fileURLToPath(import.meta.url));
const target = join(here, '..', 'src', 'content', 'projects');
const edits = JSON.parse(readFileSync(join(here, 'project-edits.json'), 'utf8'));
const git = (...args) => execFileSync('git', ['-C', checkout, ...args], { encoding: 'utf8' });
const sha256 = (text) => createHash('sha256').update(text).digest('hex');

const commit = git('rev-parse', '--short', ref).trim();
const files = git('ls-tree', '--name-only', `${ref}:${PROJECTS}`)
  .split('\n')
  .filter((name) => name.endsWith('.md'));

// A top-level key with its indented continuation lines (lists, nested maps).
const keyBlock = (key) => new RegExp(`^${key}:.*(?:\\n[ \\t]+.*)*`, 'm');
const dropKey = (front, key) => front.replace(new RegExp(`${keyBlock(key).source}\\n?`, 'm'), '');

const copies = new Map();
for (const name of files) {
  const text = git('show', `${ref}:${PROJECTS}/${name}`);
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(text);
  if (!match) throw new Error(`${name}: no frontmatter`);
  const front = match[1];
  const org = /^org:\s*(.+?)\s*$/m.exec(front)?.[1];
  if (!orgs.includes(org)) continue;

  const slug = name.replace(/\.md$/, '');
  let out = front;
  for (const key of ['org', 'client', 'featured', 'home', 'link']) out = dropKey(out, key);
  for (const [key, { sha256: expected, yaml }] of Object.entries(edits[slug]?.replace ?? {})) {
    const block = keyBlock(key).exec(out)?.[0];
    if (block === undefined) console.log(`edits: ${slug}.md has no "${key}" any more; update scripts/project-edits.json`);
    else {
      if (sha256(block) !== expected) console.log(`edits: ${slug}.md "${key}" changed in the portfolio; review its replacement in scripts/project-edits.json`);
      out = out.replace(block, yaml.trimEnd());
    }
  }
  for (const { from, to } of edits[slug]?.phrases ?? []) {
    if (out.includes(from)) out = out.replace(from, to);
    else console.log(`edits: ${slug}.md no longer contains "${from}"; update scripts/project-edits.json`);
  }
  copies.set(slug, `source: ManSe404/webpage@${commit} ${PROJECTS}/${name}\n${out.trimEnd()}`);
}

mkdirSync(target, { recursive: true });
for (const [slug, front] of copies) writeFileSync(join(target, `${slug}.md`), `---\n${front}\n---\n`);

const removed = [];
for (const name of readdirSync(target)) {
  if (name.endsWith('.md') && !copies.has(name.replace(/\.md$/, ''))) {
    rmSync(join(target, name));
    removed.push(name);
  }
}

console.log(`synced ${copies.size} projects from ManSe404/webpage@${commit}: ${[...copies.keys()].join(', ')}`);
if (removed.length) console.log(`removed: ${removed.join(', ')}`);

// The company site speaks as "we": first-person lines left after the edits are
// listed, so a new one gets its entry in project-edits.json.
for (const [slug, front] of copies) {
  front.split('\n').forEach((line, index) => {
    if (/\b(I|I'm|I've|my|me)\b/.test(line)) console.log(`first person: ${slug}.md line ${index + 1}: ${line.trim()}`);
  });
}
