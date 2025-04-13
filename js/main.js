/*
 * Main.js - Simplified version for non-canvas approach
 */

const DEBUG_MODE = true; // Enable debugging for testing
const debug = document.getElementById('debug');
// Feature flag to toggle between implementations
let useCytoscape = false; // Default to false

// Check localStorage for saved preference
if (localStorage.getItem('useCytoscape') === 'true') {
  useCytoscape = true;
}

// Set data attribute on body for CSS targeting
document.body.setAttribute('data-vis', useCytoscape ? 'cytoscape' : 'legacy');

// Current language selection
let mainCurrentLanguage = 'en';

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
    document.getElementById('toggleImplementation').addEventListener('click', toggleImplementation);
    document.getElementById('testVisualization').addEventListener('click', testCurrentVisualization);

    // Run tests automatically on load
    setTimeout(() => {
      console.log('[TDD] Automatically running tests...');
      testCurrentVisualization();
    }, 1000);
  });
}

// Toggle between implementations
function toggleImplementation() {
  const debugOutput = document.getElementById('debugOutput');
  debugOutput.innerHTML = `<p>Switching from ${useCytoscape ? 'Cytoscape' : 'Legacy'} to ${useCytoscape ? 'Legacy' : 'Cytoscape'}...</p>`;

  // Set the global flag - we use localStorage to persist across page reloads
  localStorage.setItem('useCytoscape', useCytoscape ? 'false' : 'true');

  // Reload page to apply the change
  setTimeout(() => window.location.reload(), 500);
}

// Test current visualization implementation
function testCurrentVisualization() {
  const debugOutput = document.getElementById('debugOutput');
  debugOutput.innerHTML = '<p>Running tests...</p>';

  console.log('[TDD] Running tests on current implementation:', useCytoscape ? 'Cytoscape' : 'Legacy');

  // Run appropriate tests based on implementation
  const results = useCytoscape ?
    testCytoscapeImplementation(debugOutput) :
    testLegacyImplementation(debugOutput);

  // If Cytoscape tests passed, also run end-to-end test
  let e2eResults = false;
  if (useCytoscape && results) {
    console.log('[TDD] Component tests passed, running end-to-end test...');
    e2eResults = runEndToEndTest();
  }

  // Show test results header with pass/fail status
  const finalSuccess = useCytoscape ? (results && e2eResults) : results;

  debugOutput.innerHTML = `
    <h4>Test Results: ${useCytoscape ? 'Cytoscape' : 'Legacy'} Implementation</h4>
    <div class="test-summary ${finalSuccess ? 'pass' : 'fail'}">
      ${finalSuccess ? '✅ All tests passed!' : '❌ Some tests failed!'}
    </div>
    ${debugOutput.innerHTML}
    ${useCytoscape && results ? `
    <div class="test-section">
      <h5>End-to-End Test</h5>
      <div class="test-item ${e2eResults ? 'pass' : 'fail'}">
        <span class="test-result">${e2eResults ? '✅ PASS' : '❌ FAIL'}</span>
        <span class="test-name">Complete Cytoscape initialization</span>
      </div>
    </div>
    ` : ''}
    <div class="test-actions">
      <button id="runCytoscapeTest" ${useCytoscape ? 'disabled' : ''}>Test Cytoscape</button>
      <button id="runLegacyTest" ${!useCytoscape ? 'disabled' : ''}>Test Legacy</button>
    </div>
  `;

  // Add button event listeners
  setTimeout(() => {
    const cytoscapeButton = document.getElementById('runCytoscapeTest');
    const legacyButton = document.getElementById('runLegacyTest');

    if (cytoscapeButton) {
      cytoscapeButton.addEventListener('click', () => {
        localStorage.setItem('useCytoscape', 'true');
        window.location.reload();
      });
    }

    if (legacyButton) {
      legacyButton.addEventListener('click', () => {
        localStorage.setItem('useCytoscape', 'false');
        window.location.reload();
      });
    }
  }, 0);
}

