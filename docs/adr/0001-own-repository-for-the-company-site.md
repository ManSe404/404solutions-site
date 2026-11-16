# 0001. The company site is its own repository

**Status:** accepted, 2026-11-16; superseded in part by ADR 0004

## Context

404 Solutions needed a website, designed on a Claude Design canvas. The founder's portfolio
(ManSe404/webpage) already has the same visual system and publishes every case study, including the ones
delivered under 404 Solutions. Two places were possible: a `/404-solutions` page inside the portfolio, or a
repository of its own.

## Decision

The company site lives in its own repository, `404solutions-site` (Stefan, 2026-11-16). It links to the case
studies on the portfolio instead of copying them.

## Consequences

- The site can take its own domain and a contact address on that domain. A page under the portfolio's GitHub
  Pages address could not, and would read as part of a personal site rather than a company's.
- The page speaks for the company and can change copy, layout and release without touching the portfolio.
- The visual tokens are duplicated in two repositories; ADR 0002 declares the copy so it can be kept in step.
- Facts that both sites show (partners, case studies, the founder's numbers) must be updated in both. The
  case-study list in `src/data/work.ts` names the portfolio's main branch as its source.
