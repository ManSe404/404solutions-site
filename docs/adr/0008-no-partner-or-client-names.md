# 0008. No partner or client names, no agency framing

**Status:** accepted, 2026-11-16. Supersedes the partner list of ADR 0004 and the company / client line of
ADR 0007.

## Context

Most of 404 Solutions' work so far was delivered as a subcontractor. The contracts behind it limit what may be
published: one NDA forbids revealing "the contents nor the existence of the business collaboration" without
written consent; another treats project details and the partner's customers as confidential unless a separate
written agreement allows publication. The site named four partners, counted them, listed them on the About page,
named them in each project's company line and in Scout's answers, and described the company as a supplier to
agencies ("delivered through you, for your client").

Stefan, 2026-11-16: no names ("Generic only"), the most identifying project made generic, the change on the
company site only, and "just dont mention if we are b2b or whatever just mention on discover build ship run",
so the site also works for a client who comes directly.

## Decision

- **No company or client is named** in the site, its data, its code or its documents. The sync drops `org` and
  `client`; the About page has no Partners section; there is no partner count; Scout says the work is under NDA.
  Which portfolio orgs are copied is the setting `PROJECT_ORGS`, kept outside the repository.
- **Identifying text is replaced** at sync time through `scripts/project-edits.json`: whole fields, each with
  the SHA-256 of the source text it replaces, so the source wording is not kept here and a change in it is
  reported.
- **No agency framing.** The site describes what it builds and the four steps (discover, build, ship, run);
  it no longer says it works through agencies, for "your client", or that the visitor keeps the client
  relationship.
- `tests/no-confidential-names.test.ts` fails when a known partner or client name appears in `src/`, `public/`,
  `scripts/`, `docs/`, `tests/` or the top-level documents. It holds only hashes of the names.
- The names in ADR 0004, 0006 and 0007 were redacted for this decision; that is the only change made to them.
- The Tools hub cell and the `/stack/` page are removed (Stefan, same day): the stack is on each project.

## Consequences

- The site makes no claim a contract forbids, and reads the same to an agency and to a direct client.
- Visitors cannot see who the work was for; Scout and the contact page offer to talk instead.
- The portfolio still names these companies; that is Stefan's decision for the portfolio, outside this site.
- The repository's earlier commits contain the names. Before the repository is published, its history is
  replaced by one commit of the cleaned tree (roadmap 1), so nothing earlier becomes public.
