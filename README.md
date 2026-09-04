# Dhanbahadur — Personal Website

Personal site of Dhan Bahadur Thapa (school principal): home, about,
markdown study materials (`pub`, `writing`, `grammar`, `class-10`,
`class-12`), downloadable books/fonts. Bilingual English / Nepali (EN/NE,
defaults to EN).

Language: the visitor's choice is stored in `localStorage` (`dbt-lang`) and
mirrored to a `dbt-lang` cookie of the same name; server components read the
cookie per request (`getServerLang`), so the first render already matches.
Toggling the language refreshes server-rendered content via
`router.refresh()`.

## Add a study doc

Drop files in `content/<section>/`:

```
content/grammar/<slug>.en.md
content/grammar/<slug>.ne.md
```

Sections: `pub`, `writing`, `grammar`, `class-10`, `class-12`. Every slug
should have an English file; the Nepali file is optional — when it is
missing, the English text is shown with an "English only / अङ्ग्रेजीमा मात्र"
badge.

Each file needs frontmatter:

```md
---
title: "My doc title"
date: "2026-09-04"
subsection: "articles"
---

Doc body in Markdown...
```

Valid `subsection` values per section live in `SECTION_SUBSECTIONS`
(`src/lib/content.ts`).

## Publish a book / font

1. Drop the file (PDF, TTF, OTF…) into `public/downloads/`.
2. Set its `file` name in `src/lib/pub.ts` (`PUB_ITEMS`).
   Leave `file: null` for "coming soon".

## Local dev

```bash
npm install
npm run dev
```

## Deploy on Vercel

1. Import the GitHub repo in Vercel.
2. Set project name to `dbthapa` → URL `dbthapa.vercel.app`.
3. Deploy (defaults work, no env vars needed).
