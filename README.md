# Dhanbahadur — Personal Website

Personal site of Dhan Bahadur Thapa (school principal): home, about,
markdown blog, downloadable books/fonts. Bilingual English / Nepali (EN/NE,
defaults to NE).

## Add a blog post

Drop two files in `content/blog/`:

```
content/blog/<slug>.en.md
content/blog/<slug>.ne.md
```

Each with frontmatter:

```md
---
title: "My post title"
date: "2026-09-04"
---

Post body in Markdown...
```

## Publish a book / font

1. Drop the file (PDF, TTF, OTF…) into `public/downloads/`.
2. Set its `file` name in `src/lib/downloads.ts` (`BOOKS` / `FONTS`).
   Leave `file: null` for "coming soon".

## Local dev

```bash
npm install
npm run dev
```

## Deploy on Vercel

1. Import the GitHub repo in Vercel.
2. Set project name to `dhanbahadur` → URL `dhanbahadur.vercel.app`.
3. Deploy (defaults work, no env vars needed).
