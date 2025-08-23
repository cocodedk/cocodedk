/*
 * Main.js - Simplified version for non-canvas approach
 */

// Import modular functions
import { toggleImplementation } from './main/toggleImplementation.js';
import { testCurrentVisualization } from './main/testCurrentVisualization.js';

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

// Test Cytoscape implementation
function testCytoscapeImplementation(outputElement) {
  let results = [];
  let allTestsPassed = true;

  //console.log('[TDD] Running Cytoscape component tests...');

  // Test 1: Check if Cytoscape library is loaded
  const test1 = typeof cytoscape === 'function';
  //console.log('[TDD] Test 1 - Cytoscape library loaded:', test1 ? 'PASS' : 'FAIL');
  results.push({
    name: 'Cytoscape library loaded',
    result: test1 ? '✅ PASS' : '❌ FAIL',
    passed: test1
  });
  if (!test1) allTestsPassed = false;

  // Test 2: Check if CytoscapeManager is available
  const test2 = typeof window.CytoscapeManager === 'object';
  //console.log('[TDD] Test 2 - CytoscapeManager available:', test2 ? 'PASS' : 'FAIL');
  results.push({
    name: 'CytoscapeManager available',
    result: test2 ? '✅ PASS' : '❌ FAIL',
    passed: test2
  });
  if (!test2) allTestsPassed = false;

  // Test 3: Check if CytoscapeEdgeStyles namespace is available
  const test3 = typeof window.CytoscapeEdgeStyles === 'object';
  //console.log('[TDD] Test 3 - CytoscapeEdgeStyles available:', test3 ? 'PASS' : 'FAIL');
  results.push({
    name: 'CytoscapeEdgeStyles available',
    result: test3 ? '✅ PASS' : '❌ FAIL',
    passed: test3
  });
  if (!test3) allTestsPassed = false;

  // Test 4: Check if CytoscapeEdgeInteractions namespace is available
  const test4 = typeof window.CytoscapeEdgeInteractions === 'object';
  //console.log('[TDD] Test 4 - CytoscapeEdgeInteractions available:', test4 ? 'PASS' : 'FAIL');
  results.push({
    name: 'CytoscapeEdgeInteractions available',
    result: test4 ? '✅ PASS' : '❌ FAIL',
    passed: test4
  });
  if (!test4) allTestsPassed = false;

  // Test 5: Check if CytoscapeStylesheet is available
  const test5 = typeof window.CytoscapeStylesheet === 'object';
  //console.log('[TDD] Test 5 - CytoscapeStylesheet available:', test5 ? 'PASS' : 'FAIL');
  results.push({
    name: 'CytoscapeStylesheet available',
    result: test5 ? '✅ PASS' : '❌ FAIL',
    passed: test5
  });
  if (!test5) allTestsPassed = false;

  // Test 6: Check if Cytoscape can be initialized
  let test6 = false;
  try {
    if (window.CytoscapeManager && typeof window.CytoscapeManager.initialize === 'function') {
      //console.log('[TDD] Testing Cytoscape initialization capability');
      const container = document.getElementById('cy-container');
      if (container) {
        test6 = true;
      }
    }
  } catch (e) {
    console.error('[TDD] Initialization test error:', e);
  }

  //console.log('[TDD] Test 6 - Cytoscape initialization possible:', test6 ? 'PASS' : 'FAIL');
  results.push({
    name: 'Cytoscape initialization possible',
    result: test6 ? '✅ PASS' : '❌ FAIL',
    passed: test6
  });
  if (!test6) allTestsPassed = false;

  // Output results with proper styling
  outputElement.innerHTML = `
    <h4>Cytoscape Component Tests</h4>
    <div class="test-results">
      ${results.map(r => `
        <div class="test-item ${r.passed ? 'pass' : 'fail'}">
          <span class="test-result">${r.result}</span>
          <span class="test-name">${r.name}</span>
        </div>
      `).join('')}
      <div class="test-summary ${allTestsPassed ? 'pass' : 'fail'}">
        ${allTestsPassed ? '✅ All tests passed' : '❌ Some tests failed'}
      </div>
    </div>
  `;

  //console.log('[TDD] Cytoscape tests completed with result:', allTestsPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED');
  return allTestsPassed;
}

