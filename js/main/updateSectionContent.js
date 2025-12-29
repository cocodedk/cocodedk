import { sectionTranslations } from '../data/section-translations.js';

export function updateSectionContent(lang) {
  try {
    const portfolioTitle = document.getElementById('portfolio-title') || document.querySelector('.portfolio-title');
    if (portfolioTitle) {
      portfolioTitle.textContent = sectionTranslations.portfolioTitle[lang] || sectionTranslations.portfolioTitle.en;
    }

    const activityTitle = document.getElementById('activity-feed-title') || document.querySelector('.activity-feed-title');
    if (activityTitle) {
      activityTitle.textContent = sectionTranslations.activityTitle[lang] || sectionTranslations.activityTitle.en;
    }

    const pricingCta = document.getElementById('cta-pricing-button');
    if (pricingCta) {
      pricingCta.textContent = sectionTranslations.pricingButton[lang] || sectionTranslations.pricingButton.en;
    }

    const cvLink = document.getElementById('cv-link-text');
    if (cvLink) {
      cvLink.textContent = sectionTranslations.cvLink[lang] || sectionTranslations.cvLink.en;
    }

    return true;
  } catch (e) {
    console.error('Error updating section content', e);
    return false;
  }
}
