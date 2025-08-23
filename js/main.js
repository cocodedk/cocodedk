/*
 * Main.js - Simplified version for non-canvas approach
 */

// Import modular functions
import { toggleImplementation } from './main/toggleImplementation.js';
import { testCurrentVisualization } from './main/testCurrentVisualization.js';
import { testCytoscapeImplementation } from './main/testCytoscapeImplementation.js';
import { testLegacyImplementation } from './main/testLegacyImplementation.js';
import { setLanguage as setLanguageModule } from './main/setLanguage.js';
import { handleLanguageKeydown as handleLanguageKeydownModule } from './main/handleLanguageKeydown.js';
import { closeMenuOnEscape } from './main/closeMenuOnEscape.js';
import { initializeCytoscape as initializeCytoscapeModule } from './main/initializeCytoscape.js';
import { fallbackToLegacy as fallbackToLegacyModule } from './main/fallbackToLegacy.js';
import { showContactModal } from './main/showContactModal.js';
import { showNodeDescriptionModal as showNodeDescriptionModalModule } from './main/showNodeDescriptionModal.js';
import { closeNodeDescriptionModal as closeNodeDescriptionModalModule } from './main/closeNodeDescriptionModal.js';
import { addTitleParallaxEffect } from './main/addTitleParallaxEffect.js';

//console.log('Main.js script starting - Checking ContactModal availability:', typeof ContactModal !== 'undefined' ? 'Available' : 'Not available');

const DEBUG_MODE = false; // Enable debugging for testing
const debug = document.getElementById('debug');
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

if (DEBUG_MODE) {
  debug.style.display = 'block';
  debug.style.position = 'fixed';
  debug.style.bottom = '20px';
  debug.style.right = '20px';
  debug.style.zIndex = '9999';
}

if (!DEBUG_MODE) {
  debug.style.display = 'none';
} else {
  // Add implementation toggle button in debug mode
  debug.innerHTML = `
    <div class="debug-panel">
      <h3>TDD Testing Panel</h3>
      <div class="implementation-status">
        <span>Current: <strong>${useCytoscape ? 'CYTOSCAPE' : 'LEGACY'}</strong></span>
      </div>
      <button id="toggleImplementation">Toggle Visualization</button>
      <button id="testVisualization">Run Tests</button>
      <div id="debugOutput"></div>
    </div>
  `;

  // Add event listeners once DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Setup toggle button
    document.getElementById('toggleImplementation').addEventListener('click', () => toggleImplementation(useCytoscape));
    document.getElementById('testVisualization').addEventListener('click', () => testCurrentVisualization(useCytoscape, testCytoscapeImplementation, testLegacyImplementation, runEndToEndTest));

    // Run tests automatically on load
    setTimeout(() => {
      //console.log('[TDD] Automatically running tests...');
      testCurrentVisualization(useCytoscape, testCytoscapeImplementation, testLegacyImplementation, runEndToEndTest);
    }, 1000);
  });
}

// Toggle between implementations - function moved to ./main/toggleImplementation.js

// Test current visualization implementation - function moved to ./main/testCurrentVisualization.js

// Test Cytoscape implementation - function moved to ./main/testCytoscapeImplementation.js

// Test Legacy implementation - function moved to ./main/testLegacyImplementation.js

// Handle language change by updating node display - function moved to ./main/setLanguage.js
function setLanguage(lang) {
  mainCurrentLanguage = setLanguageModule(lang, useCytoscape, closeMenuOnEscape);
}

// Function to handle keyboard navigation in language selector - function moved to ./main/handleLanguageKeydown.js
function handleLanguageKeydown(event, lang) {
  handleLanguageKeydownModule(event, lang, setLanguage);
}

// Close menu on escape key - function moved to ./main/closeMenuOnEscape.js

// Initialize Cytoscape visualization - function moved to ./main/initializeCytoscape.js
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

// Fallback to legacy visualization if Cytoscape fails - function moved to ./main/fallbackToLegacy.js
function fallbackToLegacy() {
  // Create a reference object for useCytoscape to allow modification by reference
  const useCytoscapeRef = { value: useCytoscape };
  fallbackToLegacyModule(useCytoscapeRef);
  // Update the global variable with any changes
  useCytoscape = useCytoscapeRef.value;
}

// Bridge function to show contact modal (works with both implementations) - function moved to ./main/showContactModal.js

// Function to show a modal with node description - function moved to ./main/showNodeDescriptionModal.js
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

// Function to close the node description modal - function moved to ./main/closeNodeDescriptionModal.js
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

// Add parallax effect to modal title - function moved to ./main/addTitleParallaxEffect.js

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
function runEndToEndTest() {
  console.log('[TDD] Starting end-to-end test for Cytoscape implementation');

  // Step 1: Check if all components are available
  const componentsTest = testCytoscapeImplementation(document.createElement('div'));
  if (!componentsTest) {
    console.error('[TDD] End-to-end test failed: Component tests did not pass');
    return false;
  }

  // Step 2: Test actual initialization
  try {
    const result = initializeCytoscape();
    if (!result) {
      console.error('[TDD] End-to-end test failed: Initialization returned false');
      return false;
    }

    // Step 3: Verify Cytoscape instance exists
    const cy = window.CytoscapeManager.getCytoscapeInstance();
    if (!cy) {
      console.error('[TDD] End-to-end test failed: No Cytoscape instance after initialization');
      return false;
    }

    // Step 4: Verify graph has nodes and edges
    const nodeCount = cy.nodes().length;
    const edgeCount = cy.edges().length;
    console.log(`[TDD] Initialized graph has ${nodeCount} nodes and ${edgeCount} edges`);

    if (nodeCount === 0 || edgeCount === 0) {
      console.error('[TDD] End-to-end test failed: Graph has no nodes or edges');
      return false;
    }

    //console.log('[TDD] End-to-end test PASSED! Cytoscape implementation is working correctly');
    return true;
  } catch (e) {
    console.error('[TDD] End-to-end test failed with error:', e);
    return false;
  }
}

// Ensure Cytoscape initialization is called on page load
document.addEventListener('DOMContentLoaded', function() {
  if (useCytoscape) {
    //console.log('[TDD] Page loaded, initializing Cytoscape');
    initializeCytoscape();
  }
});
