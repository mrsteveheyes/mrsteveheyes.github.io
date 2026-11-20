# Spec Delta

## Purpose

Lets the author publish posts as Markdown files in the repository, with frontmatter checked at build time and drafts kept off the live site.

## ADDED Requirements

### Requirement: Posts are listed on an index page
The site SHALL serve `/posts/` as an index listing every non-draft post, sorted newest first by `date`. Each entry SHALL show the post's date, its title (linked to the post), and its description.

#### Scenario: Visiting the index
- **WHEN** there are three published posts and a visitor opens `/posts/`
- **THEN** all three are listed newest first, each with its date, its title linking to the post, and its description

#### Scenario: Empty index
- **WHEN** there are no published posts (the folder is empty or every post is a draft) and a visitor opens `/posts/`
- **THEN** the page is served, and it shows a short "no posts yet" message rather than an error

#### Scenario: Drafts are hidden from the index
- **WHEN** the posts folder contains one published post and one `draft: true` post and a visitor opens `/posts/`
- **THEN** only the published post is listed

### Requirement: The index is paginated
The index SHALL paginate at 10 posts per page. Page 1 SHALL be served at `/posts/`, and page `n` (for `n >= 2`) at `/posts/<n>/`. When there is more than one page, each page SHALL link to the next and previous pages and SHALL expose a numbered page list.

#### Scenario: Within a single page
- **WHEN** there are 7 published posts and a visitor opens `/posts/`
- **THEN** all 7 posts are listed on page 1, no pagination controls are shown, and `/posts/2/` is not served

#### Scenario: Across multiple pages
- **WHEN** there are 23 published posts and a visitor opens `/posts/`
- **THEN** posts 1–10 are listed on `/posts/`, posts 11–20 on `/posts/2/`, and posts 21–23 on `/posts/3/`, with each page linking to its neighbours

#### Scenario: Current page is marked
- **WHEN** a visitor opens `/posts/2/`
- **THEN** the pagination control marks page 2 as the current page and the other page numbers are links

## REMOVED Requirements

### Requirement: Posts are not yet linked from the site
**Reason:** Superseded by the Posts index at `/posts/` and the Posts nav link added in `site-pages`. The temporary gag in place since the Astro migration is lifted.
