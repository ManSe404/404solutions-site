# Codebase map

| Path | What it holds |
|---|---|
| `astro.config.mjs` | Astro settings: `site` and `base` for the GitHub Pages project URL, directory build format, HTML-aware whitespace compression (`compressHTML: true`) |
| `src/content.config.ts` | The `projects` content collection and its schema (`source`, `title`, `category`, `summary`, `order`, `period`, `impact`, `stack`, `metrics`); no company or client field (ADR 0008) |
| `src/content/projects/` | One frontmatter-only file per delivered project, a declared copy from the portfolio (ADR 0006); each names its source commit |
| `scripts/sync-projects.mjs` | Copies the frontmatter of the portfolio projects whose `org` is listed in `PROJECT_ORGS` (a setting kept outside the repository), drops `org` and `client`, applies the edits file: `PROJECT_ORGS='<org>,<org>' node scripts/sync-projects.mjs <portfolio-checkout> [git-ref]` |
| `scripts/project-edits.json` | Per project: whole fields replaced so they identify no client (each with the SHA-256 of the source text it replaces), and exact phrases for the company voice |
| `src/pages/index.astro` | The home page: hero and the hub (no closing band: the hub's Contact cell is the way to start); then footer, sticky bar and Scout |
| `src/pages/services/index.astro` | `/services/`, also the delivered work: "What we built, end to end" (`Services.astro`), closing call to action |
| `src/pages/how-we-work/index.astro` | `/how-we-work/`: the four steps as a page (`Process.astro` with `page`), closing call to action |
| `src/pages/about.astro` | `/about/`: intro, founder |
| `src/pages/contact.astro` | `/contact/`: the contact box, what to send, Scout |
| `src/layouts/Base.astro` | `<html>`, `<head>` (meta, canonical, Open Graph and Twitter card, fonts, Organization JSON-LD, favicon), backdrop, skip link, slots for header and footer |
| `src/components/Header.astro` | Logo; links to Home, Services, How we engage, About and Contact, the current one marked; "Start a project" to the contact page; phone menu toggle (browser script) |
| `src/components/ClosingCta.astro` | The closing band of the topic pages: "Tell us what's missing." and "Start a project →" to the contact page |
| `src/components/HiveMark.astro` | The logo mark as inline SVG, with size and stroke props |
| `src/components/Bee.astro` | Scout the mascot as inline SVG on a 64 × 64 grid; decorative unless given a `label` |
| `src/components/Hero.astro` | Eyebrow, headline, lede, the interactive honeycomb, buttons to the contact page and the Services page, founder line |
| `src/components/CombVisual.astro` | The honeycomb picture: nine skill cells, the empty 404 cell, the 200 cell; drag, tap or Enter moves 200 into the gap, a click on the gap invites it, the trail follows the cell; the comb lights up when it lands |
| `src/components/hive/HiveDashboard.astro` | The home page's hub: five large honeycomb cells (Services, How we engage, About, Contact, Scout; three per row on desktop), each a link to its page with a number from the data, a title and one line; the Scout cell opens the bot; count-up; declared copy of the portfolio's grid (ADR 0005) |
| `src/components/Services.astro` | The Services page: heading, legend, the projects ordered by field (AI, then data, then the rest), `ProjectHive` |
| `src/components/hive/ProjectHive.astro` | The project honeycomb with the dashed 404 cell last, the popups, deep links and Escape; declared copy of the portfolio's (ADR 0007) |
| `src/components/hive/ProjectDetails.astro` | One project's five lines in a popup; declared copy of the portfolio's (ADR 0007) |
| `src/components/Process.astro` | The four engagement steps; the engagement-model line when it is set; `page` renders it as the main content of `/how-we-work/` |
| `src/components/About.astro` | Portrait, founder bio and numbers, LinkedIn |
| `src/components/Contact.astro` | The contact page's content: the contact box (e-mail when set, LinkedIn, location), the offer to come over and look, what to send, a button that opens Scout |
| `src/components/Footer.astro` | Mark, copyright and location, the e-mail and LinkedIn |
| `src/components/StickyCta.astro` | Phone-only bar with "Start a project" (to the contact page) and the bee that opens Scout |
| `src/components/ScoutChat.astro` | Scout's desktop launcher and chat panel; builds the list with `buildFaq` and hands it to the browser script as JSON (open and close, ask, suggestions) |
| `src/lib/faq.ts` | Scout's matching, pure functions: `stems`, `score`, `match`, `nextSuggestions` |
| `src/lib/projects.ts` | `projects()` (sorted), `featured()` (fails on an unknown id) |
| `src/lib/dashboard.ts` | Pure reducers over plain data: `toolUsage` (Scout's tools answer), `fields` (Scout, the Services page's description), `projectResult` (the popups); `inProgress` is not used by a page now, kept for the page-by-page pass (roadmap 2) |
| `src/lib/honeycomb.ts` | `place`, `tracks`, `cols`: honeycomb placement for the hub and the project honeycomb; declared copy of the portfolio's (ADR 0007) |
| `src/lib/url.ts` | `withBase()` for internal paths |
| `src/data/company.ts` | Company facts, contact address, founder, LinkedIn (the only outside profile); open values are `null` |
| `src/data/services.ts` | The four engagement steps |
| `src/data/work.ts` | `featuredProjects`: the projects Scout names as examples |
| `src/data/faq.ts` | Scout's name, greeting and tagline; `buildFaq(context)` returns the 12 entries from the page paths, the other data modules, the project titles, fields and tools; default suggestions, fallback |
| `src/styles/global.css` | Hive tokens (declared copy, ADR 0002), reset, layout and type primitives, chips, buttons |
| `tests/faq.test.ts` | Offline tests of Scout: stems, every suggestion answers itself, paraphrases, no placeholders, links only to the site's pages and contact routes, the greeting stays true |
| `tests/dashboard.test.ts` | Offline tests of the reducers and the honeycomb layout; the fields account for every real project |
| `tests/no-confidential-names.test.ts` | Fails when a partner's or client's name appears in the repository's files; holds only SHA-256 hashes of the names (ADR 0008) |
| `tests/no-personal-links.test.ts` | Fails on any link to the portfolio or the personal GitHub in `src/` or `public/` |
| `public/` | `favicon.svg`, `images/stefan-seman.jpg`, `images/og.png` (share image) |
| `scripts/check-links.mjs` | `npm run check:links`: every internal link, file and #anchor in `dist/` resolves; offline |
| `.github/dependabot.yml` | Weekly grouped update PRs for npm and the GitHub Actions; major TypeScript and `@types/node` bumps skipped (reasons in the file) |
| `.github/workflows/site.yml` | Check, test, build and link check on every pull request (job `build`, required on `main`) and on `main`; deploy to GitHub Pages from `main` |
