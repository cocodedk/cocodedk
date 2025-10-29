/* Portfolio Card Component */

function createPortfolioCard(item, language = 'da') {
  const card = document.createElement('div');
  card.className = 'service-card';
  card.dataset.id = item.id;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  const label = (item.labels && item.labels[language]) || item.title || (item.labels && item.labels.en) || '';
  card.setAttribute('aria-label', label);

  const iconHTML = '<img src="images/hexagon-icon.svg" class="service-card__icon" aria-hidden="true" alt="" />';
  const title = label;
  const summary = (item.translations && item.translations[language]) || item.summary || '';
  const stack = Array.isArray(item.stack) ? item.stack : [];

  card.innerHTML = `
    ${iconHTML}
    <h3 class="service-card__title">${title}</h3>
    <p class="service-card__description">${summary}</p>
    <div class="service-card__tags"></div>
  `;

  // Render tags from stack
  const tagsEl = card.querySelector('.service-card__tags');
  stack.slice(0, 4).forEach(tag => {
    const span = document.createElement('span');
    span.className = 'service-card__tag';
    span.textContent = tag;
    tagsEl.appendChild(span);
  });

  // Click opens either live link or a simple modal
  const openDetails = () => {
    if (item.link) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
      return;
    }
    // Fallback: simple in‑place modal using existing node modal infra if available
    if (window.showNodeDescriptionModal) {
      const nodeLike = {
        id: label,
        labels: { en: label, da: label },
        translations: { en: item.details || summary, da: item.details || summary }
      };
      window.showNodeDescriptionModal(nodeLike);
    }
  };

  card.addEventListener('click', openDetails);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDetails();
    }
  });

  return card;
}

function renderPortfolio(items, language = 'da') {
  const container = document.getElementById('portfolio-cards-container');
  if (!container) return;
  container.innerHTML = '';
  items.forEach(item => container.appendChild(createPortfolioCard(item, language)));
}

// Expose globally so main can render without importing
window.renderPortfolio = renderPortfolio;
