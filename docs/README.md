# Documentation

The company site of 404 Solutions: a static Astro site (a home page that is a hub of five cells and a page per
topic, the Services page also listing every delivered project), no backend, live on GitHub Pages at <https://manse404.github.io/404solutions-site/>. Work on it continues; the [roadmap](roadmap.md) lists what is open.

Read in this order:

| # | Document | What it answers | Status | Last checked |
|---|---|---|---|---|
| 1 | [product/features/README.md](product/features/README.md) | What the site offers, section by section and page by page, with status and where each lives in the code | current | 2026-11-16 |
| 2 | [roadmap.md](roadmap.md) | What is open and what comes next, in priority order | current | 2026-11-16 |
| 3 | [design/README.md](design/README.md) | The design the site is built from, and where the code departs from it | current | 2026-11-16 |
| 4 | [architecture/overview.md](architecture/overview.md) | How it is built, what it depends on, how it is checked and published | current | 2026-11-16 |
| 5 | [reference/codebase.md](reference/codebase.md) | Where each part lives in the code | current | 2026-11-16 |
| 6 | [adr/0001-own-repository-for-the-company-site.md](adr/0001-own-repository-for-the-company-site.md) | Why the company site is its own repository, not a page of the portfolio | accepted, superseded in part by 0004 | 2026-11-16 |
| 7 | [adr/0002-hive-tokens-copied-from-the-portfolio.md](adr/0002-hive-tokens-copied-from-the-portfolio.md) | Why the colours and type are a declared copy of the portfolio's | accepted | 2026-11-16 |
| 8 | [adr/0003-scout-answers-from-a-fixed-list.md](adr/0003-scout-answers-from-a-fixed-list.md) | Why the question bot matches a fixed list in the browser instead of calling a model | accepted | 2026-11-16 |
| 9 | [adr/0004-case-studies-live-on-the-company-site.md](adr/0004-case-studies-live-on-the-company-site.md) | Why the delivered work is copied from the portfolio, and why the site links to no personal pages | accepted, superseded in part by 0006 | 2026-11-16 |
| 10 | [adr/0005-hive-dashboard-copied-from-the-portfolio.md](adr/0005-hive-dashboard-copied-from-the-portfolio.md) | Why the home page's hub is a declared copy of the portfolio's hive dashboard grid, with its own data layer | accepted | 2026-11-16 |
| 11 | [adr/0006-one-services-page-short-project-form.md](adr/0006-one-services-page-short-project-form.md) | Why Services and the work are one page, each project in a short form, with no case-study pages | accepted, superseded in part by 0007 | 2026-11-16 |
| 12 | [adr/0007-project-honeycomb-copied-from-the-portfolio.md](adr/0007-project-honeycomb-copied-from-the-portfolio.md) | Why the projects are a honeycomb with popups, copied from the portfolio, with a 404 cell | accepted, superseded in part by 0008 | 2026-11-16 |
| 13 | [adr/0008-no-partner-or-client-names.md](adr/0008-no-partner-or-client-names.md) | Why no partner or client is named anywhere, and why the site no longer speaks only to agencies | accepted | 2026-11-16 |

The root `README.md` has the commands and the table of which file to edit for what.

**Layout.** `product/` says what the site offers, `roadmap.md` what comes next, `design/` the visual design,
`architecture/` how it is built, `adr/` the decisions, `reference/` what exists and can be checked against the
code. A change updates the documents it makes wrong in the same commit.
