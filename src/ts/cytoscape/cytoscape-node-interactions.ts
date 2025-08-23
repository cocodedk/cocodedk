/**
 * TypeScript version of the Cytoscape node interactions module.
 * Handles node hover, selection, and click events.
 */

import { CytoscapeInstance, CytoscapeEventObject } from '../types/cytoscape';

/**
 * Options for node selection interactions
 */
interface NodeSelectionOptions {
  onNodeSelect?: (node: any) => void;
}

/**
 * Options for node click interactions
 */
interface NodeClickOptions {
  onNodeClick?: (node: any) => void;
}

/**
 * Options for node drag interactions
 */
interface NodeDragOptions {
  onDragStart?: (node: any) => void;
  onDrag?: (node: any) => void;
  onDragEnd?: (node: any) => void;
}

/**
 * Setup node hover interactions
 *
 * @param {CytoscapeInstance} cy - Cytoscape instance
 * @returns {void}
 */
function setupNodeHoverInteractions(cy: CytoscapeInstance): void {
  if (!cy) {
    console.error('Cytoscape instance is required for node hover interactions');
    return;
  }

  // Add hover class on mouseover
  cy.on('mouseover', 'node', (event: CytoscapeEventObject) => {
    const node = event.target;
    node.addClass('hover');

    // Optional: highlight connected edges on hover
    if (window.CytoscapeEdgeInteractions &&
        typeof window.CytoscapeEdgeInteractions.highlightConnectedEdges === 'function') {
      window.CytoscapeEdgeInteractions.highlightConnectedEdges(node, cy);
    }
  });

  // Remove hover class on mouseout
  cy.on('mouseout', 'node', (event: CytoscapeEventObject) => {
    const node = event.target;
    node.removeClass('hover');

    // Optional: clear highlighted edges
    if (window.CytoscapeEdgeInteractions &&
        typeof window.CytoscapeEdgeInteractions.clearHighlightedEdges === 'function') {
      window.CytoscapeEdgeInteractions.clearHighlightedEdges(cy);
    }
  });
}

/**
 * Setup node selection interactions
 *
 * @param {CytoscapeInstance} cy - Cytoscape instance
 * @param {NodeSelectionOptions} options - Configuration options
 * @returns {void}
 */
function setupNodeSelectionInteractions(cy: CytoscapeInstance, options: NodeSelectionOptions = {}): void {
  if (!cy) {
    console.error('Cytoscape instance is required for node selection interactions');
    return;
  }

  const selectionCallback = options.onNodeSelect || function() {};

  // Handle node selection
  cy.on('select', 'node', (event: CytoscapeEventObject) => {
    const node = event.target;
    selectionCallback(node);
  });

  // Handle node unselection
  cy.on('unselect', 'node', (_event: CytoscapeEventObject) => {
    // Additional unselection logic if needed
  });
}

/**
 * Setup node click interactions
 *
 * @param {CytoscapeInstance} cy - Cytoscape instance
 * @param {NodeClickOptions} options - Configuration options
 * @returns {void}
 */
function setupNodeClickInteractions(cy: CytoscapeInstance, options: NodeClickOptions = {}): void {
  if (!cy) {
    console.error('Cytoscape instance is required for node click interactions');
    return;
  }

  const clickCallback = options.onNodeClick || function() {};

  // Handle node click
  cy.on('tap', 'node', (event: CytoscapeEventObject) => {
    const node = event.target;
    clickCallback(node);
  });
}

/**
 * Setup node drag interactions
 *
 * @param {CytoscapeInstance} cy - Cytoscape instance
 * @param {NodeDragOptions} options - Configuration options
 * @returns {void}
 */
function setupNodeDragInteractions(cy: CytoscapeInstance, options: NodeDragOptions = {}): void {
  if (!cy) {
    console.error('Cytoscape instance is required for node drag interactions');
    return;
  }

  const onDragStart = options.onDragStart || function() {};
  const onDrag = options.onDrag || function() {};
  const onDragEnd = options.onDragEnd || function() {};

  // Handle node drag start
  cy.on('dragstart', 'node', (event: CytoscapeEventObject) => {
    const node = event.target;
    onDragStart(node);
  });

  // Handle node drag
  cy.on('drag', 'node', (event: CytoscapeEventObject) => {
    const node = event.target;
    onDrag(node);
  });

  // Handle node drag end
  cy.on('dragfree', 'node', (event: CytoscapeEventObject) => {
    const node = event.target;
    onDragEnd(node);
  });
}

// Create namespace and expose the functions for backward compatibility with JavaScript code
interface CytoscapeNodeInteractions {
  setupNodeHoverInteractions: typeof setupNodeHoverInteractions;
  setupNodeSelectionInteractions: typeof setupNodeSelectionInteractions;
  setupNodeClickInteractions: typeof setupNodeClickInteractions;
  setupNodeDragInteractions: typeof setupNodeDragInteractions;
}

// Define window with Cytoscape properties for TypeScript
declare global {
  interface Window {
    CytoscapeNodeInteractions: CytoscapeNodeInteractions;
    CytoscapeEdgeInteractions: any;
  }
}

// Initialize the namespace if it doesn't exist
if (!window.CytoscapeNodeInteractions) {
  window.CytoscapeNodeInteractions = {} as CytoscapeNodeInteractions;
}

// Expose the functions globally
window.CytoscapeNodeInteractions.setupNodeHoverInteractions = setupNodeHoverInteractions;
window.CytoscapeNodeInteractions.setupNodeSelectionInteractions = setupNodeSelectionInteractions;
window.CytoscapeNodeInteractions.setupNodeClickInteractions = setupNodeClickInteractions;
window.CytoscapeNodeInteractions.setupNodeDragInteractions = setupNodeDragInteractions;

// Export for TypeScript modules
export {
  setupNodeHoverInteractions,
  setupNodeSelectionInteractions,
  setupNodeClickInteractions,
  setupNodeDragInteractions,
  NodeSelectionOptions,
  NodeClickOptions,
  NodeDragOptions
};
