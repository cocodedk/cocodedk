# Brand Identity — strip AI tells, amplify the authored fingerprint

**Skill:** `design-for-ai:brand` (ai-tells.md, foundations Ch 1, Ch 4 tech-and-culture)
**Date:** 2026-05-04
**Addresses:** design-audit.md M5 (Saturn icon discontinuity) + the AI-tells gate from the same audit (currently *passing*, but with room to amplify)

## Aesthetic-direction statement (write this down)

> **Terminal Authority.**
>
> Terminal = the visual language: CLI, monospace for code/commands, `$ ` prompts, `#` comments, ASCII tree characters, `v8.8.29` software-version stamps, hexagonal heritage via FITS.
>
> Authority = the positioning the design must support: GRC + AI integration consultancy operating against well-established competitors. Calm, technical-deep, regulation-aware. Excludes "playful," "neon-cyberpunk," "AI dashboard," "consumer-cheery."

This is the **north star.** Every subsequent visual choice answers: *does this serve Terminal Authority?* If no, cut it. If yes, amplify it.

---

## Detection-checklist scan — AI tells on cocode.dk

Reading the live site against `ai-tells.md`. ✓ = present, ✗ = absent, ◐ = partial, **bold** = needs action.

### Typography tells
| Tell | Status | Notes |
|------|:------:|-------|
| Inter / Roboto / Open Sans / Arial as primary | ✗ | Site uses `Courier New` mono — a different problem (covered in `fonts.md`), not this AI default |
| **Monospace as lazy "technical aesthetic" shorthand** | **◐** | Mono is appropriate for `$ ` prompts and code, but currently used for body copy. Fonts plan reserves mono to its rightful contexts. |
| Big rounded icon above every heading | ◐ | Service cards follow this pattern; FITS sub-features inside the FITS box use it more strongly |
| All text centered | ◐ | Hero is centred (defensible — short, single-message); body sections use centred section titles which is fine; **but** stats row + value-prop are centred when left-align would establish reading direction better |

### Color tells
| Tell | Status | Notes |
|------|:------:|-------|
| Cyan-on-dark | ✗ | Terminal green ≠ AI default cyan — heritage justifies |
| Purple-to-blue gradient | ✗ | None |
| Neon accents on dark | ◐ | Terminal green is neon-bright, but the brief is intentional CLI-phosphor, not "I picked a cool accent" |
| Gray text on colored bg | ✗ | None |
| **Pure `#000` and pure `#fff`** | **✓** | Resolved in `colors.md` (warm parchment text + cool-shifted shadow black) |
| Gradient text on metrics | ✗ | Stats use solid green — good |

