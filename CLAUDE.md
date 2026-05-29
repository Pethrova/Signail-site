# CLAUDE.md — Signal Resolution

## What this is
Static site (Eleventy 2 + Nunjucks) for signalresolution.com.
One CSS file, one JS file, no bundler. 
Cloudflare Pages deploys on push to main.

## Build commands
npm start          # dev server at localhost:8080
npx eleventy       # production build to _site/
npm run debug      # verbose eleventy output

## Key files
src/_layouts/base.njk       — HTML shell, meta, fonts
src/_layouts/post.njk       — article template
src/_includes/nav.njk       — fixed nav
src/_includes/footer.njk    — footer
src/blog/index.njk          — blog listing page
src/assets/css/global.css   — all styles (single file)
src/assets/js/main.js       — cursor, nav, filter JS
_data/site.json             — global metadata
_reference/blog.html        — canonical blog reference (do not edit)
src/diagnostic.html         — standalone diagnostic app (passthrough, not processed by Eleventy)
src/assessment.njk          — diagnostic landing/explanation page at /assessment/

## CSS rules
Blog CSS lives at bottom of global.css — lines 415+.
Always reconcile against _reference/blog.html before 
touching blog templates. Required classes: pc-*, fsc-*, 
fp-card, fp-side-card. Forbidden: fp-badge inside 
post-card, is-active (use .on instead... actually both 
are aliased now — prefer .on).

## Adding posts
Add .md to src/blog/ with frontmatter:
layout, title, description, date, category, featured, 
permalink, readTime

## Deployment
Push to main → Cloudflare builds and deploys (~60s).
Never edit _site/ directly.
Never commit node_modules.

## Known remaining work
- First real article links: blog index side cards and post-grid still link to article.html placeholder — need to point to real post URLs via {{ post.url }}
- Tripwire checkout URLs in diagnostic.html are placeholders (console.log only) — need real URLs when checkout is live
- OG images not set on posts
- No favicon
- RSS feed at /feed.xml and sitemap at /sitemap.xml — live
- Tier 1 checkout URL in diagnostic.html is an alert placeholder
