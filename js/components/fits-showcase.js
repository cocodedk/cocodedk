/* FITS Flagship Showcase Component */
import { fitsShowcaseData } from '../data/fits-showcase-data.js';

function renderFitsShowcase(language = 'da') {
  const container = document.getElementById('fits-showcase-container');
  if (!container) return;

  const d = fitsShowcaseData;
  const lang = language;

  container.innerHTML = `
    <div class="fits-showcase__header">
      <span class="fits-showcase__version">${d.version}</span>
      <p class="fits-showcase__subtitle">${d.subtitle[lang] || d.subtitle.en}</p>
    </div>
    <div class="fits-showcase__features" id="fits-features"></div>
    <div class="fits-showcase__frameworks" id="fits-frameworks"></div>
    <div class="fits-showcase__stack" id="fits-stack"></div>
    <a href="${d.cta.url}" target="_blank" rel="noopener noreferrer" class="fits-showcase__cta">
      ${d.cta.label[lang] || d.cta.label.en} &rarr;
    </a>
  `;

  // Render features
  const featEl = container.querySelector('#fits-features');
  d.features.forEach(f => {
    const div = document.createElement('div');
    div.className = 'fits-showcase__feature';
    div.innerHTML = `
      <i class="fas ${f.icon} fits-showcase__feature-icon"></i>
      <div>
        <strong>${f.label[lang] || f.label.en}</strong>
        <span>${f.desc[lang] || f.desc.en}</span>
      </div>
    `;
    featEl.appendChild(div);
  });

  // Render framework badges
  const fwEl = container.querySelector('#fits-frameworks');
  fwEl.innerHTML = '<span class="fits-showcase__badge-label">Frameworks:</span>';
  d.frameworks.forEach(fw => {
    const span = document.createElement('span');
    span.className = 'fits-showcase__badge';
    span.textContent = fw;
    fwEl.appendChild(span);
  });

  // Render stack badges
  const stEl = container.querySelector('#fits-stack');
  stEl.innerHTML = '<span class="fits-showcase__badge-label">Stack:</span>';
  d.stack.forEach(tech => {
    const span = document.createElement('span');
    span.className = 'fits-showcase__badge fits-showcase__badge--tech';
    span.textContent = tech;
    stEl.appendChild(span);
  });
}

function updateLanguage(language) {
  renderFitsShowcase(language);
}

window.fitsShowcase = {
  render: renderFitsShowcase,
  updateLanguage: updateLanguage
};
