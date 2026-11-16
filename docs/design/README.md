# Design

The site is built from the Claude Design canvas **"404 Solutions — website design"**
(<https://claude.ai/artifact/LXESoAX2YiHRpCpEbSXkMp>, visible only to its owner's Claude account). Its design
system is **"404 Solutions"** (Hive, dark only), made from the portfolio's tokens (ADR 0002).

The canvas has four artboards:

| Artboard | What it is | In the code |
|---|---|---|
| Home — desktop (1440 wide, fluid) | The one-page home the site started from | its hero is the home page's hero; its sections now live on their own pages (departures below); cards, chips, type and backdrop carry through every page |
| Home — phone (390 wide) | The phone layout: menu button, services as a list, timeline, swipe row, partner rows, sticky bar | the `@media (max-width: 640px)` and `860px` blocks of each component |
| Brand board | Logo, favicon sizes, palette, type, buttons and chips | `src/components/HiveMark.astro`, `public/favicon.svg`, `src/styles/global.css` |
| Mascot — Scout | Scout the bee at illustration, chat-avatar and inline size; usage rules; the chat launcher and panel; the phone sticky bar with the bee | `src/components/Bee.astro`, `ScoutChat.astro`, `StickyCta.astro` |

## The mascot

Scout is a front-facing honey bee drawn on a 64 × 64 grid (`src/components/Bee.astro`), legible from 28 px up.
Scout bees fly out, find what is missing and report back, which is the company in one animal. Rules from the
Mascot artboard:

- On dark surfaces only: the body is honey, so on a honey fill it disappears.
- One bee per view: the chat launcher, or the illustration, not both side by side.
- Scout answers from a fixed list. Never call it AI.

## Where the code departs from the design

| Departure | Why |
|---|---|
| No partner-countries number ("US · BG · HR") | Stefan, 2026-11-16: not wanted for now. On desktop it was also wider than its column and ran into the next number. |
| The one-page design is split into a hub home and a page per topic: home is the hero and the hub (its Contact cell replaces the closing call to action there); services (with the work), how we engage, about (the founder) and contact are pages of their own, the topic pages ending in the same "Start a project" band | Stefan, 2026-11-16: "its company page not portfolio", then "the company in eight cells should go to homepage", each cell leading to its page, the descriptions on the respective pages, "then we will work page by page". |
| Services and the work are one page: the design's service cards become a honeycomb of the delivered projects, copied from the portfolio's project honeycomb (a cell opens the project's five lines below), and the design's dashed 404 cell is the last cell of the comb; there are no case-study cards or pages | Stefan, 2026-11-16: "join work and services into one", "we dont need those individual overtalked stuff", then "i want the same hive like structure in here also with not on the list one that looks awesome descriptions keep as in manse404 webpage" (ADR 0006, ADR 0007). |
| The stats row became the home page's hub: five large honeycomb cells, three then two, each with a number from the data, a title and one line, each a link to its page (the Scout cell opens the bot); no Partners cell | Stefan, 2026-11-16: reuse the portfolio's hive dashboard (a declared copy of its grid and count-up, ADR 0005), "bigger boxes", and "i dont want to put partners here". A version earlier the same day opened panels in a popup; links to the pages replaced it. It had eight cells until Services, the case studies and Areas became one page and Tools went. |
| No role at another company: "Head of AI" and "leads an AI and data practice" are gone; the founder line reads "Founded and led by Stefan Seman — ML engineer · PhD researcher" | Stefan, 2026-11-16: the site speaks for the company, not for his position elsewhere. |
| Contact shows the founder's Gmail instead of `hello@[your-domain]` | Stefan, 2026-11-16: the company domain is bought later; until then the Gmail he already publishes on the portfolio is the address. |
| No engagement-model line | It was a placeholder (`[YOUR MODEL]`); a live page shows nothing rather than a placeholder (roadmap 5). |
| The phone sticky bar's second button opens Scout instead of jumping to the work | The bar is the one control always in reach on a phone; the work (the Services page) is one tap away in the menu. |
| No "Read case study" or "All case studies" links; the canvas linked them to the portfolio | Stefan, 2026-11-16: the company site does not send visitors to his personal pages (ADR 0004), and each project is told in its box on the Services page (ADR 0006). |
| No links to the portfolio or the personal GitHub anywhere: About keeps only LinkedIn (no "Full profile"), and the footer shows the e-mail and LinkedIn instead of "Stefan Seman ↗ · GitHub ↗ · LinkedIn ↗" | Same decision; LinkedIn is the one personal profile, as the founder's contact route. A test fails on a personal link. |
| Phone copy is the desktop copy | The phone artboard shortens several texts. One text per item keeps the two layouts from drifting; the phone layout trims by hiding chips, periods and highlights instead. |
| Only the honeycomb hero picture, and it is interactive | The canvas has a second, terminal-style variant as a switch; the honeycomb is its default. Stefan, 2026-11-16: moving the 200 cell into the 404 gap fills it (drag, tap or keyboard), lights the comb and reports "HTTP 200"; the canvas draws only the static state. |
| Founder stats stay on the phone | The phone artboard drops them; they fit in one row of three. |

When the canvas changes, compare it with this table before porting: a departure listed here is deliberate.
| No partners section, no partner count, no company or client on a project; the "How we engage" heading is "Discover, build, ship, run." instead of "Delivered through you, for your client.", and the copy no longer addresses agencies | Stefan, 2026-11-16: the work is under NDA ("Generic only"), and "just dont mention if we are b2b or whatever just mention on discover build ship run" (ADR 0008). |
