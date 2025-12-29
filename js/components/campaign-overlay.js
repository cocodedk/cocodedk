import { campaignTranslations } from '../data/campaign-translations.js';

let escHandler = null;
let docClickHandler = null;

function getLang() {
  // Try active footer item
  const active = document.querySelector('.lang-item.active');
  if (active && active.dataset && active.dataset.lang) return active.dataset.lang;
  // Try stored preference
  const stored = localStorage.getItem('preferredLanguage');
  if (stored) return stored;
  return 'da';
}

function buildOverlay(lang) {
  const root = document.getElementById('campaign-root');
  if (!root) return null;

  const title = campaignTranslations.headline[lang] || campaignTranslations.headline.en;
  const sub = campaignTranslations.sub[lang] || campaignTranslations.sub.en;
  const ctaPrimary = campaignTranslations.primary[lang] || campaignTranslations.primary.en;
  const ctaPhone = campaignTranslations.phone[lang] || campaignTranslations.phone.en;
  const ctaEmail = campaignTranslations.email[lang] || campaignTranslations.email.en;
  const ctaSMS = campaignTranslations.sms[lang] || campaignTranslations.sms.en;

  root.innerHTML = `
    <div class="campaign-modal" role="dialog" aria-modal="true" aria-labelledby="campaign-title">
      <button class="campaign-close" aria-label="Close" id="campaign-close" onclick="window.CampaignOverlay && window.CampaignOverlay.hide && window.CampaignOverlay.hide();">×</button>
      <div class="campaign-header">
        <h3 class="campaign-title" id="campaign-title">${title}</h3>
        <p class="campaign-sub">${sub}</p>
      </div>
      <div class="campaign-body">
        <img class="campaign-badge" src="images/campaign-999.svg" alt="Prisbadge: 999 DKK + moms" />
      </div>
      <div class="campaign-actions">
        <button class="campaign-btn" id="campaign-pricing">${ctaPrimary}</button>
        <a class="campaign-btn secondary" id="campaign-call" href="tel:+4553737514" aria-label="${ctaPhone}">${ctaPhone}</a>
        <a class="campaign-btn secondary" id="campaign-email" href="mailto:bb@cocode.dk" aria-label="${ctaEmail}">${ctaEmail}</a>
        <a class="campaign-btn secondary" id="campaign-sms" href="sms:+4553737514" aria-label="${ctaSMS}">${ctaSMS}</a>
      </div>
    </div>
  `;

  const closeBtn = document.getElementById('campaign-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (ev) => { ev.preventDefault(); ev.stopPropagation(); hide(); });
    closeBtn.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ev.stopPropagation(); hide(); } });
  }

  // Close when clicking outside the modal (on the dimmed overlay)
  root.addEventListener('click', (e) => {
    if (e.target === root) { hide(); return; }
    if (e.target && (e.target.id === 'campaign-close' || (e.target.closest && e.target.closest('#campaign-close')))) {
      hide();
    }
  });

  document.getElementById('campaign-pricing').onclick = () => {
    hide();
    const n = (window.nodes||[]).find(x=>x.id==='Pricing');
    if (n && window.showNodeDescriptionModal) {
      window.showNodeDescriptionModal(n);
    } else if (window.showContactModal) {
      window.showContactModal();
    }
  };

  // Hide overlay when contact links are used
  const callEl = document.getElementById('campaign-call');
  const emailEl = document.getElementById('campaign-email');
  const smsEl = document.getElementById('campaign-sms');
  [callEl, emailEl, smsEl].forEach(el => {
    if (el) el.addEventListener('click', () => hide());
  });

  return root;
}

function show(force=false) {
  try {
    if (!force && localStorage.getItem('campaignSeenV1') === '1') return;
    const root = buildOverlay(getLang());
    if (!root) return;
    root.style.display = 'flex';
    root.setAttribute('aria-hidden', 'false');
    // Close on ESC
    escHandler = (ev) => { if (ev.key === 'Escape') hide(); };
    document.addEventListener('keydown', escHandler);

    // Fallback: capture document clicks to close when clicking the close button
    const closeEl = document.getElementById('campaign-close');
    docClickHandler = (ev) => {
      try {
        if (!closeEl) return;
        const t = ev.target;
        if (t === closeEl || (t.closest && t.closest('#campaign-close'))) {
          ev.preventDefault();
          ev.stopPropagation();
          hide();
        }
      } catch (_) {}
    };
    document.addEventListener('click', docClickHandler, true);
  } catch(e) { console.error(e); }
}

function hide() {
  const root = document.getElementById('campaign-root');
  if (!root) return;
  root.style.display = 'none';
  root.setAttribute('aria-hidden', 'true');
  try { localStorage.setItem('campaignSeenV1', '1'); } catch (_) {}
  if (escHandler) {
    document.removeEventListener('keydown', escHandler);
    escHandler = null;
  }
  if (docClickHandler) {
    document.removeEventListener('click', docClickHandler, true);
    docClickHandler = null;
  }
}

function autoShow() {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // DOM is already ready
    show(false);
  } else {
    document.addEventListener('DOMContentLoaded', () => show(false));
  }
}

window.CampaignOverlay = { show, hide, autoShow };
