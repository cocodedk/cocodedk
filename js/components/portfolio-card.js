/* Portfolio Card Component with Category Filters */

let activeCategory = 'all';

function createPortfolioCard(item, language = 'da') {
  const card = document.createElement('div');
  card.className = 'portfolio-card';
  card.dataset.id = item.id;
  card.dataset.category = item.category || 'ai';
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  const label = (item.labels && item.labels[language]) || item.title || '';
  card.setAttribute('aria-label', label);

  const summary = (item.translations && item.translations[language]) || item.summary || '';
  const stack = Array.isArray(item.stack) ? item.stack : [];

  card.innerHTML = `
    <h3 class="portfolio-card__title">${label}</h3>
    <p class="portfolio-card__description">${summary}</p>
    <div class="portfolio-card__tags"></div>
  `;

  const tagsEl = card.querySelector('.portfolio-card__tags');
  stack.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'portfolio-card__tag';
    span.textContent = tag;
    tagsEl.appendChild(span);
  });

  const openDetails = () => {
    if (item.link) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
      return;
    }
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

function renderCategoryFilters(language = 'da') {
  const filterContainer = document.getElementById('portfolio-filters');
  if (!filterContainer || !window.portfolioCategories) return;

  filterContainer.innerHTML = '';
  const cats = window.portfolioCategories;

  Object.keys(cats).forEach(key => {
    const btn = document.createElement('button');
    btn.className = 'portfolio-filter' + (key === activeCategory ? ' portfolio-filter--active' : '');
    btn.textContent = cats[key][language] || cats[key].en;
    btn.dataset.category = key;
    btn.addEventListener('click', () => {
      activeCategory = key;
      renderPortfolio(window.portfolioItems, language);
    });
    filterContainer.appendChild(btn);
  });
}

function renderPortfolio(items, language = 'da') {
  const container = document.getElementById('portfolio-cards-container');
  if (!container) return;

  renderCategoryFilters(language);

  container.innerHTML = '';
  const filtered = activeCategory === 'all'
    ? items
    : items.filter(i => i.category === activeCategory);

  filtered.forEach(item => container.appendChild(createPortfolioCard(item, language)));
}

window.renderPortfolio = renderPortfolio;
