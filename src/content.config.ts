import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The projects 404 Solutions delivered: a declared copy of the portfolio's
// project frontmatter, made by scripts/sync-projects.mjs (ADR 0006), with no
// company or client named (ADR 0008). Never edited by hand; content changes go
// to the portfolio and are synced back, site-only wording goes to
// scripts/project-edits.json.
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '*.md' }),
  schema: z.object({
    /** Where the copy came from: `ManSe404/webpage@<commit> <path>`. */
    source: z.string(),
    title: z.string(),
    category: z.string(),
    summary: z.string(),
    order: z.number().default(99),
    period: z.string().optional(),
    impact: z.array(z.string()).default([]),
    stack: z.array(z.string()).default([]),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
  }),
});

export const collections = { projects };
