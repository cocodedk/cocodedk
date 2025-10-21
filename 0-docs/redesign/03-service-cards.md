# Service Cards Component

## Overview
Floating glassmorphic cards displaying cocode.dk services. Replace Cytoscape graph visualization.

## Card Structure
```html
<div class="service-card" data-id="Software">
  <div class="service-card__icon">🚀</div>
  <h3 class="service-card__title">Software</h3>
  <p class="service-card__description">Full-stack solutions...</p>
  <div class="service-card__tags">
    <span class="service-card__tag">Django</span>
    <span class="service-card__tag">Python</span>
  </div>
</div>
```

## Cards to Display
1. Software (🚀)
2. Cybersecurity (🔐)
3. Clients (💼)
4. Contact (📧)
5. Python (🐍)
6. Django (⚙️)
7. Neo4j (🔗)
8. AI Integrations (🤖)
9. AI Wrappers (📦)
10. Compliance (✅)
11. Audit (📋)
12. Vibe Coding (✨)
13. Website Builder (🌐)
14. GitHub (💻)
15. Flask (🍶)
16. TypeScript (📘)
17. LinkedIn (🔗)

## Styling
- **Glass Background**: `rgba(255, 255, 255, 0.08)` with `backdrop-filter: blur(8px)`
- **Border**: 1px solid with warm accent color (terracotta)
- **Glow**: `box-shadow: 0 0 20px rgba(232, 115, 94, 0.2)` (warm coral)
- **Border Radius**: `16px`
- **Padding**: `24px`
- **Size**: Responsive, minimum 150px

## Interactions
- **Hover**: Scale 1.05, glow intensifies, slight lift (transform: translateY)
- **Click**: Open modal with full description
- **Active**: Scale 1.1, glow brightest

## Grid Layout
- Desktop (1200px+): 4 columns
- Tablet (768px-1199px): 3 columns
- Mobile (≤767px): 1-2 columns
- Gap: 24px

## Responsive Behavior
- Smaller padding on mobile (16px)
- Larger icons on desktop
- Stack vertically on very small screens
