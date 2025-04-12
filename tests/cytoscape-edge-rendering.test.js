/**
 * Tests for Cytoscape edge rendering
 * Verifies that edges are rendered correctly with proper styling
 */

describe('Cytoscape Edge Rendering', () => {
  let cy;
  let container;

  beforeEach(() => {
    // Set up container
    container = document.createElement('div');
    container.id = 'cy-container';
    document.body.appendChild(container);

    // Initialize CytoscapeManager
    cy = CytoscapeManager.initialize('cy-container');

    // Add test nodes for edges to connect
    cy.add([
      {
        data: { id: 'node1', label: 'Source Node', category: 'Software' },
        position: { x: 100, y: 100 }
      },
      {
        data: { id: 'node2', label: 'Target Node', category: 'Cybersecurity' },
        position: { x: 200, y: 200 }
      },
      {
        data: { id: 'node3', label: 'Contact Node', category: 'Contact' },
        position: { x: 300, y: 300 }
      }
    ]);
  });

  afterEach(() => {
    // Clean up
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  test.skip('renders edges with correct default styling', () => {
    // Add a basic edge
    cy.add({
      data: {
        id: 'edge1',
        source: 'node1',
        target: 'node2'
      }
    });

    // Verify edge exists
    const edge = cy.$('#edge1');
    expect(edge.length).toBe(1);

    // Check default edge style properties
    expect(edge.style('width')).toBeDefined();
    expect(edge.style('line-color')).toBeDefined();
    expect(edge.style('curve-style')).toBe('straight');
    expect(edge.style('target-arrow-shape')).toBe('none');
  });

  test.skip('applies category-specific edge styling', () => {
    // Add edges with different categories
    cy.add([
      {
        data: {
          id: 'software-edge',
          source: 'node1',
          target: 'node2',
          category: 'Software'
        },
        classes: 'Software'
      },
      {
        data: {
          id: 'cyber-edge',
          source: 'node2',
          target: 'node3',
          category: 'Cybersecurity'
        },
        classes: 'Cybersecurity'
      }
    ]);

    // Get the edges
    const softwareEdge = cy.$('#software-edge');
    const cyberEdge = cy.$('#cyber-edge');

    // Verify category-specific styling
    expect(softwareEdge.hasClass('Software')).toBe(true);
    expect(cyberEdge.hasClass('Cybersecurity')).toBe(true);

    // Check that different line colors are applied based on category
    const softwareColor = softwareEdge.style('line-color');
    const cyberColor = cyberEdge.style('line-color');
    expect(softwareColor).not.toBe(cyberColor);

    // Check specific color values if they're known
    expect(softwareColor).toBe('rgba(51, 204, 255, 0.4)');
    expect(cyberColor).toBe('rgba(255, 102, 136, 0.4)');
  });

  test.skip('renders edges with custom styling', () => {
    // Add an edge with custom styling options
    cy.add({
      data: {
        id: 'custom-edge',
        source: 'node1',
        target: 'node3',
        width: 5,
        lineStyle: 'dashed'
      }
    });

    // Get the edge
    const customEdge = cy.$('#custom-edge');

    // If CytoscapeManager supports custom edge styling, these should be applied
    if (CytoscapeManager.supportsCustomEdgeStyling) {
      expect(customEdge.style('width')).toBe('5px');
      expect(customEdge.style('line-style')).toBe('dashed');
    }
  });

  test.skip('handles edge source/target changes correctly', () => {
    // Add an edge
    cy.add({
      data: {
        id: 'movable-edge',
        source: 'node1',
        target: 'node2'
      }
    });

    // Get the edge
    const edge = cy.$('#movable-edge');

    // Verify initial connections
    expect(edge.source().id()).toBe('node1');
    expect(edge.target().id()).toBe('node2');

    // Change the target
    // Note: This will depend on how CytoscapeManager handles edge modifications
    if (typeof CytoscapeManager.updateEdge === 'function') {
      CytoscapeManager.updateEdge('movable-edge', { target: 'node3' });

      // Verify that target changed
      expect(edge.source().id()).toBe('node1');
      expect(edge.target().id()).toBe('node3');
    } else {
      // Direct Cytoscape API approach
      cy.remove(edge);
      cy.add({
        data: {
          id: 'movable-edge',
          source: 'node1',
          target: 'node3'
        }
      });

      const updatedEdge = cy.$('#movable-edge');
      expect(updatedEdge.source().id()).toBe('node1');
      expect(updatedEdge.target().id()).toBe('node3');
    }
  });

  test.skip('handles bidirectional edges correctly', () => {
    // Add a bidirectional edge set
    cy.add([
      {
        data: {
          id: 'edge-ab',
          source: 'node1',
          target: 'node2',
          directed: true
        }
      },
      {
        data: {
          id: 'edge-ba',
          source: 'node2',
          target: 'node1',
          directed: true
        }
      }
    ]);

    // Get the edges
    const edgeAB = cy.$('#edge-ab');
    const edgeBA = cy.$('#edge-ba');

    // If CytoscapeManager handles bidirectional edges specially
    if (CytoscapeManager.supportsBidirectionalEdges) {
      // Check that they get special styling or handling
      expect(edgeAB.style('curve-style')).not.toBe('straight');
      expect(edgeBA.style('curve-style')).not.toBe('straight');
    } else {
      // Otherwise just check they exist
      expect(edgeAB.length).toBe(1);
      expect(edgeBA.length).toBe(1);
    }
  });
});
