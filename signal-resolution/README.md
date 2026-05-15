# Signal Resolution — Site & Content Engine

## Stack
- **11ty (Eleventy)** — static site generator. Converts your Markdown + Nunjucks templates into pure HTML
- **GitHub** — source of truth. All files live here
- **Netlify** — watches GitHub main branch, auto-deploys on every push
- **Sveltia CMS** — browser-based editor at `/admin`. Writes Markdown files directly to GitHub

---

## Local Setup (first time only)

```bash
# 1. Clone your repo
git clone https://github.com/YOUR-USERNAME/signal-resolution.git
cd signal-resolution

# 2. Install dependencies
npm install

# 3. Run local dev server (live reload at localhost:8080)
npm start
```

---

## Writing a New Post

### Option A — CMS (recommended for weekly publishing)
1. Go to `signalresolution.com/admin`
2. Log in with GitHub
3. Click **New Blog Post**
4. Fill in: Title, Description, Date, Category, Body
5. Click **Publish** → Sveltia commits the `.md` file to GitHub → Netlify deploys within ~60 seconds

### Option B — Locally (for technical control)
1. Create a new file in `src/blog/your-post-slug.md`
2. Add frontmatter at the top:

```yaml
---
layout: post
title: Your Post Title Here
description: One or two sentence excerpt shown on cards and in OG tags.
date: 2026-05-20
category: ICP Methodology
featured: false
permalink: /blog/your-post-slug/
---

Your Markdown body starts here...
```

3. Write in Markdown
4. `git add . && git commit -m "post: your post title" && git push`
5. Netlify deploys automatically

---

## File Structure

```
signal-resolution/
├── src/
│   ├── _includes/        # nav.njk, footer.njk (shared partials)
│   ├── _layouts/         # base.njk (HTML shell), post.njk (article wrapper)
│   ├── blog/             # ← YOUR POSTS LIVE HERE (.md files)
│   │   ├── index.njk     # blog listing page (auto-populates)
│   │   ├── technographic-signals.md
│   │   ├── buyer-states.md
│   │   └── timing-gtm.md
│   ├── assets/
│   │   ├── css/global.css   # all design tokens and styles
│   │   └── js/main.js       # cursor, nav, scroll reveals
│   └── admin/               # Sveltia CMS files
│       ├── index.html
│       └── config.yml       # ← defines your post fields
├── _data/
│   └── site.json            # global site metadata
├── .eleventy.js             # 11ty config (collections, filters, settings)
├── netlify.toml             # tells Netlify: build command + output folder
├── package.json             # npm dependencies
└── .gitignore               # excludes node_modules and _site from GitHub
```

---

## How Netlify + GitHub Works

```
You write  →  git push  →  GitHub  →  Netlify detects push
                                       → runs: npm run build
                                       → 11ty converts .md + .njk → HTML
                                       → deploys to CDN
                                       → signalresolution.com updates
                                       Total time: ~30–60 seconds
```

You never touch Netlify directly. GitHub is the trigger.

---

## Adding Your Homepage (index.html → index.njk)

Your existing `index-v7-aligned.html` needs minor changes to work in 11ty:
1. Rename to `src/index.njk`
2. Add frontmatter at the top: `---\nlayout: base\n---`
3. Remove the `<html>`, `<head>`, `<body>` wrapper (base.njk provides it)
4. Replace the 3 hardcoded post cards with the dynamic loop (see below)

### Dynamic post cards for homepage Writing section:
```njk
{% for post in collections.posts | slice(0, 3) %}
<a href="{{ post.url }}" class="post {% if loop.first %}feat{% endif %} rv {% if loop.index == 2 %}d1{% elif loop.index == 3 %}d2{% endif %}">
  <div class="ptag"><span class="ptag-dot"></span>{{ post.data.category }}</div>
  <div class="ptitle">{{ post.data.title }}</div>
  <div class="pexcerpt">{{ post.data.description }}</div>
  <div class="pmeta">
    <span>{{ post.date | postDate }} · {{ post.content | readingTime }}</span>
    <span class="pread">Read →</span>
  </div>
</a>
{% endfor %}
```

---

## Content Syndication Flow

1. **Publish** on signalresolution.com (canonical URL)
2. **Wait 7–14 days** (Google indexing window)
3. **Syndicate to Medium** — paste the article, add canonical link at bottom:
   `Originally published at signalresolution.com/blog/your-post-slug/`
4. **Atomize for LinkedIn** — pull 3–5 insight fragments into threads/carousels

---

## Sveltia CMS Setup (one-time)

1. In `src/admin/config.yml`, replace `YOUR-GITHUB-USERNAME/signal-resolution` with your actual repo path
2. In Netlify dashboard → **Identity** → Enable Identity
3. Set **Git Gateway** to enabled
4. Invite yourself as a user
5. Visit `signalresolution.com/admin` and log in

---

## Migrate to Cloudflare Pages (when ready)

1. Push this same repo to GitHub (already done)
2. Cloudflare Pages → Connect GitHub repo
3. Build command: `npm run build`
4. Output directory: `_site`
5. Update DNS to point to Cloudflare
6. Delete Netlify site

Zero code changes needed. Same repo. Same build command.
