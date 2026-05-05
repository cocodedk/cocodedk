# Motion · Interaction · Responsive — implementation plan

**Skill:** `design-for-ai:flow` (motion + interaction + responsive references)
**Date:** 2026-05-04
**Addresses:** design-audit.md M2 (three competing floating CTAs) + M6 (animation everywhere with no hierarchy)

## Summary of the discipline

| Dimension | Rule | What this fixes |
|-----------|------|-----------------|
| Motion | Every animation must answer "what changed?" — remove if not | M6 (decorative animation noise) |
| Interaction | One primary CTA per region, eight states for it, real focus management | M2 (CTAs that compete) |
| Responsive | Mobile-first, content-driven breakpoints, container queries for cards | (preventative) |

---

## 1. Motion — choreography for the page

### Keep one signature animation. Cut three.

| Element | Current | Decision | Why |
|---------|---------|:--------:|-----|
| Terminal-typing hero text | Animates ~3 s on page load | **Keep** | This is the *signature* — it enacts the CLI aesthetic. Earns its place per `motion.md` "communicates state change" rule. |
| 6 floating regulation badges (#NIS2, #DORA, #MCP, #GDPR, #WORKFLOW, #AGENT) with continuous orbit | Always animating | **Kill the orbit. Keep the badges.** | Per `motion.md` Critical: animation must communicate, not decorate. Replace orbit with a static layout (see C3 fix in audit) — a single horizontal compliance strip below the stats row. |
| Mesh canvas background | Continuous slow drift | **Quiet** | Reduce opacity 0.6 → 0.35; halve the drift speed. Becomes ambient texture, not active motion. |
| Three floating contact buttons pulsing | Pulse every ~2 s | **Kill the pulse. Reduce to one button.** | See Interaction section. |
| Hero stats (`25+`, `50+`, `Top 2 %`, `3000+`) | Static (good) | **Keep static** + add stagger on first reveal | Stats are credibility; they should be calm, not bouncing. |

### Page-load orchestration (~600 ms total)

Staggered fade-up in reading order — `transform: translateY(16px) → 0` + `opacity: 0 → 1`, 300 ms each, `--ease-out-expo`:

```
0 ms     hexagon avatar
60       "$ cocode.dk | …" (terminal-typing begins after this slide-in)
120      "# AI Agent Development …"
180      stats row (the 4 stats reveal as one unit, no inner stagger)
240      H1 ("Jeg Bygger AI-Agenter Der Rent Faktisk Virker")
300      value-prop paragraph
360      primary + secondary CTA buttons
420      compliance strip (consolidated from the floating badges)
```

### Section reveal on scroll

IntersectionObserver, threshold 0.15, fade + translate-up 12 px, 300 ms ease-out-expo. Once revealed, never re-animate.

### `prefers-reduced-motion` (Critical)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  /* The terminal-typing hero text — short-circuit to final state */
  .terminal-text { animation: none !important; }
  .mesh-bg { display: none !important; }
}
```

---

## 2. Interaction — fix the CTA hierarchy

### One primary CTA, two demoted channels

- **Phone (`+45 53 73 75 14`)** — primary floating CTA: 56 px circle, `var(--accent-primary)` fill, `var(--primary-bg)` icon, `box-shadow: 0 8px 24px var(--shadow-deep)`. Replaces all three current floating buttons.
- **Email + WhatsApp** — demoted to a static contact strip in the footer (linked text + icon for each). No floating presence.

DK B2B norm: phone is the highest-trust first-contact channel; email is for follow-up; WhatsApp is supplementary.

### Eight states for the primary phone CTA

```css
.cta-phone {
  /* default */
  width: 56px; height: 56px;
  background: var(--accent-primary);
  color: var(--primary-bg);
  border-radius: 999px;
  display: grid; place-items: center;
  position: fixed; right: 16px; bottom: 16px;
  padding-bottom: env(safe-area-inset-bottom);
  transition: transform var(--dur-micro) var(--ease-out-expo),
              background var(--dur-micro) var(--ease-out-expo);
  will-change: transform;
}
.cta-phone:hover           { transform: scale(1.05); background: var(--accent-hover); }
.cta-phone:focus-visible   { outline: 2px solid var(--text-emphasis); outline-offset: 4px; }
.cta-phone:active          { transform: scale(0.97); }
.cta-phone[disabled]       { opacity: 0.5; cursor: not-allowed; transform: none; }
.cta-phone[aria-busy="true"] { /* loading */ }
.cta-phone.has-error       { background: var(--error); }
.cta-phone.has-success     { /* brief flash on call-launched if intent verified */ }
```

States covered: default, hover, focus, active, disabled, loading, error, success. The hover state only applies on `pointer: fine`; touch devices skip directly to `:active`.

### Hero CTA pair (`Lad os snakke` / `Se ydelser`)

- **`Lad os snakke`** = primary: filled `var(--text-emphasis)` (amber) background, `var(--primary-bg)` text. The amber from the colors system is reserved for *the* call-to-action of the page — using it here cashes in the credibility token.
- **`Se ydelser`** = secondary: `transparent` background, `1px solid var(--accent-border)` outline, `var(--accent-primary)` text. Reads clearly as the *less-committed* option.
- Same 100 ms hover, 300 ms focus-ring transition, no pulse.

### Focus management

- All interactive elements receive `:focus-visible` rings (2 px solid `var(--text-emphasis)`, 2 px offset, 3:1 contrast verified)
- Skip-link `<a class="skip-link" href="#hero">Skip to content</a>` revealed on focus only
- `.contact-modal` (existing): trap focus inside, `inert` attribute on `<main>` while open, restore focus to opener on close

---

## 3. Responsive — content-driven breakpoints

### Pattern: **mobile-first**, all queries are `min-width`

Drop the desktop-first `max-width` patterns wherever they appear. Resize the browser slowly through the live site to find the exact pixels where the content visibly breaks — those are the breakpoints, not hardcoded device widths.

| Breakpoint | Px (content-driven, not device-driven) | What changes |
|-----------:|:--------------------------------------|--------------|
| Base | 320 | Single column. CTA stack vertical. Stats row 2×2 grid. |
| **`--bp-sm`** | 480 | Stats row goes to 1×4. H1 increases to `--fs-2xl`. |
| **`--bp-md`** | 760 | Hero portrait + text become side-by-side. Service cards 2-column. |
| **`--bp-lg`** | 1080 | Service cards 3-column. Portfolio grid 3-column. Hero adds a third column for the floating compliance strip. |
| **`--bp-xl`** | 1320 | Max content width caps at 1200 px and centres. |

### Container queries for the cards

Service / portfolio / FITS-showcase / activity-feed cards can appear in different parents (full-width hero strip, narrow sidebar in future, modal overlay). Each card is its own container:

```css
.card-grid { container-type: inline-size; }

