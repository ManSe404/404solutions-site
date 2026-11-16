// @ts-check
import { defineConfig } from 'astro/config';

// Free hosting for now: a GitHub Pages project site at
// https://manse404.github.io/404solutions-site/. `base` must match the
// repository name so assets resolve. When the company domain is bought, set
// `site` to it, drop `base`, and add `public/CNAME` (docs/roadmap.md).
export default defineConfig({
  site: 'https://manse404.github.io',
  base: '/404solutions-site',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