// Test Legacy implementation
function testLegacyImplementation(outputElement) {
  let results = [];

  // Check if NodeDisplay is available
  if (!window.NodeDisplay) {
    results.push('❌ NodeDisplay not available');
  } else {
    results.push('✅ NodeDisplay available');
  }

  // Check for node container
  const container = document.querySelector('.node-container');
  if (!container) {
    results.push('❌ No node-container element found');
  } else {
    results.push('✅ Node container exists');
    // Check nodes and links
    const nodeElements = container.querySelectorAll('.node');
    const linkElements = container.querySelectorAll('.node-link');
    results.push(`ℹ️ Node elements count: ${nodeElements.length}`);
    results.push(`ℹ️ Link elements count: ${linkElements.length}`);
  }

  // Output results
  outputElement.innerHTML = results.map(r => `<p>${r}</p>`).join('');
}

// Handle language change by updating node display
function setLanguage(lang) {
  mainCurrentLanguage = lang;

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
}

// Function to handle keyboard navigation in language selector
function handleLanguageKeydown(event, lang) {
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

// Close menu on escape key
function closeMenuOnEscape(e) {
  if (e.key === 'Escape') {
    const langMenu = document.getElementById('languageSelector');
    const langToggle = document.getElementById('langToggle');

    langMenu.classList.remove('active');
    langToggle.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', closeMenuOnEscape);
  }
}

// Initialize Cytoscape visualization
function initializeCytoscape() {
  try {
    //console.log('[TDD] Starting Cytoscape initialization');

    // Check if Cytoscape library is loaded
    if (typeof cytoscape !== 'function') {
      console.error('[TDD] Cytoscape library not found');
      fallbackToLegacy();
      return;
    }

    // Check if CytoscapeManager is available
    if (!window.CytoscapeManager) {
      console.error('[TDD] CytoscapeManager not available');
      fallbackToLegacy();
      return;
    }

    // Check if container exists
    const container = document.getElementById('cy-container');
    if (!container) {
      console.error('[TDD] cy-container element not found');
      fallbackToLegacy();
      return;
    }
    //console.log('[TDD] cy-container found, dimensions:', container.offsetWidth, 'x', container.offsetHeight);

    // Initialize Cytoscape with container
    //console.log('[TDD] Calling CytoscapeManager.initialize()');
    const cy = window.CytoscapeManager.initialize('cy-container');

    if (!cy) {
      console.error('[TDD] Failed to initialize Cytoscape - no instance returned');
      fallbackToLegacy();
      return;
    }

    //console.log('[TDD] Cytoscape instance created successfully');

    // Store the Cytoscape instance for later use
    const cytoscapeInstance = cy;


    // Check for null or invalid nodes
    if (window.nodes && Array.isArray(window.nodes)) {
      //console.log('[TDD] Validating nodes structure...');
      for (let i = 0; i < window.nodes.length; i++) {
        const node = window.nodes[i];
        if (!node) {
          console.error(`[TDD] Node at index ${i} is null or undefined`);
          continue;
        }

        // Check for required fields
        if (!node.id) {
          console.error(`[TDD] Node at index ${i} is missing id property`);
        }
        if (typeof node.x !== 'number' || typeof node.y !== 'number') {
          console.error(`[TDD] Node ${node.id} has invalid position: x=${node.x}, y=${node.y}`);
        }
        if (!node.category) {
          console.error(`[TDD] Node ${node.id} is missing category property`);
        }

        // Check for required label in English at minimum
        if (!node.labels || !node.labels.en) {
          console.error(`[TDD] Node ${node.id} is missing English label`);
        }
      }
    }

    // Check for invalid links
    if (window.links && Array.isArray(window.links)) {
      //console.log('[TDD] Validating links structure...');
      const nodeIds = window.nodes.map(node => node.id);
      for (let i = 0; i < window.links.length; i++) {
        const link = window.links[i];
        if (!Array.isArray(link) || link.length !== 2) {
          console.error(`[TDD] Link at index ${i} has invalid format:`, link);
          continue;
        }

        // Check if source and target nodes exist
        if (!nodeIds.includes(link[0])) {
          console.error(`[TDD] Link source '${link[0]}' at index ${i} does not exist in nodes`);
        }
        if (!nodeIds.includes(link[1])) {
          console.error(`[TDD] Link target '${link[1]}' at index ${i} does not exist in nodes`);
        }
      }
    }

    if (!window.nodes || !window.links || !Array.isArray(window.nodes) || !Array.isArray(window.links)) {
      console.error('[TDD] Nodes or links data not available');
      fallbackToLegacy();
      return;
    }

    // Load graph data
    //console.log('[TDD] Loading graph data');

    // Debug - Check node format before conversion
    if (window.nodes && window.nodes.length > 0) {
      // Try to manually convert nodes to debug any issues
      try {
        const convertedNodes = window.CytoscapeManager.convertNodesToCytoscape(window.nodes);
      } catch (conversionError) {
        console.error('[TDD] Error during node conversion test:', conversionError);
      }
    }

    window.CytoscapeManager.loadNodesJsGraph(window.nodes, window.links, {
      language: mainCurrentLanguage,
      responsive: true
    });
    //console.log('[TDD] Graph data loaded with', window.nodes.length, 'nodes and', window.links.length, 'links');

    // Debug - check if any nodes were actually added to Cytoscape
    const cyInstance = window.CytoscapeManager.getInstance();
    if (cyInstance) {
      const nodeCount = cyInstance.nodes().length;
      //console.log('[TDD] Actual nodes in Cytoscape:', nodeCount);
      if (nodeCount === 0) {
        console.error('[TDD] No nodes were added to Cytoscape instance - checking for errors');
        // Try to manually add a test node
        try {
          cyInstance.add({
            group: 'nodes',
            data: { id: 'test-node', label: 'Test Node' },
            position: { x: 100, y: 100 }
          });
          //console.log('[TDD] Test node added successfully:', cyInstance.nodes().length);

          // Force a relayout and redraw
          cyInstance.layout({ name: 'preset' }).run();
          cyInstance.fit();
          cyInstance.center();
        } catch (nodeError) {
          console.error('[TDD] Error adding test node:', nodeError);
        }
      } else {
        // Ensure nodes are visible
        //console.log('[TDD] Running layout and centering nodes');
        cyInstance.layout({ name: 'preset' }).run();
        cyInstance.fit();
        cyInstance.center();
        //console.log('[TDD] Checking container visibility after layout:', container.style.display, container.style.visibility);
      }
    }

    // Register contact modal handler
    //console.log('[TDD] Registering selection handlers');
    //console.log('Checking ContactModal availability before registering handlers:', typeof ContactModal !== 'undefined' ? 'Available' : 'Not available');
    window.CytoscapeManager.registerSelectionHandlers({
      onNodeSelected: (nodeData) => {
        const currentTime = Date.now();
        if (currentTime - lastSelectionTime < debounceTimeout) {
          //console.log('[Debounce] Ignoring rapid successive click on node:', nodeData.id);
          return;
        }
        lastSelectionTime = currentTime;
        //console.log('[TDD] Node selected:', nodeData);
        //console.log('Checking ContactModal availability during node selection:', typeof ContactModal !== 'undefined' ? 'Available' : 'Not available');
        showNodeDescriptionModal(nodeData);
      }
    });

    // Apply initial language
    //console.log('[TDD] Setting initial language to', mainCurrentLanguage);
    window.CytoscapeManager.setLanguage(mainCurrentLanguage);

        // Initialize subtle animations
    if (typeof NodeAnimation !== 'undefined' && typeof AnimationPresets !== 'undefined') {
      console.log('[ANIMATION] Initializing subtle node animations');
      console.log('[ANIMATION] NodeAnimation available:', typeof NodeAnimation);
      console.log('[ANIMATION] AnimationPresets available:', typeof AnimationPresets);
      console.log('[ANIMATION] Subtle preset:', AnimationPresets.subtle);
      NodeAnimation.initFromConfig(AnimationPresets.subtle);

      // Set up animation update loop integration with Cytoscape
      let animationFrameCount = 0;
      const updateAnimations = () => {
        if (window.nodes && Array.isArray(window.nodes)) {
          NodeAnimation.updateNodePositions(window.nodes);
          // Update Cytoscape node positions
          const currentCy = window.CytoscapeManager.getInstance();
          if (currentCy) {
            window.nodes.forEach(node => {
              const cyNode = currentCy.getElementById(node.id);
              if (cyNode && cyNode.length > 0) {
                cyNode.position({ x: node.x, y: node.y });
              }
            });
          }

          // Debug log every 60 frames (roughly once per second)
          animationFrameCount++;
          if (animationFrameCount % 60 === 0) {
            console.log('[ANIMATION] Frame', animationFrameCount, 'Node positions:', window.nodes.slice(0, 2).map(n => ({id: n.id, x: n.x, y: n.y})));
          }
        }
        requestAnimationFrame(updateAnimations);
      };
      console.log('[ANIMATION] Starting animation loop');
      requestAnimationFrame(updateAnimations);
    }

    //console.log('[TDD] Cytoscape initialization complete');
    return true;
  } catch (e) {
    console.error('[TDD] Error initializing Cytoscape:', e);
    fallbackToLegacy();
    return false;
  }
}

// Fallback to legacy visualization if Cytoscape fails
function fallbackToLegacy() {
  console.warn('[DEBUG] Falling back to legacy visualization');
  // Set the implementation flag back to legacy
  useCytoscape = false;
  document.body.setAttribute('data-vis', 'legacy');

  if (window.NodeDisplay && typeof window.NodeDisplay.initNodeDisplay === 'function') {
    //console.log('[DEBUG] Initializing legacy NodeDisplay');
    window.NodeDisplay.initNodeDisplay();
  } else {
    console.error('[DEBUG] Legacy visualization not available as fallback');
  }
}

// Bridge function to show contact modal (works with both implementations)
function showContactModal(nodeData) {
  //console.log('[DEBUG] Showing contact modal for:', nodeData);

  // Check if we have direct access to the ContactModal from the contact-modal.js
  if (typeof window.ContactModal !== 'undefined' && typeof window.ContactModal.showModal === 'function') {
    window.ContactModal.showModal();
  } else {
    // Fallback - try to find and click the Contact node
    try {
      const contactNode = document.getElementById('node-Contact');
      if (contactNode) {
        // Create and dispatch a synthetic click event
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window
        });
        contactNode.dispatchEvent(clickEvent);
      } else {
        console.error('[DEBUG] Could not find Contact node element');
      }
    } catch (e) {
      console.error('[DEBUG] Error showing contact modal:', e);
    }
  }
}

