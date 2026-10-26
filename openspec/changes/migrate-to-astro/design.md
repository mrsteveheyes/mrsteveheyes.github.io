# Design

## Context

The site today (see proposal.md, Why):

- `index.html`, `about/`, `now/` and `uses/` each repeat the same chrome: nav, "Steve Heyes" home link, `<h1>` with an `u-emoji--*` class, avatar, footer. Only the `<h1>` and the `.grid__main` content differ.
- All four pages link the five stylesheets in `assets/css/` (ITCSS-style, numbered 1-5) and load Atkinson Hyperlegible from fonts.bunny.net. The home page links the CSS with relative paths, and the others use absolute paths.
- `beep/` and `exercise/` are self-contained pages with their own inline CSS and JS, and no shared chrome. `beep/index.html` has no `<!DOCTYPE>`.
- `.github/workflows/static.yml` uploads the whole repo (`path: '.'`) to Pages. The custom domain is set in repository settings, not in a `CNAME` file.
- Every page has the same `<title>`: `SteveHeyes.co.uk`.

The constraint that shapes everything: the published pages must look identical (specs/site-pages), and the author wants as little tooling as possible.

## Goals / Non-Goals

**Goals:**
- Built HTML that is visually identical to today's, and as close to byte-for-byte as is practical.
- One dependency (`astro`) and no integrations or plugins.
- A posts pipeline that works end to end with zero posts.

**Non-Goals:**
- Restyling, bundling or optimising CSS, fonts or images.
- Converting `beep/` or `exercise/` to Astro.
- SEO and meta improvements (canonical URLs, Open Graph, per-page titles).
- RSS, a posts list page and a Posts nav link (the fast-follow change).

## Decisions

### 1. Content pages are `.md` files in `src/pages/`, not a collection

`src/pages/index.md`, `about.md`, `now.md` and `uses.md`, each with `layout: ../layouts/Base.astro` in its frontmatter. Astro builds them to `/`, `/about/`, `/now/` and `/uses/` with its default `build.format: 'directory'`, which keeps today's URLs.

- *Alternative:* a `pages` content collection. Rejected because these are four one-off pages, and a collection adds a schema and a route file for no benefit.
- *Alternative:* `.astro` pages. Rejected because the author wants to edit content as Markdown.

### 2. One `Base.astro` layout, driven by frontmatter

The layout renders `<head>`, nav, header, avatar, `.grid__main.o-typography` wrapping the page body (`<slot />`), and footer. Page frontmatter supplies:

| Field     | Example                          | Used for                     |
|-----------|----------------------------------|------------------------------|
| `heading` | `Here's What I'm Doing Now.`     | `<h1>` text                  |
| `emoji`   | `dart`                           | `u-emoji--<emoji>` on `<h1>` |

`<title>` stays the hard-coded `SteveHeyes.co.uk`, as it is today. The avatar `alt` text differs slightly between pages today, and the layout uses the home page's version on every page. That has no visual effect.

### 3. CSS, fonts and images are served from `public/`, not imported

`assets/` moves to `public/assets/` unchanged. The layout links the five stylesheets with absolute `/assets/css/...` URLs, and keeps the bunny.net font `<link>`s.

- *Alternative:* importing the CSS into the layout so Astro bundles and hashes it. Rejected because it changes asset paths and output, and adds risk to the "identical" goal for no user-visible gain.

### 4. Emoji headings inside content stay as raw HTML

About has headings such as `<h2 class="u-emoji u-emoji--thinking">Belief</h2>`. Markdown can't attach classes, so these few headings stay as inline HTML in the `.md` file. Ordinary headings, paragraphs, lists, links and emphasis become plain Markdown.

- *Alternative:* a remark attributes plugin (`## Belief {.u-emoji--thinking}`). Rejected because it adds a dependency for a handful of headings.

### 5. Turn off smart quotes

