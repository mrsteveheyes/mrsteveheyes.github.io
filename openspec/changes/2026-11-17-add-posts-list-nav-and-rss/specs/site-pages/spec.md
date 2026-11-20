# Spec Delta

## Purpose

Defines the site's content pages and standalone tool pages: what is served, at which URLs, and how content is authored, so the site looks and behaves the same while content lives in Markdown files.

## MODIFIED Requirements

### Requirement: Content pages share one layout
Every content page SHALL render the same site chrome: the About, Now, Uses and Posts nav links, the "Steve Heyes" home link, a page heading with its emoji, the avatar image, and the footer with the Keybase, Github and LinkedIn links. The chrome SHALL be defined in one place.

#### Scenario: Changing the footer
- **WHEN** the author changes a footer link in the shared layout and the site is rebuilt
- **THEN** that change appears on Home, About, Now, Uses and every post page

#### Scenario: Page-specific heading
- **WHEN** a visitor opens the About page
- **THEN** the page heading reads "About me." with the man emoji, while the nav, avatar and footer match the other pages

#### Scenario: Posts nav link
- **WHEN** a visitor views any content page
- **THEN** the nav shows About, Now, Uses and Posts, and Posts links to `/posts/`

## ADDED Requirements

### Requirement: RSS feed is discoverable from every page
Every page served by the shared layout SHALL include a `<link rel="alternate" type="application/rss+xml">` tag in its `<head>`, pointing at the Posts RSS feed, so browsers and feed readers can autodiscover it.

#### Scenario: Feed reader autodiscovery
- **WHEN** a feed reader is pointed at `https://steveheyes.co.uk/` (or any page using the shared layout)
- **THEN** it finds the RSS feed URL in the `<head>` and can subscribe without the user pasting the feed URL
