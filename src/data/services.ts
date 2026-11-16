// The four steps of an engagement (How we engage). The Services page itself is
// built from the case studies (Services.astro), not from a list here.

/** "How we engage": the four steps of an engagement. */
export interface Step {
  label: string;
  title: string;
  summary: string;
}

export const steps: Step[] = [
  {
    label: 'Discover',
    title: 'Start from the problem',
    summary: 'The problem statement and what already exists — including systems nobody wrote down.',
  },
  {
    label: 'Build',
    title: 'Senior hands on the code',
    summary: 'Architecture, retrieval, agents and pipelines, built by the person who designed them.',
  },
  {
    label: 'Ship',
    title: 'Into their environment',
    summary: 'Deployed into your own cloud on AWS or Azure, not a demo on ours.',
  },
  {
    label: 'Run',
    title: 'Monitored and maintained',
    summary: 'Kept running after launch: monitored and maintained.',
  },
];
