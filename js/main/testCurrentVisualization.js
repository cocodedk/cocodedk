/**
 * Test current visualization implementation
 *
 * args:
 *   ▸ useCytoscape: boolean - current implementation flag
 *   ▸ testCytoscapeImplementation: function - function to test Cytoscape implementation
 *   ▸ testLegacyImplementation: function - function to test Legacy implementation
 *   ▸ runEndToEndTest: function - function to run end-to-end tests
 * return:
 *   ▸ void
 * raise:
 *   ▸ none
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/testCurrentVisualization.test.js
 *   ▸ npm test -- --testPathPattern=testCurrentVisualization.test.js
 */
export function testCurrentVisualization(useCytoscape, testCytoscapeImplementation, testLegacyImplementation, runEndToEndTest) {
  const debugOutput = document.getElementById('debugOutput');
  debugOutput.innerHTML = '<p>Running tests...</p>';

  //console.log('[TDD] Running tests on current implementation:', useCytoscape ? 'Cytoscape' : 'Legacy');

  // Run appropriate tests based on implementation
  const results = useCytoscape ?
    testCytoscapeImplementation(debugOutput) :
    testLegacyImplementation(debugOutput);

  // If Cytoscape tests passed, also run end-to-end test
  let e2eResults = false;
  if (useCytoscape && results) {
    //console.log('[TDD] Component tests passed, running end-to-end test...');
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