// Function to show a modal with node description
function showNodeDescriptionModal(nodeData) {

  // Aggressive cleanup of any existing modals before starting
  const existingModals = document.querySelectorAll('.node-modal-overlay, .node-modal, .modal-backdrop, .node-description-modal, #node-description-modal-container');
  existingModals.forEach(modal => modal.remove());
  //console.log('Aggressive cleanup of existing modals before starting, removed:', existingModals.length, 'elements');
  currentModal = null;

  //console.log('[DEBUG] Showing description modal for:', nodeData);
  //console.log('Checking ContactModal availability at start of showNodeDescriptionModal:', typeof ContactModal !== 'undefined' ? 'Available' : 'Not available');

  // Set flag to indicate modal is opening
  isModalOpening = true;
  //console.log('Setting isModalOpening to true');

  // Special handling for Contact node
  if (nodeData.id === 'Contact' || nodeData.category === 'Contact') {
    //console.log('Checking ContactModal and ContactModal.showModal availability:', typeof ContactModal !== 'undefined' ? 'ContactModal Available' : 'Not available', typeof ContactModal !== 'undefined' && ContactModal.showModal ? 'showModal Available' : 'showModal Not available');
    if (typeof ContactModal !== 'undefined' && ContactModal.showModal) {
      //console.log('ContactModal is available, showing modal');
      // Close any existing modals to prevent overlap or visibility issues
      closeNodeDescriptionModal();
      // Attempt to ensure no other modal elements interfere
      const existingModals = document.querySelectorAll('.modal-backdrop, .node-description-modal');
      existingModals.forEach(modal => modal.remove());
      //console.log('Before showing ContactModal, lingering elements count:', document.querySelectorAll('.modal-backdrop, .node-description-modal').length);
      //console.log('Triggering description modal for node:', nodeData.id);
      ContactModal.showModal();
      return; // Exit early to prevent showing the description modal
    } else {
      //console.log('ContactModal not available, falling back to description modal');
    }
  }

  // Get the current language
  const lang = mainCurrentLanguage || 'en';

  // Get node label and description
  const label = nodeData.labels && nodeData.labels[lang] ? nodeData.labels[lang] : nodeData.label || nodeData.id;
  const description = nodeData.translations && nodeData.translations[lang] ? nodeData.translations[lang] : 'No description available.';

  // Create modal HTML with legacy styling
  const modalHTML = `
    <div class="node-modal-overlay" onclick="closeNodeDescriptionModal(event)"></div>
    <div class="node-modal" ${(mainCurrentLanguage === 'ar' || mainCurrentLanguage === 'fa' || mainCurrentLanguage === 'ur') ? 'dir="rtl"' : 'dir="ltr"'}>
      <button class="node-modal-close" onclick="closeNodeDescriptionModal(event)" aria-label="Close">&times;</button>
      <h2>${label}</h2>
      <div class="node-modal-content">${description}</div>
    </div>
  `;

  // Remove any existing modal
  closeNodeDescriptionModal();

  // Add modal to the body
  const modalContainer = document.createElement('div');
  modalContainer.id = 'node-description-modal-container';
  modalContainer.innerHTML = modalHTML;
  document.body.appendChild(modalContainer);

  // Add escape key event listener
  currentEscapeKeyHandler = (e) => {
    if (e.key === 'Escape') {
      // Create a synthetic event that mimics the close button to bypass isModalOpening check
      const syntheticEvent = {
        preventDefault: () => {},
        stopPropagation: () => {},
        target: { classList: { contains: () => true } } // Mimics node-modal-close class
      };
      closeNodeDescriptionModal(syntheticEvent);
    }
  };
  document.addEventListener('keydown', currentEscapeKeyHandler);

  // Add debug log to confirm modal is being triggered for non-Contact nodes
  //console.log('Triggering description modal for node:', nodeData.id);
  // Additional debug to confirm modal is in DOM
  //console.log('Modal container added to DOM, ID:', modalContainer.id);
  //console.log('Modal elements in DOM:', document.querySelectorAll('.node-description-modal').length);
  //console.log('Backdrop elements in DOM:', document.querySelectorAll('.modal-backdrop').length);
  // Ensure modal and backdrop are visible
  const modalElement = document.querySelector('.node-modal');
  if (modalElement) {
    modalElement.style.display = 'block';
    modalElement.style.visibility = 'visible';
    //console.log('Modal style set to visible');

    // Add parallax effect to title (desktop only)
    addTitleParallaxEffect(modalElement);
  }
  const backdropElement = document.querySelector('.modal-backdrop');
  if (backdropElement) {
    backdropElement.style.display = 'block';
    backdropElement.style.visibility = 'visible';
    //console.log('Backdrop style set to visible');
  }

  // Add a longer delay before allowing modal to be closed to prevent accidental closures
  setTimeout(() => {
    const backdropElement = document.querySelector('.modal-backdrop');
    if (backdropElement) {
      backdropElement.onclick = function(event) {
        if (event.target === backdropElement) {
          //console.log('Backdrop clicked directly, but not closing modal to prevent accidental closure - Event details:', event);
          // Do not close the modal
        } else {
          //console.log('Click on modal content, not closing - Event details:', event);
        }
      };
      //console.log('Backdrop click handler set after longer delay');
    }
    // Reset the flag after a shorter delay - 2 seconds was too long
    setTimeout(() => {
      isModalOpening = false;
      //console.log('Setting isModalOpening to false after delay');
    }, 500); // Reduced from 2000ms to 500ms
  }, 500);

  // Add global click event listener to log background clicks outside modal and backdrop
  document.addEventListener('click', function(event) {
    const modalElement = document.querySelector('.node-description-modal');
    const backdropElement = document.querySelector('.modal-backdrop');
    if (modalElement && backdropElement && !modalElement.contains(event.target) && !backdropElement.contains(event.target)) {
      //console.log('Background clicked outside modal and backdrop - Event details:', event);
    }
  }, true);
}

