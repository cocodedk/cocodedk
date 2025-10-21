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

// Current language selection
let mainCurrentLanguage = 'en';

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

// Setup language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
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

  // Language selector is now always visible in footer
  // No toggle functionality needed

  // Make handle language keydown available globally
  window.handleLanguageKeydown = handleLanguageKeydown;

  // Expose setLanguage function globally for HTML onclick handlers
  window.setLanguage = setLanguage;

  // Set initial language from URL hash or localStorage
  let initialLang = 'en';
  if (window.location.hash && window.location.hash.length > 1) {
    initialLang = window.location.hash.substring(1);
  } else if (localStorage.getItem('preferredLanguage')) {
    initialLang = localStorage.getItem('preferredLanguage');
  }
  setLanguage(initialLang);
});
