/**
 * Test Legacy implementation components
 *
 * args:
 *   ▸ outputElement: HTMLElement - element to display test results
 * return:
 *   ▸ void
 * raise:
 *   ▸ none
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/testLegacyImplementation.test.js
 *   ▸ npm test -- --testPathPattern=testLegacyImplementation.test.js
 */
export function testLegacyImplementation(outputElement) {
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
