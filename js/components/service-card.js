/* Service Card Component */

function createServiceCard(nodeData, language) {
  const card = document.createElement('div');
  card.className = 'service-card';
  card.dataset.id = nodeData.id;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${nodeData.labels[language] || nodeData.labels.en}`);

  const label = nodeData.labels[language] || nodeData.labels.en;
  const description = nodeData.translations[language] || nodeData.translations.en;

  card.innerHTML = `
    <img src="images/hexagon-icon.svg" class="service-card__icon" aria-hidden="true" alt="" />
    <h3 class="service-card__title">${label}</h3>
    <p class="service-card__description">${description.substring(0, 150)}...</p>
    <div class="service-card__tags"></div>
  `;

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

  container.innerHTML = '';
  nodesData.forEach((node) => {
    const card = createServiceCard(node, language);
    container.appendChild(card);
  });
}

window.serviceCards = {
  render: renderServiceCards,
  create: createServiceCard
};
