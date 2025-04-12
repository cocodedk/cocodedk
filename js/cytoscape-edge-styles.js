/**
 * Edge Styles Module for Cytoscape
 *
 * Contains all edge-specific styling definitions.
 * This follows a separation of concerns pattern to isolate edge styling.
 */

/**
 * Generate edge-specific styles for the Cytoscape stylesheet
 *
 * @return {Array} Array of style objects for edges
 */
function getEdgeSpecificStyles() {
  return [
    // Base edge styling
    {
      selector: 'edge',
      style: {
        'width': '2px',
        'line-color': 'rgba(255, 255, 255, 0.3)',
        'curve-style': 'straight',
        'target-arrow-shape': 'none',
        'source-arrow-shape': 'none'
      }
    },

    // Hover state styling for edges
    {
      selector: 'edge.hover',
      style: {
        'width': '3px',
        'line-color': 'rgba(255, 255, 255, 0.7)',
        'z-index': 10
      }
    },

    // Selected edge styling
    {
      selector: 'edge:selected',
      style: {
        'width': '4px',
        'line-color': '#ffffff',
        'z-index': 20
      }
    },

    // Category-specific edge styling: Software
    {
      selector: 'edge.Software',
      style: {
        'line-color': 'rgba(51, 204, 255, 0.4)'
      }
    },

    // Category-specific edge styling: Cybersecurity
    {
      selector: 'edge.Cybersecurity',
      style: {
        'line-color': 'rgba(255, 102, 136, 0.4)'
      }
    },

    // Category-specific edge styling: Clients
    {
      selector: 'edge.Clients',
      style: {
        'line-color': 'rgba(255, 204, 51, 0.4)'
      }
    },

    // Category-specific edge styling: Contact
    {
      selector: 'edge.Contact',
      style: {
        'line-color': 'rgba(243, 156, 18, 0.4)'
      }
    },

    // Category-specific edge styling: cocode.dk
    {
      selector: 'edge.cocode\\.dk',
      style: {
        'line-color': 'rgba(0, 85, 119, 0.4)'
      }
    },

    // Directed edges (with arrows)
    {
      selector: 'edge[?directed]',
      style: {
        'target-arrow-shape': 'triangle',
        'target-arrow-color': 'rgba(255, 255, 255, 0.5)'
      }
    },

    // Bidirectional edges - curved style
    {
      selector: 'edge[?bidirectional]',
      style: {
        'curve-style': 'bezier',
        'control-point-step-size': 40
      }
    },

    // Custom width edges
    {
      selector: 'edge[?width]',
      style: {
        // Will be applied dynamically in renderEdge
      }
    },

    // Custom line style (dashed, etc.)
    {
      selector: 'edge[?lineStyle]',
      style: {
        // Will be applied dynamically in renderEdge
      }
    },

    // Highlighted edges (for showing connections)
    {
      selector: 'edge.highlight',
      style: {
        'width': '3px',
        'line-color': 'rgba(255, 255, 255, 0.7)',
        'z-index': 20
      }
    }
  ];
}

/**
 * Generate custom edge styles for specific edge instances
 *
 * @param {Object} options - Custom styling options
 * @return {Object} Mapping of category to style objects
 */
function getCustomEdgeStyles(options = {}) {
  return {
    'highlighted': {
      'width': options.highlightWidth || '4px',
      'line-color': options.highlightColor || '#ffffff',
      'target-arrow-color': options.highlightColor || '#ffffff',
      'z-index': 30
    },
    'faded': {
      'width': '1px',
      'line-color': 'rgba(255, 255, 255, 0.1)',
      'target-arrow-color': 'rgba(255, 255, 255, 0.1)'
    }
  };
}

// Export functions using CommonJS style
module.exports = {
  getEdgeSpecificStyles,
  getCustomEdgeStyles
};
