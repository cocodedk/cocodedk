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
  const ctaSecondary = campaignTranslations.secondary[lang] || campaignTranslations.secondary.en;
  const socialProof = campaignTranslations.socialProof[lang] || campaignTranslations.socialProof.en;

  root.innerHTML = `
    <div class="campaign-modal" role="dialog" aria-modal="true" aria-labelledby="campaign-title">
      <button class="campaign-close" aria-label="Close" id="campaign-close" onclick="window.CampaignOverlay && window.CampaignOverlay.hide && window.CampaignOverlay.hide();">×</button>
      <div class="campaign-header">
        <h3 class="campaign-title" id="campaign-title">${title}</h3>
        <p class="campaign-sub">${sub}</p>
      </div>
      <div class="campaign-body">
        <div class="cube-scene" aria-hidden="true">
          <div class="cube-3d">
            <div class="cube-face cube-front"></div>
            <div class="cube-face cube-back"></div>
            <div class="cube-face cube-right"></div>
            <div class="cube-face cube-left"></div>
            <div class="cube-face cube-top"></div>
            <div class="cube-face cube-bottom"></div>
          </div>
        </div>
        <p class="campaign-social-proof">${socialProof}</p>
      </div>
      <div class="campaign-actions">
        <button class="campaign-btn" id="campaign-primary">${ctaPrimary}</button>
        <button class="campaign-btn secondary" id="campaign-secondary">${ctaSecondary}</button>
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

  // Primary CTA: Get Free Quote - opens contact modal
  document.getElementById('campaign-primary').onclick = () => {
    hide();
    if (window.showContactModal && typeof window.showContactModal === 'function') {
      window.showContactModal();
    }
  };

  // Secondary CTA: View Examples - scrolls to portfolio
  document.getElementById('campaign-secondary').onclick = () => {
    hide();
    const portfolioEl = document.getElementById('portfolio-title') || document.querySelector('.portfolio-title');
    if (portfolioEl) {
      portfolioEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return root;
}

function getDismissKey() {
  return `campaignDismissed_v${campaignTranslations.version || 1}`;
}

function shouldShow() {
  const dismissedKey = getDismissKey();
  const dismissed = localStorage.getItem(dismissedKey);
  if (dismissed) {
    const dismissedTime = parseInt(dismissed, 10);
    const sevenDays = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - dismissedTime < sevenDays) {
      return false;
    }
    localStorage.removeItem(dismissedKey);
  }
  return true;
}

function show(force=false) {
  try {
    if (!force && !shouldShow()) return;
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
  // Store dismissal timestamp for 7-day cooldown
  try {
    localStorage.setItem(getDismissKey(), Date.now().toString());
  } catch (_) {}
  if (escHandler) {
    document.removeEventListener('keydown', escHandler);
    escHandler = null;
  }
  if (docClickHandler) {
    document.removeEventListener('click', docClickHandler, true);
    docClickHandler = null;
  }
}

let scrollTriggered = false;
let timeTriggered = false;

function checkScrollTrigger() {
  if (scrollTriggered) return;
  const denominator = document.documentElement.scrollHeight - window.innerHeight;
  let scrollPercent;
  if (denominator <= 0) {
    // Page is not scrollable, treat as already scrolled
    scrollPercent = 100;
  } else {
    scrollPercent = (window.scrollY / denominator) * 100;
  }
  if (scrollPercent >= 50) {
    scrollTriggered = true;
    show(false);
  }
}

function checkTimeTrigger() {
  if (timeTriggered) return;
  timeTriggered = true;
  setTimeout(() => {
    if (!scrollTriggered) {
      show(false);
    }
  }, 30000); // 30 seconds
}

function autoShow() {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // DOM is already ready
    // Set up scroll and time triggers instead of showing immediately
    window.addEventListener('scroll', checkScrollTrigger, { once: true, passive: true });
    checkTimeTrigger();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      window.addEventListener('scroll', checkScrollTrigger, { once: true, passive: true });
      checkTimeTrigger();
    });
  }
}

window.CampaignOverlay = { show, hide, autoShow };
