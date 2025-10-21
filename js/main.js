/*
 * Main.js - Simplified version for non-canvas approach
 */

// Import modular functions
// import { toggleImplementation } from './main/toggleImplementation.js';
// import { testCurrentVisualization } from './main/testCurrentVisualization.js';
// import { testCytoscapeImplementation } from './main/testCytoscapeImplementation.js';
// import { testLegacyImplementation } from './main/testLegacyImplementation.js';
import { setLanguage as setLanguageModule } from './main/setLanguage.js';
import { handleLanguageKeydown as handleLanguageKeydownModule } from './main/handleLanguageKeydown.js';
import { closeMenuOnEscape } from './main/closeMenuOnEscape.js';
import { initializeCytoscape as initializeCytoscapeModule } from './main/initializeCytoscape.js';
import { fallbackToLegacy as fallbackToLegacyModule } from './main/fallbackToLegacy.js';
// import { showContactModal } from './main/showContactModal.js';
import { showNodeDescriptionModal as showNodeDescriptionModalModule } from './main/showNodeDescriptionModal.js';
import { closeNodeDescriptionModal as closeNodeDescriptionModalModule } from './main/closeNodeDescriptionModal.js';
import { addTitleParallaxEffect } from './main/addTitleParallaxEffect.js';
// import { runEndToEndTest as runEndToEndTestModule } from './main/runEndToEndTest.js';
// import { setupDebugPanel } from './main/debugPanel.js';

//console.log('Main.js script starting - Checking ContactModal availability:', typeof ContactModal !== 'undefined' ? 'Available' : 'Not available');

// const DEBUG_MODE = false; // Enable debugging for testing
// const debug = document.getElementById('debug');
// Feature flag to toggle between implementations
let useCytoscape = true; // Default to true

// Check localStorage for saved preference
if (localStorage.getItem('useCytoscape') !== null) {
  useCytoscape = localStorage.getItem('useCytoscape') === 'true';
} else {
  // Save default
  localStorage.setItem('useCytoscape', 'true');
}

//console.log('[TDD] Current implementation:', useCytoscape ? 'Cytoscape' : 'Legacy');

// Set data attribute on body for CSS targeting
document.body.setAttribute('data-vis', useCytoscape ? 'cytoscape' : 'legacy');

// Current language selection
let mainCurrentLanguage = 'en';

// Define currentModal at the top to avoid ReferenceError
let currentModal = null;
let isModalOpening = false; // Flag to prevent immediate closure
let lastSelectionTime = 0; // For debouncing node selection
let debounceTimeout = 300; // Debounce time in milliseconds

// Setup debug panel
// setupDebugPanel(
//   DEBUG_MODE,
//   debug,
//   useCytoscape,
//   toggleImplementation,
//   testCurrentVisualization,
//   testCytoscapeImplementation,
//   testLegacyImplementation,
//   runEndToEndTest
// );

// Handle language change by updating node display
function setLanguage(lang) {
  mainCurrentLanguage = setLanguageModule(lang, useCytoscape, closeMenuOnEscape);
}

// Function to handle keyboard navigation in language selector
function handleLanguageKeydown(event, lang) {
  handleLanguageKeydownModule(event, lang, setLanguage);
}

// Initialize Cytoscape visualization
function initializeCytoscape() {
  // Create a reference object for lastSelectionTime to allow modification by reference
  const lastSelectionTimeRef = { value: lastSelectionTime };
  const result = initializeCytoscapeModule(
    mainCurrentLanguage,
    lastSelectionTimeRef,
    debounceTimeout,
    showNodeDescriptionModal,
    fallbackToLegacy
  );
  // Update the global variable with any changes
  lastSelectionTime = lastSelectionTimeRef.value;
  return result;
}

// Fallback to legacy visualization if Cytoscape fails
function fallbackToLegacy() {
  // Create a reference object for useCytoscape to allow modification by reference
  const useCytoscapeRef = { value: useCytoscape };
  fallbackToLegacyModule(useCytoscapeRef);
  // Update the global variable with any changes
  useCytoscape = useCytoscapeRef.value;
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

// Expose the function globally so it can be called from HTML onclick handlers
window.closeNodeDescriptionModal = closeNodeDescriptionModal;

// Setup language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize visualization based on feature flag
  if (useCytoscape) {
    initializeCytoscape();
  } else {
    // Legacy initialization
    if (window.NodeDisplay && typeof window.NodeDisplay.initNodeDisplay === 'function') {
      window.NodeDisplay.initNodeDisplay();
    }
  }

  const langToggle = document.getElementById('langToggle');
  const langMenu = document.getElementById('languageSelector');

  // Initialize toggle button's aria state
  langToggle.setAttribute('aria-expanded', 'false');

  // Add click handler for language toggle
  langToggle.addEventListener('click', function() {
    const isExpanded = langToggle.getAttribute('aria-expanded') === 'true';

    if (!isExpanded) {
      langMenu.classList.add('active');
      langToggle.setAttribute('aria-expanded', 'true');
      document.addEventListener('keydown', closeMenuOnEscape);
    } else {
      langMenu.classList.remove('active');
      langToggle.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', closeMenuOnEscape);
    }
  });

  // Add touch event handler for better mobile responsiveness
  langToggle.addEventListener('touchstart', function(e) {
    e.preventDefault(); // Prevent default to avoid click event interference
    const isExpanded = langToggle.getAttribute('aria-expanded') === 'true';

    if (!isExpanded) {
      langMenu.classList.add('active');
      langToggle.setAttribute('aria-expanded', 'true');
      document.addEventListener('keydown', closeMenuOnEscape);
    } else {
      langMenu.classList.remove('active');
      langToggle.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', closeMenuOnEscape);
    }
  });

  // Close language menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!langToggle.contains(event.target) && !langMenu.contains(event.target)) {
      langMenu.classList.remove('active');
      langToggle.setAttribute('aria-expanded', 'false');
    }
  });

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

// Add a new function for end-to-end testing
// function runEndToEndTest() {
//   return runEndToEndTestModule(testCytoscapeImplementation, initializeCytoscape);
// }

// Ensure Cytoscape initialization is called on page load
document.addEventListener('DOMContentLoaded', function() {
  if (useCytoscape) {
    //console.log('[TDD] Page loaded, initializing Cytoscape');
    initializeCytoscape();
  }
});