### Layout tells
| Tell | Status | Notes |
|------|:------:|-------|
| **Identical card grid: icon + heading + short text** | **✓** | Service cards, portfolio cards, activity cards all use this pattern. The fix isn't to abolish cards but to **vary the presentation across sections** so not every section is "another card grid" |
| Cards inside cards | ✗ | Flat — good |
| **Hero stats template (big number, small label)** | **✓** | The 4-stat hero IS the metric-dashboard template. Defensible because the stats are real and load-bearing — **but** the dominant element should be the headline, not the stats (see design-audit C2) |
| **Everything centred** | **✓** | Hero is fully centre-stacked. **Mitigation:** keep the hero centred (it's a portrait + statement format that works centred) but break the pattern in at least one other section — e.g. asymmetric "About me / portrait beside text" further down the page |
| Same spacing everywhere | ◐ | Resolved in `flow.md` and `fonts.md` proportional spacing |

### Detail tells
| Tell | Status | Notes |
|------|:------:|-------|
| **Glassmorphism decoratively** | **◐** | `css/glassmorphism.css` exists. Audit needed — is it serving depth/foreground-background hierarchy (Ch 6), or is it surface decoration? **Action:** keep glass effects only on the contact modal (where it has purpose: a foreground panel above the page), strip from any inline cards |
| Rounded rect with thick coloured border on one side | ✗ | None |
| Sparklines as decoration | ✗ | None |
| Drop shadows all identical | ◐ | Use `--shadow-deep` from `colors.md` and vary by elevation tier (4 px / 8 px / 16 px) so depth is informative, not uniform |
| Dark-by-default with glowing accents | ◐ | **Defensible** because dark is a CLI/terminal heritage choice, not "looks cool." But should be *named* as such — see Aesthetic-direction statement above |

### Motion tells
| Tell | Status | Notes |
|------|:------:|-------|
| Bounce/elastic easing | ◐ | Current easing tokens (`--ease-in`, `--ease-out`, `--ease-in-out`) are basic curves — not bounce, but boring. `flow.md` upgrades to expo curves |
| Everything fades in from below with same timing | ◐ | Currently no scroll-reveal (would be added in `flow.md`); the page-load orchestration uses staggered timing already |
| **Hover everywhere with no hierarchy** | **✓** | Pulsing CTAs, animated badges, animated mesh — resolved in `flow.md` |

### **AI-tells gate verdict:** **PASSES, with action items.**

The site has a **stated aesthetic direction** (Terminal Authority), uses a **non-default font** (mono — to be paired correctly via `fonts.md`), uses a **non-default palette** (terminal green has independent heritage), and has **distinctive elements** that no generic AI would produce (hexagon avatar, `$ ` prompt, ASCII menu, version-style badges). The fixes are **upgrades**, not rescue.

---

## Tells to strip

| # | Tell | Specific action |
|---|------|-----------------|
| B1 | **Saturn / planet icon** at the top of the hero | Replace with **a hexagon mark** (single `<svg>`, 32 px, terminal green outline, transparent fill, paired with the cocode.dk wordmark in mono). Remove the planet entirely — it has no traceable rationale. |
| B2 | **Monospace for body copy** | Implemented in `fonts.md` (IBM Plex Sans for body, Plex Mono for `$ ` prompts/code only). |
| B3 | **Identical card-grid sections** stacked one after another | At least one section must break the pattern. Suggestion: **"Om mig" / About me** becomes asymmetric — portrait left (the same hexagon avatar at larger size, anchored to the left edge), text block right with `$ whoami` styled heading and a longer narrative. The page now has three layout languages: hero centred, services card-grid, about asymmetric. |
| B4 | **Pure white text** | Implemented in `colors.md` (warm parchment `#f5ecd6`). |
| B5 | **Glassmorphism on inline cards** (if any) | Audit `css/glassmorphism.css` callers. Keep glass only on the contact modal. Inline cards become flat with `--border-default` outline + `--secondary-bg` fill. |
| B6 | **Animation noise** (orbiting badges, pulsing CTAs) | Implemented in `flow.md`. |
| B7 | **Open Graph card image** (unverified) | Audit `images/og-card-1200x630.png`. If it carries generic visuals (stock photo, generic gradient, "AI" iconography), regenerate using the hexagon system + cocode.dk wordmark + `$ AI Agents · GRC · Denmark` prompt-style tagline. Test render on linkedin.com/post-inspector and dev/post-cards. |

---

## Authored fingerprint — amplify these, they're already working

| # | Element | What it is | How to amplify |
|---|---------|-----------|----------------|
| F1 | **Hexagon avatar with green outline** | Babak's portrait clipped to a regular hexagon, 2 px terminal-green border, slight green glow. The single most memorable visual on the site. | Make hexagon the **system-wide brand mark.** Apply 6-sided shape to: badge containers (already used for FITS hexagon icon), section dividers (a row of 3 small ⬢ at section ends), favicon (already SVG — verify it's hexagon), service-card icons (background-shape behind each icon). Hex aspect ratio (2:√3 ≈ 1.155:1) becomes a layout proportion option alongside the 3:4 grid in `fonts.md`. |
| F2 | **`$ ` command-prompt prefix** on the cocode.dk headline | "`$ cocode.dk \| AI Agenter · Automatisering · Sikkerhed`" — instantly reads as a CLI, and as Babak's homepage all in one line. | Reuse for **section titles** further down the page: `$ ls /ydelser/`, `$ cat /om/babak.md`, `$ git log --oneline /projekter/`. Each section "command" reflects what's beneath it. Builds rhythm — the page becomes a CLI session. |
| F3 | **`# comment-styled` subtitle** "`# AI Agent Development · Workflow Automation · Cybersecurity · Denmark`" | The subtitle reads as a code comment under the prompt — extremely on-brand. | Reuse for **inline captions and metadata** site-wide: image captions (`# Babak — Copenhagen, 2025`), tooltip-like hints, the "v8.8.29" project badges (`# stable / production`). Use the secondary text color from `colors.md`. |
| F4 | **`──` ASCII tree-character menu** | Shown on the services screen as `── MCP-udvikling`, `── FITS.DK Platform`, etc. | Repeat the tree treatment in: **footer navigation** (currently plain), **section dividers** (a single `──` line as a hr replacement), **breadcrumbs** when service-detail pages are added per recommendation P3 of the web-presence audit. |
| F5 | **`v8.8.29` software-version-style badge** on FITS | Reads "this is real software, not a slide deck." Strong credibility signal. | Apply versioning convention to **portfolio entries** that map to actual repos (e.g. `codescan v0.4.2`, `mem0-mcp v1.0.0`, `claude-email v0.6.1`). Pull live from GitHub releases via the existing `githubAPI.bundle.js`. |
| F6 | **The 4 hero stats as named-fact telegrams** | Real numbers, not vanity stats. | Add a **tooltip-like microcopy** below each stat on hover/focus that adds one factual line: `25+` → `# active in software since 2000`, `Top 2%` → `# Cursor AI public ranking, March 2025`. Closes the "is this real?" question. |

