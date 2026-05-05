# Typography — Pair selection and configuration

**Skill:** `design-for-ai:fonts` (Design for Hackers, Ch 3 + Appendix A)
**Date:** 2026-05-04
**Addresses:** design-audit.md C1 (monospace body copy), m1 (Courier New as primary mono fallback)

## Decision tree walk-through

| Step | Question | Answer for cocode.dk |
|------|----------|----------------------|
| Medium | Screen or print? | Screen, ~100–150 ppi (mobile-first 375 px → desktop 1440 px) |
| Mood | What feeling? | **Terminal / CLI / hacker** — technical authority, GRC seriousness, developer-led |
| Body font | Serif or sans for screen body? | Sans-serif (Ch 3 default for screen) |
| Letter structure | Humanist / geometric / realist? | **Humanist** — matches the "named individual, hand-crafted" personal-brand angle and pairs naturally with humanist monos |
| Pairing strategy | Harmony or extreme contrast? | **Harmony via same-designer shortcut** — eliminates uncanny-valley risk |
| Number of families | One or two? | Two: one humanist sans + one humanist mono (excludes the existing Font Awesome icon font, which is iconography, not text content) |
| Justified or ragged | — | Ragged right (CSS lacks reliable hyphenation) |
| Leading | — | 1.45em body, 1.2em headlines, 1.1em code blocks |

---

## Recommendation: **IBM Plex Sans + IBM Plex Mono**

Both designed by Mike Abbink and Bold Monday at IBM (2017–18). Same designer = guaranteed structural compatibility (the "same-designer shortcut" technique from Appendix A).

### Why this pair, not the alternatives

| Candidate pair | Verdict | Reason |
|----------------|:-------:|--------|
| **IBM Plex Sans + IBM Plex Mono** | ✓ **Recommended** | Same designer (guaranteed harmony), both humanist, distinctive (NOT Inter/Roboto/Open Sans), strong DK/EN Latin Extended coverage, free on Google Fonts, professional but with personality |
| Inter Tight + JetBrains Mono | ✗ | Inter is the #1 AI-tell font (per `ai-tells.md` Critical) — using it signals "no typographic decision was made" |
| Söhne + Berkeley Mono | ✗ | Both are paid (Söhne ~$650, Berkeley Mono ~$75); barrier to deployment + maintenance |
| Geist Sans + Geist Mono | ✗ | Vercel-branded; reads as "I copied a Vercel template," same convergence problem as Inter |
| Public Sans + JetBrains Mono | ◐ | Free + distinctive but two different designer families — pairs work but not guaranteed |
| Atkinson Hyperlegible + IBM Plex Mono | ◐ | Excellent for accessibility-first positioning but the Hyperlegible humanist is more "warm/friendly" than the GRC + technical-authority brief |

### The `n` test

| Font | `n` shape | Classification | Compatibility |
|------|-----------|---------------|--------------|
| IBM Plex Sans | Organic shoulder curve, slight humanist contrast in stem | Humanist | ✓ |
| IBM Plex Mono | Same shoulder curve, monospaced grid | Humanist mono | ✓ |
| Courier New (current) | Stiff slab serifs, mechanical | Realist/slab | ✗ — mismatched with anything humanist; replace |

Squint test: IBM Plex Sans body text produces an even gray field with no dark blotches. Plex Mono is denser (monospace always is) but evenly distributed — no Comic-Sans-style heavy junctions.

---

## Type scale (3:4 ratio, base 16 px)

| Token | Px | Use |
|-------|----|-----|
| `--fs-xs` | 11 | Footnotes, micro-metadata, badge labels |
| `--fs-sm` | 14 | Secondary metadata, captions |
| `--fs-base` | **16** | Body copy (the "tonic" — every other size derives from this) |
| `--fs-md` | 19 | Sub-headings (H4–H5), hero stat labels |
| `--fs-lg` | 25 | Section headings (H3) |
| `--fs-xl` | 33 | Section titles (H2) |
| `--fs-2xl` | 44 | Hero stats numbers ("25+", "50+") |
| `--fs-3xl` | 59 | H1 / hero headline (mobile may scale down to 44 via clamp) |

Step ratio is ~1.32 (≈ 3:4 = 1.333), giving each step a meaningful ≥25 % difference per Ch 7 visual-hierarchy guidance — no "13 vs 14 px" trivial differences.

Mobile scaling: use `clamp(min, viewport-rel, max)` so the H1 fluidly drops from 59 → 44 px between desktop and 375 px viewports.

---

## Leading + spacing

| Element | line-height | Why |
|---------|:-----------:|-----|
| Body paragraphs | 1.45 | High end of 1.2–1.4 + 0.05 because Danish has long compound nouns (e.g. *cybersikkerhedscompliance*) that need breathing room |
| Headlines (`.hero-headline`, h1–h3) | 1.2 | Tight to keep the headline visually cohesive; H2/H3 may go to 1.25 |
| Code blocks / `$ ` prompts | 1.1 | CLI style + monospace already has built-in vertical rhythm |
| Bulleted lists | 1.3 | Slightly tighter than body paragraphs |

