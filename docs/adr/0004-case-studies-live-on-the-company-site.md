# 0004. Case studies live on the company site

**Status:** accepted, 2026-11-16. Supersedes the part of ADR 0001 that linked to the case studies on the
portfolio instead of copying them. Superseded in part by ADR 0006 (no case-study pages; the copy is frontmatter
only) and ADR 0008 (no partner names); the rule against links to personal pages stands. Partner names
redacted under ADR 0008.

## Context

ADR 0001 kept the case studies on the founder's portfolio (ManSe404/webpage) and linked to them from the
company site, so there was one copy to maintain. Stefan then decided (2026-11-16) that the company site must
not send visitors to his personal pages: not the portfolio, not his personal GitHub. LinkedIn stays, as the
founder's contact route. Without the portfolio links, the "Read case study" cards and "All case studies" had
nowhere to go, and a company site whose delivered work lives on someone's personal page reads as a person, not
a firm. The portfolio still publishes the same projects and stays the place where they are written.

## Decision

The case studies get their own pages on the company site: `/work/` lists them all, `/work/<slug>/` shows one
(summary, impact, metrics, body, stack, a call to action and a link to the next one). They live in the content
collection `caseStudies` (`src/content.config.ts`, files in `src/content/case-studies/`), which is a declared copy
of the portfolio's projects whose `org` is 404 Solutions, made by
`node scripts/sync-case-studies.mjs <portfolio-checkout> [git-ref]` (default `origin/main`, so the copy follows
what the portfolio has published, never a branch in progress). The script:

- keeps only 404 Solutions projects and records `source: ManSe404/webpage@<commit> <path>` in each file;
- drops the portfolio-only fields (`org`, `featured`, `link`) and renames `client` to `partner`;
- rewrites links between copied case studies to `../<slug>/` and turns every other portfolio link into plain
  text;
- deletes copies whose source is gone or no longer under 404 Solutions;
- applies the exact sentence replacements in `scripts/case-study-voice.json`, so the site says "we" where the
  portfolio says "I"; a sentence that is no longer in the source is reported, never guessed;
- lists any first-person line left after those replacements, so it gets its own entry in the voice file.

Which studies the home page shows as cards is `featuredCaseStudies` in `src/data/work.ts`; an id with no file
fails the build. The counts on the page come from the collection. A test (`tests/no-personal-links.test.ts`)
fails on any link to the portfolio or the personal GitHub in `src/` or `public/`.

## Consequences

- A visitor stays on the company site from the first page to the contact box; the only personal profile linked
  is LinkedIn.
- The case studies exist twice. The portfolio is the source: content changes are made there and synced. The
  files here are never edited by hand, because the next sync overwrites them; the company's voice lives in
  `scripts/case-study-voice.json` and is applied on every sync.
- After each portfolio change to a 404 Solutions project, someone runs the sync, reads its voice report (a
  replacement whose sentence changed, a first-person line left) and reviews the diff; the `source:` line shows
  which portfolio commit each file matches.
- The first full copy (2026-11-16) has seven studies, taken from ManSe404/webpage at 6c063aa, the finished head
  of the portfolio change that was still waiting for its merge. After that merge the sync is run once more
  against `origin/main`, so the `source:` lines name the merge commit; the content stays the same.
- The partners named in the case studies and the partners the site lists are two lists. Two studies name a
  partner that the Partners section did not list; whether it becomes a fourth partner on the company site is
  Stefan's decision (roadmap). [Names redacted under ADR 0008.]
