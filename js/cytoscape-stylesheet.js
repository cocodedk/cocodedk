/**
 * Generates and returns a stylesheet for Cytoscape
 *
 * @return {array} Array of style objects
 */
function getStylesheet() {
  return [
    // Base node styling
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'background-color': '#0077cc', // Default to Software color as base
        'border-width': '2px',
        'border-color': '#33ccff',
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': '12px',
        'color': '#ffffff',
        'shape': 'ellipse',
        'width': '60px',
        'height': '60px',
        'text-wrap': 'wrap',
        'text-max-width': '80px',
        'text-outline-width': 1,
        'text-outline-color': 'rgba(0,0,0,0.5)',
        'text-outline-opacity': 0.5
      }
    },

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

    // Selected elements styling
    {
      selector: ':selected',
      style: {
        'border-width': '4px',
        'border-color': '#ffffff',
        'z-index': 100
      }
    },

    // Hover state styling
    {
      selector: '.hover',
      style: {
        'overlay-opacity': 0.3,
        'overlay-color': '#ffffff',
        'z-index': 90
      }
    },

    // Node category-specific styling: cocode.dk
    {
      selector: 'node.cocode\\.dk',
      style: {
        'background-color': '#005577',
        'border-color': '#00ccff'
      }
    },

    // Node category-specific styling: Software
    {
      selector: 'node.Software',
      style: {
        'background-color': '#0077cc',
        'border-color': '#33ccff'
      }
    },

    // Node category-specific styling: Cybersecurity
    {
      selector: 'node.Cybersecurity',
      style: {
        'background-color': '#cc0044',
        'border-color': '#ff6688'
      }
    },

    // Node category-specific styling: Clients
    {
      selector: 'node.Clients',
      style: {
        'background-color': '#cc8800',
        'border-color': '#ffcc33',
        'color': '#000000',
        'text-outline-width': 0 // Remove text outline for dark text
      }
    },

    // Node category-specific styling: Contact
    {
      selector: 'node.Contact',
      style: {
        'background-color': '#f1c40f',
        'border-color': '#f39c12',
        'color': '#000000',
        'text-outline-width': 0 // Remove text outline for dark text
      }
    },

    // Edge category-specific styling: Software
    {
      selector: 'edge.Software',
      style: {
        'line-color': 'rgba(51, 204, 255, 0.4)'
      }
    },

    // Edge category-specific styling: Cybersecurity
    {
      selector: 'edge.Cybersecurity',
      style: {
        'line-color': 'rgba(255, 102, 136, 0.4)'
      }
    },

    // Special styling for nodes with images
    {
      selector: 'node[?image]', // Nodes that have image property defined
      style: {
        'background-image': 'data(image)',
        'background-fit': 'cover',
        'background-clip': 'node'
      }
    },

    // Bidirectional edges - curved style
    {
      selector: 'edge[curveStyle="bezier"]',
      style: {
        'curve-style': 'bezier'
      }
    },

    // Additional styling for nodes with highlight class
    {
      selector: 'node.highlight',
      style: {
        'border-width': '3px',
        'border-color': '#ffffff',
        'border-style': 'solid',
        'z-index': 80
      }
    },

    // Accessibility focus styling
    {
      selector: 'node.focus',
      style: {
        'border-width': '4px',
        'border-color': '#ffffff',
        'border-style': 'double'
      }
    }
  ];
}

// Create namespace for Cytoscape stylesheet
window.CytoscapeStylesheet = window.CytoscapeStylesheet || {};

// Expose the function globally
window.CytoscapeStylesheet.getStylesheet = getStylesheet;

// Log successful initialization
console.log('[TDD] CytoscapeStylesheet module initialized');
