# What the site offers

A company site, not a portfolio (Stefan, 2026-11-16): a home page that is a hub and one page per topic;
the Services page is also the delivered work. Every row is checked against the component that renders it. "Checked" means `npm run check`,
`npm test` (offline tests: Scout, the reducers, the honeycomb layout, no links to personal pages and no partner or client names) and `npm run build`
pass, and the built pages were looked at in a browser at 1440 px and 375 px.

| Feature | What you can do | Status | Where in code | Doc |
|---|---|---|---|---|
| Home page (`/`) | See the hero with the interactive honeycomb, then the "Explore" hub of five cells, and start a project from the hub's Contact cell (no closing band: Stefan, 2026-11-16, the Contact cell already does it) | shipped | `src/pages/index.astro`, `src/components/ClosingCta.astro` | — |
| Hub ("Explore", on `/`) | See the company in five large honeycomb cells (three, then two), each with a number or word from the data, a title and one line, and follow any cell to its page: Services 12 (projects) → `/services/`, How we engage 4 → `/how-we-work/`, About 2024 → `/about/`, Contact "Hi" → `/contact/`; the Scout cell ("Ask") opens the question bot | shipped: numbers count up once unless reduced motion is set; without JavaScript the Scout cell links to the contact page; on a phone two cells per row | `src/components/hive/HiveDashboard.astro`, `src/lib/honeycomb.ts` | [ADR 0005](../../adr/0005-hive-dashboard-copied-from-the-portfolio.md) |
| Hero | Read the offer in one line and one paragraph, see the honeycomb picture, go to the contact page or to the Services page ("See what we built") | shipped: the founder line under the buttons stays until Stefan decides | `src/components/Hero.astro`, `CombVisual.astro` | — |
| Interactive honeycomb | Move the honey 200 cell into the empty 404 cell (drag, tap, or Enter/Space on the focused cell), or click or tap the 404 cell to invite it ("Invited. On our way…") and the 200 cell glides over by itself; the dotted trail stays attached to the 200 cell while it is dragged; once in, the gap fills, the label turns to OK, the comb lights up from the centre and the caption reads "HTTP 200 — gap filled. That's the job."; "Try again" resets | shipped: no automated test, checked in Chrome by script (drag, snap back, invite, fill) at 1440 px; without JavaScript the static drawing | `src/components/CombVisual.astro` | — |
| Services page (`/services/`), also the work | Read "What we built, end to end" and pick a cell in the honeycomb of the twelve delivered projects (ember for AI, honey for data, grey for software; seven per row from 1200 px, four on desktop, two on a phone): a popup below opens with the portfolio's five lines (project description, achieved result, role and responsibilities when the portfolio has one, tech stack, period; no company or client); the dashed 404 cell opens "Not on the list?" with a link to the contact page; Close or Escape shuts it, `/services/#work-<id>` opens a project | shipped: without JavaScript every popup shows as a list under the honeycomb | `src/components/Services.astro`, `src/components/hive/ProjectHive.astro`, `src/components/hive/ProjectDetails.astro`, `src/lib/honeycomb.ts`, `src/content/projects/`, `scripts/sync-projects.mjs` | [ADR 0007](../../adr/0007-project-honeycomb-copied-from-the-portfolio.md) |
| How we engage page (`/how-we-work/`) | Read "Discover, build, ship, run." and the four steps | partial: the engagement model line is hidden until it is decided | `src/pages/how-we-work/index.astro`, `src/components/Process.astro` (`page` prop), `src/data/company.ts` | [roadmap](../../roadmap.md) |
| About page (`/about/`) | Read "About 404 Solutions" (one short paragraph) and see the founder | shipped | `src/pages/about.astro` | — |
| About the founder (on `/about/`) | See who builds the work and his research numbers, and open his LinkedIn | shipped | `src/components/About.astro`, `src/data/company.ts` | — |
| Contact page (`/contact/`) | Start a project: the contact box (e-mail, LinkedIn, location), the offer to come over (on site or on a call) and look at what you have, what to send (the client's problem, what your team already covers, the deadline), and a button that opens Scout; no form, nothing is sent from the page | shipped: the address is the founder's Gmail until the company domain exists | `src/pages/contact.astro`, `src/components/Contact.astro` | [roadmap](../../roadmap.md) |
| Header and menu | Go to Home, Services, How we engage, About or Contact from any page (Home also from the logo); the current page is marked (`aria-current`); "Start a project" goes to the contact page; on a phone, open and close the menu (button, link or Escape) | shipped | `src/components/Header.astro` | — |
| Footer | Copyright and location, the e-mail and LinkedIn | shipped | `src/components/Footer.astro` | — |
| Scout, the question bot | Ask a common question (services, engagement, cost, contact, examples, who we worked with (not named: NDA), founder, clouds and tools, location, start date, the name, what Scout is) by typing or with suggestion buttons, on any page; get an answer with links to the right page (services, how we engage, about, contact). Not AI: a fixed list matched in the browser, nothing sent or stored | shipped: 12 answers; anything else gets "not on my list" and the contact links | `src/components/ScoutChat.astro`, `src/lib/faq.ts`, `src/data/faq.ts` (`buildFaq`), `tests/faq.test.ts` | [ADR 0003](../../adr/0003-scout-answers-from-a-fixed-list.md) |
| Mascot | Scout the bee: the chat launcher on desktop, the bee button in the phone bar, the panel header, the share image | shipped | `src/components/Bee.astro`, `public/images/og.png` | [design](../../design/README.md) |
| Phone call-to-action bar | Go to the contact page or open Scout from anywhere on any page, on a phone | shipped | `src/components/StickyCta.astro` | — |
| Search and sharing metadata | Title and description per page, canonical URL, Open Graph and Twitter card with a 1200 × 630 share image, Organization structured data (founder linked to LinkedIn only), favicon | shipped | `src/layouts/Base.astro`, `public/images/og.png`, `public/favicon.svg` | — |
| No personal links | Nothing on the site sends a visitor to the founder's portfolio or personal GitHub; a test fails on such a link in `src/` or `public/` | shipped | `tests/no-personal-links.test.ts`, `src/data/company.ts` | [ADR 0004](../../adr/0004-case-studies-live-on-the-company-site.md) |
| Publishing | Reach the site at <https://manse404.github.io/404solutions-site/>; every merge to `main` deploys after the checks (type-check, tests, build, link check) pass | shipped: `main` only through pull requests with `build` required; Dependabot update PRs weekly | `.github/workflows/site.yml`, `.github/dependabot.yml`, `scripts/check-links.mjs`, `astro.config.mjs` | [roadmap](../../roadmap.md) |

**Pages.** Stefan, 2026-11-16: the company in cells goes on the home page, each cell leading to its own
page, and the full content lives on those pages, "then we will work page by page". So the home page is the hero,
the hub and the way to start; each topic is a page (`/services/`, `/how-we-work/`, `/about/`,
`/contact/`), and the topic pages end in the same "Start a project" band. Services and the work are one page,
every project in the short form of a project portfolio, with no case-study pages (ADR 0006). Desktop and phone share the same HTML; the phone layout comes from CSS (lists instead of card
grids, a timeline, two hub cells per row, a sticky bar), as drawn on the phone artboard of the design.

**Content.** Copy and facts are in `src/data/`; the projects are a content collection copied from the
portfolio's frontmatter by `scripts/sync-projects.mjs`, which also applies `scripts/project-edits.json` (ADR 0006, ADR 0008). No
partner or client is named anywhere. The hub's numbers and the fields are reduced from the same
lists and the collection at build time, so the hub cannot disagree with the pages it leads to. LinkedIn is the
only personal profile the site links.

**Scout.** The bot is a second way into the same content, for a visitor who would rather ask than browse. Its
list is built at build time by `buildFaq` from the same data and the project collection, so a change to a
project or the contact address changes the bot's answer too; the page hands the list to the
browser as JSON. The greeting says what it is: "from a fixed list — no AI, and nothing you type leaves this
page"; a test keeps that sentence true.
