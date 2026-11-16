# 404 Solutions — company site

The website of 404 Solutions, a B2B consultancy that builds production AI and software for agencies and product
firms whose enterprise clients need it. The home page is a hub: the hero, then six honeycomb cells, each
leading to its own page, and a way to start a project. The site links to none of the founder's personal pages:
LinkedIn is the only personal profile it names.

| Page | What it holds |
|---|---|
| `/` | Hero with the interactive honeycomb, the hub of five cells (its Contact cell is the way to start) |
| `/services/` | Services and the work in one page: "What we built, end to end", a honeycomb of the twelve projects and the dashed 404 "Not on the list?" cell; a cell opens the project's five lines |
| `/how-we-work/` | How we engage: the four steps |
| `/about/` | About 404 Solutions: intro, founder |
| `/contact/` | The contact box, what to send, Scout |

Live at <https://manse404.github.io/404solutions-site/> (GitHub Pages, a project site of the ManSe404 account,
separate from the founder's portfolio there), free until the company domain is bought.

It is a static [Astro](https://astro.build) site with no backend, built from the Claude Design canvas
"404 Solutions — website design" ([docs/design/README.md](docs/design/README.md)). Its mascot is Scout, a bee,
who also answers common questions in a small chat panel. Scout is not AI: it matches the question against a
fixed list, in the browser ([ADR 0003](docs/adr/0003-scout-answers-from-a-fixed-list.md)).

## Run it

Needs Node.js 24 (CI uses 24; 22.18 or newer works, the tests rely on Node's built-in TypeScript type stripping).

```bash
npm install
npm run dev       # http://localhost:4321/404solutions-site/, reloads on save
npm run check     # astro check: types and templates
npm test          # offline tests: Scout, reducers, layout, no personal links, no partner or client names
npm run build     # static site in dist/
npm run check:links  # every internal link and #anchor in dist/ resolves (after build)
npm run preview   # serves dist/ the way a host would
```

`check`, `test`, `build` and `check:links` are the checks of this repository. The workflow
`.github/workflows/site.yml` runs them on every pull request (job `build`, a required check) and, on a merge to
`main`, deploys `dist/` to GitHub Pages. `main` changes only through pull requests: a ruleset blocks direct
pushes, force pushes and deletion. Dependabot opens weekly update PRs for npm and the Actions
(`.github/dependabot.yml`); they run the same checks and wait for the owner.

## Projects

The projects in `src/content/projects/` are a declared copy of the portfolio's project frontmatter
(ManSe404/webpage): the projects delivered under 404 Solutions and those delivered through a partner, so the
content is written once, there ([ADR 0006](docs/adr/0006-one-services-page-short-project-form.md)). Only the
short fields are copied (title, field, summary, impact, stack, metrics, period), never a write-up, and no company
or client is named ([ADR 0008](docs/adr/0008-no-partner-or-client-names.md)). To
refresh the copy from a local clone of the portfolio:

```bash
PROJECT_ORGS='<org>,<org>' node scripts/sync-projects.mjs <portfolio-checkout>            # from origin/main
PROJECT_ORGS='<org>,<org>' node scripts/sync-projects.mjs <portfolio-checkout> <git-ref>  # or another ref
```

`PROJECT_ORGS` lists the portfolio orgs whose projects belong here; the list is kept in the owner's private notes,
not in this repository. The script applies `scripts/project-edits.json` (fields replaced so they identify no
client, and the company voice: "I" becomes "we") and prints the portfolio commit it copied, any copies it
removed, and a report: a replaced field that changed in the source, a phrase no longer found, a first-person
line left. Fix those in the edits
file, run it again and review the diff. Each file's `source:` line names the portfolio commit it matches. Never
edit a copied file by hand: the next sync overwrites it. Content changes go to the portfolio.

## Where to change what

| To change | Edit |
|---|---|
| Company facts, contact address, founder text, LinkedIn | `src/data/company.ts` |
| The four engagement steps | `src/data/services.ts` |
| Which projects Scout names as examples | `src/data/work.ts` (`featuredProjects`) |
| A project's content | the portfolio, then run the sync (above) |
| How a copied project says "we", or a field that would identify a client | `scripts/project-edits.json`, then run the sync |
| The Services page: heading, legend, order of the cells | `src/components/Services.astro` |
| The honeycomb, the popups, the 404 cell (declared copies, ADR 0007) | `src/components/hive/ProjectHive.astro`, `src/components/hive/ProjectDetails.astro`, `src/lib/honeycomb.ts` |
| Scout's questions, keywords and answers, greeting, suggestions | `src/data/faq.ts` (and a paraphrase test in `tests/faq.test.ts`) |
| How Scout matches a question | `src/lib/faq.ts` |
| The mascot drawing | `src/components/Bee.astro` |
| Colours, type, spacing (Hive tokens) | `src/styles/global.css` |
| Which sections a page shows | its file in `src/pages/`: `index.astro` (home), `services/`, `how-we-work/`, `about.astro`, `contact.astro` |
| The hub's cells: title, line, number, where each leads | `src/components/hive/HiveDashboard.astro` (numbers from `src/lib/dashboard.ts`) |
| How the fields and the tools Scout names are counted | `src/lib/dashboard.ts` (`fields`, `toolUsage`) and its tests |
| The closing call to action (the topic pages; the home page's Contact cell does that job) | `src/components/ClosingCta.astro` |
| The header links and which page is marked current | `src/components/Header.astro` |
| A section's layout | its component in `src/components/` |

No link to the founder's personal pages (the portfolio, the personal GitHub) goes into `src/` or `public/`:
`tests/no-personal-links.test.ts` fails on one. No partner or client name goes anywhere in the repository:
`tests/no-confidential-names.test.ts` fails on one (it holds only hashes of the names). The contact address is the founder's Gmail until the company
domain exists; the roadmap lists what changes when it does. A value that is still open (the engagement model) is
`null` in `src/data/company.ts`, and the page leaves that line out rather than showing a placeholder.

## Documentation

[docs/README.md](docs/README.md) is the index: what the site offers, the roadmap, the design source and the
decisions.
