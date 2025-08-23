/**
 * Debug panel setup and management
 *
 * args:
 *   ▸ DEBUG_MODE: boolean - whether debug mode is enabled
 *   ▸ debug: HTMLElement - debug container element
 *   ▸ useCytoscape: boolean - current implementation flag
 *   ▸ toggleImplementation: function - function to toggle implementation
 *   ▸ testCurrentVisualization: function - function to test current visualization
 *   ▸ testCytoscapeImplementation: function - function to test Cytoscape
 *   ▸ testLegacyImplementation: function - function to test Legacy
 *   ▸ runEndToEndTest: function - function to run end-to-end tests
 * return:
 *   ▸ void
 * raise:
 *   ▸ none
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/debugPanel.test.js
 *   ▸ npm test -- --testPathPattern=debugPanel.test.js
 */
export function setupDebugPanel(DEBUG_MODE, debug, useCytoscape, toggleImplementation, testCurrentVisualization, testCytoscapeImplementation, testLegacyImplementation, runEndToEndTest) {
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
}
