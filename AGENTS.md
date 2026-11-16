# Working in this repository

- A static Astro site: a hub home page whose five cells lead to one page per topic (`/services/`, which is also
  the work, `/how-we-work/`, `/about/`, `/contact/`). Content belongs on those pages, not on the home
  page. Copy and facts live in `src/data/*.ts`, the projects in the content collection `src/content/projects/`, layout in `src/components/`, tokens in
  `src/styles/global.css`. Pages stay thin: they compose sections and read data, nothing more.
- Before you call a change done, run `npm run check`, `npm test` and `npm run build`, and look at the pages at
  desktop (1440 px) and phone (375 px) width. A page must never scroll sideways at 375 px; a row that
  must scroll does so inside its own box.
- The site speaks for the company. Roles the founder holds at other companies do not appear on it.
- System-discovery work is described as building and discovery, never as reverse engineering. Stefan,
  2026-11-16, naming the backend project: "we must avoid reverse engineering stuff but it was Backend build and
  system discovery". Read as: no "reverse engineering", "recover" or "recovered behaviour" wording either
  (the portfolio follows the same reading).
- No link to the founder's personal pages: not the portfolio (manse404.github.io/webpage), not the personal
  GitHub (Stefan, 2026-11-16). LinkedIn is the one personal profile the site names. `tests/no-personal-links.test.ts`
  scans `src/` and `public/` and fails on such a link.
- Projects are a honeycomb on the Services page, copied from the portfolio's (ADR 0007): a cell opens the
  portfolio's five lines (description, result, role, stack, company / client), word for word, and the dashed
  404 cell is last. No case-study pages and no long write-ups (ADR 0006).
- The projects are synced, not written here (ADR 0006). Content changes go to the portfolio
  (ManSe404/webpage), then `PROJECT_ORGS='<org>,<org>' node scripts/sync-projects.mjs <portfolio-checkout>`
  copies their frontmatter from its `origin/main` (the org list is in the owner's private notes, never here). Never edit a copied file by hand: the next sync overwrites it. Site-only wording (the company's voice, and
  fields replaced because they would identify a client) is in `scripts/project-edits.json`, applied on every
  sync; after a sync, read its report and fix entries rather than guessing. No sentence about a project is written
  here. Every id in
  `featuredProjects` (`src/data/work.ts`) must exist in the collection, or the build fails.
- The founder's numbers must match the portfolio.
- No partner or client is named anywhere in this repository: not on the site, not in data, code, tests or
  documents (NDA; Stefan, 2026-11-16; ADR 0008). `tests/no-confidential-names.test.ts` checks it with hashes.
  The site does not present the company as working only through agencies: no "your client", no "through you";
  how we work is discover, build, ship, run.
- Open facts stay `null` in `src/data/company.ts`; never ship a placeholder such as `[your-domain]`.
- Colours change in `src/styles/global.css` only. The tokens are a declared copy of the portfolio's
  (ADR 0002): a change meant for both sites goes to the portfolio as well.
- Scout, the question bot, is not AI and is never called AI, anywhere. It answers from the fixed list built by
  `buildFaq` in `src/data/faq.ts`, matched in the browser by `src/lib/faq.ts`; nothing typed is sent or stored
  (ADR 0003).
  - Answers are composed from the data the site shows (`company`, `steps` and the project
    titles, fields and tools passed in by `ScoutChat.astro`), never retyped, so the bot cannot contradict the page.
  - A new or changed entry comes with a paraphrase test in `tests/faq.test.ts` (the way a visitor would ask
    it), and its suggestion question must still return the entry itself.
- The mascot (`src/components/Bee.astro`) goes on dark surfaces only: its body is honey, so on a honey fill it
  disappears. One bee per view.
- Documents follow the layout in `docs/README.md`; a change updates the documents it makes wrong in the same
  commit. No machine-local paths in any file.
