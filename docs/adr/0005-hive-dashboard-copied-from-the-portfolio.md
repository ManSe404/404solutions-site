# 0005. The home page's hub is a declared copy of the portfolio's hive dashboard, with its own data layer

**Status:** accepted, 2026-11-16

## Context

The portfolio (ManSe404/webpage) replaced its hero with a hive dashboard: eight honeycomb cells with a number
each, a count-up, panels that open from the cells, and links to the sections when JavaScript is off (pull
request #14, commit 36bb05b). Stefan asked (2026-11-16) to reuse it on the company site. The portfolio's cells
and reducers are personal: years of experience, papers and citations, degrees, roles. The two sites are separate
repositories (ADR 0001) with no shared component package.

The same day the company version went through three shapes, each on Stefan's word: an "At a glance" section
with panels below the grid; panels in a popup instead ("instead of going down"), with Areas in place of a
Partners cell ("i dont want to put partners here"); and then, once the site was split into pages ("its company
page not portfolio"), the cells on the home page, bigger, each with a title and a short description and each
leading to its own page, the full content living on those pages ("then we will work page by page").

## Decision

The home page shows a hub of eight honeycomb cells right after the hero, built from a copy of the portfolio's
`HiveDashboard.astro` (`src/components/hive/HiveDashboard.astro`). Its header comment names the source
(`ManSe404/webpage@36bb05b website/src/components/hive/HiveDashboard.astro`) and what was changed. Kept: the
grid (cells span two half-columns, rows overlap by a quarter hex, placement per breakpoint) and the count-up.
Changed: eight company cells, larger, each with a number, a title and one line, each a plain link to its page
(Services, Case studies, Areas, How we engage, Tools, About, Contact); the Scout cell opens the question bot,
with the contact page as its no-JS link. Dropped: the panels, the stepper and `HivePanels.astro`, because the
content lives on the pages the cells open; the portrait, background graph and ECG trace. The hub has no Partners
cell; the partners are on the about page.

The data layer is the company's own: `src/lib/dashboard.ts` ports the portfolio's `toolUsage`,
`projectResult` and the "in progress" filter, adds `areas` and `partnerCounts`, and takes plain data instead of
collection entries, so `tests/dashboard.test.ts` runs it with plain Node. The `/areas/` and `/stack/` pages use
the same reducers as the hub. The personal reducers (h-index, citations, roles, degrees) are not copied.

## Consequences

- The hub's numbers are counted from the same data as the pages they lead to. Tests fail if a case study names
  a partner the Partners list omits, or if the areas do not account for every case study.
- Every cell is a link, so the hub works without JavaScript; the count-up is decoration and stops under reduced
  motion.
- The hero keeps its own honeycomb; the hub is a separate section below it.
- A layout fix made in the portfolio's dashboard is ported here by hand, and the commit named in the header
  comment moves with it. If a third site needs the grid, it becomes one shared package instead of a third copy.
