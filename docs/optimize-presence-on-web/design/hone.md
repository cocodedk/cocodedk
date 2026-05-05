# Final Quality Pass — consolidated rollout plan

**Skill:** `design-for-ai:hone` (full CHECKER mode)
**Date:** 2026-05-04
**North star:** **Terminal Authority + the hexagon mark** (from `brand.md`)
**Inputs consolidated:** `design-audit.md` + `design/{fonts,colors,flow,brand}.md`

## Cross-doc cohesion check

| Pair | Conflict? | Notes |
|------|:---------:|-------|
| `fonts.md` × `colors.md` | None | Plex Sans renders cleanly on warm parchment; Plex Mono on dark with green is the heritage CRT pairing |
| `fonts.md` × `flow.md` | None | clamp() in fonts coexists with the responsive breakpoints |
| `colors.md` × `flow.md` | None | flow uses `--text-emphasis` (amber) for the primary CTA focus ring — consistent with the *amber = scarce* discipline |
| `colors.md` × `brand.md` | None | Brand mandates "warm = H1 + primary CTA only"; colors enforces ≤ 5 % surface area for amber |
| `brand.md` × everything | None — brand sits on top | Brand is the meta-layer; the four others are answers to it |

**No cross-doc conflicts found.**

---

## Scorecard — by Design-for-Hackers section

| Section | **Pre-audit** | **Post-design-docs** | **Post-implementation** target |
|---------|:-------------:|:--------------------:|:------------------------------:|
| Foundations (Ch 1-2) — purpose, audience, polish-appropriateness | PASS | PASS | PASS |
| Typography (Ch 3 + Appendix) | **FAIL** (mono body) | n/a — docs only | PASS |
| Proportions (Ch 5) | WARN (uniform) | n/a | PASS (3:4 type scale + space-fluid) |
| Composition (Ch 6) — dominance, direction, depth | **FAIL** (no dominant element) | n/a | PASS (H1 promoted, badges consolidated) |
| Visual hierarchy (Ch 7) | **FAIL** (inverted hero) | n/a | PASS |
| Color (Ch 8 + 9) | WARN (all-cool) | n/a | PASS (split-complementary, warm/cool depth) |
| SEO (Ch 4) | PASS w/ caveats | PASS | PASS (web-presence P3 adds per-service pages) |
| Motion (motion.md) | **FAIL** (no `prefers-reduced-motion`) | n/a | PASS |
| Interaction (interaction.md) | WARN (8 states partial) | n/a | PASS |
| Responsive (responsive.md) | WARN (px breakpoints, no container queries) | n/a | PASS |
| AI-tells gate (ai-tells.md) | PASS | PASS | PASS+ (memorable element locked) |

Three Critical-severity findings (C1 mono body, C2 inverted hero, C3 no dominant element) all resolve once Phase 1 of the rollout below is applied. Two more **Critical** items appear on the CHECKER pass that the audit didn't surface: the missing `prefers-reduced-motion` media query (vestibular accessibility) and the JS-injected H1 (crawler-readable text-as-image risk).

---

## Prioritized rollout plan

### Phase 1 — design-system foundation (1–2 dev days, single PR)

| # | Action | Source | File(s) |
|---|--------|--------|---------|
| 1.1 | Add `<link>` to IBM Plex Sans + Mono in `templates/template.html` | `fonts.md` | template.html |
| 1.2 | Update `css/colors.css` — replace tokens with full set from `colors.md` + `flow.md` (palette + motion + space tokens) | colors, flow | css/colors.css |
| 1.3 | Add `:root` type-scale tokens (`--fs-xs`…`--fs-3xl`) to `css/styles.css` | fonts | css/styles.css |
| 1.4 | Set `body { font-family: var(--font-sans); line-height: 1.45; }` and define mono whitelist (`.terminal-text`, `.prompt-line`, `code`, etc.) | fonts | css/styles.css |
| 1.5 | Add global `prefers-reduced-motion` media query (Critical a11y) | flow | css/styles.css |

**After 1.1–1.5:** the foundation tokens are live and the worst CHECKER failures (typography texture, motion accessibility) are resolved.

### Phase 2 — hero rebuild (½–1 dev day)

