# 0002. The Hive tokens are a declared copy of the portfolio's

**Status:** accepted, 2026-11-16

## Context

The design of the company site uses the "404 Solutions" design system, which was made from the portfolio's
tokens (ManSe404/webpage at commit 86f8276, `website/src/styles/global.css`, `:root`). The two sites should
look like one brand. They are separate repositories (ADR 0001), and there is no shared package for CSS between
them.

## Decision

`src/styles/global.css` carries a copy of the portfolio's `:root` tokens, with the source repository, file and
commit named in its header comment. Values are kept exactly as in the source. The base primitives (reset,
wrap, eyebrow, chips, buttons, card) are adapted from the same file. One deliberate difference: `body` has no
`overflow-x: hidden`, because on the portfolio it clips cards at phone width.

## Consequences

- A colour or type change meant for the brand is made in both repositories, and the commit named in the header
  comment moves to the new source commit.
- A change meant only for the company site is made here and noted in the header comment.
- If a third site needs the tokens, they move into one shared package instead of a third copy.
