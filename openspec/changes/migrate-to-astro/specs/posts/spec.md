# Spec Delta

## Purpose

Lets the author publish posts as Markdown files in the repository, with frontmatter checked at build time and drafts kept off the live site.

## ADDED Requirements

### Requirement: Posts are Markdown files
Each post SHALL be a single Markdown file in the repository's posts folder. Adding, editing or deleting a post SHALL require only adding, editing or deleting that file.

#### Scenario: Adding a post
- **WHEN** the author adds `my-first-post.md` to the posts folder with valid frontmatter and the site is rebuilt
- **THEN** the post is published

### Requirement: Post frontmatter is validated
Every post SHALL declare `title` (text), `description` (text) and `date` (a calendar date), and MAY declare `draft` (true or false, defaulting to false). The build SHALL fail if a post is missing a required field or has a field of the wrong type.

#### Scenario: Missing title
- **WHEN** a post file has no `title` in its frontmatter and the site is built
- **THEN** the build fails with an error naming the file and the missing field, and nothing is deployed

#### Scenario: Invalid date
- **WHEN** a post's `date` is `not-a-date` and the site is built
- **THEN** the build fails with an error naming the file and the `date` field

### Requirement: Posts are published at /posts/<slug>/
Each published post SHALL be served at `/posts/<slug>/`, where `<slug>` is the post's filename without the `.md` extension.

#### Scenario: Post URL from filename
- **WHEN** the posts folder contains a non-draft `why-a-build-step.md`
- **THEN** the post is served at `/posts/why-a-build-step/`

### Requirement: Post pages show title, date and body
A post page SHALL use the shared site chrome and show the post's title, its date, and its rendered Markdown body.

#### Scenario: Viewing a post
- **WHEN** a visitor opens a published post
- **THEN** they see the site nav, avatar and footer, the post title, its date and the post content

### Requirement: Drafts are not published
A post with `draft: true` SHALL NOT be built into the published site.

#### Scenario: Draft post
- **WHEN** the posts folder contains `half-done.md` with `draft: true` and the site is built
- **THEN** `/posts/half-done/` does not exist in the published site

### Requirement: An empty posts folder builds successfully
The site SHALL build and deploy successfully when there are no posts, or when every post is a draft.

#### Scenario: No posts yet
- **WHEN** the posts folder is empty and the site is built
- **THEN** the build succeeds and every other page is published as normal

### Requirement: Posts are not yet linked from the site
Until the posts list feature ships, the site SHALL NOT include a `/posts/` list page or a "Posts" nav link.

#### Scenario: Nav unchanged
- **WHEN** a visitor views any content page
- **THEN** the nav shows only About, Now and Uses
