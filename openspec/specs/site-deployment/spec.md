# site-deployment Specification

## Purpose

Defines how the site gets from the repository to GitHub Pages: what triggers a deploy, what is published, and what happens when a build fails.

## Requirements

### Requirement: Pushing to main deploys the site
A push to the `main` branch SHALL build the site and deploy it to GitHub Pages. A deploy SHALL also be startable by hand.

#### Scenario: Push to main
- **WHEN** a commit is pushed to `main`
- **THEN** the site is built and the new build is live on GitHub Pages once the workflow finishes

#### Scenario: Manual deploy
- **WHEN** the author runs the deploy workflow by hand from GitHub Actions
- **THEN** the current `main` is built and deployed

### Requirement: Only the build output is published
The deployed site SHALL contain only the built site. Repository files that are not part of the site, including `.claude/`, `openspec/`, `.github/`, `src/`, `package.json` and `README.md`, SHALL NOT be publicly served.

#### Scenario: Tooling files are not served
- **WHEN** a visitor requests `/openspec/config.yaml` or `/.claude/commands/opsx/apply.md`
- **THEN** GitHub Pages returns 404

### Requirement: A failed build does not deploy
If the build fails, the deploy SHALL NOT happen, and the previously deployed site SHALL stay live.

#### Scenario: Broken post frontmatter
- **WHEN** a push to `main` contains a post with invalid frontmatter
- **THEN** the workflow fails at the build step and the live site is unchanged

### Requirement: Custom domain is preserved
The site SHALL continue to be served on its existing custom domain after the migration.

#### Scenario: Domain still resolves
- **WHEN** a visitor opens the site's custom domain after the first Astro deploy
- **THEN** the Astro-built Home page is served