---

## The one memorable thing

> **The hexagon.**
>
> If a visitor leaves cocode.dk and remembers exactly one visual element a week later, it's the green-outlined hexagon framing Babak's face. It is unambiguous, unusual for a developer portfolio, and connects every part of the brand: the FITS framework (hexagon = security framework iconography), the consultancy (Babak's face inside the hex), and the technical aesthetic (geometric, precise, slightly menacing in a "secure system" way).
>
> The hexagon is the **mnemonic.** Everything else (terminal green, `$ ` prompt, version badges) supports it.

Lock the hexagon as **the cocode.dk mark.** Use it in the favicon, the OG card, every section divider, badge backgrounds, the wordmark. When in doubt about a visual choice: *would this make the hexagon stronger or weaker?* If weaker, cut.

---

## Why these decisions are traceable to purpose (Ch 1)

| Decision | Purpose it serves |
|----------|------------------|
| Terminal/CLI aesthetic | Communicates "developer-led, ships code" — the central differentiator vs. advisory consultancies (Leave a Mark, Implement) who *advise* but don't *build* |
| Hexagon as mark | Visual link between Babak (avatar), FITS (Framework for IT Security — hexagonal grid logo), and the broader GRC theme (compliance frameworks are usually depicted as honeycomb/hex grids in the industry) |
| Green-as-heritage | CRT phosphor green has independent provenance (1970s–80s terminals); using it does NOT signal "AI defaults" — it signals "I have technical heritage memory." Different from cyan-on-dark which DOES signal AI defaults. |
| Warm amber accent | Adds *credibility* warmth (the GRC seriousness) to balance the terminal coolness; reserved for the H1 and primary CTAs only — discipline matters more than ubiquity |
| Mono only for terminal contexts | The aesthetic claim ("I am terminal-native") is undermined when mono leaks into body copy — at that point mono becomes decoration, not language |

If any future visual choice can't be traced back to one of those purposes, it's decoration. Cut it.

---

## Cross-reference

This document is the *meta layer* for `design-audit.md`, `fonts.md`, `colors.md`, and `flow.md`. The Aesthetic-direction statement at the top of this file is the **north star** they all answer to. When in doubt, return to **Terminal Authority + the hexagon mark** and the answer becomes clear.
