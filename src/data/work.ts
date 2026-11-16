// Which projects Scout names as examples. No partner or client is named on
// this site (ADR 0008).
//
// The projects themselves are in src/content/projects/, copied from the
// portfolio by scripts/sync-projects.mjs (ADR 0006). An id here that has no
// file there fails the build.

export const featuredProjects = [
  'riskfocus',
  'ai-document-summarizer',
  'agentic-insights-platform',
  'legacy-backend-rebuild',
];
