/* Service Card Component - Inline Expand */

function createServiceCard(nodeData, language) {
  const wrapper = document.createElement('div');
  wrapper.className = 'service-card-wrapper';

  const card = document.createElement('div');
  card.className = 'service-card';
  card.dataset.id = nodeData.id;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-expanded', 'false');

  const label = nodeData.labels[language] || nodeData.labels.en;
  const shortDesc = (nodeData.translations[language] || nodeData.translations.en);
  card.setAttribute('aria-label', label);

  card.innerHTML = `
    <img src="images/hexagon-icon.svg" class="service-card__icon" aria-hidden="true" alt="" />
    <h3 class="service-card__title">${label}</h3>
    <p class="service-card__description">${shortDesc.substring(0, 150)}...</p>
    <div class="service-card__tags"></div>
  `;

  const expandDiv = buildExpandDiv(nodeData, language);
  wrapper.appendChild(card);
  wrapper.appendChild(expandDiv);

  card.addEventListener('click', () => handleCardClick(wrapper, nodeData, language));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(wrapper, nodeData, language);
    }
  });

  return wrapper;
}

function buildExpandDiv(nodeData, language) {
  const description = nodeData.translations[language] || nodeData.translations.en;
  const linked = window.linkifyText ? window.linkifyText(description) : description;

  const expandDiv = document.createElement('div');
  expandDiv.className = 'service-card__expand';
  expandDiv.innerHTML = linked;
  return expandDiv;
}

function handleCardClick(wrapper, nodeData, language) {
  // Contact node: route to ContactModal
  if (nodeData.id === 'Contact' || nodeData.category === 'Contact') {
    if (typeof ContactModal !== 'undefined' && ContactModal.showModal) {
      ContactModal.showModal();
      return;
    }
  }

  const expandDiv = wrapper.querySelector('.service-card__expand');
  const card = wrapper.querySelector('.service-card');
  const isOpen = expandDiv.classList.contains('active');

  // Collapse all siblings (accordion)
  collapseAllCards(wrapper.parentElement);

  // Toggle current (if it was closed, open it)
  if (!isOpen) {
    expandDiv.classList.add('active');
    card.setAttribute('aria-expanded', 'true');
  }
}

function collapseAllCards(container) {
  if (!container) return;
  container.querySelectorAll('.service-card__expand.active').forEach(el => {
    el.classList.remove('active');
  });
  container.querySelectorAll('.service-card[aria-expanded="true"]').forEach(el => {
    el.setAttribute('aria-expanded', 'false');
  });
}

function renderServiceCards(nodesData, language) {
  const container = document.getElementById('service-cards-container');
  if (!container) return;

  container.innerHTML = '';
  nodesData.forEach((node) => {
    const wrapper = createServiceCard(node, language);
    container.appendChild(wrapper);
  });
}

window.serviceCards = {
  render: renderServiceCards,
  create: createServiceCard
};
