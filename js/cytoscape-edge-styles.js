/**
 * Edge Styles Module for Cytoscape
 *
 * Provides styling definitions for edges in the graph
 * This follows a separation of concerns pattern to isolate edge styling logic
 */

// Edge-specific styling for Cytoscape
(function() {
  'use strict';

  /**
   * Get edge-specific styles for Cytoscape
   *
   * @return {Array} - Array of style objects for edges
   */
  function getEdgeSpecificStyles() {
    return [
      // Base edge style
      {
        selector: 'edge',
        style: {
          'width': 2,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          'opacity': 0.7,
          'z-index': 5
        }
      },

      // Hovered edge
      {
        selector: 'edge.hover',
        style: {
          'width': 3,
          'line-color': '#999',
          'target-arrow-color': '#999',
          'opacity': 1,
          'z-index': 20
        }
      },

      // Selected edge
      {
        selector: 'edge:selected',
        style: {
          'width': 4,
          'line-color': '#7B8CDE',
          'target-arrow-color': '#7B8CDE',
          'opacity': 1,
          'z-index': 30
        }
      },

      // Edge of services category
      {
        selector: 'edge[category="Service"]',
        style: {
          'line-color': '#0072B2',
          'target-arrow-color': '#0072B2'
        }
      },

      // Edge of tools category
      {
        selector: 'edge[category="Tool"]',
        style: {
          'line-color': '#E69F00',
          'target-arrow-color': '#E69F00'
        }
      },

      // Edge of skills category
      {
        selector: 'edge[category="Skill"]',
        style: {
          'line-color': '#009E73',
          'target-arrow-color': '#009E73'
        }
      },

      // Edge of contact category
      {
        selector: 'edge[category="Contact"]',
        style: {
          'line-color': '#CC79A7',
          'target-arrow-color': '#CC79A7'
        }
      }
    ];
  }

  /**
   * Get custom edge styles based on options
   *
   * @param {Object} options - Options for custom styling
   * @return {Array} - Array of style objects
   */
  function getCustomEdgeStyles(options) {
    options = options || {};
    const customStyles = [];

    if (options.highlightEdges) {
      customStyles.push({
        selector: 'edge.highlight',
        style: {
          'width': 5,
          'line-color': '#ff5722',
          'target-arrow-color': '#ff5722',
          'opacity': 1,
          'z-index': 40
        }
      });
    }

    return customStyles;
  }

  // Expose functions via window object instead of module.exports
  window.CytoscapeEdgeStyles = {
    getEdgeSpecificStyles: getEdgeSpecificStyles,
    getCustomEdgeStyles: getCustomEdgeStyles
  };

  //console.log('[TDD] CytoscapeEdgeStyles module loaded');
})();
