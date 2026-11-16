# 0003. Scout answers from a fixed list, in the browser

**Status:** accepted, 2026-11-16

## Context

Stefan asked for a company mascot, a bee, and a sample question-and-answer bot that does not use AI, with a
real chatbot possible later. The site is static and meant for free hosting on GitHub Pages: there is no server
to hold an API key, no budget for per-message model costs, and no place to keep what visitors type. The questions a
visitor asks a consultancy's site are few and predictable: what do you build, how do we work together, what
does it cost, how do I reach you.

## Decision

Scout answers from a fixed list of entries in `src/data/faq.ts`. `src/lib/faq.ts` splits the question into word
stems and scores each entry by its keyword phrases, one point per matching stem; the best entry answers, and a
question with no match gets "not on my list" with the contact links. Everything runs in the visitor's browser:
nothing is sent or stored. Answers are composed from the same data modules as the page. The bot says what it is
in its first message ("from a fixed list — no AI, and nothing you type leaves this page"), and is never called
AI.

## Consequences

- No running cost, no key, no backend, and no visitor text to protect or lose.
- The bot cannot invent anything: every answer is one the page could give, and changes with the page's data.
- It only knows the questions on the list; phrasing it does not expect falls through to the contact links. New
  entries come with a paraphrase test, so a keyword change that steals another entry's questions fails `npm test`.
- Moving to a model later is a new decision with its own ADR: which provider sees visitor text, the monthly
  cost, and how prompt injection is kept away from anything the bot can do. The fixed list can stay as the
  first answer and the fallback.