Paragraph separation: **spacing only** (`margin-block-end: 0.8em`) — no `text-indent`. Per Appendix B, never both.

---

## CSS configuration

### 1. Add a font import (top of `css/styles.css` or via `<link>` in `templates/template.html`)

```html
<!-- In <head>, before existing CSS -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap">
```

For self-hosting (preferred long-term — strips a third-party dependency and avoids GDPR concerns about Google Fonts CDN, given cocode.dk's compliance positioning): download the woff2 files and serve from `/fonts/`. Use `@font-face` blocks in a new `css/fonts.css`.

### 2. Update `css/colors.css` — replace lines 32–34

```css
/* Font stacks */
--font-sans: 'IBM Plex Sans', 'Söhne', 'Helvetica Neue', Helvetica, Arial, sans-serif;
--font-mono: 'IBM Plex Mono', 'JetBrains Mono', 'Berkeley Mono', 'Fira Code', 'Courier New', monospace;
```

Fallback chain rationale (Ch 3 — "fallbacks share structural characteristics"):
- **Sans:** Plex → Söhne (paid commercial fallback if licensed) → Helvetica Neue (realist, x-height matches reasonably) → Arial (universal)
- **Mono:** Plex → JetBrains → Berkeley → Fira → Courier New (last resort; everything before it is structurally closer)

### 3. Add a body-text default in `css/styles.css`

```css
:root {
  --fs-xs: 0.6875rem; /* 11px */
  --fs-sm: 0.875rem;  /* 14px */
  --fs-base: 1rem;    /* 16px */
  --fs-md: 1.1875rem; /* 19px */
  --fs-lg: 1.5625rem; /* 25px */
  --fs-xl: 2.0625rem; /* 33px */
  --fs-2xl: 2.75rem;  /* 44px */
  --fs-3xl: clamp(2.75rem, 4.5vw, 3.6875rem); /* 44–59px */
}

body {
  font-family: var(--font-sans);
  font-size: var(--fs-base);
  line-height: 1.45;
  font-feature-settings: "kern" 1, "liga" 1;
}

/* Mono is reserved for these contexts ONLY: */
.terminal-text,
.hero .prompt-line,           /* "$ cocode.dk | AI Agenter ..." */
.fits-version-badge,          /* "v8.8.29" */
.ascii-tree-menu,             /* the ── nav links */
code, pre, kbd, samp {
  font-family: var(--font-mono);
}
```

### 4. CSS files to grep + audit after the change

Each of these contains font-related declarations and will need a sweep to ensure mono isn't applied to body text:

`css/styles.css`, `css/colors.css`, `css/campaign.css`, `css/footer-lang.css`, `css/activity-feed.css`, `css/fits-showcase.css`, `css/float-badges.css`, `css/service-cards.css`, `css/backgrounds.css`, `css/modal-links.css`.

Quickest way: `grep -rn "font-family\|--font-mono" css/` and convert any `var(--font-mono)` outside the explicit "mono whitelist" above to `var(--font-sans)`.

---

## Typographic etiquette checklist (Appendix B Critical/Should)

Apply these throughout DA + EN content:

- [ ] Smart quotes: `&ldquo;…&rdquo;` (EN), `&bdquo;…&rdquo;` (DA — opening quote is the low double `„`), `&lsquo;…&rsquo;` for single
- [ ] En dash `&ndash;` for ranges (`2024–2026`), em dash `&mdash;` for parenthetical breaks
- [ ] One space after periods (the current site already does this — verify after any future content edits)
- [ ] No fake bold: load 400 + 600 + 700 weights of Plex Sans, 400 + 500 + 700 of Plex Mono. Never set `font-weight: bold` on a font where only 400 is loaded — the browser will synthesize a faux-bold and Plex's distinctive curves will close up.
- [ ] No fake italic: Plex offers genuine italic for both. Load `&Italic` variants (e.g. `IBM+Plex+Sans:ital,wght@0,400;0,600;1,400`).
- [ ] `font-variant-ligatures: contextual` on the H1 (Plex's `fi`, `fl` ligatures are distinctive).
- [ ] Body text alignment: `text-align: left` everywhere except where centring is a deliberate choice (footer credits, hero stats — both keep centring intentionally).

---

## Validation

Before merging, run the squint test on:
- a paragraph of Danish body copy (e.g. the hero value-prop)
- a paragraph of English body copy
- the hero stats row at 375 px width
- the `$ ` prompt headline (must still feel CLI-correct in IBM Plex Mono — earlier mock-up confirms it does, with sharper character than Courier New)

If any test reveals dark blotches or letterfit issues, fall back to `Söhne + Berkeley Mono` (the paid pair) before considering anything else.
