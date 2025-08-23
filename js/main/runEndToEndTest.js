/**
 * Run end-to-end test for Cytoscape implementation
 *
 * args:
 *   ▸ testCytoscapeImplementation: function - function to test Cytoscape components
 *   ▸ initializeCytoscape: function - function to initialize Cytoscape
 * return:
 *   ▸ boolean - true if all tests pass, false otherwise
 * raise:
 *   ▸ Error - if test execution fails
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/runEndToEndTest.test.js
 *   ▸ npm test -- --testPathPattern=runEndToEndTest.test.js
 */
export function runEndToEndTest(testCytoscapeImplementation, initializeCytoscape) {
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