| # | Action | Source | File(s) |
|---|--------|--------|---------|
| 2.1 | Replace Saturn icon at top of hero with hexagon SVG (re-use FITS hex glyph) | brand B1 / F1 | css/styles.css, js/components/header.js or template.html |
| 2.2 | Promote H1 to dominant size + `var(--text-emphasis)` amber. Reduce stats by ~25 % | audit C2 | css/hero.css |
| 2.3 | Consolidate the 6 floating regulation badges into a single static compliance strip below stats | audit C3 / brand B6 | css/hero.css, js/components/floating-badges or equivalent |
| 2.4 | Add staggered page-load reveal (avatar → prompt → subtitle → stats → H1 → CTA, 60 ms increments, ease-out-expo) | flow | css/hero.css |
| 2.5 | Hero CTA pair: `Lad os snakke` becomes filled-amber primary; `Se ydelser` becomes outlined-green secondary | flow | css/hero.css |

### Phase 3 — global motion + CTA discipline (½ dev day)

| # | Action | Source | File(s) |
|---|--------|--------|---------|
| 3.1 | Reduce floating contact buttons to a **single phone CTA** (56 px, 8 states) | audit M2 / flow | css/styles.css, contact-related components |
| 3.2 | Move email + WhatsApp to a static footer contact strip | flow | footer files |
| 3.3 | Quiet the mesh background — opacity 0.35, halve drift speed | audit M6 | css/backgrounds.css |
| 3.4 | Kill the orbit animation on regulation badges (already consolidated in 2.3) | audit M6 | css/float-badges.css (delete or strip animation) |
| 3.5 | Replace pure-black `box-shadow: rgba(0,0,0,…)` with `var(--shadow-deep)` site-wide | colors M1 | grep across css/ |
| 3.6 | Update `.cta-*` and link styles to use `:focus-visible` with 2 px amber outline + 2 px offset | flow / interaction | css/styles.css |

### Phase 4 — content + structure (½–1 dev day)

