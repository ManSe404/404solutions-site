// Reduces the site's data to what the "At a glance" dashboard shows.
//
// Ported from the portfolio's reducers (ManSe404/webpage@36bb05b,
// website/src/lib/dashboard.ts): toolUsage, projectResult and the "in progress"
// filter, rewritten over plain data so the tests can
// run them with plain Node (ADR 0005). The personal reducers (h-index,
// citations, roles, degrees) are not copied: the company site has no such data.
// Collection access stays in HiveDashboard.astro, which passes `entry.data` in.

export interface StudyData {
  title: string;
  period?: string;
  order?: number;
  stack: string[];
  impact: string[];
  metrics: { label: string; value: string }[];
}


/** How many projects use each tool, most used first; ties by name. */
export function toolUsage(studies: Pick<StudyData, 'stack'>[]): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const study of studies) {
    for (const tool of new Set(study.stack)) counts.set(tool, (counts.get(tool) ?? 0) + 1);
  }
  return [...counts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** The one line that says what a study achieved: its Result metric, else its first impact line. */
export function projectResult(study: Pick<StudyData, 'metrics' | 'impact'>): string | undefined {
  return study.metrics.find((metric) => metric.label === 'Result')?.value ?? study.impact[0];
}

/** Projects still running: their period ends in "Present". Ordered as given by `order`, then title. */
export function inProgress<T extends Pick<StudyData, 'title' | 'period' | 'order'>>(studies: T[]): T[] {
  return studies
    .filter((study) => /present\s*$/i.test(study.period ?? ''))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title));
}

/**
 * The fields we deliver in: one per distinct project category, with its
 * projects (in `order`, then title). Most projects first; ties by name.
 */
export function fields<T extends Pick<StudyData, 'title' | 'order'> & { category: string }>(
  studies: T[],
): { name: string; count: number; studies: T[] }[] {
  const groups = new Map<string, T[]>();
  for (const study of studies) groups.set(study.category, [...(groups.get(study.category) ?? []), study]);
  return [...groups]
    .map(([name, list]) => ({
      name,
      count: list.length,
      studies: [...list].sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title)),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}