// Store the current escape key handler for cleanup
let currentEscapeKeyHandler = null;

// Function to close the node description modal
function closeNodeDescriptionModal(event) {
  // Prevent event bubbling and default behavior
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

    // Bypass isModalOpening check if the event target is the close button
  if (event && event.target && (
    (event.target.tagName === 'BUTTON' && (event.target.textContent === 'Close' || event.target.textContent === '×' || event.target.innerHTML === '&times;')) ||
    event.target.classList.contains('node-modal-close')
  )) {
    // console.log('Close button detected, bypassing isModalOpening check');
  } else if (isModalOpening) {
    // console.log('Preventing modal closure as it is still opening');
    return;
  }
  // console.log('closeNodeDescriptionModal called - Stack trace:');
  // console.trace('Closure Stack Trace');
  const modalContainer = document.getElementById('node-description-modal-container');
  if (modalContainer) {
    modalContainer.remove();
  }

  // Clean up escape key event listener
  if (currentEscapeKeyHandler) {
    document.removeEventListener('keydown', currentEscapeKeyHandler);
    currentEscapeKeyHandler = null;
  }

  // Additional cleanup to ensure no modal state persists
  const leftoverModals = document.querySelectorAll('.node-modal-overlay, .node-modal, .modal-backdrop, .node-description-modal');
  leftoverModals.forEach(modal => modal.remove());
  // console.log('Modal closed, state reset - checking for lingering elements:', document.querySelectorAll('.modal-backdrop, .node-description-modal').length);
  // Reset node selection state to allow immediate reselection
  if (window.CytoscapeManager && typeof window.CytoscapeManager.clearSelection === 'function') {
    window.CytoscapeManager.clearSelection();
    // console.log('Node selection state reset after modal closure');
  } else {
    // console.log('CytoscapeManager.clearSelection not available, selection state not reset');
  }
}

