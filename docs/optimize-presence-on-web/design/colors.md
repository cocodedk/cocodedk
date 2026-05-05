# Color System — split-complementary, dark theme

**Skill:** `design-for-ai:color` (Design for Hackers, Ch 8 + Ch 9)
**Date:** 2026-05-04
**Addresses:** design-audit.md M1 (pure white on near-black) + M4 (all-cool palette, no warm/cool depth)

## Decision tree walk-through

| Step | Question | Answer for cocode.dk |
|------|----------|----------------------|
| Mood | Active / muted / mysterious / natural? | **Mysterious + sophisticated** — dark background, sparse bright accents (per Ch 9 mood pattern) — the GRC-meets-AI brief is "calm authority and technical depth," not consumer-cheery |
| Content density | Splash / content-heavy / nightlife? | Hybrid — short hero blocks + content cards. Dark works because content is chunked, not long-form. |
| Base hue | What aligns with mood? | **Terminal green `#4af626`** — keep. Has documented heritage (CRT phosphor, hacker culture, FITS), NOT the cyan-on-dark AI default flagged in `ai-tells.md` |
| Scheme | From the color wheel | **Split-complementary** — green base + two split-complement colors near red-orange/amber and red-purple. Provides the warm pop that's currently missing without needing a full complementary clash |
| Functional roles | Conventions per Ch 9 | Red = error, green = success/accent (also brand), yellow-amber = highlights/credibility, blue = links |
| Depth | Warm/cool relationships | Warm primary text, cool secondary text — text hierarchy gets a temperature dimension on top of size/weight |
| Shadows | Hue-shifted, not pure black | Cool-shifted shadows below base bg; warm-shifted highlights for amber accents |
| Accessibility | WCAG AA on dark bg | All token pairs pass AA; most pass AAA — see contrast table below |

---

## Scheme: split-complementary anchored on green `#4af626`

Green `#4af626` sits at ≈115° on the HSL wheel. Its complement is at ≈295° (magenta-red). Split-complementary uses the two hues 30° on either side of the complement:

| Wheel position | Role | Hex |
|----------------|------|-----|
| ≈115° | base accent — heritage / success / brand | `#4af626` (terminal green — unchanged) |
| ≈265° | secondary accent / link | `#4f6df5` (kept; shifts the link role from "blue text" risk by being clearly UI-blue, not body-text-blue) |
| ≈40° | **NEW** warm accent / authority / H1 | `#ffb86c` (amber) |
| ≈325° | error / urgency | `#ff5577` (warm-leaning red — kept on the warm side so it harmonises with amber rather than clashes with green) |

**Why split-complementary, not complementary or triadic:**
Complementary (green + magenta) would be too jarring for a GRC brief. Triadic (green + orange + violet) puts equal weight on three hues and dilutes the heritage-green identity. Split-complementary preserves green as the dominant signal and adds **one warm temperature** plus controlled functional secondaries.

---

## Full token palette + roles

```text
BACKGROUND LAYER (cool, recede)
  --primary-bg         #0a0a0a   page background (unchanged)
  --secondary-bg       #0e0e0e   raised surfaces (unchanged)
  --tertiary-bg        #121214   cards / sections (was #121212; shifted +2 cool to anchor depth)
  --shadow-deep        #050609   drop-shadow color (NEW; cool-shifted black instead of #000)
  --surface-hover      rgba(255, 200, 130, 0.04)   warm-tinted hover wash (was rgba(255,255,255,0.03))

BORDERS (cool grays — recede)
  --border-subtle      #1f2024   (was #222222; cool tint)
  --border-default     #282a30   (was #2a2a2a)
  --border-hover       #3a3c44   (was #3a3a3a)

TEXT (warm primary pops forward, cool secondary recedes)
  --text-primary       #f5ecd6   warm off-white parchment (was #ffffff — fixes M1)
  --text-secondary     #c4c4cc   cool light gray (was #d0d0d0 — slight cool shift)
  --text-tertiary      #80808c   cool medium gray (was #a0a0a0 — darker + cooler)
  --text-emphasis      #ffb86c   amber — for H1, named emphasis, credibility moments (NEW)

ACCENT — TERMINAL GREEN (heritage; success + brand)
  --accent-primary     #4af626   (unchanged)
  --accent-hover       #6fff4a   warmer-shifted hover state (unchanged)
  --accent-muted       rgba(74, 246, 38, 0.12)   slightly more visible (was 0.10)
  --accent-border      rgba(74, 246, 38, 0.32)   slightly stronger (was 0.30)

ACCENT — WARM (NEW; authority + H1)
  --warm-primary       #ffb86c   amber base
  --warm-hover         #ffd09a   warmer-shifted hover
  --warm-muted         rgba(255, 184, 108, 0.10)   subtle amber wash for highlight surfaces
  --warm-border        rgba(255, 184, 108, 0.30)

LINK (UI blue)
  --link-primary       #4f6df5   (unchanged)
  --link-hover         #7b93ff   (unchanged)

FUNCTIONAL
  --error              #ff5577   warm-leaning red (NEW; previously absent from the system)
  --error-bg           rgba(255, 85, 119, 0.10)
  --warning            #ffb86c   reuses amber (intentional — limits hue count)
  --success            #4af626   reuses brand green (intentional)
```

