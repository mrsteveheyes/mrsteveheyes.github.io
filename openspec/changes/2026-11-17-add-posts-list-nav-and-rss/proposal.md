# Proposal

## Why

The site has the posts machinery — content collection, schema, per-post route at `/posts/<slug>/`, draft handling — but no way in to it. No list page, no nav link, no feed. A visitor who doesn't already know a post's URL cannot find one, and there is no way to subscribe. The archived Astro migration proposal names exactly this gap and parks it as a fast follow.

Two things make this the right time. First, the author is running an "Advent of writing" in December 2026 — a personal commitment to write at least 100 words a day and publish each day — so posts are about to start arriving daily. Second, the chrome, schema and route already exist, so the work is to expose what is there, not to build it.

The 100-words-a-day commitment is the author's, not the system's. The build will not reject short posts or missing days. This proposal is about making posts findable and subscribable.

## What Changes

- Add a Posts index at `/posts/`, listing every non-draft post newest-first. Each entry shows the post's date, title (linked) and description. The index is paginated (10 posts per page) and served at `/posts/`, `/posts/2/`, `/posts/3/`, etc.
- Add a **Posts** nav link, pointing at `/posts/`, with the existing `thinking` emoji class. The nav becomes: About, Now, Uses, Posts.
- Add an RSS 2.0 feed at `/posts/rss.xml`, listing every non-draft post newest-first. Each item has title, description, link, pubDate and GUID. The feed is discoverable from a `<link rel="alternate" type="application/rss+xml">` in the shared layout.
- Set `site: 'https://steveheyes.co.uk'` in `astro.config.mjs`, so the RSS feed can emit absolute URLs.
- Add `@astrojs/rss` as a dependency. It is Astro's official RSS helper and keeps the XML generation to a few lines; the alternative is hand-rolling XML in a route, which is more code for the same output.

The post URL stays at `/posts/<slug>/`. No existing URL moves.

Out of scope, and worth stating:

- **No word-count enforcement.** A post under 100 words still builds and publishes. The daily commitment is in the author's head, not the schema.
- **No Advent-specific theming, counter, index or branding.** Advent is the reason the feature is landing now; it is not a feature of the feature.
- **No tags, categories or search.**
- **No comments, reactions or analytics.**
- **No Open Graph, Twitter Card or canonical URL metadata on post pages.** That is its own change.

## Capabilities

### New Capabilities

- `rss`: A single RSS 2.0 feed listing every published post, served at a stable URL, discoverable from the site, with absolute URLs sourced from the site's canonical origin.

### Modified Capabilities

- `posts`: The "not yet linked from the site" requirement is dropped — posts are now listed at `/posts/` and reached from the nav. A new requirement covers the index and its pagination.
- `site-pages`: The shared nav gains a Posts link and the shared `<head>` gains an RSS autodiscovery link.

## Impact

- **Repository layout**: adds `src/pages/posts/[slug].astro`, `src/pages/posts/[...page].astro` and `src/pages/posts/rss.xml.js`. The content folder `src/content/posts/` and the collection name stay — nothing moves on disk for the author.
- **Dependencies**: adds `@astrojs/rss` (one new dep). The migration proposal's "one dependency" aesthetic bends by exactly one package here, and this is called out deliberately rather than hidden.
- **Config**: `astro.config.mjs` gains `site: 'https://steveheyes.co.uk'`.
- **Layout**: `Base.astro` nav gains a fourth item; `<head>` gains one `<link rel="alternate">`.
- **Published URLs**: `/posts/`, `/posts/<n>/` (for n ≥ 2) and `/posts/rss.xml` are new. `/posts/<slug>/` is unchanged.
- **CI/CD**: no change. Existing workflow builds the full site, including the new routes and the feed.
- **Author workflow**: unchanged. Still "add a Markdown file to `src/content/posts/`, push, done."

## Open Questions

Decisions made with reasoning rather than asked up front, so they can be redirected:

1. **Canonical URL: `https://steveheyes.co.uk` (apex, no `www`).** The custom domain already serves the apex; `www` can redirect via DNS if it does not already. The RSS feed only needs one answer here. If the canonical is actually `https://www.steveheyes.co.uk`, swap one string.
2. **Feed URL: `/posts/rss.xml`.** Groups the feed with what it serves and keeps `/rss.xml` free for a future site-wide feed. `/rss.xml` at the root is also a reasonable default.
3. **Nav position: last (About, Now, Uses, Posts).** Reads as "and here is where I write." First or second position would frame the site as a writing site, which it is not yet.
4. **Pagination: 10 posts per page.** Roughly a fortnight per page during Advent, so the index stays scannable without forcing new readers through many pages for recent material. Easy to tune in one place.
