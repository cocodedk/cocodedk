export default {
  id: 'Pricing',
  x: 120, y: -60, r: 38,
  labels: {
    da: 'Ydelser',
    en: 'Services'
  },
  translations: {
    da: `AI Agent-udvikling fra 25.000 DKK + moms. AI Strategir\u00e5dgivning fra 8.000 DKK + moms. Cybersikkerhedsaudit fra 15.000 DKK + moms. Alle projekter inkluderer compliance-vurdering. Har du s\u00e6rlige behov? Lad os tale.

      <div class="campaign-actions" style="margin-top:12px;">
        <button class="campaign-btn" onclick="window.showContactModal && window.showContactModal()">Kontakt</button>
        <button class="campaign-btn secondary" onclick="(function(){ const el=document.getElementById('portfolio-title'); if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}); } })()">Se projekter</button>
      </div>
    `,
    en: `AI Agent Development from 25,000 DKK + VAT. AI Strategy Consulting from 8,000 DKK + VAT. Cybersecurity Audit from 15,000 DKK + VAT. All projects include compliance assessment. Need something custom? Let's talk.

      <div class="campaign-actions" style="margin-top:12px;">
        <button class="campaign-btn" onclick="window.showContactModal && window.showContactModal()">Contact</button>
        <button class="campaign-btn secondary" onclick="(function(){ const el=document.getElementById('portfolio-title'); if(el){ el.scrollIntoView({behavior:'smooth', block:'start'}); } })()">View projects</button>
      </div>
    `
  },
  category: 'Pricing'
};
