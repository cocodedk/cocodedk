/**
 * Toggle between Cytoscape and Legacy implementations
 *
 * args:
 *   ▸ useCytoscape: boolean - current implementation flag
 * return:
 *   ▸ void
 * raise:
 *   ▸ none
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/toggleImplementation.test.js
 *   ▸ npm test -- --testPathPattern=toggleImplementation.test.js
 */
export function toggleImplementation(useCytoscape) {
  const debugOutput = document.getElementById('debugOutput');
  debugOutput.innerHTML = `<p>Switching from ${useCytoscape ? 'Cytoscape' : 'Legacy'} to ${useCytoscape ? 'Legacy' : 'Cytoscape'}...</p>`;

  // Set the global flag - we use localStorage to persist across page reloads
  localStorage.setItem('useCytoscape', useCytoscape ? 'false' : 'true');

  // Reload page to apply the change
  setTimeout(() => window.location.reload(), 500);
}