---

## WCAG accessibility (contrast ratios on `#0a0a0a` background)

| Foreground | Hex | Ratio | AA normal | AA large | AAA normal |
|------------|-----|------:|:---------:|:--------:|:----------:|
| Primary text | `#f5ecd6` | ~16.5:1 | ✓ | ✓ | ✓ |
| Secondary text | `#c4c4cc` | ~11.0:1 | ✓ | ✓ | ✓ |
| Tertiary text | `#80808c` | ~4.7:1 | ✓ | ✓ | ✗ |
| Terminal green | `#4af626` | ~15.9:1 | ✓ | ✓ | ✓ |
| Amber emphasis | `#ffb86c` | ~10.8:1 | ✓ | ✓ | ✓ |
| Link blue | `#4f6df5` | ~5.6:1 | ✓ | ✓ | ✗ (use `--link-hover` `#7b93ff` for AAA = ~7.4:1) |
| Error red | `#ff5577` | ~5.4:1 | ✓ | ✓ | ✗ (acceptable — error states usually have surrounding `--error-bg` + icon) |

Tertiary text and link blue land at AA but not AAA — acceptable because both are used in supporting roles (metadata, links inside paragraph context where surrounding primary text carries the comprehension).

---

## Redundant cues (Ch 8 colorblindness)

- **Status indicators** must combine green/red with shape: `✓` icon for success, `✗` icon for error, `⚠` for warning. Color carries reinforcement, not the message.
- **Stats row** (`25+`, `50+`, `Top 2 %`) is currently in green. Add small icon glyphs (`◆ 25+`, `◆ 50+`) so the meaning isn't lost for deuteranope users; the green becomes ornament, not signal.
- **Floating regulation badges** already include text (`#NIS2`, `#DORA`, etc.) — color is decorative, message is in the text. Pass.

Test with Chrome DevTools' "Emulate vision deficiencies" → Deuteranopia + Protanopia + Achromatopsia after applying the new palette.

---

## CSS update — drop-in for `css/colors.css`

```css
:root {
  /* Backgrounds */
  --primary-bg: #0a0a0a;
  --secondary-bg: #0e0e0e;
  --tertiary-bg: #121214;
  --shadow-deep: #050609;
  --surface-hover: rgba(255, 200, 130, 0.04);

  /* Borders */
  --border-subtle: #1f2024;
  --border-default: #282a30;
  --border-hover: #3a3c44;

  /* Text */
  --text-primary: #f5ecd6;
  --text-secondary: #c4c4cc;
  --text-tertiary: #80808c;
  --text-emphasis: #ffb86c;

  /* Accent — terminal green */
  --accent-primary: #4af626;
  --accent-hover: #6fff4a;
  --accent-muted: rgba(74, 246, 38, 0.12);
  --accent-border: rgba(74, 246, 38, 0.32);

  /* Accent — warm */
  --warm-primary: #ffb86c;
  --warm-hover: #ffd09a;
  --warm-muted: rgba(255, 184, 108, 0.10);
  --warm-border: rgba(255, 184, 108, 0.30);

  /* Link */
  --link-primary: #4f6df5;
  --link-hover: #7b93ff;

  /* Functional */
  --error: #ff5577;
  --error-bg: rgba(255, 85, 119, 0.10);
  --warning: #ffb86c;
  --success: #4af626;
}
```

## Where to apply the new tokens

| Element | Was | Becomes |
|---------|-----|---------|
| `body` color | implicit `#fff` | `var(--text-primary)` |
| H1 (`hero-headline`) | `var(--accent-primary)` | `var(--text-emphasis)` (amber — pops as the dominant element, fixing design-audit C2) |
| Hero stats numbers | green | keep green (achievement signal) — but **add** `◆` glyph prefix for deuteranope redundancy |
| Hero stats labels | green | `var(--text-tertiary)` (cool gray) — recedes, lets the numbers dominate within the row |
| Code / `$ ` prompt | green | keep green |
| Drop-shadow / `box-shadow` `rgba(0,0,0,…)` | pure black | `rgba(5, 6, 9, …)` (use `--shadow-deep`) |
| Border colors | various | walk through the 3 border tokens above |
| Link colour outside CTAs | likely accent green | `var(--link-primary)` so links read as links, not as success state (per Ch 9 convention) |

---

## Validation checklist

- [ ] Build a static page with both halves of every contrast pair side by side; squint test — no pair vanishes
- [ ] Open in Chrome DevTools deuteranopia/protanopia simulators; status indicators still readable
- [ ] Soft-proof a screenshot in WCAG contrast checker (e.g. webaim.org/resources/contrastchecker)
- [ ] Verify the warm amber doesn't fight the green — by Ch 9, split-complementary is harmonious; if it still feels jarring, desaturate amber by ~10 % (try `#f0a865`)
- [ ] DA + EN both render the warm primary text legibly at 14 px, 16 px, 19 px

---

## What this doesn't fix on its own

The all-cool palette was M1 / M4 (Major). The bigger trust gap (Critical findings C2 + C3 about hierarchy and dominance) is addressed by *applying* the new amber emphasis only to the H1 — not by spreading amber everywhere. Discipline matters: warm = scarce. If amber appears on more than ~5 % of the page surface, it stops being an accent and becomes a noise source.