.card { /* default mobile-style layout */ }

@container (min-width: 320px) { .card { /* horizontal icon + heading */ } }
@container (min-width: 480px) { .card { /* full description below */ } }
```

### Fluid sizing + safe area + touch targets

Type clamp() lives in `fonts.md`. Add a spacing twin: `--space-fluid: clamp(1rem, 0.6rem + 2vw, 2rem)` (16 → 32 px between 320 and 1100 px). Add `padding-bottom: env(safe-area-inset-bottom)` to `.cta-phone` and the footer. Enforce `min-height: 44px; min-width: 44px` on every interactive element. Wrap any hover-only affordance in `@media (hover: hover)` so touch devices get a non-hover alternative.

---

## 4. CSS tokens (drop-in additions to `css/colors.css`)

```css
:root {
  /* Duration */
  --dur-micro: 100ms;
  --dur-standard: 300ms;
  --dur-complex: 500ms;

  /* Easing */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-expo: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1);

  /* Stagger increment */
  --stagger: 60ms;

  /* Breakpoints (informational — used in the SCSS-style
     query writing pattern; CSS itself reads min-width literals) */
  --bp-sm: 480px;
  --bp-md: 760px;
  --bp-lg: 1080px;
  --bp-xl: 1320px;

  /* Fluid spacing */
  --space-fluid: clamp(1rem, 0.6rem + 2vw, 2rem);
}
```

The two existing easing variables (`--ease-in`, `--ease-out`, `--ease-in-out` on lines 36-38 of `colors.css`) become **legacy** — their cubic-bezier values use the basic curves the references explicitly call out as "missed opportunities." Keep them for one release cycle while migrating, then delete.

---

## 5. Verification (post-implementation)

- DevTools Performance — only composite + transform during load orchestration
- Toggle OS "reduce motion" → typewriter freezes at end-state, mesh hides, transitions ~0 ms
- Tab through whole page → focus ring visible on every interactive element in reading order
- Device emulator 320/375/480/760/1080/1320 px → no horizontal overflow, text ≥ 14 px, touch targets ≥ 44 × 44
- Disable JS + reload → page still readable
- Contact modal: Tab traps inside, Escape closes, focus returns to opener

This doc rides on top of `fonts.md` (type scale tokens) and `colors.md` (accent + shadow tokens). Apply those first. The single biggest concrete change driven here: **delete two of the three floating CTAs** — that alone resolves M2 entirely and removes ~30 % of perpetual on-screen motion.
