/**
 * Update hero section content based on current language
 *
 * args:
 *   ▸ lang: string - language code to apply
 * return:
 *   ▸ boolean - true if update successful, false otherwise
 * raise:
 *   ▸ none
 */
import { heroTranslations } from '../data/hero-translations.js';

export function updateHeroContent(lang) {
  try {
    const headline = document.getElementById('hero-headline');
    const valueProp = document.getElementById('hero-value-prop');
    const ctaButton = document.getElementById('cta-button');

    if (!headline || !valueProp || !ctaButton) {
      console.warn('Hero elements not found in DOM');
      return false;
    }

    // Update content with translations
    headline.textContent = heroTranslations.headline[lang] || heroTranslations.headline.en;
    valueProp.textContent = heroTranslations.valueProp[lang] || heroTranslations.valueProp.en;
    ctaButton.textContent = heroTranslations.ctaButton[lang] || heroTranslations.ctaButton.en;

    // Update stat labels
    const stats = heroTranslations.stats || {};
    document.querySelectorAll('.hero-stat__label[data-stat]').forEach(el => {
      const key = el.getAttribute('data-stat');
      if (stats[key]) {
        el.textContent = stats[key][lang] || stats[key].en;
      }
    });

    return true;
  } catch (error) {
    console.error('Error updating hero content:', error);
    return false;
  }
}
