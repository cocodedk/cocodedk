# Implementation Checklist

Day 1 — Quick win (Node‑only)
- [ ] Add `js/data/nodes/15-pricing.js`
- [ ] Add `js/data/nodes/16-portfolio.js`
- [ ] Import both in `js/nodes.js` and register in `window.nodes` and `window.links`
- [ ] Update CTA copy in `js/data/hero-translations.js:31` (optional)
- [ ] Consider wiring hero button to open Pricing (site-changes.md)
- [ ] Rebuild/start and verify cards, modals, and translations render

Day 2 — Optional Portfolio grid section
- [ ] Add portfolio section container to `templates/template.html` (before Activity Feed)
- [ ] Add `css/portfolio-cards.css` and include link in `<head>`
- [ ] Add `js/components/portfolio-card.js` + `js/data/portfolio/index.js`
- [ ] Render on DOMContentLoaded in `js/main.js`

Campaign overlay (one‑pager offer)
- [ ] Add `css/campaign.css` and `images/campaign-999.svg`
- [ ] Add `js/data/campaign-translations.js`
- [ ] Add `js/components/campaign-overlay.js` and wire hero secondary CTA to `CampaignOverlay.show()`
- [ ] Ensure auto‑show once per user via localStorage

Content
- [ ] Fill pricing copy from `landing-page-copy.md`
- [ ] Write 3 short case studies using `portfolio-showcase.md`
- [ ] If needed, create visuals from `image-prompts.md`

Announce
- [ ] Website banner (optional)
- [ ] Post on LinkedIn using `announcement-plan.md`
- [ ] Share with warm contacts

Measure
- [ ] Add simple click counters (see `metrics-and-experiments.md`)
- [ ] Review results after 2 weeks and iterate
