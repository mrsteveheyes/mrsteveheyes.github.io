# Proposal

## Why

The site is six hand-written HTML files, and the nav, header, avatar and footer are copied into four of them, so any change to the shared chrome means editing every page. Blog posts are coming soon, and adding them as more copy-pasted HTML would make that worse. Moving to Astro with Markdown as the only content source gives one shared layout, Markdown pages, and a place for posts, without adding a CMS or database.

## What Changes

- Rebuild the site with Astro. Content is Markdown files in the repo, and there is no CMS, database or server.
- Add one shared layout that holds the `<head>`, nav, header, avatar and footer, written once.
- Convert Home, About, Now and Uses to Markdown pages that use that layout. They keep their current URLs, text and appearance.
- Move the existing CSS and images over unchanged, so the rendered site looks the same.
- Serve `beep/` and `exercise/` exactly as they are today, as untouched static files.
- Add a `posts` content collection with a validated frontmatter schema (`title`, `description`, `date`, optional `draft`), a post layout, and a route that builds each post at `/posts/<slug>/`. No posts are published, and there is no posts list page or nav link yet.
- Change the GitHub Pages workflow to build the site with Astro and publish only the build output. Today the workflow publishes the whole repository, including `.claude/` and `openspec/`.
- Remove the invisible markup errors in the current pages (a stray `</ListInline>` closing tag and an unmatched `</a>`). This changes nothing that is rendered.

Out of scope, and planned as a separate fast follow:
- An RSS feed for posts.
- A `/posts/` list page and a "Posts" nav link, which go live alongside the first real post.

Content edits are also out of scope. That includes the Uses page's line saying the site is "pure HTML and CSS," which will be out of date after this change.

## Capabilities

### New Capabilities

- `site-pages`: The site's content pages (Home, About, Now, Uses) authored as Markdown with a shared layout, plus the standalone Beep and Exercise tool pages, served at stable URLs with the existing look.
- `posts`: Markdown posts held in a validated content collection, built to `/posts/<slug>/`, with drafts excluded from the published site.
- `site-deployment`: Building the site and publishing only the build output to GitHub Pages on every push to `main`.

### Modified Capabilities

None. There are no existing specs.

## Impact

- **Repository layout**: the top-level HTML files and `assets/` move under `src/` and `public/`, and `package.json`, `astro.config.mjs` and `pnpm-lock.yaml` are added.
- **Dependencies**: adds `astro`, the only runtime dependency, with pnpm as the package manager, and Node and pnpm in CI. This brings back a build step and `pnpm install`, which the site currently avoids on purpose.
- **CI/CD**: `.github/workflows/static.yml` changes from "upload the repo" to "build with Astro, upload `dist/`".
- **Published site**: same URLs and same appearance. `.claude/`, `openspec/`, `README.md` and the workflow files stop being publicly served.
- **Custom domain**: no change is expected. The domain is set in the repository's Pages settings, and there is no `CNAME` file in the repo today.