// Test Cytoscape implementation
function testCytoscapeImplementation(outputElement) {
  let results = [];
  let allTestsPassed = true;

  console.log('[TDD] Running Cytoscape component tests...');

  // Test 1: Check if Cytoscape library is loaded
  const test1 = typeof cytoscape === 'function';
  console.log('[TDD] Test 1 - Cytoscape library loaded:', test1 ? 'PASS' : 'FAIL');
  results.push({
    name: 'Cytoscape library loaded',
    result: test1 ? '✅ PASS' : '❌ FAIL',
    passed: test1
  });
  if (!test1) allTestsPassed = false;

  // Test 2: Check if CytoscapeManager is available
  const test2 = typeof window.CytoscapeManager === 'object';
  console.log('[TDD] Test 2 - CytoscapeManager available:', test2 ? 'PASS' : 'FAIL');
  results.push({
    name: 'CytoscapeManager available',
    result: test2 ? '✅ PASS' : '❌ FAIL',
    passed: test2
  });
  if (!test2) allTestsPassed = false;

  // Test 3: Check if CytoscapeEdgeStyles namespace is available
  const test3 = typeof window.CytoscapeEdgeStyles === 'object';
  console.log('[TDD] Test 3 - CytoscapeEdgeStyles available:', test3 ? 'PASS' : 'FAIL');
  results.push({
    name: 'CytoscapeEdgeStyles available',
    result: test3 ? '✅ PASS' : '❌ FAIL',
    passed: test3
  });
  if (!test3) allTestsPassed = false;

  // Test 4: Check if CytoscapeEdgeInteractions namespace is available
  const test4 = typeof window.CytoscapeEdgeInteractions === 'object';
  console.log('[TDD] Test 4 - CytoscapeEdgeInteractions available:', test4 ? 'PASS' : 'FAIL');
  results.push({
    name: 'CytoscapeEdgeInteractions available',
    result: test4 ? '✅ PASS' : '❌ FAIL',
    passed: test4
  });
  if (!test4) allTestsPassed = false;

  // Test 5: Check if CytoscapeStylesheet is available
  const test5 = typeof window.CytoscapeStylesheet === 'object';
  console.log('[TDD] Test 5 - CytoscapeStylesheet available:', test5 ? 'PASS' : 'FAIL');
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
      console.log('[TDD] Testing Cytoscape initialization capability');
      const container = document.getElementById('cy-container');
      if (container) {
        test6 = true;
      }
    }
  } catch (e) {
    console.error('[TDD] Initialization test error:', e);
  }

  console.log('[TDD] Test 6 - Cytoscape initialization possible:', test6 ? 'PASS' : 'FAIL');
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

  console.log('[TDD] Cytoscape tests completed with result:', allTestsPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED');
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
    console.log('[TDD] Starting Cytoscape initialization');

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

    // Initialize Cytoscape with container
    console.log('[TDD] Calling CytoscapeManager.initialize()');
    const cy = window.CytoscapeManager.initialize('cy-container');

    if (!cy) {
      console.error('[TDD] Failed to initialize Cytoscape - no instance returned');
      fallbackToLegacy();
      return;
    }

    console.log('[TDD] Cytoscape instance created successfully');

    // Check if nodes and links are available
    if (!window.nodes || !window.links || !Array.isArray(window.nodes) || !Array.isArray(window.links)) {
      console.error('[TDD] Nodes or links data not available');
      fallbackToLegacy();
      return;
    }

    // Load graph data
    console.log('[TDD] Loading graph data');
    window.CytoscapeManager.loadNodesJsGraph(window.nodes, window.links, {
      language: mainCurrentLanguage,
      responsive: true
    });
    console.log('[TDD] Graph data loaded with', window.nodes.length, 'nodes and', window.links.length, 'links');

    // Register contact modal handler
    console.log('[TDD] Registering selection handlers');
    window.CytoscapeManager.registerSelectionHandlers({
      onNodeSelected: (nodeId, nodeData) => {
        console.log('[TDD] Node selected:', nodeId);
        if (nodeData.category === 'Contact') {
          showContactModal(nodeData);
        }
      }
    });

    // Apply initial language
    console.log('[TDD] Setting initial language to', mainCurrentLanguage);
    window.CytoscapeManager.setLanguage(mainCurrentLanguage);

    console.log('[TDD] Cytoscape initialization complete');
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
    console.log('[DEBUG] Initializing legacy NodeDisplay');
    window.NodeDisplay.initNodeDisplay();
  } else {
    console.error('[DEBUG] Legacy visualization not available as fallback');
  }
}

// Bridge function to show contact modal (works with both implementations)
function showContactModal(nodeData) {
  console.log('[DEBUG] Showing contact modal for:', nodeData);

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

  // Close language menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!langToggle.contains(event.target) && !langMenu.contains(event.target)) {
      langMenu.classList.remove('active');
      langToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Make handle language keydown available globally
  window.handleLanguageKeydown = handleLanguageKeydown;

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

    console.log('[TDD] End-to-end test PASSED! Cytoscape implementation is working correctly');
    return true;
  } catch (e) {
    console.error('[TDD] End-to-end test failed with error:', e);
    return false;
  }
}
