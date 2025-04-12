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
   * Current language used for node labels (default: 'en')
   */
  let currentLanguage = 'en';

  /**
   * Set the language for node labels
   *
   * @param {string} lang - Language code (e.g., 'en', 'da', 'es')
   */
  function setLanguage(lang) {
    if (!cy) return;

    currentLanguage = lang;

    // Update all node labels based on the new language
    cy.nodes().forEach(node => {
      const nodeData = node.data();

      // If the node has multilingual labels
      if (nodeData.labels && nodeData.labels[lang]) {
        // Update the label in the style
        node.style('label', nodeData.labels[lang]);

        // Update label in data for accessibility and other uses
        node.data('label', nodeData.labels[lang]);
      }

      // If the node has multilingual translations and tooltips are enabled
      if (nodeData.translations && nodeData.translations[lang]) {
        // Set tooltip content as the translation
        node.data('tooltip', nodeData.translations[lang]);

        // Update aria-label for accessibility if we have access to the DOM element
        if (node.popperRef && node.popperRef()) {
          const domElement = node.popperRef().querySelector('.cy-tooltip');
          if (domElement) {
            domElement.setAttribute('aria-label', nodeData.translations[lang]);
          }
        }
      }
    });

    // Update any interface elements that display node information
    if (typeof window.NodeDisplay !== 'undefined' && window.NodeDisplay.setLanguage) {
      // If there's a separate NodeDisplay module, sync the language
      window.NodeDisplay.setLanguage(lang);
    }

    // Force a layout update to ensure everything is properly sized after label change
    if (cy.style && typeof cy.style().update === 'function') {
      cy.style().update();
    }
  }

  /**
   * Apply size to node based on radius property
   *
   * @param {object} node - Cytoscape node element
   */
  function applyNodeSize(node) {
    if (!node) return;

    try {
      // Get node data safely
      let radius;
      if (typeof node.data === 'function') {
        radius = node.data('r');
      } else {
        radius = node.data?.r;
      }

      // If the node has a radius property, use it to set the size
      if (radius && typeof radius === 'number') {
        const diameter = radius * 2;
        node.style({
          'width': `${diameter}px`,
          'height': `${diameter}px`
        });
      }
    } catch (e) {
      console.error('Error applying node size:', e);
    }
  }

  /**
   * Render a node with proper styling based on its category and properties
   *
   * @param {object} nodeData - Node data
   * @return {object} - The created Cytoscape node element
   */
  function renderNode(nodeData) {
    if (!cy || !nodeData) return null;

    // Create basic node format if not already in Cytoscape format
    let cytoscapeNode;

    if (!nodeData.data) {
      // Convert to Cytoscape format
      cytoscapeNode = convertNodeToCytoscape(nodeData);
    } else {
      // Already in Cytoscape format
      cytoscapeNode = nodeData;
    }

    // Add the node to the graph
    const addedElements = cy.add(cytoscapeNode);
    if (!addedElements || addedElements.length === 0) return null;

    // Get the node element
    const node = addedElements[0];

    try {
      // Apply category-specific styling - use safe data access
      const category = typeof node.data === 'function' ? node.data('category') : node.data?.category;
      if (category) {
        node.addClass(category);
      }

      // Set label based on current language if multilingual
      if (typeof node.data === 'function') {
        const labels = node.data('labels');
        if (labels && labels[currentLanguage]) {
          node.style('label', labels[currentLanguage]);
          node.data('label', labels[currentLanguage]);
        }
      } else if (node.data?.labels && node.data.labels[currentLanguage]) {
        node.style('label', node.data.labels[currentLanguage]);
        node.data = { ...node.data, label: node.data.labels[currentLanguage] };
      }

      // Apply size based on radius
      applyNodeSize(node);
    } catch (e) {
      console.error('Error styling node:', e);
    }

    return node;
  }

  /**
   * Render an edge with proper styling based on its category and properties
   *
   * @param {object} edgeData - Edge data
   * @return {object} - The created Cytoscape edge element
   */
  function renderEdge(edgeData) {
    if (!cy || !edgeData) return null;

    // Create basic edge format if not already in Cytoscape format
    let cytoscapeEdge;

    if (!edgeData.data) {
      // Convert to Cytoscape format
      cytoscapeEdge = convertEdgeToCytoscape(edgeData);
    } else {
      // Already in Cytoscape format
      cytoscapeEdge = edgeData;
    }

    // Add the edge to the graph
    const addedElements = cy.add(cytoscapeEdge);
    if (!addedElements || addedElements.length === 0) return null;

    // Get the edge element
    const edge = addedElements[0];

    // Apply category-specific styling
    if (edge.data('category')) {
      edge.addClass(edge.data('category'));
    }

    // Apply custom styling if provided
    const customWidth = edge.data('width');
    if (customWidth) {
      edge.style('width', `${customWidth}px`);
    }

    const lineStyle = edge.data('lineStyle');
    if (lineStyle) {
      edge.style('line-style', lineStyle);
    }

    // Handle bidirectional edges if needed
    handleBidirectionalEdges();

    return edge;
  }

  /**
   * Handle styling for bidirectional edges to make them visually distinct
   */
  function handleBidirectionalEdges() {
    if (!cy) return;

    // Find all pairs of edges that go in opposite directions
    const processedPairs = new Set();

    cy.edges().forEach(edge1 => {
      const source1 = edge1.source().id();
      const target1 = edge1.target().id();
      const pairKey = `${source1}-${target1}`;
      const reversePairKey = `${target1}-${source1}`;

      // Skip if we've already processed this pair
      if (processedPairs.has(pairKey) || processedPairs.has(reversePairKey)) {
        return;
      }

      // Look for the reverse edge
      const reverseEdge = cy.edges(`[source = "${target1}"][target = "${source1}"]`);

      if (reverseEdge.length > 0) {
        // We have a bidirectional pair
        edge1.style({
          'curve-style': 'bezier',
          'control-point-step-size': 40
        });

        reverseEdge.style({
          'curve-style': 'bezier',
          'control-point-step-size': 40
        });

        // Mark these as processed
        processedPairs.add(pairKey);
        processedPairs.add(reversePairKey);
      }
    });
  }

  /**
   * Update the graph with a new set of nodes and edges
   *
   * @param {object} graphData - Object containing nodes and edges arrays
   * @return {boolean} - Success status
   */
  function renderGraph(graphData) {
    if (!cy || !graphData) return false;

    // Clear existing elements if needed
    cy.elements().remove();

    // Render nodes
    if (graphData.nodes && Array.isArray(graphData.nodes)) {
      graphData.nodes.forEach(nodeData => {
        renderNode(nodeData);
      });
    }

    // Render edges
    if (graphData.edges && Array.isArray(graphData.edges)) {
      graphData.edges.forEach(edgeData => {
        renderEdge(edgeData);
      });
    }

    // Handle bidirectional edges
    handleBidirectionalEdges();

    return true;
  }

  /**
   * Update an existing edge's properties
   *
   * @param {string} edgeId - ID of the edge to update
   * @param {object} newProps - New properties to apply
   * @return {boolean} - Success status
   */
  function updateEdge(edgeId, newProps) {
    if (!cy || !edgeId || !newProps) return false;

    const edge = cy.$id(edgeId);
    if (edge.length === 0) return false;

    // Update source/target if specified
    if (newProps.source) {
      edge.move({ source: newProps.source });
    }

    if (newProps.target) {
      edge.move({ target: newProps.target });
    }

    // Update other data properties
    Object.keys(newProps).forEach(key => {
      if (key !== 'source' && key !== 'target') {
        edge.data(key, newProps[key]);
      }
    });

    return true;
  }

  // Feature support flags for testing
  const supportsCustomEdgeStyling = true;
  const supportsBidirectionalEdges = true;
  const useRadiusForSize = true;

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
          // Use radius-based sizing if available, otherwise default
          'width': 'data(r)',
          'height': 'data(r)',
          // Apply scaling to convert radius to diameter
          'width': function(ele) {
            return ele.data('r') ? ele.data('r') * 2 : 60;
          },
          'height': function(ele) {
            return ele.data('r') ? ele.data('r') * 2 : 60;
          },
          'border-width': '2px',
          'border-color': '#33ccff',
          'font-family': 'Arial, sans-serif',
          'font-weight': 'bold',
          'text-outline-width': 1,
          'text-outline-color': 'rgba(0,0,0,0.5)',
          'text-outline-opacity': 0.5,
          // Adjust font size based on node size
          'font-size': function(ele) {
            const r = ele.data('r') || 30;
            return Math.max(12, Math.min(r * 0.4, 20)); // Scale font between 12-20px based on node size
          }
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
        // Handle both single label or multilingual labels
        label: nodeData.label || (nodeData.labels ? nodeData.labels.en : nodeData.id),
        // Store the full multilingual data for language switching
        labels: nodeData.labels || null,
        translations: nodeData.translations || null,
        category: nodeData.category,
        // Store radius for size calculations
        r: nodeData.r || 30 // Default radius if not specified
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
    // Create the base data structure
    const cytoscapeEdge = {
      group: 'edges',
      data: {
        id: `${edgeData.source}-${edgeData.target}`,
        source: edgeData.source,
        target: edgeData.target,
        category: edgeData.category
      },
      classes: edgeData.category
    };

    // Copy additional styling properties if they exist
    if (edgeData.width !== undefined) {
      cytoscapeEdge.data.width = edgeData.width;
    }

    if (edgeData.lineStyle !== undefined) {
      cytoscapeEdge.data.lineStyle = edgeData.lineStyle;
    }

    return cytoscapeEdge;
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
   * Convert simple link arrays [source, target] to Cytoscape edge format
   *
   * @param {Array} links - Array of link arrays where each link is [source, target]
   * @param {Object} nodeMap - Optional map of nodes to determine categories
   * @return {Array} - Array of edge data in Cytoscape format
   */
  function convertLinksToCytoscapeEdges(links, nodeMap = {}) {
    if (!links || !Array.isArray(links)) {
      return [];
    }

    return links.map((link, index) => {
      // Basic validation
      if (!Array.isArray(link) || link.length < 2) {
        console.error('Invalid link format:', link);
        return null;
      }

      const source = link[0];
      const target = link[1];

      // Determine edge category based on source node if possible
      let category = 'default';
      if (nodeMap[source]) {
        category = nodeMap[source].category;
      }

      return {
        group: 'edges',
        data: {
          id: `link-${index}`,
          source: source,
          target: target,
          category: category
        },
        classes: category
      };
    }).filter(edge => edge !== null); // Filter out any invalid links
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

  /**
   * Get the current language setting
   *
   * @return {string} - Current language code
   */
  function getCurrentLanguage() {
    return currentLanguage || 'en';
  }

  /**
   * Convert and load a complete graph from nodes.js style data
   *
   * @param {Array} nodes - Array of nodes in nodes.js format
   * @param {Array} links - Array of link arrays [source, target]
   * @param {Object} options - Optional layout options
   * @return {Object} - The Cytoscape instance
   */
  function loadNodesJsGraph(nodes, links, options = {}) {
    if (!cy) return null;

    // Clear existing elements
    cy.elements().remove();

    // Create a node map for category lookup in links
    const nodeMap = {};
    nodes.forEach(node => {
      nodeMap[node.id] = node;
    });

    // Convert nodes to Cytoscape format
    const cytoscapeNodes = convertNodesToCytoscape(nodes);

    // Convert links to Cytoscape edges
    const cytoscapeEdges = convertLinksToCytoscapeEdges(links, nodeMap);

    // Add all elements to the graph
    cy.add([...cytoscapeNodes, ...cytoscapeEdges]);

    // Apply layout
    const layoutOptions = {
      name: 'preset',
      ...options
    };
    applyLayout(layoutOptions);

    // Set initial language if specified
    if (options.language) {
      setLanguage(options.language);
    }

    return cy;
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
    convertLinksToCytoscapeEdges: convertLinksToCytoscapeEdges,
    convertGraphToCytoscape: convertGraphToCytoscape,
    loadNodesJsGraph: loadNodesJsGraph,
    applyLayout: applyLayout,
    initializeContactModalIntegration: initializeContactModalIntegration,
    registerSelectionHandlers: registerSelectionHandlers,
    selectNode: selectNode,
    clearSelection: clearSelection,
    renderNode: renderNode,
    renderEdge: renderEdge,
    renderGraph: renderGraph,
    setLanguage: setLanguage,
    getCurrentLanguage: getCurrentLanguage,
    updateEdge: updateEdge,
    supportsCustomEdgeStyling: supportsCustomEdgeStyling,
    supportsBidirectionalEdges: supportsBidirectionalEdges,
    useRadiusForSize: useRadiusForSize
  };
})();

// Export for tests
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CytoscapeManager;
}
