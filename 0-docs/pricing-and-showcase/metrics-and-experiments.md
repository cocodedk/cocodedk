# Metrics + Experiments

Primary KPIs
- Pricing intent: clicks on Pricing card/CTA
- Leads: contact form opens/submissions
- Conversion: leads from visitors in a 14‑day window

What to track immediately (no new tools)
- Add simple click counters (console or lightweight logging):

```js
// Example: in js/main.js after DOMContentLoaded
const cta = document.getElementById('cta-button');
if (cta) {
  cta.addEventListener('click', () => console.log('[metric] cta_click'));
}
document.addEventListener('click', (e) => {
  const el = e.target.closest('.service-card__title');
  if (el && /pricing/i.test(el.textContent)) {
    console.log('[metric] pricing_card_click');
  }
});
```

Low‑effort experiments
- A/B CTA copy in hero: “Get a Free Consultation” vs “View Pricing”
- Position of Pricing card: top row vs middle
- Add one case study thumbnail vs text‑only

Decision guardrails
- Keep pricing visible but contact primary
- If Pricing clicks are high but leads are flat → revisit copy or offer

