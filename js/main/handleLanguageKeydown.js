/**
 * Handle keyboard navigation in language selector
 *
 * args:
 *   ▸ event: KeyboardEvent - the keyboard event
 *   ▸ lang: string - current language code
 *   ▸ setLanguage: function - function to set the language
 * return:
 *   ▸ void
 * raise:
 *   ▸ none
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/handleLanguageKeydown.test.js
 *   ▸ npm test -- --testPathPattern=handleLanguageKeydown.test.js
 */
export function handleLanguageKeydown(event, lang, setLanguage) {
  // Enter or Space key
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    setLanguage(lang);
  }

  // Arrow Up/Down for navigation
  else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();

    const langItems = Array.from(document.querySelectorAll('.lang-item'));
    const currentIndex = langItems.findIndex(item => item.dataset.lang === lang);
    let nextIndex;

    if (event.key === 'ArrowUp') {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : langItems.length - 1;
    } else {
      nextIndex = currentIndex < langItems.length - 1 ? currentIndex + 1 : 0;
    }

    langItems[nextIndex].focus();
  }
}
