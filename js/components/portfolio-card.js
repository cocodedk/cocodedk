/* Portfolio Card Component - Stitch Design System */

// Map categories to display names
const categoryMap = {
  'ecommerce': 'E-commerce',
  'security': 'Security',
  'audit': 'Audit',
  'cloud': 'Cloud',
  'default': 'Project'
};

// Map to status badges
function getStatusBadge(item) {
  if (item.status) return item.status;
  // Default status based on project type
  if (item.categories && item.categories.includes('security')) {
    return { type: 'info', icon: 'trending_down', text: 'Risk -40%' };
  }
  if (item.categories && item.categories.includes('cloud')) {
    return { type: 'warning', icon: 'cloud_done', text: '0 Downtime' };
  }
  return { type: 'success', icon: 'verified_user', text: '100% Uptime' };
}

function createPortfolioCard(item, language = 'da', isFeatured = false) {
  const card = document.createElement('article');
  card.className = `portfolio-card ${isFeatured ? 'featured' : ''}`;
  card.dataset.id = item.id;
  card.dataset.categories = (item.categories || ['default']).join(',');

  const label = (item.labels && item.labels[language]) || item.title || (item.labels && item.labels.en) || '';
  const summary = (item.translations && item.translations[language]) || item.summary || '';
  const categories = item.categories || ['default'];
  const statusBadge = getStatusBadge(item);

  // Category display
  const categoryText = categories.map(cat => categoryMap[cat] || cat).join(' • ');

  card.innerHTML = `
    <div class="card-image-container">
      <div class="card-image-overlay"></div>
      ${item.image ? `<img src="${item.image}" alt="${label}" loading="lazy" />` : ''}
      ${isFeatured ? '<span class="featured-badge">Featured</span>' : ''}
      <div class="card-image-content">
        <p class="card-category">${categoryText}</p>
        <h3 class="card-project-title">${label}</h3>
      </div>
    </div>
    <div class="card-body">
      <p class="card-excerpt">${summary}</p>
      <div class="card-footer">
        <div class="status-badge status-${statusBadge.type}">
          <span class="material-symbols-outlined">${statusBadge.icon}</span>
          ${statusBadge.text}
        </div>
        <button class="view-case-study" aria-label="View case study for ${label}">
          View Case Study
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  `;

  const viewButton = card.querySelector('.view-case-study');
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

  viewButton.addEventListener('click', (e) => {
    e.stopPropagation();
    openDetails();
  });

  card.addEventListener('click', openDetails);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDetails();
    }
  });

  return card;
}

function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      filterButtons.forEach(b => {
        b.classList.remove('glass-chip-active');
        b.classList.add('glass-chip');
      });
      btn.classList.remove('glass-chip');
      btn.classList.add('glass-chip-active');

      // Filter cards
      cards.forEach(card => {
        const categories = card.dataset.categories?.split(',') || [];
        const shouldShow = filter === 'all' || categories.includes(filter);

        card.style.display = shouldShow ? 'flex' : 'none';
        if (shouldShow) {
          card.style.animation = 'fadeIn 0.3s ease';
        }
      });
    });
  });
}

function renderPortfolio(items, language = 'da') {
  const container = document.getElementById('portfolio-cards-container');
  if (!container) return;

  // Add filters if not exists
  let filterContainer = container.previousElementSibling;
  if (!filterContainer || !filterContainer.classList.contains('portfolio-filters')) {
    filterContainer = document.createElement('div');
    filterContainer.className = 'portfolio-filters';
    filterContainer.innerHTML = `
      <button class="filter-chip glass-chip-active" data-filter="all">All</button>
      <button class="filter-chip glass-chip" data-filter="security">Security</button>
      <button class="filter-chip glass-chip" data-filter="ecommerce">E-commerce</button>
      <button class="filter-chip glass-chip" data-filter="audit">Audit</button>
      <button class="filter-chip glass-chip" data-filter="cloud">Cloud</button>
    `;
    container.parentNode.insertBefore(filterContainer, container);
    initPortfolioFilters();
  }

  container.innerHTML = '';
  items.forEach((item, index) => {
    const isFeatured = index === 0; // First item is featured
    const card = createPortfolioCard(item, language, isFeatured);
    container.appendChild(card);
  });

  // Re-init filters after rendering
  setTimeout(() => initPortfolioFilters(), 100);
}

// Expose globally so main can render without importing
window.renderPortfolio = renderPortfolio;
