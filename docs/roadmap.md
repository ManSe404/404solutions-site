# Roadmap

The site is live at <https://manse404.github.io/404solutions-site/>. What is open, in priority order.

| # | Item | Status | Touches | Still open |
|---|---|---|---|---|
| 2 | Page by page | next, Stefan leads | `src/pages/*`, the components each page uses, `src/data/` | Stefan improves each page in turn (his words, 2026-11-16: "then we will work page by page"). Services is done: one page with the work, the portfolio's project honeycomb and the 404 cell (ADR 0006, 0007). After the portfolio's PR #14 merges, compare the three copied hive files with the merged commit. Next pages: How we engage, Stack, About, Contact. `inProgress` in `src/lib/dashboard.ts` is tested but unused; remove it once the pass settles. |
| 3 | Keep the projects in step with the portfolio | ongoing | `src/content/projects/`, `scripts/sync-projects.mjs`, `scripts/project-edits.json`, `src/data/work.ts` (`featuredProjects`) | The twelve projects match ManSe404/webpage at 0dea22c. After each portfolio change to one of them: run `PROJECT_ORGS='<org>,<org>' node scripts/sync-projects.mjs <portfolio-checkout>` (the org list is in the owner's private notes), read its report (a replaced field that changed in the source, a phrase no longer found, a first-person line) and fix `scripts/project-edits.json`; every id in `featuredProjects` must still exist, and `npm test` fails if a partner or client name came in. |
| 4 | Company domain and address | open | `astro.config.mjs`, `public/CNAME`, `src/data/company.ts`, repository Pages settings | Stefan buys the domain later. When he does: set `site` to the domain and drop `base` in `astro.config.mjs`; add `public/CNAME` with the domain; set the custom domain (and HTTPS) in the repository's Pages settings and the DNS records at the registrar; replace the Gmail in `company.email` with the address on the domain. Scout's answers, the Contact box and the footer follow `company.email` by themselves. |
| 5 | Engagement model | open | `src/data/company.ts` (`engagementModel`), `src/data/faq.ts` (pricing answer) | How an engagement is sold (fixed scope, monthly capacity, ...). The line under "How we engage" stays hidden until it is set; Scout's cost answer can then name it. |
| 6 | Portrait at full resolution | open | `public/images/stefan-seman.jpg` | The current file is the 600 × 900 copy from the design canvas; a larger original would stay sharp on high-density screens. |
| 7 | More Scout answers | open | `src/data/faq.ts`, `tests/faq.test.ts` | Questions visitors actually ask, once there are some to go by. Each new entry comes with its paraphrase test. |
| 8 | Scout with a model | parked | — | Only if a fixed list stops being enough. It would need its own ADR first: what visitor text goes to which provider, what it costs per month, and how prompt injection is kept away from anything the bot can do. |
| 9 | Partner countries | parked | `src/components/hive/HiveDashboard.astro` | The design's "US · BG · HR" number was left out on purpose (Stefan, 2026-11-16); comes back only if asked. |

Done:

- Astro 7 (2026-11-22): from Astro 5.18, with TypeScript 6 (the newest `@astrojs/check` accepts); the built pages
  look and behave the same.
- Contact address (2026-11-16): the founder's Gmail until the domain exists (item 4).
- Share image (2026-11-16): `public/images/og.png`, 1200 × 630, with Scout.
- Case studies on the company site, no links to personal pages (2026-11-16): `/work/` and `/work/<slug>/`,
  seven studies in the company's voice, ADR 0004.
- A fourth partner on the About page (2026-11-16); removed the same day with all partner names (ADR 0008).
- Hub home and a page per topic (2026-11-16): the home page is the hero, eight cells each leading to its page and a
  closing call to action; `/services/`, `/how-we-work/`, `/areas/`, `/stack/`, `/about/` and `/contact/` carried the
  content (ADR 0005, design departures).
- Services and the work as one page (Stefan, 2026-11-16): every delivered project in the short form of a project
  portfolio (project, result, our part, stack, partner) as a box, the dashed "Not on the list?" box last; the
  five projects delivered through a partner added; `/work/`, `/work/<slug>/` and `/areas/` removed (ADR 0006).
- The projects as the portfolio's honeycomb with popups and the dashed 404 cell, descriptions word for word
  (Stefan, 2026-11-16; ADR 0007).
- No partner or client names anywhere, no agency framing, Tools and `/stack/` removed (Stefan, 2026-11-16;
  ADR 0008).
- Published on GitHub Pages (Stefan, 2026-11-16: "utilize github to deploy it via github pages BUT dont overlap
  with my personal portfolio", under the ManSe404 account, not a new organization): public repository
  ManSe404/404solutions-site started from one clean commit (the local history names partners, ADR 0008); Pages
  from GitHub Actions; ruleset on `main` (pull request, required `build`, no force push or deletion); link check
  in CI; Dependabot.
