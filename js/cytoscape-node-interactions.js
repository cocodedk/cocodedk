/*
 * Node interactions for Cytoscape.js
 * This module handles node hover, selection, and click events
 */
(function() {
  'use strict';

  /**
   * Setup node hover interactions
   *
   * @param {Object} cy - Cytoscape instance
   * @returns {void}
   */
  function setupNodeHoverInteractions(cy) {
    if (!cy) {
      console.error('Cytoscape instance is required for node hover interactions');
      return;
    }

    // Add hover class on mouseover
    cy.on('mouseover', 'node', function(event) {
      const node = event.target;
      node.addClass('hover');

      // Optional: highlight connected edges on hover
      if (window.CytoscapeEdgeInteractions &&
          typeof window.CytoscapeEdgeInteractions.highlightConnectedEdges === 'function') {
        window.CytoscapeEdgeInteractions.highlightConnectedEdges(node, cy);
      }
    });

    // Remove hover class on mouseout
    cy.on('mouseout', 'node', function(event) {
      const node = event.target;
      node.removeClass('hover');

      // Optional: clear highlighted edges
      if (window.CytoscapeEdgeInteractions &&
          typeof window.CytoscapeEdgeInteractions.clearHighlightedEdges === 'function') {
        window.CytoscapeEdgeInteractions.clearHighlightedEdges(cy);
      }
    });

    console.log('[TDD] Node hover interactions setup complete');
  }

  /**
   * Setup node selection interactions
   *
   * @param {Object} cy - Cytoscape instance
   * @param {Object} options - Configuration options
   * @returns {void}
   */
  function setupNodeSelectionInteractions(cy, options) {
    if (!cy) {
      console.error('Cytoscape instance is required for node selection interactions');
      return;
    }

    options = options || {};
    const selectionCallback = options.onNodeSelect || function() {};

    // Handle node selection
    cy.on('select', 'node', function(event) {
      const node = event.target;
      selectionCallback(node);
    });

    // Handle node unselection
    cy.on('unselect', 'node', function(event) {
      // Additional unselection logic if needed
    });

    console.log('[TDD] Node selection interactions setup complete');
  }

  /**
   * Setup node click interactions
   *
   * @param {Object} cy - Cytoscape instance
   * @param {Object} options - Configuration options
   * @returns {void}
   */
  function setupNodeClickInteractions(cy, options) {
    if (!cy) {
      console.error('Cytoscape instance is required for node click interactions');
      return;
    }

    options = options || {};
    const clickCallback = options.onNodeClick || function() {};

    // Handle node click
    cy.on('tap', 'node', function(event) {
      const node = event.target;
      clickCallback(node);
    });

    console.log('[TDD] Node click interactions setup complete');
  }

  /**
   * Setup node drag interactions
   *
   * @param {Object} cy - Cytoscape instance
   * @param {Object} options - Configuration options
   * @returns {void}
   */
  function setupNodeDragInteractions(cy, options) {
    if (!cy) {
      console.error('Cytoscape instance is required for node drag interactions');
      return;
    }

    options = options || {};
    const onDragStart = options.onDragStart || function() {};
    const onDrag = options.onDrag || function() {};
    const onDragEnd = options.onDragEnd || function() {};

    // Handle node drag start
    cy.on('dragstart', 'node', function(event) {
      const node = event.target;
      onDragStart(node);
    });

    // Handle node drag
    cy.on('drag', 'node', function(event) {
      const node = event.target;
      onDrag(node);
    });

    // Handle node drag end
    cy.on('dragfree', 'node', function(event) {
      const node = event.target;
      onDragEnd(node);
    });

    console.log('[TDD] Node drag interactions setup complete');
  }

  // Expose functions via window object
  window.CytoscapeNodeInteractions = {
    setupNodeHoverInteractions: setupNodeHoverInteractions,
    setupNodeSelectionInteractions: setupNodeSelectionInteractions,
    setupNodeClickInteractions: setupNodeClickInteractions,
    setupNodeDragInteractions: setupNodeDragInteractions
  };

  console.log('[TDD] CytoscapeNodeInteractions module loaded');
})();
