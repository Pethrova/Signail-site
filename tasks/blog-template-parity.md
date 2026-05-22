# Blog Template Parity Rules

## Exact parity objective
Ensure all blog-facing templates render with equivalent structure, spacing intent, and semantic landmarks so users see a consistent experience between blog index and blog article pages.

## Source of truth template
`_reference/blog.html` is the canonical parity reference. Any blog-related template updates must be reconciled against this file before merge.

## Required class names
The following class contracts are mandatory wherever their corresponding regions exist:
- `page-header`
- `ph-inner`
- `ph-ew`
- `ph-hl`
- `ph-sub`
- `filter-bar`
- `fb-inner`
- `fb-label`
- `filter-btn`
- `search-wrap`
- `search-input`
- `search-icon`
- `blog-main`
- `bm-inner`
- `featured-post`
- `fp-card`
- `fp-badge`
- `fp-title`
- `fp-excerpt`
- `fp-meta`
- `fp-side`
- `fp-side-card`
- `fsc-tag`
- `fsc-title`
- `fsc-excerpt`
- `fsc-meta`
- `post-grid`
- `post-card`
- `pc-tag`
- `pc-title`
- `pc-excerpt`
- `pc-meta`
- `bottom-layout`
- `bottom-posts`
- `sidebar-cta`
- `sc-kicker`
- `sc-title`
- `sc-body`
- `sc-btn`
- `sc-email-form`

## Forbidden legacy classes
Do not introduce or retain legacy aliases that diverge from the required class contract:
- `blog-index`
- `blog-hd`
- `blog-featured`
- `posts blog-grid`
- `post feat`
- `ptag`
- `ptitle`
- `pexcerpt`
- `pmeta`
- `pread`
- `eyebrow`
- `sec-hl`
- `blog-intro`

## Validation commands
Run all checks below before declaring parity-complete:
- `npm run build`
- `npm run lint` (if configured)
- `rg "blog-index|blog-hd|blog-featured|posts blog-grid|post feat|ptag|ptitle|pexcerpt|pmeta|pread|eyebrow|sec-hl|blog-intro" src`
- `rg "page-header|ph-inner|ph-ew|ph-hl|ph-sub|filter-bar|fb-inner|fb-label|filter-btn|search-wrap|search-input|search-icon|blog-main|bm-inner|featured-post|fp-card|fp-badge|fp-title|fp-excerpt|fp-meta|fp-side|fp-side-card|fsc-tag|fsc-title|fsc-excerpt|fsc-meta|post-grid|post-card|pc-tag|pc-title|pc-excerpt|pc-meta|bottom-layout|bottom-posts|sidebar-cta|sc-kicker|sc-title|sc-body|sc-btn|sc-email-form" src`

## "Done means" definition
Parity work is done only when:
1. Blog templates conform to required class contracts.
2. Forbidden legacy classes are absent from `src/` blog templates/styles.
3. Build succeeds without introducing new warnings attributable to parity edits.
4. PR includes validation command output and notes any explicit exceptions.