Astro's Markdown converts straight quotes to curly ones by default. The current text mixes `'` and `’` deliberately or otherwise, so `markdown.smartypants: false` keeps the text exactly as authored. Without this, apostrophes would visibly change.

### 6. `beep/` and `exercise/` are copied verbatim

They move to `public/beep/index.html` and `public/exercise/index.html`. Astro copies `public/` byte for byte, which keeps the missing doctype, the inline scripts and everything else unchanged.

### 7. Posts collection

- `src/content.config.ts` defines a `posts` collection with Astro's `glob` loader over `src/content/posts/**/*.md`, and a schema of `title: string`, `description: string`, `date: coerce.date()`, `draft: boolean` defaulting to `false`. A schema failure fails the build (specs/posts).
- `src/pages/posts/[slug].astro` uses `getStaticPaths()` over the collection, takes the slug from the entry id (the filename), and filters out drafts in production builds.
- **Drafts are visible in `astro dev`** but excluded from `astro build`. This lets the author preview a draft locally, while specs/posts only requires drafts to be absent from the published site.
- `src/layouts/Post.astro` wraps `Base.astro`. It passes the post title as the `<h1>`, shows the date (en-GB, for example "2 November 2026") above the body, and renders the body inside `.o-typography`. The post `<h1>` uses no emoji class.
- `src/content/posts/` is committed with a `.gitkeep`. Astro logs a warning for an empty collection, and this is expected (specs/posts, An empty posts folder builds successfully).

### 8. Deployment uses Astro's official GitHub Action

`static.yml` keeps its triggers (push to `main`, `workflow_dispatch`), permissions and concurrency group, but splits into two jobs:
- **build:** checkout, then `withastro/action`, which installs dependencies, runs `astro build`, and uploads `dist/` as the Pages artifact.
- **deploy:** `actions/deploy-pages`.

Because only `dist/` is uploaded, `.claude/`, `openspec/` and the source files are no longer served. A build failure stops the run before deploy.

The Node version is pinned through `package.json` `engines` and a `.node-version` file, so local (mise) and CI agree.

### 9. pnpm is the package manager

`package.json` declares `"packageManager": "pnpm@10.22.0"`, matching the version installed locally, and `pnpm-lock.yaml` is committed. `withastro/action` detects pnpm from the lockfile, and its `package-manager` input is set explicitly as well, so CI uses the same pnpm version as local. No `package-lock.json` is committed.

- *Alternative:* npm. Rejected because the author prefers pnpm.

### 10. Proving "looks the same"

Before switching, the HTML from the old pages and from `dist/` gets compared after normalising whitespace. The only expected differences are the removed `</ListInline>`, the removed stray `</a>`, heading `id` attributes Astro adds, the unified avatar `alt`, and the unified footer. About and Uses lose their Twitter link, so every page's footer is Keybase / Github / LinkedIn, as specs/site-pages requires. This is the one visible difference, and it is intended. Pages are also screenshotted side by side at mobile and desktop widths.

## Risks / Trade-offs

- [The build step can rot, as Gatsby did] → One dependency, no integrations, a committed `pnpm-lock.yaml`, and pinned Node and pnpm versions. Astro's Markdown support is built in, so an upgrade touches only `astro` itself.
- [pnpm 10 blocks dependency install scripts by default, which can affect Astro's dependencies such as esbuild] → If `pnpm install` warns about ignored build scripts and the build then fails, allow only the named packages in `pnpm.onlyBuiltDependencies` in `package.json`.
- [Markdown output differs subtly from the hand-written HTML, such as whitespace, entities or `<br>`] → Line breaks in the Now page's reading list stay as inline `<br>`. The normalised HTML diff (decision 10) catches anything else.
- [The custom domain drops when the Pages build source changes] → Pages already deploys through Actions, so the setting is unaffected. Check the domain loads straight after the first deploy, and re-enter it in Settings > Pages if it doesn't.
- [The empty collection warning looks like a failure in CI logs] → Documented here, and it goes away with the first post.

## Migration Plan

1. Build the Astro site on a branch, leaving the old HTML files in place until the new pages are verified, then delete them in the same change.
2. Verify locally with `astro build` and `astro preview`: the HTML diff, screenshots, beep and exercise working, a throwaway draft post plus a throwaway real post rendering at `/posts/<slug>/` (removed before merge), and a deliberately invalid post failing the build.
3. Merge to `main`. The new workflow builds and deploys.
4. Smoke test the live site: all six URLs, the favicon, and that `/openspec/config.yaml` returns 404.

**Rollback:** revert the merge commit. The old workflow and HTML files come back, and the next push redeploys the plain-HTML site.

## Open Questions

- The canonical site URL (`https://steveheyes.co.uk` with or without `www`) isn't needed for this change. It becomes Astro's `site` option in the RSS fast follow.
