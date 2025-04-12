/**
 * Edge Interactions Module for Cytoscape
 *
 * Provides handlers for edge interaction events including hover and selection.
 * This follows a separation of concerns pattern to isolate edge interaction logic.
 */

/**
 * Set up edge hover interactions for a Cytoscape instance
 *
 * @param {Object} cy - Cytoscape instance
 * @return {boolean} - Success status
 */
function setupEdgeHoverInteractions(cy) {
  if (!cy) {
    console.error('Cannot set up edge hover interactions: No Cytoscape instance provided');
    return false;
  }

  // Add mouse enter handler for hover effect
  cy.on('mouseover', 'edge', function(evt) {
    const edge = evt.target;

    // Add hover class to enable hover styling
    edge.addClass('hover');

    // Log for debugging (can be removed in production)
    console.debug('Edge hover start:', edge.id());
  });

  // Add mouse leave handler to remove hover effect
  cy.on('mouseout', 'edge', function(evt) {
    const edge = evt.target;

    // Remove hover class
    edge.removeClass('hover');

    // Log for debugging (can be removed in production)
    console.debug('Edge hover end:', edge.id());
  });

  return true;
}

/**
 * Helper function to find an edge by ID
 *
 * @param {Object} cy - Cytoscape instance
 * @param {string} edgeId - ID of the edge to find
 * @return {Object|null} - The edge element or null if not found
 */
function findEdgeById(cy, edgeId) {
  if (!cy || !edgeId) return null;

  // Handle real Cytoscape instance with $id method
  if (cy.$id && typeof cy.$id === 'function') {
    const edge = cy.$id(edgeId);
    return edge.length > 0 ? edge : null;
  }

  // Fallback for mock implementation
  const edges = cy.edges();
  if (!edges || !Array.isArray(edges)) return null;

  for (let i = 0; i < edges.length; i++) {
    if (edges[i].id && edges[i].id() === edgeId) {
      return edges[i];
    }
  }

  return null;
}

/**
 * Select an edge in the Cytoscape graph
 *
 * @param {Object} cy - Cytoscape instance
 * @param {string} edgeId - ID of the edge to select
 * @param {boolean} clearOthers - Whether to clear other selections first (default: true)
 * @return {boolean} - Success status
 */
function selectEdge(cy, edgeId, clearOthers = true) {
  if (!cy || !edgeId) {
    console.error('Cannot select edge: Missing Cytoscape instance or edge ID');
    return false;
  }

  // Find the edge by ID using our helper function
  const edge = findEdgeById(cy, edgeId);
  if (!edge) {
    console.warn(`Edge with ID "${edgeId}" not found`);
    return false;
  }

  // Clear existing selections if requested
  if (clearOthers) {
    // Handle both real Cytoscape and mock
    if (cy.$) {
      cy.$(':selected').unselect();
    } else {
      // Alternative approach for mock
      const allElements = [...(cy.nodes() || []), ...(cy.edges() || [])];
      allElements.forEach(ele => {
        if (ele.selected && ele.selected()) {
          ele.unselect();
        }
      });
    }
  }

  // Select the edge
  edge.select();

  return true;
}

// Export the functions using CommonJS style export
module.exports = {
  setupEdgeHoverInteractions,
  selectEdge,
  findEdgeById // Export for testing
};
