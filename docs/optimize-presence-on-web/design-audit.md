# Design Audit — cocode.dk (Design for Hackers / CHECKER mode)

**Audit date:** 2026-05-04
**Method:** Design for Hackers checker (Kadavy, plus AI-tells reference)
**Inputs:** rendered HTML (`https://cocode.dk`), `css/colors.css`, mobile viewport screenshots (375 px)

## Stated aesthetic direction

**Terminal / CLI / hacker** — defensible and specific (per AI-tells "brutalist / warm-industrial / luxury / playful"-style direction list). Heritage: CRT phosphor green, hacker culture, FITS = Framework for IT Security. This is a deliberate creative stance, **not** "clean and modern" generic-default territory.

**Existing strengths the audit should preserve:** hexagon avatar with green outline, `$ ` command-prompt prefix on the headline, `# AI Agent Development...` comment-styled subtitle, ASCII tree-character (`──`) navigation, `v8.8.29` changelog-style badges. These are *visual fingerprint* — keep them.

---

## Findings — by severity

### CRITICAL — blocks credibility / readability

| # | Finding | Principle violated | Fix |
|---|---------|--------------------|-----|
| C1 | **Monospace used for body copy** (Courier New / Fira Code applied to paragraphs, hero stats labels, descriptions) | *Appendix*: monospace creates uneven texture; reserve for code only. *Ch 3*: typeface must match medium AND content type. | Pair: keep mono for `$` prompts, command lines, `v8.8.29` badges, ASCII menu, code blocks. Add a complementary **humanist sans** for body copy. Recommended pairings (NOT Inter/Roboto/Open Sans): **JetBrains Mono + IBM Plex Sans**, **Berkeley Mono + Söhne**, or **IBM Plex Mono + IBM Plex Sans** (same designer; sane fallback). |
| C2 | **Inverted hierarchy in hero** — the green stats row (25+, 50+, Top 2%, 3000+) and the `$ cocode.dk \| AI Agenter • Automatisering • Sikkerhed` command-prompt line both visually outweigh the actual `<h1>` ("Jeg Bygger AI-Agenter Der Rent Faktisk Virker"). The eye lands on the stats first, then has to hunt for the message. | *Ch 7*: clear visual distinction between primary and secondary content. *Ch 6*: one dominant element. | Decide which line is the headline. Two clean options: (a) treat the command-prompt line as H1 (deletes the second headline entirely; the prompt becomes the dominant message); (b) shrink the prompt and stats by ~25–30 %, promote `Jeg Bygger AI-Agenter…` to dominant size + warm/light color. **Don't keep both at near-equal weight.** |
| C3 | **No single dominant element** — hexagon profile, mesh canvas background, six floating regulation badges (#NIS2, #DORA, #MCP, #GDPR, #WORKFLOW, #AGENT) with independent animations, three floating contact buttons, command-prompt headline, large stats row. The eye has 5+ candidate focal points and ricochets. | *Ch 6 Critical*: dominant element exists; directional flow is present. | Cut one decorative layer. Cleanest cut: remove the floating regulation badges from the hero and consolidate them into a single static **compliance taxonomy strip** below the stats (`NIS2 · DORA · GDPR · EU AI Act · ISO 42001`). Mesh background can stay (cheap depth signal), or quiet it by ~40 % opacity so the avatar stays dominant. |

### MAJOR — visible quality cost

| # | Finding | Principle violated | Fix |
|---|---------|--------------------|-----|
| M1 | **Pure white (`#ffffff`) on near-black (`#0a0a0a`) for all text** | *Ch 9*: shadows/highlights should be hue-shifted, not pure black/white. *Ch 9*: warm/cool color relationships create depth and hierarchy. | Soften the primary text to a warm off-white (`#f5f0e6` or `#efe7d6` — phosphor-warm cream) for paragraphs and headings. Keep `#ffffff` only for the very-most-emphatic single elements (e.g. the H1 itself). Cool grays (`#a0a0aa`, `#80808c`) for secondary metadata. The current `--text-tertiary: #a0a0a0` is already cool-leaning — move primary the other way. |
| M2 | **Three competing CTAs stacked on the right edge** (WhatsApp green circle, email blue circle, phone green circle, all same size, all floating) | *Ch 6*: contrast must support hierarchy. *Ch 9*: accent color matches dominant scheme — visitors can't tell which is the primary action. | Pick **one** primary CTA (likely the phone, given DK B2B sales norms). Make it ~30 % larger and the only floating element. Demote the other two to a static contact strip in the footer or a single "Kontakt" speed-dial that expands to all three on click. |
| M3 | **Uniform spacing between unrelated groups** (hero stats → headline → paragraph → CTA buttons all use roughly the same vertical rhythm) | *Ch 7*: most powerful hierarchy signal is white space; tight within groups, generous between. | Tighten gaps inside the stats row (currently spacious) and the CTA pair; widen gaps between hero blocks (avatar group → command-prompt line → stats → headline → paragraph → CTAs). Use a single proportional ratio (e.g. 3:4 base of 8 px → 12, 16, 24, 32, 48, 64). |
| M4 | **All-cool palette** — terminal green + electric blue + pure white + black greys. No warm tones anywhere. | *Ch 9*: warm pops, cool recedes. Without warmth there is no foreground/background depth from color alone. | Add **one warm accent** for primary text-emphasis or hero highlights. Suggestions consistent with the terminal aesthetic: **amber `#ffb86c`** (Solarized warmth, reads as old-CRT mid-glow), or **muted gold `#d4a949`**. Use it for the H1 itself, important inline emphasis, and hover states on the most important link — sparingly. The green stays for "active/success/heritage", the new warm becomes the credibility/authority colour. |
| M5 | **"Saturn / planet" decorative icon at the top of the hero** is disconnected from the rest of the visual language (which is hexagon + terminal + ASCII). | *Ch 6*: similarity — recurring shapes create cohesion. *Ch 1*: every element should serve the purpose. | Replace with a hexagon mark, an ASCII art monogram, or remove entirely. The hexagon avatar is already doing the icon job. |
| M6 | **Decorative animation everywhere** — mesh background animates, floating badges animate, hero terminal text types itself, CTAs pulse. AI-tells: *"hover effects on everything with no hierarchy of importance."* | *Ch 6*: rhythm needs intentional pacing; uniform animation = noise. | Pick ONE animation that earns its place (recommend: the terminal-typing hero text — it directly enacts the aesthetic). Reduce mesh background to a static gradient or to a much slower drift. Kill badge orbit. The page should feel calm; movement reserved for moments of reveal. |

### MINOR — missed opportunities

| # | Finding | Fix |
|---|---------|-----|
| m1 | `--font-mono: 'Courier New', 'Fira Code', monospace;` — the fallback chain has Courier New *first*. Courier New is the lowest-fidelity terminal font available. | Reverse the stack: `'JetBrains Mono', 'Berkeley Mono', 'IBM Plex Mono', 'Fira Code', 'Courier New', monospace;` — and self-host the chosen primary. |
| m2 | The four hero stats use slightly different label lengths and the "Top 2% Developer (Cursor AI)" cell wraps differently from the others, making the row visually irregular. | Either trim the parenthetical (`Top 2 %  ·  CURSOR AI`) so all four labels fit a single line, or commit to a 2×2 grid on narrow viewports with even cells. |
| m3 | The `——` ASCII tree menu is excellent on the services screen but isn't echoed elsewhere (footer, portfolio nav still use ordinary list styling). | Repeat the ASCII-tree treatment in at least one more place (footer or section dividers) to reinforce the aesthetic. |
| m4 | Mobile screenshots show portrait of Babak in a hexagon, but the Open Graph card image (referenced in HTML) was not visually inspected — if the OG image looks generic, every social share is a missed branding moment. | Verify `images/og-card-1200x630.png` carries the same terminal-green / hexagon language. |

---

## Aesthetic-direction integrity (AI-tells gate)

| Gate | Pass / Fail |
|------|:-----------:|
| Stated aesthetic direction in 2–3 words | ✓ "Terminal / CLI / hacker" |
| Primary font NOT Inter / Roboto / Open Sans / Arial | ✓ (Courier New — but see C1) |
| Color palette NOT cyan-on-dark or purple-to-blue gradient | ✓ (terminal green has independent heritage) |
| Layout includes intentional asymmetry / non-card variety | ◐ partial (hero is asymmetric; portfolio + service sections fall into card grids) |
| If shown to someone with "AI made this", they would NOT immediately believe it | ✓ — hexagon, `$ ` prompt, ASCII menu, FITS-as-software-version, `v8.8.29` are all visual fingerprint |

**Verdict:** the design is **authored, not AI slop**. The fixes above are *upgrades to a deliberate design*, not rescue from a generic one.

---

## Recommended follow-up commands

| Issue area | Command | Why |
|------------|---------|-----|
| Body-copy font + mono pairing (C1, m1) | **`/fonts`** | Pick a humanist sans + mono pair (theory-backed) and configure the stack |
| Warm accent + reduced pure-white-on-black (M1, M4) | **`/color`** | Build a warm/cool palette layer on top of the existing terminal-green base |
| Animation pacing + CTA hierarchy (M2, M6) | **`/flow`** | Decide where motion goes, what hover does, which CTA is dominant |
| Sharpening the visual fingerprint (the saturn icon, OG card) (M5, m4) | **`/brand`** | Strip the inherited / generic decorations and amplify the authored elements |
| Final pass after the above | **`/hone`** | Quality pass against every Design-for-Hackers principle |

---

## Cross-reference to the web-presence audit

This design audit complements `comparison.md`. Two findings overlap:

- C2 / C3 (hierarchy + dominance) reinforce **comparison P3** (split into per-regulation pages) — sub-pages give each piece of content room to be the dominant element of its own page.
- M2 (CTA hierarchy) supports **comparison P2** (named-client logo bar) — a credibility row in the hero is a more useful trust signal than three competing floating contact buttons.

The design fixes are **additive**: presence-audit changes the *what* (content surface, trust signals, recommendations), design-audit changes *how* the existing surface reads. Sequence: do C1, C2, C3 first (~1 day of work), then loop in `/fonts` and `/color` for the system-level rebuild.
