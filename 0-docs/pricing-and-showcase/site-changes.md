# Site Changes (minimal, incremental)

This plan reuses current building blocks: nodes → cards → modal. No new routes are required.

Option A — Quick win (recommended to start)
1) Add a Pricing node
- Create `js/data/nodes/15-pricing.js` with this starter:
  
  ```js
  export default {
    id: 'Pricing',
    x: 120, y: -60, r: 38,
    labels: {
      en: 'Pricing'
    },
    translations: {
      en: 'Small websites with transparent pricing. One‑pager from DKK 5,500 (€740). Starter (3–5 pages) from DKK 12,000 (€1,600). Includes performance, accessibility, deploy help, and contact form. Need custom? Let\'s talk.'
    },
    category: 'Pricing'
  };
  ```

- Update imports and arrays in `js/nodes.js`:
  - Add import near top:
    
    ```js
    import pricing from './data/nodes/15-pricing.js';
    ```

  - Add to `window.nodes` after `testimonials` or where you want it ordered:
    
    ```js
    window.nodes = [
      // ...existing,
      testimonials,
      pricing
    ];
    ```

  - Optionally add a link edge (keeps the graph consistent):
    
    ```js
    window.links = [
      // ...existing,
      ['cocode.dk', 'Pricing']
    ];
    ```

2) Add a Portfolio node (to showcase work now; grid section is optional)
- Create `js/data/nodes/16-portfolio.js`:
  
  ```js
  export default {
    id: 'Portfolio',
    x: 60, y: 80, r: 38,
    labels: { en: 'Portfolio' },
    translations: {
      en: 'Selected examples: concise case studies with results and stack. Ask for a walkthrough.'
    },
    category: 'Portfolio'
  };
  ```

- Import and register in `js/nodes.js`:
  
  ```js
  import portfolio from './data/nodes/16-portfolio.js';
  // ...
  window.nodes = [
    // ...existing,
    portfolio
  ];
  window.links = [
    // ...existing,
    ['cocode.dk', 'Portfolio']
  ];
  ```

3) Make the hero CTA copy price‑aware
- Update CTA text in `js/data/hero-translations.js:31` from “Get a Free Consultation” to “View Pricing” or “See Pricing”.

4) Wire the hero button to open Pricing (optional; keeps Contact as primary by default)
- Current HTML button is in `templates/template.html:144`:
  
  - Option A (keep Contact): keep `onclick="showContactModal()"` and let service cards/Portfolio/Testimonials drive discovery.
  - Option B (open Pricing): replace with `onclick="(function(){ const n = (window.nodes||[]).find(x => x.id==='Pricing'); if(n && window.showNodeDescriptionModal){ window.showNodeDescriptionModal(n);} else { showContactModal(); } })()"`

Option B — Add a simple Portfolio grid section
1) Add a section container (place before Activity Feed)
- Insert after `templates/template.html:151`:
  
  ```html
  <section class="portfolio-section">
    <h2 class="portfolio-title">Recent Work</h2>
    <div class="cards-grid" id="portfolio-cards-container"></div>
  </section>
  ```

2) Add minimal styles
- Create `css/portfolio-cards.css` (can reuse service card styles). Then include the stylesheet by adding the line below next to other CSS includes in `templates/template.html:95`:
  
  ```html
  <link rel="stylesheet" href="css/portfolio-cards.css?v=1.0.0">
  ```

3) Render portfolio items
- Add `js/components/portfolio-card.js` (clone of `js/components/service-card.js` with different container id `portfolio-cards-container`).
- Add `js/data/portfolio/01-rahimi-tires.js` style files (see template in portfolio-showcase.md) and an index loader `js/data/portfolio/index.js` that exports an array.
- On `DOMContentLoaded` in `js/main.js:84`, render:
  
  ```js
  if (window.renderPortfolio && window.portfolioItems) {
    window.renderPortfolio(window.portfolioItems);
  }
  ```

Notes
- Translation: start EN only; add DA/ES later following the same object shape used by other nodes.
- Icons: service cards reuse `images/hexagon-icon.svg`, so no extra assets needed.
- Rollback friendly: All changes are additive and scoped to nodes + one optional section.
