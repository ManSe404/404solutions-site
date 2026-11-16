# 0006. One Services page, every project in a short form

**Status:** accepted, 2026-11-16. Supersedes ADR 0004 in part: the case-study pages and the copy of the
write-ups. The rule that the site links to none of the founder's personal pages stands. Superseded in part by
ADR 0007 (a honeycomb copied from the portfolio instead of boxes; no "Our part" lines written here) and
ADR 0008 (no partner names). Partner names redacted under ADR 0008.

## Context

ADR 0004 gave the case studies their own pages (`/work/`, `/work/<slug>/`) and a copy of the portfolio's full
write-up for each. The site also had a Services page with five capability cards, and an Areas page that grouped
the same case studies by category. Three pages showed the same projects three ways.

Stefan, 2026-11-16, pointing at a project portfolio in the short form that lists each project as description,
achieved result, role, tech stack and client, grouped by field: "we dont need those large stuff", "join work and
services into one", "we dont need those individual overtalked stuff", "keep the stefan micic template", and he
liked the design's boxes with the dashed "Not on the list?" cell. Asked whether the five projects the portfolio
lists under one partner belong on the company site, he answered "we dont need case study for these", that is:
list them in the short form.

## Decision

- **One page.** `/services/` is the Services page and the work: "What we built, end to end", the fields as one
  numbered line, then every delivered project as a box in one grid (the design's service cells), and the dashed
  "Not on the list?" box across the last row. `/work/`, `/work/<slug>/` and `/areas/` are gone; the header,
  the hero, the hub and Scout point at `/services/`, and `/stack/` links each tool to the projects' boxes
  (`/services/#<id>`).
- **The short form.** Each box: number, field chip, title, then Project (the portfolio's summary), Result (the
  Result metric, else the first impact line), Our part (the Role metric, else a line in
  `src/data/deliveries.ts` that restates the portfolio's own description of the work), Stack, Partner and
  period. A project with no Role and no line fails the build and a test.
- **The copy.** The collection `projects` (`src/content/projects/`) is a declared copy of the portfolio's project
  frontmatter, made by `node scripts/sync-projects.mjs <portfolio-checkout> [git-ref]`: projects whose `org` is
  404 Solutions (partner = their `client`) and projects whose `org` is a partner 404 Solutions delivers through,
  today one (partner = the org). Only the frontmatter is copied, never the write-up; `source:` names the
  portfolio commit. The voice replacements (`scripts/project-voice.json`) apply to that frontmatter, and the
  script lists any first-person line left.
- **Fields** are the project categories, most projects first (`fields()` in `src/lib/dashboard.ts`).

## Consequences

- One place shows the delivered work; the projects read in under a minute each, and the visitor never leaves the
  page to understand one.
- The long write-ups exist only on the portfolio. The company site cannot link to them (ADR 0004's rule), so a
  reader who wants depth asks, which is what the contact box and Scout are for.
- The copy is smaller and does not depend on the portfolio's Markdown bodies, which the portfolio is dropping as
  well (its project files are becoming frontmatter only).
- Twelve projects from 0dea22c: seven under 404 Solutions, five through a partner, who is the partner on seven
  of them; its line on the About page names the kinds of work.
- The home page's hub has six cells instead of eight (Services counts the projects; Case studies and Areas are
  gone), three per row on desktop.
- The project files keep their portfolio ids, so a later sync replaces them file for file.
