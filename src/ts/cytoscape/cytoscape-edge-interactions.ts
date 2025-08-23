/**
 * TypeScript version of the Cytoscape edge interactions module.
 * Provides handlers for edge interaction events including hover and selection.
 */

import { CytoscapeInstance, CytoscapeEventObject } from '../types/cytoscape';

/**
 * Options for edge selection interactions
 */
interface EdgeSelectionOptions {
  onEdgeSelect?: (edge: any) => void;
}

/**
 * Options for edge click interactions
 */
interface EdgeClickOptions {
  onEdgeClick?: (edge: any) => void;
}

/**
 * Setup edge hover interactions
 *
 * @param {CytoscapeInstance} cy - Cytoscape instance
 * @returns {void}
 */
function setupEdgeHoverInteractions(cy: CytoscapeInstance): void {
  if (!cy) {
    console.error('Cytoscape instance is required for edge hover interactions');
    return;
  }

  // Add hover class on mouseover
  cy.on('mouseover', 'edge', (event: CytoscapeEventObject) => {
    event.target.addClass('hover');
  });

  // Remove hover class on mouseout
  cy.on('mouseout', 'edge', (event: CytoscapeEventObject) => {
    event.target.removeClass('hover');
  });
}

/**
 * Setup edge selection interactions
 *
 * @param {CytoscapeInstance} cy - Cytoscape instance
 * @param {EdgeSelectionOptions} options - Configuration options
 * @returns {void}
 */
function setupEdgeSelectionInteractions(cy: CytoscapeInstance, options: EdgeSelectionOptions = {}): void {
  if (!cy) {
    console.error('Cytoscape instance is required for edge selection interactions');
    return;
  }

  const selectionCallback = options.onEdgeSelect || function() {};

  // Handle edge selection
  cy.on('select', 'edge', (event: CytoscapeEventObject) => {
    const edge = event.target;
    selectionCallback(edge);
  });

  // Handle edge unselection
  cy.on('unselect', 'edge', (_event: CytoscapeEventObject) => {
    // Additional unselection logic if needed
  });
}

/**
 * Setup edge click interactions
 *
 * @param {CytoscapeInstance} cy - Cytoscape instance
 * @param {EdgeClickOptions} options - Configuration options
 * @returns {void}
 */
function setupEdgeClickInteractions(cy: CytoscapeInstance, options: EdgeClickOptions = {}): void {
  if (!cy) {
    console.error('Cytoscape instance is required for edge click interactions');
    return;
  }

  const clickCallback = options.onEdgeClick || function() {};

  // Handle edge click
  cy.on('tap', 'edge', (event: CytoscapeEventObject) => {
    const edge = event.target;
    clickCallback(edge);
  });
}

/**
 * Highlight edges connected to a node
 *
 * @param {any} node - Cytoscape node
 * @param {CytoscapeInstance} cy - Cytoscape instance
 * @returns {any} - The highlighted edges
 */
function highlightConnectedEdges(node: any, cy: CytoscapeInstance): any {
  if (!node || !cy) {
    console.error('Node and Cytoscape instance are required for highlighting edges');
    return [];
  }

  // Get connected edges
  const connectedEdges = node.connectedEdges();

  // Add highlight class
  connectedEdges.addClass('highlight');

  // Return the highlighted edges
  return connectedEdges;
}

/**
 * Clear highlighted edges
 *
 * @param {CytoscapeInstance} cy - Cytoscape instance
 */
function clearHighlightedEdges(cy: CytoscapeInstance): void {
  if (!cy) {
    console.error('Cytoscape instance is required for clearing highlighted edges');
    return;
  }

  cy.edges().removeClass('highlight');
}

/**
 * Select an edge by ID
 *
 * @param {CytoscapeInstance} cy - Cytoscape instance
 * @param {string} edgeId - ID of the edge to select
 * @param {boolean} exclusive - Whether to unselect other elements
 * @returns {boolean} Success indicator
 */
function selectEdge(cy: CytoscapeInstance, edgeId: string, exclusive: boolean = true): boolean {
  if (!cy) {
    console.error('Cytoscape instance is required for selecting an edge');
    return false;
  }

  // Handle different Cytoscape APIs in test vs. production
  let edge;
  if (typeof cy.getElementById === 'function') {
    edge = cy.getElementById(edgeId);
  } else if (typeof cy.$id === 'function') {
    edge = cy.$id(edgeId);
  } else if (typeof cy.$ === 'function') {
    edge = cy.$(`#${edgeId}`);
  } else {
    console.warn(`Cannot find edge lookup method on Cytoscape instance`);
    return false;
  }

  // Check if edge exists
  if (!edge || (typeof edge.length !== 'undefined' && edge.length === 0)) {
    console.warn(`Edge with ID "${edgeId}" not found`);
    return false;
  }

  if (exclusive) {
    // Handle different APIs for elements collection
    if (typeof cy.elements === 'function') {
      cy.elements().unselect();
    } else {
      // Fallback for test environment - assume cy is elements collection
      cy.unselect();
    }
  }

  // Select the edge
  edge.select();
  return true;
}

// Create namespace and expose the functions for backward compatibility with JavaScript code
interface CytoscapeEdgeInteractions {
  setupEdgeHoverInteractions: typeof setupEdgeHoverInteractions;
  setupEdgeSelectionInteractions: typeof setupEdgeSelectionInteractions;
  setupEdgeClickInteractions: typeof setupEdgeClickInteractions;
  highlightConnectedEdges: typeof highlightConnectedEdges;
  clearHighlightedEdges: typeof clearHighlightedEdges;
  selectEdge: typeof selectEdge;
}

// Define window with Cytoscape properties for TypeScript
declare global {
  interface Window {
    CytoscapeEdgeInteractions: any; // Match the type in node-interactions.ts
  }
}

// Initialize the namespace if it doesn't exist
if (typeof window !== 'undefined') {
  if (!window.CytoscapeEdgeInteractions) {
    window.CytoscapeEdgeInteractions = {} as CytoscapeEdgeInteractions;
  }

  // Expose the functions globally
  window.CytoscapeEdgeInteractions.setupEdgeHoverInteractions = setupEdgeHoverInteractions;
  window.CytoscapeEdgeInteractions.setupEdgeSelectionInteractions = setupEdgeSelectionInteractions;
  window.CytoscapeEdgeInteractions.setupEdgeClickInteractions = setupEdgeClickInteractions;
  window.CytoscapeEdgeInteractions.highlightConnectedEdges = highlightConnectedEdges;
  window.CytoscapeEdgeInteractions.clearHighlightedEdges = clearHighlightedEdges;
  window.CytoscapeEdgeInteractions.selectEdge = selectEdge;
}

// Export for TypeScript modules
export {
  setupEdgeHoverInteractions,
  setupEdgeSelectionInteractions,
  setupEdgeClickInteractions,
  highlightConnectedEdges,
  clearHighlightedEdges,
  selectEdge,
  EdgeSelectionOptions,
  EdgeClickOptions
};
