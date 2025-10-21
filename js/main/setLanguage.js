/**
 * Handle language change by updating node display
 *
 * args:
 *   ▸ lang: string - language code to set
 *   ▸ useCytoscape: boolean - current implementation flag
 *   ▸ closeMenuOnEscape: function - function to close menu on escape key
 * return:
 *   ▸ string - the language that was set
 * raise:
 *   ▸ none
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/setLanguage.test.js
 *   ▸ npm test -- --testPathPattern=setLanguage.test.js
 */
export function setLanguage(lang, useCytoscape, closeMenuOnEscape) {
  // Restart terminal effect with new language
  if (window.terminal && typeof window.terminal.start === 'function') {
    window.terminal.start(lang);
  }

  // Update visualization based on active implementation
  if (useCytoscape) {
    if (window.CytoscapeManager) {
      window.CytoscapeManager.setLanguage(lang);
    }
  } else {
    // Legacy implementation
    if (window.NodeDisplay) {
      window.NodeDisplay.setLanguage(lang);
    }
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

  // Set RTL direction for Arabic, Persian, and Urdu
  if (lang === 'ar' || lang === 'fa' || lang === 'ur') {
    document.body.setAttribute('dir', 'rtl');
  } else {
    document.body.setAttribute('dir', 'ltr');
  }

  // Auto-hide the language menu in responsive mode
  if (window.innerWidth <= 768) {
    const langMenu = document.getElementById('languageSelector');
    const langToggle = document.getElementById('langToggle');

    // Add a small delay to allow the user to see their selection first
    setTimeout(() => {
      langMenu.classList.remove('active');
      langToggle.setAttribute('aria-expanded', 'false');

      // Remove keyboard listener for escape key
      document.removeEventListener('keydown', closeMenuOnEscape);
    }, 300);
  }

  return lang;
}
