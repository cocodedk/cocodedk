/* Skills Section Component */
import { skillsData } from '../data/skills-data.js';

function renderSkillsSection(language = 'da') {
  const container = document.getElementById('skills-container');
  if (!container) return;

  container.innerHTML = '';

  skillsData.domains.forEach(domain => {
    const group = document.createElement('div');
    group.className = 'skills-domain';

    const label = domain.label[language] || domain.label.en;
    group.innerHTML = `<h3 class="skills-domain__title">${label}</h3>`;

    const badgesEl = document.createElement('div');
    badgesEl.className = 'skills-domain__badges';

    domain.items.forEach(item => {
      const span = document.createElement('span');
      span.className = 'skills-badge';
      span.textContent = item;
      badgesEl.appendChild(span);
    });

    group.appendChild(badgesEl);
    container.appendChild(group);
  });
}

function updateLanguage(language) {
  renderSkillsSection(language);
}

window.skillsSection = {
  render: renderSkillsSection,
  updateLanguage: updateLanguage
};