// Expose the function globally so it can be called from HTML onclick handlers
window.closeNodeDescriptionModal = closeNodeDescriptionModal;

// Add parallax effect to modal title
function addTitleParallaxEffect(modal) {
  const title = modal.querySelector('h2');

  if (!title || !modal) return;

  // Skip parallax effect for mobile devices
  if (window.innerWidth <= 768) {
    // Reset the title styling to ensure it displays properly on mobile
    title.style.transform = 'translateX(-50%)';
    title.style.filter = 'drop-shadow(0 0 15px rgba(255,255,255,0.2))';
    return;
  }

  modal.addEventListener('mousemove', (e) => {
    const rect = modal.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within the modal
    const y = e.clientY - rect.top;  // Y position within the modal

    // Calculate movement (limited to small range)
    const moveX = (x - rect.width / 2) / 50;
    const moveY = (y - rect.height / 2) / 50;

    // Apply the transform - subtle movement based on mouse position
    title.style.transform = `translateX(calc(-50% + ${moveX}px)) translateY(${moveY}px)`;

    // Also adjust the glow direction slightly
    title.style.filter = `drop-shadow(${moveX/2}px ${moveY/2}px 15px rgba(255,255,255,0.2))`;
  });

  // Reset when mouse leaves
  modal.addEventListener('mouseleave', () => {
    title.style.transform = 'translateX(-50%) translateY(0)';
    title.style.filter = 'drop-shadow(0 0 15px rgba(255,255,255,0.2))';
  });
}

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
