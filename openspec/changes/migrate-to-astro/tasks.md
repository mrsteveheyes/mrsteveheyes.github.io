# Tasks

## 1. Baseline and scaffolding

- [x] 1.1 Capture a baseline of the current site before anything moves: copy the six `index.html` files to a scratch folder outside the repo, and take screenshots of Home, About, Now and Uses at 375px and 1280px. Verify six HTML files and eight screenshots exist.
- [x] 1.2 Add `package.json` with `astro` as the only dependency, `dev`/`build`/`preview` scripts and an `engines.node` pin and `"packageManager": "pnpm@10.22.0"`, plus a matching `.node-version`. Verify `pnpm install` succeeds, `pnpm-lock.yaml` is created, and there's no `package-lock.json`.
- [x] 1.3 Add `astro.config.mjs` with static output and `markdown.smartypants: false`, and add `dist/`, `.astro/` and `node_modules/` to `.gitignore`. Verify `pnpm astro build` runs on an empty `src/pages/`.

## 2. Static assets and tool pages

- [x] 2.1 Move `assets/` to `public/assets/` unchanged. Verify `/assets/images/favicon.ico` and `/assets/css/1.settings.css` are served by `astro preview`.
- [x] 2.2 Move `beep/index.html` and `exercise/index.html` to `public/beep/` and `public/exercise/`. Verify `dist/beep/index.html` and `dist/exercise/index.html` are byte-identical to the baseline copies (`cmp`), and that the beep timer and the Morning/Evening display work in `astro preview`.

## 3. Shared layout and content pages

- [x] 3.1 Create `src/layouts/Base.astro` with the head (title, favicon, bunny.net font, the five stylesheets with absolute paths), nav, header with `heading`/`emoji` props, avatar, `.grid__main.o-typography` slot and footer, without the stray `</ListInline>`. Verify it renders through a temporary test page.
- [x] 3.2 Convert Home to `src/pages/index.md` without the unmatched `</a>`. Verify the normalised HTML diff against the baseline shows only the expected differences listed in design.md (decision 10).
- [x] 3.3 Convert About to `src/pages/about.md`, keeping the emoji `<h2>` headings as inline HTML. Verify with the same normalised HTML diff.
- [x] 3.4 Convert Now to `src/pages/now.md`, keeping the `<br>` line breaks in the reading list and the `<small>` last-updated line. Verify with the same normalised HTML diff.
- [x] 3.5 Convert Uses to `src/pages/uses.md`, leaving the text unchanged. Verify with the same normalised HTML diff.
- [x] 3.6 Delete the old root `index.html`, `about/`, `now/`, `uses/`, `beep/`, `exercise/` and `assets/`. Verify `astro build` still produces all six pages and `git status` shows no leftover originals.

## 4. Posts collection

- [x] 4.1 Add `src/content.config.ts` defining the `posts` collection (glob loader over `src/content/posts/**/*.md`, schema of `title`, `description`, `date` and `draft` defaulting to false), and commit `src/content/posts/.gitkeep`. Verify `astro build` succeeds with the folder empty.
- [x] 4.2 Add `src/layouts/Post.astro`, which wraps `Base.astro` with the post title as the heading and an en-GB formatted date above the body. Add `src/pages/posts/[slug].astro`, which builds one page per post and skips drafts outside `astro dev`. Verify with a temporary `test-post.md` that `/posts/test-post/` shows the nav, avatar, footer, title, date and body.
- [x] 4.3 Verify the draft and validation rules with temporary posts: a `draft: true` post is absent from `dist/` but visible in `astro dev`; a post with no `title` and one with `date: not-a-date` each fail `astro build` with an error naming the file and field. Delete all temporary posts afterwards, and verify `src/content/posts/` holds only `.gitkeep`.
- [x] 4.4 Verify there is no `/posts/` list page (`dist/posts/index.html` does not exist) and that the nav still shows only About, Now and Uses.

## 5. Deployment

- [x] 5.1 Rewrite `.github/workflows/static.yml` with a build job using `withastro/action` (with `package-manager` set to the pinned pnpm version) and a deploy job using `actions/deploy-pages`, keeping the push-to-`main` and `workflow_dispatch` triggers, permissions and concurrency group. Verify the YAML parses and the job graph is build, then deploy.
- [x] 5.2 Update `README.md` with how to run the site locally (`pnpm install`, `pnpm dev`) and how to add a post, including the frontmatter fields and `draft`. Verify the documented commands work as written.

## 6. Integration checks

- [x] 6.1 Compare screenshots of `astro preview` against the task 1.1 baseline at 375px and 1280px for Home, About, Now and Uses. Verify there is no visible difference.
- [ ] 6.2 After merging to `main`, confirm the workflow goes green, then smoke test the live custom domain: `/`, `/about/`, `/now/`, `/uses/`, `/beep/` and `/exercise/` return 200, the favicon loads, and `/openspec/config.yaml` and `/.claude/commands/opsx/apply.md` return 404.

## Workflow follow-up

- Archive this change once the live site has been verified.
- Propose the fast-follow change for the posts RSS feed, `/posts/` list page and Posts nav link, and settle the canonical site URL then.
- Decide separately whether to update the Uses page's "pure HTML and CSS" text.
