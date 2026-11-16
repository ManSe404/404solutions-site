// Scout's question matching: no model, no network. A question is split into
// word stems and scored against each entry's keyword phrases; the entry with
// the highest score answers. Pure functions, so the browser script and the
// tests run the same code.

export interface FaqLink {
  label: string;
  href: string;
}

export interface FaqEntry {
  id: string;
  /** Shown as a suggestion button; asking it verbatim must return this entry. */
  question: string;
  /**
   * Phrases that point to this entry. A phrase matches when all of its stems
   * occur in the question, in any order; it scores one point per stem, so a
   * longer phrase beats a single word. Never use a bare stop word.
   */
  keywords: string[];
  answer: string;
  links?: FaqLink[];
  /** Entry ids offered as the next suggestions after this answer. */
  related?: string[];
}

export interface FaqResult {
  entry: FaqEntry | null;
  score: number;
}

/** Lowercase, strip accents and punctuation, and cut common English endings. */
export function stems(text: string): string[] {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map(stem);
}

function stem(word: string): string {
  if (word.length <= 3) return word;
  let w = word;
  if (w.endsWith('ies') && w.length > 4) w = `${w.slice(0, -3)}y`;
  else if (w.endsWith('ing') && w.length > 5) w = w.slice(0, -3);
  else if (w.endsWith('ed') && w.length > 4) w = w.slice(0, -2);
  else if (w.endsWith('es') && w.length > 4) w = w.slice(0, -2);
  else if (w.endsWith('s') && !w.endsWith('ss')) w = w.slice(0, -1);
  if (w.endsWith('e') && w.length > 3) w = w.slice(0, -1);
  return w;
}

/** Score of one entry for a question already split into stems. */
export function score(questionStems: string[], entry: FaqEntry): number {
  const have = new Set(questionStems);
  const asked = questionStems.join(' ');
  if (asked === stems(entry.question).join(' ')) return 100;
  let total = 0;
  for (const phrase of entry.keywords) {
    const parts = stems(phrase);
    if (parts.length > 0 && parts.every((part) => have.has(part))) total += parts.length;
  }
  return total;
}

/** The best entry for a question, or `entry: null` when nothing matches. Ties go to the earlier entry. */
export function match(question: string, entries: FaqEntry[]): FaqResult {
  const questionStems = stems(question);
  let best: FaqResult = { entry: null, score: 0 };
  for (const entry of entries) {
    const s = score(questionStems, entry);
    if (s > best.score) best = { entry, score: s };
  }
  return best;
}

/** Suggestions to offer next: the entry's related ones, else the defaults, never the one just answered. */
export function nextSuggestions(
  entries: FaqEntry[],
  defaults: string[],
  answered: FaqEntry | null,
  limit = 4,
): FaqEntry[] {
  const ids = answered?.related?.length ? answered.related : defaults;
  const byId = new Map(entries.map((entry) => [entry.id, entry]));
  return ids
    .filter((id) => id !== answered?.id)
    .map((id) => byId.get(id))
    .filter((entry): entry is FaqEntry => entry !== undefined)
    .slice(0, limit);
}