| # | Action | Source | File(s) |
|---|--------|--------|---------|
| 4.1 | Drop-in replacement for `js/data/skills-data.js` from `recommended-stack.md` | web-presence | js/data/skills-data.js |
| 4.2 | Make the H1 server-rendered (in HTML), not JS-injected — needed for SEO + reduced-motion fallback | hone (new) | templates/template.html |
| 4.3 | Verify smart-quote, en/em-dash, and `&nbsp;` use across all DA + EN content | fonts (Appendix B) | js/data/*.js |
| 4.4 | Audit `css/glassmorphism.css` callers — restrict glass to contact modal only | brand B5 | css/ + components |

### Phase 5 — fingerprint amplification (½ dev day, low risk)

| # | Action | Source |
|---|--------|--------|
| 5.1 | Apply `$ ` command-prefix style to **section titles** (`$ ls /ydelser/`, `$ cat /om/babak.md`, `$ git log /projekter/`) | brand F2 |
| 5.2 | Apply `──` ASCII-tree treatment to **footer navigation** | brand F4 |
| 5.3 | Add factual microcopy under each hero stat (visible on hover/focus) | brand F6 |
| 5.4 | Pull live `v…` version badges from GitHub releases for portfolio entries | brand F5 |
| 5.5 | Add an asymmetric "Om mig" section that breaks the centred pattern (portrait left, narrative right) | brand B3 |

### Phase 6 — assets + responsive sweep (½ dev day)

| # | Action | Source |
|---|--------|--------|
| 6.1 | Regenerate `images/og-card-1200x630.png` using hexagon + wordmark + `$ ` tagline | brand B7 |
| 6.2 | Audit images for `srcset` + `sizes` and descriptive `alt` text | responsive |
| 6.3 | Convert any `max-width: …` media queries to `min-width: …` (mobile-first) | responsive |
| 6.4 | Add `container-type: inline-size` to card grid containers (service, portfolio, activity, FITS) | flow / responsive |
| 6.5 | `padding-bottom: env(safe-area-inset-bottom)` on the floating phone CTA | flow |

### Phase 7 — content surface (separate, larger effort — covered in `comparison.md`)

These belong to the web-presence rollout, not the design rebuild. They're listed here only so they don't get forgotten:

- P1 productize one MCP server, list on registries (`comparison.md` P1)
- P2 add named-client logo bar (`comparison.md` P2)
- P3 per-regulation service pages DA + EN (`comparison.md` P3)
- P6–P8 directories, content blog, SKI Framework

---

## Final 7-test gate (from `checklists.md` Section 7 — Phase 7 Validation)

These are the last gates the implementation must pass *after* Phases 1–6. Capture before/after screenshots so the next progress-check (Mode B in 6 months) has a baseline.

| # | Test | What it asks | Expected outcome |
|---|------|--------------|-----------------|
| 1 | **Squint test** | Blur the page in a browser screenshot — is the H1 still the dominant visual? Is body-text texture even? | Yes, with hierarchy clear at low resolution |
| 2 | **Eye-recycling** | Does the eye circulate through the composition or exit immediately? | Hexagon avatar → H1 (amber) → stats → CTA → recycle via the asymmetric "Om mig" anchor below |
| 3 | **F-pattern check** | Most important content top-left of the eye-entry zone? | Hero centred is acceptable; sub-sections place service titles left-aligned |
| 4 | **Credibility** | Would a stranger say "professional" and "well organised"? | Yes — once stats hierarchy + named clients (web-presence P2) are in |
| 5 | **Appropriateness** | Polish level matches context? | Yes — Terminal Authority is *intentionally* not over-polished; matches the GRC-developer brief |
| 6 | **Convention** | Functional colors match expectations (red = error, blue = link, green = success)? | Yes — `colors.md` enforces |
| 7 | **Crawler** | Search engines access all important content? | After Phase 4.2 (server-rendered H1) and web-presence P3 (per-service URLs), yes |
| 8 | **Strip test** | Remove each piece of ornamentation; does hierarchy survive? | Yes — even with mesh + badges + animation removed, the hierarchy stands on the H1 + stats + CTA proportions |
| 9 | **Cultural** | Any unintended color associations for DK / EU audience? | No — terminal green has neutral cultural reading in DK; amber = warmth/Scandinavian wood/sun |

---

## Done in docs vs pending in code

| Layer | Done in PR #47 (docs) | Pending in code |
|-------|:----------------------:|:--------------:|
| Web-presence audit (4 competitor reports + comparison + recommendations) | ✓ | n/a (content/strategy) |
| Recommended-stack inventory | ✓ | apply to `js/data/skills-data.js` (Phase 4.1) |
| Design audit (10 findings) | ✓ | resolved by Phases 1–6 |
| Typography system | ✓ (`fonts.md`) | Phase 1.1, 1.3, 1.4 |
| Color system | ✓ (`colors.md`) | Phase 1.2 |
| Motion + interaction + responsive | ✓ (`flow.md`) | Phase 1.5, 3.x, 6.3, 6.4 |
| Brand identity + AI-tells gate | ✓ (`brand.md`) | Phase 2, 5, 6.1 |
| Final consolidation | ✓ (this file) | this is the rollout map |

**Effort estimate to apply Phases 1–6:** roughly **3–4 dev days** for one developer. Phase 7 (web-presence content + per-regulation pages + MCP-server productization) is the larger 2–4 week effort.

**Recommended sequencing for one-week sprint:**
- Day 1: Phases 1 + 2 (foundation + hero) — biggest visual change, biggest credibility unlock
- Day 2: Phase 3 (motion + CTAs) + Phase 4 (content + structure)
- Day 3: Phase 5 (fingerprint amplification) + Phase 6 (assets + responsive)
- Day 4: Run the 7-test gate, capture before/after, ship

Anything not done by end of week becomes a backlog ticket — but Phases 1–3 are non-negotiable for the design audit to be considered closed.

---

## Cross-reference back to web-presence audit

| Web-presence finding | Design phase that supports it |
|----------------------|-------------------------------|
| P2 named-client logo bar | Phase 2 hero rebuild gives the row a stable home below the consolidated compliance strip |
| P3 per-regulation service pages | Phase 4.2 (server-rendered H1) is a prerequisite — same pattern needs to apply to each new page |
| P5 expand skills | Phase 4.1 is the direct application |
| Design as competitive moat (audit 02-ansvar-systems analysis) | Terminal Authority + hexagon mark is the visual differentiator vs. AI Wave's anonymous-agency framing |

The design and content rollouts reinforce each other; neither lands alone.
