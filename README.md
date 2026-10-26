# mrsteveheyes.github.io
My site.

Built with [Astro](https://astro.build) from Markdown files, and deployed to GitHub Pages by `.github/workflows/static.yml` on every push to `main`.

## Running locally

You need Node 24 (see `.node-version`) and pnpm 10.

```bash
pnpm install
pnpm dev
```

Then open http://localhost:4321. `pnpm build` builds the site into `dist/`, and `pnpm preview` serves that build. If a server keeps running in the background, stop it with `pnpm astro dev stop` or `pnpm astro preview stop`.

## Where things live

- `src/pages/*.md`: the Home, About, Now and Uses pages.
- `src/layouts/Base.astro`: the shared head, nav, header, avatar and footer.
- `public/`: files copied as they are, including CSS, images, `beep/` and `exercise/`.
- `src/content/posts/`: blog posts.

## Adding a post

Add a Markdown file to `src/content/posts/`. The filename becomes the URL, so `why-a-build-step.md` is published at `/posts/why-a-build-step/`.

```markdown
---
title: Why a build step
description: A one-line summary of the post.
date: 2026-11-02
draft: true
---

The post body, in Markdown.
```

- `title`, `description` and `date` are required. The build fails if one is missing or invalid.
- `draft` is optional and defaults to `false`. Drafts show up in `pnpm dev` but are left out of the published site. Remove the line, or set it to `false`, to publish.
