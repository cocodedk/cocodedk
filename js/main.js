/*
 * Main.js - Simplified version for non-canvas approach
 */

// Import modular functions
import { setLanguage as setLanguageModule } from './main/setLanguage.js';
import { handleLanguageKeydown as handleLanguageKeydownModule } from './main/handleLanguageKeydown.js';
import { closeMenuOnEscape } from './main/closeMenuOnEscape.js';
import { showNodeDescriptionModal as showNodeDescriptionModalModule } from './main/showNodeDescriptionModal.js';
import { closeNodeDescriptionModal as closeNodeDescriptionModalModule } from './main/closeNodeDescriptionModal.js';
import { addTitleParallaxEffect } from './main/addTitleParallaxEffect.js';
import { updateHeroContent } from './main/updateHeroContent.js';
import { updateSectionContent } from './main/updateSectionContent.js';

// Current language selection (default to Danish)
let mainCurrentLanguage = 'da';

// Define currentModal at the top to avoid ReferenceError
let currentModal = null;
let isModalOpening = false; // Flag to prevent immediate closure
let lastSelectionTime = 0; // For debouncing node selection
let debounceTimeout = 300; // Debounce time in milliseconds

// Handle language change by updating node display
function setLanguage(lang) {
  mainCurrentLanguage = setLanguageModule(lang, false, closeMenuOnEscape);
}

// Function to handle keyboard navigation in language selector
function handleLanguageKeydown(event, lang) {
  handleLanguageKeydownModule(event, lang, setLanguage);
}

// Function to show a modal with node description
function showNodeDescriptionModal(nodeData) {
  // Create reference objects for state variables
  const currentModalRef = { value: currentModal };
  const isModalOpeningRef = { value: isModalOpening };
  const currentEscapeKeyHandlerRef = { value: currentEscapeKeyHandler };

  showNodeDescriptionModalModule(
    nodeData,
    mainCurrentLanguage,
    currentModalRef,
    isModalOpeningRef,
    currentEscapeKeyHandlerRef,
    closeNodeDescriptionModal,
    addTitleParallaxEffect
  );

  // Update global variables with any changes
  currentModal = currentModalRef.value;
  isModalOpening = isModalOpeningRef.value;
  currentEscapeKeyHandler = currentEscapeKeyHandlerRef.value;
}

// Store the current escape key handler for cleanup
let currentEscapeKeyHandler = null;

// Function to close the node description modal
function closeNodeDescriptionModal(event) {
  // Create reference objects for state variables
  const isModalOpeningRef = { value: isModalOpening };
  const currentEscapeKeyHandlerRef = { value: currentEscapeKeyHandler };

  closeNodeDescriptionModalModule(event, isModalOpeningRef, currentEscapeKeyHandlerRef);

  // Update global variables with any changes
  isModalOpening = isModalOpeningRef.value;
  currentEscapeKeyHandler = currentEscapeKeyHandlerRef.value;
}

// Expose functions globally so they can be called from HTML onclick handlers and components
window.closeNodeDescriptionModal = closeNodeDescriptionModal;
window.showNodeDescriptionModal = showNodeDescriptionModal;

// Expose contact modal function globally for CTA button
window.showContactModal = function() {
  if (window.ContactModal && typeof window.ContactModal.showModal === 'function') {
    window.ContactModal.showModal();
  }
};

// Setup language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize hero content
  updateHeroContent(mainCurrentLanguage);
  // Initialize static section content
  updateSectionContent(mainCurrentLanguage);

  // Initialize terminal effect
  if (window.terminal && typeof window.terminal.init === 'function') {
    window.terminal.init();
  }

  // Initialize service cards
  if (window.serviceCards && window.nodes) {
    window.serviceCards.render(window.nodes, mainCurrentLanguage);
  }

  // Initialize activity feed
  if (window.activityFeed) {
    window.activityFeed.render();
  }

  // Render portfolio items (if data/component loaded)
  if (window.renderPortfolio && window.portfolioItems) {
    window.renderPortfolio(window.portfolioItems, mainCurrentLanguage);
  }

  // Language selector is now always visible in footer
  // No toggle functionality needed

  // Make handle language keydown available globally
  window.handleLanguageKeydown = handleLanguageKeydown;

  // Expose setLanguage function globally for HTML onclick handlers
  window.setLanguage = setLanguage;

  // Expose updateHeroContent function globally
  window.updateHeroContent = updateHeroContent;
  // Expose updateSectionContent function globally for setLanguage()
  window.updateSectionContent = updateSectionContent;

  // Set up campaign overlay with smart triggers (scroll/time-based, not forced)
  if (window.CampaignOverlay && typeof window.CampaignOverlay.autoShow === 'function') {
    window.CampaignOverlay.autoShow();
  }
  // Expose updateSectionContent globally (assigned below after import)

  // Set initial language from URL hash or localStorage
  // Valid language codes
  const validLanguages = ['en', 'da', 'es', 'zh', 'ja', 'de', 'ar', 'fa', 'hi', 'ur', 'fr'];
  let initialLang = 'da';

  if (window.location.hash && window.location.hash.length > 1) {
    const hashValue = window.location.hash.substring(1);
    // Only use hash as language if it's a valid language code
    if (validLanguages.includes(hashValue)) {
      initialLang = hashValue;
    } else if (localStorage.getItem('preferredLanguage')) {
      initialLang = localStorage.getItem('preferredLanguage');
    }
  } else if (localStorage.getItem('preferredLanguage')) {
    initialLang = localStorage.getItem('preferredLanguage');
  }
  setLanguage(initialLang);

  // Handle browser back/forward button - close modals when hash is removed
  window.addEventListener('popstate', function(event) {
    if (!window.location.hash) {
      // Close node description modal if open
      const modalContainer = document.getElementById('node-description-modal-container');
      if (modalContainer) {
        // Create a synthetic event for the close function
        const syntheticEvent = {
          preventDefault: () => {},
          stopPropagation: () => {},
          target: { classList: { contains: () => true } }
        };
        window.closeNodeDescriptionModal(syntheticEvent);
      }

      // Close contact modal if open (pass true to skip hash removal since it's already removed)
      if (window.ContactModal && typeof window.ContactModal.hideModal === 'function') {
        window.ContactModal.hideModal(true);
      }
    }
  });
});
