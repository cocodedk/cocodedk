/**
 * Close menu on escape key
 *
 * args:
 *   ▸ e: KeyboardEvent - the keyboard event
 * return:
 *   ▸ void
 * raise:
 *   ▸ none
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/closeMenuOnEscape.test.js
 *   ▸ npm test -- --testPathPattern=closeMenuOnEscape.test.js
 */
export function closeMenuOnEscape(e) {
  if (e.key === 'Escape') {
    const langMenu = document.getElementById('languageSelector');
    const langToggle = document.getElementById('langToggle');

    langMenu.classList.remove('active');
    langToggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', closeMenuOnEscape);
  }
}
