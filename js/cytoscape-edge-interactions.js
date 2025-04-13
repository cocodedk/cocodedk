/**
 * Edge Interactions Module for Cytoscape
 *
 * Provides handlers for edge interaction events including hover and selection.
 * This follows a separation of concerns pattern to isolate edge interaction logic.
 */

(function() {
  'use strict';

  /**
   * Setup edge hover interactions
   *
   * @param {Object} cy - Cytoscape instance
   * @returns {void}
   */
  function setupEdgeHoverInteractions(cy) {
    if (!cy) {
      console.error('Cytoscape instance is required for edge hover interactions');
      return;
    }

    // Add hover class on mouseover
    cy.on('mouseover', 'edge', function(event) {
      event.target.addClass('hover');
    });

    // Remove hover class on mouseout
    cy.on('mouseout', 'edge', function(event) {
      event.target.removeClass('hover');
    });

    //console.log('[TDD] Edge hover interactions setup complete');
  }

  /**
   * Setup edge selection interactions
   *
   * @param {Object} cy - Cytoscape instance
   * @param {Object} options - Configuration options
   * @returns {void}
   */
  function setupEdgeSelectionInteractions(cy, options) {
    if (!cy) {
      console.error('Cytoscape instance is required for edge selection interactions');
      return;
    }

    options = options || {};
    const selectionCallback = options.onEdgeSelect || function() {};

    // Handle edge selection
    cy.on('select', 'edge', function(event) {
      const edge = event.target;
      selectionCallback(edge);
    });

    // Handle edge unselection
    cy.on('unselect', 'edge', function(event) {
      // Additional unselection logic if needed
    });

    //console.log('[TDD] Edge selection interactions setup complete');
  }

  /**
   * Setup edge click interactions
   *
   * @param {Object} cy - Cytoscape instance
   * @param {Object} options - Configuration options
   * @returns {void}
   */
  function setupEdgeClickInteractions(cy, options) {
    if (!cy) {
      console.error('Cytoscape instance is required for edge click interactions');
      return;
    }

    options = options || {};
    const clickCallback = options.onEdgeClick || function() {};

    // Handle edge click
    cy.on('tap', 'edge', function(event) {
      const edge = event.target;
      clickCallback(edge);
    });

    //console.log('[TDD] Edge click interactions setup complete');
  }

  /**
   * Highlight edges connected to a node
   *
   * @param {Object} node - Cytoscape node
   * @param {Object} cy - Cytoscape instance
   * @returns {Array} - Array of highlighted edges
   */
  function highlightConnectedEdges(node, cy) {
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
   * @param {Object} cy - Cytoscape instance
   */
  function clearHighlightedEdges(cy) {
    if (!cy) {
      console.error('Cytoscape instance is required for clearing highlighted edges');
      return;
    }

    cy.edges().removeClass('highlight');
  }

  /**
   * Select an edge by ID
   *
   * @param {Object} cy - Cytoscape instance
   * @param {string} edgeId - ID of the edge to select
   * @param {boolean} exclusive - Whether to unselect other elements
   * @returns {boolean} Success indicator
   */
  function selectEdge(cy, edgeId, exclusive = true) {
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

  // Expose functions via window object
  window.CytoscapeEdgeInteractions = {
    setupEdgeHoverInteractions: setupEdgeHoverInteractions,
    setupEdgeSelectionInteractions: setupEdgeSelectionInteractions,
    setupEdgeClickInteractions: setupEdgeClickInteractions,
    highlightConnectedEdges: highlightConnectedEdges,
    clearHighlightedEdges: clearHighlightedEdges,
    selectEdge: selectEdge
  };

  // For Node.js environment (testing)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      setupEdgeHoverInteractions: setupEdgeHoverInteractions,
      setupEdgeSelectionInteractions: setupEdgeSelectionInteractions,
      setupEdgeClickInteractions: setupEdgeClickInteractions,
      highlightConnectedEdges: highlightConnectedEdges,
      clearHighlightedEdges: clearHighlightedEdges,
      selectEdge: selectEdge
    };
  }

  //console.log('[TDD] CytoscapeEdgeInteractions module loaded');
})();
