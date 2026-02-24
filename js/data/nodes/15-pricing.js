export default {
  id: 'Pricing',
  x: 120, y: -60, r: 38,
  labels: {
    da: 'Ydelser',
    en: 'Services'
  },
  translations: {
    da: `AI Agent-udvikling fra 25.000 DKK + moms. Strategir\u00e5dgivning fra 8.000 DKK + moms. Cybersikkerhedsaudit fra 15.000 DKK + moms. Compliance-vurdering er altid inkluderet. Noget s\u00e6rligt I har brug for? Lad os snakke.

      <div class="campaign-actions" style="margin-top:12px;">
        <button class="campaign-btn" onclick="window.showContactModal && window.showContactModal()">Kontakt</button>
        <button class="campaign-btn secondary" onclick="(function(){ const el=document.getElementById('portfolio-title'); if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}); } })()">Se projekter</button>
      </div>
    `,
    en: `AI agent development from 25,000 DKK + VAT. Strategy consulting from 8,000 DKK + VAT. Cybersecurity audit from 15,000 DKK + VAT. Compliance assessment is always included. Need something specific? Let's talk.

      <div class="campaign-actions" style="margin-top:12px;">
        <button class="campaign-btn" onclick="window.showContactModal && window.showContactModal()">Contact</button>
        <button class="campaign-btn secondary" onclick="(function(){ const el=document.getElementById('portfolio-title'); if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}); } })()">View projects</button>
      </div>
    `
  },
  category: 'Pricing'
};
