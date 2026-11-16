/**
 * Prefix a site-root-relative path with Astro's configured `base`.
 *
 * `base` is "/" today. Hosting is not decided, and a GitHub Pages project URL
 * would need a sub-path, so every internal asset goes through this helper.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}`;
}
