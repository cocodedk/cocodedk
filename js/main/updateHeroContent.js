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
    const subtitle = document.getElementById('hero-subtitle');
    const headline = document.getElementById('hero-headline');
    const valueProp = document.getElementById('hero-value-prop');
    const ctaButton = document.getElementById('cta-button');

    if (!headline || !valueProp || !ctaButton) {
      console.warn('Hero elements not found in DOM');
      return false;
    }

    // Update content with translations
    if (subtitle) {
      subtitle.textContent = heroTranslations.subtitle[lang] || heroTranslations.subtitle.en;
    }
    headline.textContent = heroTranslations.headline[lang] || heroTranslations.headline.en;
    valueProp.textContent = heroTranslations.valueProp[lang] || heroTranslations.valueProp.en;
    ctaButton.textContent = heroTranslations.ctaButton[lang] || heroTranslations.ctaButton.en;

    return true;
  } catch (error) {
    console.error('Error updating hero content:', error);
    return false;
  }
}
