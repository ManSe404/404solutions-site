// Offline tests for Scout, the non-AI question bot: `npm test`.
// They pin that every suggestion button answers itself, that common ways of
// asking land on the right answer, and that no answer ships a placeholder.

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { match, nextSuggestions, stems } from '../src/lib/faq.ts';
import { buildFaq, defaultSuggestions, fallback, mascot } from '../src/data/faq.ts';

// The shape ScoutChat.astro passes in, with the base the site is built for.
const faq = buildFaq({
  services: '/404solutions-site/services/',
  process: '/404solutions-site/how-we-work/',
  about: '/404solutions-site/about/',
  contact: '/404solutions-site/contact/',
  projectTitles: ['RiskFocus', 'Document Summarizer', 'Insights Platform', 'Backend Rebuild', 'ETL Pipelines', 'Content Manager'],
  featuredTitles: ['RiskFocus', 'Document Summarizer'],
  fields: [
    { name: 'Generative AI', count: 3 },
    { name: 'Software Engineering', count: 1 },
  ],
  tools: ['Python', 'Docker', 'FastAPI'],
});

test('stems ignore case, punctuation and plural endings', () => {
  assert.deepEqual(stems('Prices?'), stems('price'));
  assert.deepEqual(stems('Case Studies'), stems('case study'));
  assert.deepEqual(stems('Pricing!'), stems('price'));
});

test('every suggestion question returns its own entry', () => {
  for (const entry of faq) {
    assert.equal(match(entry.question, faq).entry?.id, entry.id, entry.question);
  }
});

const paraphrases: [string, string][] = [
  ['what services do you offer', 'services'],
  ['Do you do RAG and agents?', 'services'],
  ['how does an engagement work', 'process'],
  ['how do you work?', 'process'],
  ['How much do you charge?', 'pricing'],
  ['what are your rates', 'pricing'],
  ['can I email you', 'contact'],
  ['how do I get in touch', 'contact'],
  ['do you have case studies', 'work'],
  ['show me previous work', 'work'],
  ['who are your clients?', 'partners'],
  ['which companies have you worked with', 'partners'],
  ['who is the founder', 'about'],
  ['do you use AWS or Azure', 'stack'],
  ['where are you located', 'location'],
  ['what time zone are you in', 'location'],
  ['when can you start, we have a deadline', 'start'],
  ['what does 404 mean', 'name'],
  ['are you an AI?', 'bot'],
  ['is this a chatbot', 'bot'],
];

for (const [question, id] of paraphrases) {
  test(`"${question}" → ${id}`, () => {
    assert.equal(match(question, faq).entry?.id, id);
  });
}

test('unrelated text matches nothing', () => {
  assert.equal(match('asdf qwerty', faq).entry, null);
  assert.equal(match('', faq).entry, null);
});

test('ids are unique and every related id exists', () => {
  const ids = new Set(faq.map((entry) => entry.id));
  assert.equal(ids.size, faq.length);
  for (const id of [...defaultSuggestions, ...faq.flatMap((entry) => entry.related ?? [])]) {
    assert.ok(ids.has(id), `unknown id ${id}`);
  }
});

test('next suggestions never repeat the answered entry', () => {
  for (const entry of faq) {
    const next = nextSuggestions(faq, defaultSuggestions, entry);
    assert.ok(next.length > 0);
    assert.ok(next.every((suggestion) => suggestion.id !== entry.id));
  }
});

test('no answer carries a placeholder or an empty value', () => {
  const texts = [mascot.greeting, fallback.answer, ...faq.map((entry) => entry.answer)];
  for (const text of texts) {
    assert.doesNotMatch(text, /\[|\]|undefined|null|your-domain|TODO/i, text);
  }
  for (const link of [...fallback.links, ...faq.flatMap((entry) => entry.links ?? [])]) {
    assert.match(link.href, /^(\/404solutions-site\/(services|how-we-work|contact)\/$|\/404solutions-site\/about\/$|https:\/\/www\.linkedin\.com\/|mailto:[^@\s]+@[^@\s]+$)/, link.href);
  }
});

test('the examples answer counts what the page passes in', () => {
  const answer = faq.find((entry) => entry.id === 'work')?.answer ?? '';
  assert.match(answer, /^6 projects are listed on the Services page, .* for example RiskFocus and Document Summarizer\./);
});

test('the bot says what it is: no AI, nothing leaves the page', () => {
  assert.match(mascot.greeting, /no AI/);
  assert.match(mascot.greeting, /nothing you type leaves this page/);
});

test('the services answer names every field and counts the projects', () => {
  const answer = faq.find((entry) => entry.id === 'services')?.answer ?? '';
  assert.match(answer, /^6 projects/);
  assert.match(answer, /Generative AI \(3\) and Software Engineering \(1\)/);
});
