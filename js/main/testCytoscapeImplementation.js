/**
 * Test Cytoscape implementation components
 *
 * args:
 *   ▸ outputElement: HTMLElement - element to display test results
 * return:
 *   ▸ boolean - true if all tests passed, false otherwise
 * raise:
 *   ▸ none
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/testCytoscapeImplementation.test.js
 *   ▸ npm test -- --testPathPattern=testCytoscapeImplementation.test.js
 */
export function testCytoscapeImplementation(outputElement) {
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
