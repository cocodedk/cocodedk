/*
 * Node styles for Cytoscape.js
 * This module provides styling for nodes in a Cytoscape instance
 */
(function() {
  'use strict';

  /**
   * Get base styles for nodes
   *
   * @returns {Array} Array of style objects
   */
  function getBaseNodeStyles() {
    return [
      {
        selector: 'node',
        style: {
          'label': 'data(label)',
          'text-valign': 'center',
          'text-halign': 'center',
          'background-color': '#f8f8f8',
          'border-width': 1,
          'border-color': '#ccc',
          'shape': 'ellipse',
          'width': 50,
          'height': 50,
          'font-size': 12,
          'text-wrap': 'wrap',
          'text-max-width': 80,
          'color': '#333'
        }
      },
      {
        selector: 'node.hover',
        style: {
          'border-width': 2,
          'border-color': '#3a7ecf',
          'background-color': '#ecf5fe'
        }
      },
      {
        selector: 'node:selected',
        style: {
          'border-width': 3,
          'border-color': '#1a54a7',
          'background-color': '#d4e6fc'
        }
      }
    ];
  }

  /**
   * Get styles for node categories
   *
   * @returns {Array} Array of style objects
   */
  function getCategoryNodeStyles() {
    return [
      {
        selector: 'node.category-primary',
        style: {
          'background-color': '#e3f2fd',
          'border-color': '#2196F3'
        }
      },
      {
        selector: 'node.category-secondary',
        style: {
          'background-color': '#f3e5f5',
          'border-color': '#9C27B0'
        }
      },
      {
        selector: 'node.category-success',
        style: {
          'background-color': '#e8f5e9',
          'border-color': '#4CAF50'
        }
      },
      {
        selector: 'node.category-danger',
        style: {
          'background-color': '#ffebee',
          'border-color': '#F44336'
        }
      },
      {
        selector: 'node.category-warning',
        style: {
          'background-color': '#fff8e1',
          'border-color': '#FFC107'
        }
      },
      {
        selector: 'node.category-info',
        style: {
          'background-color': '#e0f7fa',
          'border-color': '#00BCD4'
        }
      }
    ];
  }

  /**
   * Get custom node styles based on options
   *
   * @param {Object} options - Configuration options
   * @returns {Array} Array of style objects
   */
  function getCustomNodeStyles(options) {
    options = options || {};
    const styles = [];

    // Custom shape styles
    if (options.shapes) {
      Object.keys(options.shapes).forEach(function(selector) {
        styles.push({
          selector: selector,
          style: {
            'shape': options.shapes[selector]
          }
        });
      });
    }

    // Custom size styles
    if (options.sizes) {
      Object.keys(options.sizes).forEach(function(selector) {
        const size = options.sizes[selector];
        styles.push({
          selector: selector,
          style: {
            'width': size,
            'height': size
          }
        });
      });
    }

    // Custom color styles
    if (options.colors) {
      Object.keys(options.colors).forEach(function(selector) {
        styles.push({
          selector: selector,
          style: {
            'background-color': options.colors[selector]
          }
        });
      });
    }

    return styles;
  }

  /**
   * Get all node styles
   *
   * @param {Object} options - Configuration options
   * @returns {Array} Array of all node style objects
   */
  function getAllNodeStyles(options) {
    const baseStyles = getBaseNodeStyles();
    const categoryStyles = getCategoryNodeStyles();
    const customStyles = getCustomNodeStyles(options);

    return baseStyles.concat(categoryStyles, customStyles);
  }

  /**
   * Apply node styles to a Cytoscape instance
   *
   * @param {Object} cy - Cytoscape instance
   * @param {Object} options - Configuration options
   * @returns {void}
   */
  function applyNodeStyles(cy, options) {
    if (!cy) {
      console.error('Cytoscape instance is required to apply node styles');
      return;
    }

    const styles = getAllNodeStyles(options);
    cy.style().fromJson(styles).update();

    console.log('[TDD] Node styles applied to Cytoscape instance');
  }

  // Expose functions via window object
  window.CytoscapeNodeStyles = {
    getBaseNodeStyles: getBaseNodeStyles,
    getCategoryNodeStyles: getCategoryNodeStyles,
    getCustomNodeStyles: getCustomNodeStyles,
    getAllNodeStyles: getAllNodeStyles,
    applyNodeStyles: applyNodeStyles
  };

  console.log('[TDD] CytoscapeNodeStyles module loaded');
})();
