/**
 * Cytoscape Manager
 *
 * Handles initialization and management of the Cytoscape.js graph
 */

const CytoscapeManager = (function() {
  // Private variables
  let cy = null;
  let selectionCallbacks = {
    onNodeSelected: null,
    onNodeDeselected: null
  };

  /**
   * Initialize Cytoscape with the given container ID
   *
   * @param {string} containerId - The ID of the container element
   * @return {object} - The Cytoscape instance
   */
  function initialize(containerId) {
    // Get the container element
    const container = document.getElementById(containerId);

    // Initialize Cytoscape
    cy = cytoscape({
      container: container,
      style: getStylesheet(),
      layout: {
        name: 'preset' // Start with preset layout
      },
      // No elements yet
      elements: []
    });

    return cy;
  }

  /**
   * Get the current Cytoscape instance
   *
   * @return {object|null} - The Cytoscape instance or null if not initialized
   */
  function getInstance() {
    return cy;
  }

  /**
   * Register event handlers for node interactions
   */
  function registerInteractionHandlers() {
    if (!cy) return;

    // Node click (tap) handler
    cy.on('tap', 'node', function(evt) {
      const node = evt.target;

      // Special handling for Contact node
      if (node.id() === 'node-Contact' || node.data('category') === 'Contact') {
        // Handle Contact node click - show the Contact modal
        if (typeof ContactModal !== 'undefined' && ContactModal.show) {
          ContactModal.show();
        } else {
          console.log('ContactModal not available');
        }
      } else {
        // Handle other node clicks
        // This could show a node details modal or perform other actions
        console.log('Node clicked:', node.id(), node.data());
      }
    });

    // Mouse enter handler (hover effect)
    cy.on('mouseover', 'node', function(evt) {
      evt.target.addClass('hover');
    });

    // Mouse leave handler (remove hover effect)
    cy.on('mouseout', 'node', function(evt) {
      evt.target.removeClass('hover');
    });
  }

  /**
   * Initialize integration with the Contact Modal
   * This sets up the necessary connections between Cytoscape and ContactModal
   */
  function initializeContactModalIntegration() {
    // Ensure ContactModal is available
    if (typeof ContactModal !== 'undefined') {
      // Initialize ContactModal
      ContactModal.initialize();

      // Register specific event handlers for Contact node
      if (cy) {
        cy.on('tap', 'node[category = "Contact"]', function() {
          ContactModal.show();
        });
      }
    } else {
      console.warn('ContactModal not available for integration');
    }
  }

  /**
   * Register handlers for node selection behavior
   *
   * @param {object} options - Options including callbacks
   * @param {function} options.onNodeSelected - Callback when a node is selected
   * @param {function} options.onNodeDeselected - Callback when a node is deselected
   */
  function registerSelectionHandlers(options = {}) {
    if (!cy) return;

    // Store callbacks
    selectionCallbacks = {
      onNodeSelected: options.onNodeSelected || null,
      onNodeDeselected: options.onNodeDeselected || null
    };

    // Handle node selection
    cy.on('select', 'node', function(evt) {
      const node = evt.target;

      // Add selected class
      node.addClass('selected');

      // Trigger callback if provided
      if (selectionCallbacks.onNodeSelected) {
        selectionCallbacks.onNodeSelected(node.data());
      }
    });

    // Handle node deselection
    cy.on('unselect', 'node', function(evt) {
      const node = evt.target;

      // Remove selected class
      node.removeClass('selected');

      // Trigger callback if provided
      if (selectionCallbacks.onNodeDeselected) {
        selectionCallbacks.onNodeDeselected(node.data());
      }
    });

    // When clicking on the background, deselect all nodes
    cy.on('tap', function(evt) {
      // Only handle background clicks (not on nodes)
      if (evt.target === cy) {
        clearSelection();
      }
    });
  }

  /**
   * Programmatically select a node by ID
   *
   * @param {string} nodeId - ID of the node to select
   * @return {boolean} - Whether the selection was successful
   */
  function selectNode(nodeId) {
    if (!cy) return false;

    // Clear any existing selection
    clearSelection();

    // Find the node
    const node = cy.$('#' + nodeId);
    if (node.length > 0) {
      // Select the node
      node.select();
      return true;
    }

    return false;
  }

  /**
   * Clear all node selections
   */
  function clearSelection() {
    if (!cy) return;

    // Unselect all selected elements
    cy.$(':selected').unselect();
  }

  /**
   * Generate Cytoscape stylesheet based on current CSS styles
   *
   * @return {Array} - Cytoscape stylesheet
   */
  function getStylesheet() {
    return [
      // Default node style
      {
        selector: 'node',
        style: {
          'background-color': '#0077cc',
          'label': 'data(label)',
          'color': '#ffffff',
          'text-valign': 'center',
          'text-halign': 'center',
          'width': '60px',
          'height': '60px',
          'border-width': '2px',
          'border-color': '#33ccff',
          'font-family': 'Arial, sans-serif',
          'font-weight': 'bold',
          'text-outline-width': 1,
          'text-outline-color': 'rgba(0,0,0,0.5)',
          'text-outline-opacity': 0.5
        }
      },
      // Default edge style
      {
        selector: 'edge',
        style: {
          'width': 2,
          'line-color': 'rgba(255, 255, 255, 0.3)',
          'curve-style': 'straight',
          'target-arrow-shape': 'none',
          'source-arrow-shape': 'none'
        }
      },

      // Node category styles
      {
        selector: '.cocode\\.dk',
        style: {
          'background-color': '#005577',
          'border-color': '#00ccff'
        }
      },
      {
        selector: '.Software',
        style: {
          'background-color': '#0077cc',
          'border-color': '#33ccff'
        }
      },
      {
        selector: '.Cybersecurity',
        style: {
          'background-color': '#cc0044',
          'border-color': '#ff6688'
        }
      },
      {
        selector: '.Clients',
        style: {
          'background-color': '#cc8800',
          'border-color': '#ffcc33',
          'color': '#000000',
          'text-outline-width': 0 // Remove text outline for dark text
        }
      },
      {
        selector: '.Contact',
        style: {
          'background-color': '#f1c40f',
          'border-color': '#f39c12',
          'color': '#000000',
          'text-outline-width': 0 // Remove text outline for dark text
        }
      },

      // Edge category styles
      {
        selector: 'edge.Software',
        style: {
          'line-color': 'rgba(51, 204, 255, 0.4)'
        }
      },
      {
        selector: 'edge.Cybersecurity',
        style: {
          'line-color': 'rgba(255, 102, 136, 0.4)'
        }
      },
      {
        selector: 'edge.Clients',
        style: {
          'line-color': 'rgba(255, 204, 51, 0.4)'
        }
      },
      {
        selector: 'edge.Contact',
        style: {
          'line-color': 'rgba(243, 156, 18, 0.4)'
        }
      },
      {
        selector: 'edge.cocode\\.dk',
        style: {
          'line-color': 'rgba(0, 204, 255, 0.4)'
        }
      },

      // Interactive states
      {
        selector: 'node:selected',
        style: {
          'border-width': '4px',
          'border-color': '#ffffff',
          'background-color': function(ele) {
            // Get the original background color and make it brighter
            const color = ele.style('background-color');
            return color; // For simplicity; could implement color brightening
          },
          'z-index': 100
        }
      },
      {
        selector: 'node.selected',
        style: {
          'border-width': '4px',
          'border-color': '#ffffff',
          'z-index': 100,
          'overlay-opacity': 0.1,
          'overlay-color': '#ffffff'
        }
      },
      {
        selector: 'node:active',
        style: {
          'border-width': '4px',
          'border-color': '#ffffff',
          'z-index': 100,
          'overlay-opacity': 0.1,
          'overlay-color': '#ffffff'
        }
      },
      {
        selector: 'node.hover',
        style: {
          'transform': 'scale(1.05)',
          'z-index': 90
        }
      }
    ];
  }

  /**
   * Convert a single node to Cytoscape format
   *
   * @param {object} nodeData - Node data in the current format
   * @return {object} - Node data in Cytoscape format
   */
  function convertNodeToCytoscape(nodeData) {
    return {
      group: 'nodes',
      data: {
        id: nodeData.id,
        label: nodeData.label,
        category: nodeData.category
      },
      position: {
        x: nodeData.x,
        y: nodeData.y
      },
      classes: nodeData.category
    };
  }

  /**
   * Convert multiple nodes to Cytoscape format
   *
   * @param {Array} nodesData - Array of node data in the current format
   * @return {Array} - Array of node data in Cytoscape format
   */
  function convertNodesToCytoscape(nodesData) {
    return nodesData.map(node => convertNodeToCytoscape(node));
  }

  /**
   * Convert a single edge to Cytoscape format
   *
   * @param {object} edgeData - Edge data in the current format
   * @return {object} - Edge data in Cytoscape format
   */
  function convertEdgeToCytoscape(edgeData) {
    return {
      group: 'edges',
      data: {
        id: `${edgeData.source}-${edgeData.target}`,
        source: edgeData.source,
        target: edgeData.target,
        category: edgeData.category
      },
      classes: edgeData.category
    };
  }

  /**
   * Convert multiple edges to Cytoscape format
   *
   * @param {Array} edgesData - Array of edge data in the current format
   * @return {Array} - Array of edge data in Cytoscape format
   */
  function convertEdgesToCytoscape(edgesData) {
    return edgesData.map(edge => convertEdgeToCytoscape(edge));
  }

  /**
   * Convert a graph to Cytoscape format
   *
   * @param {object} graphData - Graph data with nodes and edges
   * @return {Array} - Flat array of nodes and edges in Cytoscape format
   */
  function convertGraphToCytoscape(graphData) {
    // Handle empty graph data
    if (!graphData || (!graphData.nodes && !graphData.edges)) {
      return [];
    }

    // Convert nodes if they exist
    const cytoscapeNodes = graphData.nodes ? convertNodesToCytoscape(graphData.nodes) : [];

    // Convert edges if they exist
    const cytoscapeEdges = graphData.edges ? convertEdgesToCytoscape(graphData.edges) : [];

    // Return flat array of elements
    return [...cytoscapeNodes, ...cytoscapeEdges];
  }

  /**
   * Apply layout to the Cytoscape instance
   *
   * @param {object} options - Layout options to apply
   * @return {object} - The layout object
   */
  function applyLayout(options) {
    const cy = getInstance();
    if (!cy) return null;

    // Merge options with defaults
    const layoutOptions = {
      name: 'preset', // Default to preset to maintain positions
      fit: false,     // Don't fit to viewport by default
      // Additional default options here...
      ...options
    };

    // Create and run layout
    const layout = cy.layout(layoutOptions);
    layout.run();

    return layout;
  }

  // Public API
  return {
    initialize: initialize,
    getInstance: getInstance,
    getStylesheet: getStylesheet,
    registerInteractionHandlers: registerInteractionHandlers,
    convertNodeToCytoscape: convertNodeToCytoscape,
    convertNodesToCytoscape: convertNodesToCytoscape,
    convertEdgeToCytoscape: convertEdgeToCytoscape,
    convertEdgesToCytoscape: convertEdgesToCytoscape,
    convertGraphToCytoscape: convertGraphToCytoscape,
    applyLayout: applyLayout,
    initializeContactModalIntegration: initializeContactModalIntegration,
    registerSelectionHandlers: registerSelectionHandlers,
    selectNode: selectNode,
    clearSelection: clearSelection
  };
})();

// Export for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CytoscapeManager;
}
