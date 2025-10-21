/**
 * Fallback to legacy visualization if Cytoscape fails
 *
 * args:
 *   ▸ useCytoscapeRef: object - reference to useCytoscape flag for modification
 * return:
 *   ▸ void
 * raise:
 *   ▸ none
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/fallbackToLegacy.test.js
 *   ▸ npm test -- --testPathPattern=fallbackToLegacy.test.js
 */
export function fallbackToLegacy(useCytoscapeRef) {
  console.warn('[DEBUG] Falling back to legacy visualization');
  // Set the implementation flag back to legacy
  useCytoscapeRef.value = false;
  document.body.setAttribute('data-vis', 'legacy');

  if (window.NodeDisplay && typeof window.NodeDisplay.initNodeDisplay === 'function') {
    //console.log('[DEBUG] Initializing legacy NodeDisplay');
    window.NodeDisplay.initNodeDisplay();
  } else {
    console.error('[DEBUG] Legacy visualization not available as fallback');
  }
}
