/**
 * Handle language change by updating node display
 *
 * args:
 *   ▸ lang: string - language code to set
 * return:
 *   ▸ string - the language that was set
 * raise:
 *   ▸ none
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/setLanguage.test.js
 *   ▸ npm test -- --testPathPattern=setLanguage.test.js
 */
export function setLanguage(lang) {
  // Update hero content with new language
  if (window.updateHeroContent && typeof window.updateHeroContent === 'function') {
    window.updateHeroContent(lang);
  }

  // Update section/static content with new language
  if (window.updateSectionContent && typeof window.updateSectionContent === 'function') {
    window.updateSectionContent(lang);
  }

  // Restart terminal effect with new language
  if (window.terminal && typeof window.terminal.start === 'function') {
    window.terminal.start(lang);
  }

  // Re-render service cards with new language
  if (window.serviceCards && window.nodes) {
    window.serviceCards.render(window.nodes, lang);
  }

  // Re-render portfolio items with new language
  if (window.renderPortfolio && window.portfolioItems) {
    window.renderPortfolio(window.portfolioItems, lang);
  }

  // Re-render FITS showcase with new language
  if (window.fitsShowcase) {
    window.fitsShowcase.updateLanguage(lang);
  }

  // Re-render skills section with new language
  if (window.skillsSection) {
    window.skillsSection.updateLanguage(lang);
  }

  // Update active class and ARIA attributes in language menu
  const langItems = document.querySelectorAll('.lang-item');
  langItems.forEach(item => {
    item.classList.remove('active');
    item.setAttribute('aria-selected', 'false');

    if (item.dataset.lang === lang) {
      item.classList.add('active');
      item.setAttribute('aria-selected', 'true');
    }
  });

  // Always LTR (only en/da supported)
  document.body.setAttribute('dir', 'ltr');

  // Language selector is always visible in footer
  // No need to auto-hide

  return lang;
}
