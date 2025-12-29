/* Service Card Component - Stitch Design System */

// Map categories to Material Symbols icons
const categoryIcons = {
  'AI': 'neurology',
  'Security': 'security',
  'Cybersecurity': 'security',
  'Software': 'terminal',
  'Development': 'terminal',
  'default': 'code_blocks'
};

function getIconForCategory(category) {
  return categoryIcons[category] || categoryIcons['default'];
}

function createServiceCard(nodeData, language) {
  const card = document.createElement('article');
  card.className = 'service-card-new group';
  card.dataset.id = nodeData.id;
  card.dataset.service = nodeData.id;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${nodeData.labels[language] || nodeData.labels.en}`);

  const label = nodeData.labels[language] || nodeData.labels.en;
  const description = (nodeData.translations[language] || nodeData.translations.en).substring(0, 120);
  const icon = getIconForCategory(nodeData.category);

  card.innerHTML = `
    <div class="card-glow-effect"></div>
    <div class="card-inner glass-panel">
      <div class="card-header">
        <div class="card-icon-wrap">
          <span class="material-symbols-outlined">${icon}</span>
        </div>
        <span class="material-symbols-outlined card-arrow">arrow_outward</span>
      </div>

      <h3 class="card-title">${label}</h3>
      <p class="card-description">${description}...</p>

      <button class="card-action" aria-label="Learn more about ${label}">
        Learn More
      </button>
    </div>
  `;

  const actionButton = card.querySelector('.card-action');
  actionButton.addEventListener('click', (e) => {
    e.stopPropagation();
    handleCardClick(nodeData, language);
  });

  card.addEventListener('click', () => handleCardClick(nodeData, language));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(nodeData, language);
    }
  });

  return card;
}

function handleCardClick(nodeData, language) {
  if (window.showNodeDescriptionModal && typeof window.showNodeDescriptionModal === 'function') {
    window.showNodeDescriptionModal(nodeData);
  }
}

function renderServiceCards(nodesData, language) {
  const container = document.getElementById('service-cards-container');
  if (!container) return;

  // Filter to show only main service nodes (exclude contact, about, etc.)
  const serviceNodes = nodesData.filter(node => {
    const excludedIds = ['Contact', 'About', 'GitHub', 'LinkedIn', 'CV', 'Pricing', 'Testimonials'];
    return !excludedIds.includes(node.id);
  });

  // Add section header if not exists
  let header = container.previousElementSibling;
  if (!header || !header.classList.contains('section-header')) {
    header = document.createElement('div');
    header.className = 'section-header';
    header.innerHTML = `
      <h2 class="section-title">
        Our <span class="text-primary">Expertise</span>
      </h2>
      <p class="section-subtitle text-secondary">
        Secure, scalable, and modern IT solutions empowering European SMEs.
      </p>
    `;
    container.parentNode.insertBefore(header, container);
  }

  container.innerHTML = '';
  serviceNodes.forEach((node) => {
    const card = createServiceCard(node, language);
    container.appendChild(card);
  });
}

window.serviceCards = {
  render: renderServiceCards,
  create: createServiceCard
};
