# 0007. The projects are a honeycomb copied from the portfolio

**Status:** accepted, 2026-11-16. Supersedes ADR 0006 in part: the boxes and the "Our part" lines. One page,
the frontmatter-only copy and the twelve projects stand. Superseded in part by ADR 0008 (no company / client
line). Partner names redacted under ADR 0008.

## Context

ADR 0006 showed the twelve projects as boxes with five labelled lines, "Our part" filled from the Role metric or
from lines written for this site. Stefan, 2026-11-16: "check the project in the manse404 webpage i want the same
hive like structure in here also with not on the list one that looks awesome descriptions keep as in manse404
webpage". The portfolio (ManSe404/webpage, PR #14, head 1adafb1, not merged yet) shows its projects as a
honeycomb; a cell opens a popup with five lines: project description, achieved result, role and
responsibilities, tech stack, company / client.

## Decision

- `src/components/hive/ProjectHive.astro`, `src/components/hive/ProjectDetails.astro` and
  `src/lib/honeycomb.ts` are declared copies of the portfolio's files at 1adafb1, each naming its source.
  Changes, listed in each file: a last cell, the dashed "Not on the list?" 404 cell whose popup leads to the
  contact page; seven cells per row from 1200 px instead of six, so the twelve projects and the 404 cell close
  into one comb (7 + 6); the company line built from `org` and `partner`; no filters, no type of work, no
  outside link.
- The descriptions are the portfolio's, word for word: the Role line shows only when the portfolio has a Role
  metric. `src/data/deliveries.ts` and its test are gone.
- The sync keeps `org`, so "Company / client" reads as on the portfolio ("404 Solutions · with <partner>").
- The home page's hub uses the same `place()` from `src/lib/honeycomb.ts`; the copy in `src/lib/dashboard.ts`
  is gone.

## Consequences

- The company site and the portfolio show the work the same way, and no sentence about a project is written
  here.
- Five projects have no Role line until the portfolio gives them a Role metric.
- After PR #14 merges, the three files are compared with the merged commit and the `source` notes updated.
