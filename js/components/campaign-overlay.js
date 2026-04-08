import { campaignTranslations as t } from '../data/campaign-translations.js';

let escHandler = null;
let docClickHandler = null;

function getLang() {
  const active = document.querySelector('.lang-item.active');
  if (active && active.dataset && active.dataset.lang) return active.dataset.lang;
  const stored = localStorage.getItem('preferredLanguage');
  return stored || 'da';
}

function buildServiceCard(svc, lang) {
  const title = svc.title[lang] || svc.title.en;
  const desc = svc.desc[lang] || svc.desc.en;
  const cta = svc.cta[lang] || svc.cta.en;
  const dataAttr = svc.url
    ? `data-url="${svc.url}"`
    : `data-action="${svc.action || ''}"`;
  return `<div class="campaign-service">
    <div class="campaign-service__icon">${svc.icon}</div>
    <div class="campaign-service__body">
      <h4 class="campaign-service__title">${title}</h4>
      <p class="campaign-service__desc">${desc}</p>
      <button class="campaign-service__cta" ${dataAttr}>${cta} &rarr;</button>
    </div>
  </div>`;
}

function buildOverlay(lang) {
  const root = document.getElementById('campaign-root');
  if (!root) return null;
  const headline = t.headline[lang] || t.headline.en;
  const sub = t.sub[lang] || t.sub.en;
  const cards = t.services.map(s => buildServiceCard(s, lang)).join('');

  root.innerHTML = `
    <div class="campaign-modal" role="dialog" aria-modal="true" aria-labelledby="campaign-title">
      <button class="campaign-close" id="campaign-close" aria-label="Close">&times;</button>
      <div class="campaign-header">
        <h3 class="campaign-title" id="campaign-title">${headline}</h3>
        <p class="campaign-sub">${sub}</p>
      </div>
      <div class="campaign-services">${cards}</div>
    </div>`;

  // Close button
  const closeBtn = document.getElementById('campaign-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (ev) => { ev.preventDefault(); ev.stopPropagation(); hide(); });
  }

  // Click outside to close
  root.addEventListener('click', (e) => { if (e.target === root) hide(); });

  // Service CTA buttons
  root.querySelectorAll('.campaign-service__cta').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.dataset.url;
      const action = btn.dataset.action;
      hide();
      if (url) { window.open(url, '_blank', 'noopener'); return; }
      if (action === 'contact') {
        if (window.showContactModal) window.showContactModal();
      } else if (action === 'portfolio') {
        const el = document.querySelector('.portfolio-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  return root;
}

function getDismissKey() {
  return `campaignDismissed_v${t.version || 1}`;
}

function shouldShow() {
  const dismissed = localStorage.getItem(getDismissKey());
  if (dismissed) {
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - parseInt(dismissed, 10) < sevenDays) return false;
    localStorage.removeItem(getDismissKey());
  }
  return true;
}

function show(force = false) {
  try {
    if (!force && !shouldShow()) return;
    const root = buildOverlay(getLang());
    if (!root) return;
    root.style.display = 'flex';
    root.setAttribute('aria-hidden', 'false');
    escHandler = (ev) => { if (ev.key === 'Escape') hide(); };
    document.addEventListener('keydown', escHandler);
    const closeEl = document.getElementById('campaign-close');
    docClickHandler = (ev) => {
      try {
        const x = ev.target;
        if (x === closeEl || (x.closest && x.closest('#campaign-close'))) {
          ev.preventDefault(); ev.stopPropagation(); hide();
        }
      } catch (_) {}
    };
    document.addEventListener('click', docClickHandler, true);
  } catch (e) { console.error(e); }
}

function hide() {
  const root = document.getElementById('campaign-root');
  if (!root) return;
  root.style.display = 'none';
  root.setAttribute('aria-hidden', 'true');
  try { localStorage.setItem(getDismissKey(), Date.now().toString()); } catch (_) {}
  if (escHandler) { document.removeEventListener('keydown', escHandler); escHandler = null; }
  if (docClickHandler) { document.removeEventListener('click', docClickHandler, true); docClickHandler = null; }
}

let scrollTriggered = false;
let timeTriggered = false;

function checkScrollTrigger() {
  if (scrollTriggered) return;
  const y = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
  const h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  const denom = h - window.innerHeight;
  const pct = denom <= 0 ? 100 : (y / denom) * 100;
  if (pct >= 60) { scrollTriggered = true; show(false); }
}

function setupScrollListeners() {
  const opts = { passive: true };
  window.addEventListener('scroll', checkScrollTrigger, opts);
  document.body.addEventListener('scroll', checkScrollTrigger, opts);
  if (!timeTriggered) {
    timeTriggered = true;
    setTimeout(() => { if (!scrollTriggered) show(false); }, 60000);
  }
}

function autoShow() {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setupScrollListeners();
  } else {
    document.addEventListener('DOMContentLoaded', setupScrollListeners);
  }
}

window.CampaignOverlay = { show, hide, autoShow };
