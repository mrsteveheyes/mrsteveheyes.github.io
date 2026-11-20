# Spec Delta

## Purpose

Lets readers subscribe to the author's posts through a standard RSS 2.0 feed, so a new post appears in their reader without them revisiting the site.

## ADDED Requirements

### Requirement: An RSS feed is served at a stable URL
The site SHALL serve an RSS 2.0 feed at `/posts/rss.xml`. The URL SHALL NOT change between builds.

#### Scenario: Fetching the feed
- **WHEN** a feed reader requests `/posts/rss.xml`
- **THEN** the server returns HTTP 200 with content type `application/xml` (or `application/rss+xml`) and a valid RSS 2.0 document

### Requirement: The feed lists every published post
The feed SHALL include one `<item>` for every non-draft post, sorted newest first by the post's `date`. Drafts SHALL NOT appear.

#### Scenario: New post appears in the feed
- **WHEN** the author publishes a new post and the site is rebuilt
- **THEN** the feed's first `<item>` is the new post

#### Scenario: Drafts stay out of the feed
- **WHEN** a post has `draft: true` and the site is rebuilt
- **THEN** the feed does not include an item for it

### Requirement: Each feed item carries title, description, link, pubDate and guid
Each `<item>` SHALL contain the post's `title` as `<title>`, its `description` as `<description>`, the absolute URL to the post as `<link>`, the post's `date` as `<pubDate>` in RFC 822 format, and the same absolute URL as a stable `<guid>`.

#### Scenario: Feed item fields
- **WHEN** a post titled "Why I build" dated `2026-12-03` with description "Reasons." is published
- **THEN** its `<item>` has `<title>Why I build</title>`, `<description>Reasons.</description>`, `<link>https://steveheyes.co.uk/posts/why-i-build/</link>`, a `<pubDate>` in RFC 822 form, and `<guid>` equal to the link

### Requirement: Feed metadata identifies the site and author
The feed's channel SHALL contain `<title>` ("Steve Heyes" or similar), `<link>` (the canonical site URL), `<description>` (a short one-line description) and `<language>` (`en-gb`).

#### Scenario: Channel metadata
- **WHEN** a reader inspects the feed's channel block
- **THEN** it names the site, links to the canonical URL, has a short description, and declares language `en-gb`

### Requirement: Feed URLs are absolute
Every URL in the feed — channel `<link>`, item `<link>` and item `<guid>` — SHALL be an absolute URL starting with the site's canonical origin, so feed readers can follow them regardless of context.

#### Scenario: Readable in any client
- **WHEN** a feed reader renders an item
- **THEN** clicking the link opens the post at its full `https://…` URL, without relative-URL resolution

### Requirement: An empty feed is still valid
The feed SHALL build and validate when there are no published posts, with the channel metadata present and no `<item>` elements.

#### Scenario: Pre-first-post
- **WHEN** the posts folder has no non-draft posts and the site is built
- **THEN** `/posts/rss.xml` is served with a valid RSS document and no items
