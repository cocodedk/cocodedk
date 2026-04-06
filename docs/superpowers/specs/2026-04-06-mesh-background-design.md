# Design: Mesh Background Parallax

**Date:** 2026-04-06
**Scope:** cocode.dk (main site) + cocodedk.github.io/cv-generator/ (GitHub Pages)

---

## Summary

Replace the current flat `#0a0a0a` background on both sites with a living, animated agent-network mesh. Nodes float and drift organically; 3 depth layers respond to both scroll position and mouse cursor, creating a full parallax effect. Hub nodes carry brand-domain labels. Implemented as a single vanilla JS canvas engine (~150 lines) with a config object — the same code runs on both sites with different color/label configs.

---

## Visual Design

### cocode.dk

| Property | Value |
|---|---|
| Base background | `#0a0a0a` (unchanged CSS) |
| Atmospheric glow | None — pure black |
| Mesh node color | `#4af626` (terminal green, existing accent) |
| Node opacity range | 35–65%, ~40% average |
| Hub node labels | `MCP` · `AGENT` · `GDPR` · `NIS2` · `DORA` · `WORKFLOW` |
| Small node count | ~18 total across 3 layers |
| Hub node count | 6 (one label each, distributed across layers) |

### cocodedk.github.io/cv-generator/

| Property | Value |
|---|---|
| Base background | `#05050f` (dark navy) |
| Atmospheric glow | Radial gradient `rgba(20, 50, 200, 0.18)` centred at 50% 40% |
| Mesh node color | `#4af626` (same green — pops on navy) |
| Node opacity range | 35–65% (same) |
| Hub node labels | `CV` · `SKILLS` · `EXPERIENCE` · `PROJECTS` · `CONTACT` |

---

## Parallax Behaviour

Three depth layers, each with independent scroll and mouse offsets:

| Layer | Scroll speed | Mouse offset | Node size | Opacity |
|---|---|---|---|---|
| Far (background) | 0.25× scrollY | ±4 px | 1.8 px radius | 28% |
| Mid | 0.50× scrollY | ±10 px | 2.8 px radius | 42% |
| Near (foreground) | 0.80× scrollY | ±18 px | 4.0 px radius | 62% |

- Mouse offset is lerped (factor 0.06/frame) for smooth follow.
- Scroll offset is applied as a Y-translation to each layer's draw origin.
- On touch devices (`matchMedia('(hover: none)')`) the mouse handler is skipped; layers render with drift animation only.

### Organic Drift

Every node has a random velocity vector (`vx`, `vy`, max ±0.15 px/frame). Nodes wrap at canvas edges (±20 px bleed). This gives the mesh a slow breathing quality independent of user interaction.

### Edge Rendering

Lines are drawn between nodes within proximity thresholds: 130 px (far), 110 px (mid), 90 px (near). Line opacity fades linearly with distance. Hub nodes carry a soft glow halo (radial fill, ~7% opacity) to distinguish them.

---

## Implementation — cocode.dk

### Files

| File | Action | Notes |
|---|---|---|
| `js/components/mesh-background.js` | **CREATE** | Canvas engine, ~150 lines, ≤200 line limit |
| `templates/template.html` | **EDIT** | Add `<canvas id="mesh-bg"></canvas>` as first child of `<body>` |
| `css/backgrounds.css` | **EDIT** | Add `#mesh-bg` rule: `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; pointer-events: none;` |
| `webpack.config.js` | **EDIT** | Add `mesh-background` bundle entry so Webpack injects the script |

### Canvas Engine Structure

```
MeshBackground (window.MeshBackground)
├── init(config)          — creates canvas, seeds nodes, starts RAF loop
├── config object         — bg, glow, labels, nodeCount, opacityRange, parallaxStrengths
├── _seedNodes()          — distribute nodes across 3 layers with random velocity
├── _draw()               — RAF loop: clear → glow → edges → nodes → labels
├── _onScroll()           — translate layer origins by scrollY × speed
├── _onMouse()            — lerp mouse target into layer offsets
└── _onResize()           — ResizeObserver callback: resize canvas, re-seed
```

### Config Object (cocode.dk)

```js
{
  bg: '#0a0a0a',
  glow: null,
  nodeColor: '#4af626',
  labels: ['MCP', 'AGENT', 'GDPR', 'NIS2', 'DORA', 'WORKFLOW'],
  layers: [
    { count: 8, speed: 0.25, mouseStrength: 4,  size: 1.8, opacity: 0.28 },
    { count: 6, speed: 0.50, mouseStrength: 10, size: 2.8, opacity: 0.42 },
    { count: 4, speed: 0.80, mouseStrength: 18, size: 4.0, opacity: 0.62 },
  ]
}
```

---

## Implementation — cocodedk.github.io/cv-generator/

Same canvas engine file, copied into the cv-generator repo as `js/mesh-background.js` (or equivalent path for that project's build system). Different config:

```js
{
  bg: '#05050f',
  glow: 'rgba(20, 50, 200, 0.18)',
  nodeColor: '#4af626',
  labels: ['CV', 'SKILLS', 'EXPERIENCE', 'PROJECTS', 'CONTACT'],
  layers: [
    { count: 8, speed: 0.25, mouseStrength: 4,  size: 1.8, opacity: 0.28 },
    { count: 6, speed: 0.50, mouseStrength: 10, size: 2.8, opacity: 0.42 },
    { count: 4, speed: 0.80, mouseStrength: 18, size: 4.0, opacity: 0.62 },
  ]
}
```

Canvas element and CSS positioning are identical. The `background-color` on `body` changes to `#05050f` in that repo's stylesheet.

---

## Constraints

- `js/components/mesh-background.js` must stay ≤ 200 lines (enforced by pre-commit hook).
- No external dependencies — vanilla JS only.
- `window.MeshBackground` exposed for consistency with existing component pattern.
- Canvas is `pointer-events: none` and `z-index: -1` — never intercepts clicks.
- One feature per commit: mesh-background lands as a single commit on cocode.dk; GitHub.io gets its own separate commit in its own repo.
- New code goes in `js/components/` (existing JS pattern, not TypeScript since this is a standalone canvas component with no types to export).

---

## Out of Scope

- Theming or dark/light mode toggle (site is permanently dark).
- WebGL / Three.js — unnecessary for this effect, adds dependency weight.
- CSS-only parallax — insufficient for organic drift and mouse tracking.
- Any changes to hero copy, layout, or other sections.
