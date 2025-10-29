# Portfolio: what to show and how

Start with 3 small, clear examples. Each should fit in a short card and expand to a concise modal/case study.

Card fields (suggested)
- title: Project/brand name
- summary: 1–2 lines on outcome
- stack: e.g., Django + Tailwind, Static + Netlify
- link: live URL (if public)
- image: optional thumbnail

Modal/case study outline
- Context: 1–2 lines (who it’s for, problem)
- Solution: what was built (pages/components, integrations)
- Result: speed to launch, stats if available (load time, conversion, etc.)
- Stack: tech used
- CTA: “Want something similar? Get a free consultation.”

Data structure template (if you add a grid section)
```js
// js/data/portfolio/01-rahimi-tires.js
export default {
  id: 'rahimi-tires',
  title: 'Rahimi Tires — ecommerce site',
  summary: 'Modern, fast, mobile‑responsive shop with real‑time inventory. Launched in 6 weeks.',
  stack: ['Django', 'React', 'Postgres'],
  link: 'https://rahimi-tires.com',
  image: 'images/portfolio/rahimi-tires-thumb.jpg',
  details: `Built product catalog, cart, checkout, and admin. Lighthouse 95+.`,
};
```

Rendering
- Node‑only path: put a compact case study inside the Portfolio node translation.
- Grid path: create `js/data/portfolio/index.js` that imports and exports an array, then render cards into `#portfolio-cards-container`.

Quality bar
- 1 screenshot or before/after
- Keep text human and specific (numbers help)
- Link to live result or GitHub when possible

