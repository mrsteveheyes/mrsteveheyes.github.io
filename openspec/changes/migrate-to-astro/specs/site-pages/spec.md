# Spec Delta

## Purpose

Defines the site's content pages and standalone tool pages: what is served, at which URLs, and how content is authored, so the site looks and behaves the same while content lives in Markdown files.

## ADDED Requirements

### Requirement: Content pages are authored in Markdown
The Home, About, Now and Uses pages SHALL be authored as Markdown files in the repository. No CMS, database or runtime server SHALL be required to author or serve them.

#### Scenario: Editing a page
- **WHEN** the author changes the text of the Now page's Markdown file and the site is rebuilt
- **THEN** the published Now page shows the new text, and no other system needs updating

### Requirement: Content pages keep their URLs
The site SHALL serve Home at `/`, About at `/about/`, Now at `/now/` and Uses at `/uses/`.

#### Scenario: Existing link still works
- **WHEN** a visitor requests `/now/`
- **THEN** the Now page is returned with HTTP 200

### Requirement: Content pages share one layout
Every content page SHALL render the same site chrome: the About, Now and Uses nav links, the "Steve Heyes" home link, a page heading with its emoji, the avatar image, and the footer with the Keybase, Github and LinkedIn links. The chrome SHALL be defined in one place.

#### Scenario: Changing the footer
- **WHEN** the author changes a footer link in the shared layout and the site is rebuilt
- **THEN** that change appears on Home, About, Now and Uses

#### Scenario: Page-specific heading
- **WHEN** a visitor opens the About page
- **THEN** the page heading reads "About me." with the man emoji, while the nav, avatar and footer match the other pages

### Requirement: Rendered appearance is unchanged
The rendered content pages SHALL look the same as before the migration: the same stylesheets, fonts, favicon, images, page title, text and emoji headings.

#### Scenario: Side-by-side comparison
- **WHEN** each content page is viewed before and after the migration at mobile and desktop widths
- **THEN** there is no visible difference in layout, typography, colours, images or text

### Requirement: Static assets keep their paths
Stylesheets and images SHALL remain available at their existing `/assets/css/` and `/assets/images/` paths.

#### Scenario: Favicon request
- **WHEN** a browser requests `/assets/images/favicon.ico`
- **THEN** the existing favicon is returned

### Requirement: Standalone tool pages are served unchanged
The Beep page at `/beep/` and the Exercise page at `/exercise/` SHALL be served with the same markup, styles and behaviour as before. They SHALL NOT use the shared site layout.

#### Scenario: Exercise page still calculates
- **WHEN** a visitor opens `/exercise/`
- **THEN** the page shows "Morning" or "Evening" for today's date, exactly as it did before the migration

#### Scenario: Beep timer still works
- **WHEN** a visitor opens `/beep/` and starts the timer
- **THEN** the timer counts and beeps as it did before the migration
