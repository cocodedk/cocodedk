/**
 * Tests for Cytoscape node and edge rendering
 */

const CytoscapeManager = require('../../js/cytoscape-manager');

// Mock data
const mockNodes = [
  {
    id: 'node1',
    label: { en: 'Person Node', da: 'Person Knude' },
    category: 'person',
    radius: 1.5
  },
  {
    id: 'node2',
    label: { en: 'Organization Node', da: 'Organisation Knude' },
    category: 'organization',
    radius: 2
  },
  {
    id: 'node3',
    label: { en: 'Location Node', da: 'Placering Knude' },
    category: 'location',
    radius: 1
  }
];

const mockEdges = [
  {
    id: 'edge1',
    source: 'node1',
    target: 'node2',
    label: 'Association',
    category: 'association'
  },
  {
    id: 'edge2',
    source: 'node2',
    target: 'node3',
    label: 'Dependency',
    category: 'dependency',
    width: 2
  },
  {
    id: 'edge3',
    source: 'node3',
    target: 'node1',
    label: 'Bidirectional',
    category: 'ownership'
  }
];

describe('Cytoscape Node Rendering', () => {
  let cytoscapeManager;
  let container;

  beforeEach(() => {
    // Setup
    container = document.createElement('div');
    container.id = 'cy-container';
    document.body.appendChild(container);

    // Initialize Cytoscape with container id (not using new)
    CytoscapeManager.initialize('cy-container');
    cytoscapeManager = CytoscapeManager;
  });

  afterEach(() => {
    // Cleanup
    document.body.removeChild(container);
  });

  test.skip('renders nodes with correct category classes', () => {
    // Render a single node
    const node = cytoscapeManager.renderNode(mockNodes[0]);

    // Verify category was applied as a class
    expect(node.hasClass('person')).toBe(true);

    // Render multiple nodes with different categories
    mockNodes.forEach(nodeData => {
      const renderedNode = cytoscapeManager.renderNode(nodeData);
      expect(renderedNode.hasClass(nodeData.category)).toBe(true);
    });
  });

  test.skip('applies correct node sizes based on radius property', () => {
    // Base size is 45px, with radius as a multiplier
    const node1 = cytoscapeManager.renderNode(mockNodes[0]); // radius 1.5
    const node2 = cytoscapeManager.renderNode(mockNodes[1]); // radius 2
    const node3 = cytoscapeManager.renderNode(mockNodes[2]); // radius 1

    // Check that the size was applied correctly
    expect(parseFloat(node1.style('width'))).toBeCloseTo(45 * 1.5);
    expect(parseFloat(node2.style('width'))).toBeCloseTo(45 * 2);
    expect(parseFloat(node3.style('width'))).toBeCloseTo(45 * 1);
  });

  test.skip('handles multilingual labels', () => {
    // Default language is English
    const node = cytoscapeManager.renderNode(mockNodes[0]);
    expect(node.data('label')).toBe('Person Node');

    // Change language to Danish
    cytoscapeManager.setLanguage('da');
    const nodeInDanish = cytoscapeManager.renderNode(mockNodes[0]);
    expect(nodeInDanish.data('label')).toBe('Person Knude');

    // Change back to English
    cytoscapeManager.setLanguage('en');
    const nodeBackInEnglish = cytoscapeManager.renderNode(mockNodes[0]);
    expect(nodeBackInEnglish.data('label')).toBe('Person Node');
  });

  test.skip('renders complete graph with nodes and edges', () => {
    const graphData = {
      nodes: mockNodes,
      edges: mockEdges
    };

    cytoscapeManager.renderGraph(graphData);

    // Check that all nodes are rendered
    const renderedNodes = cytoscapeManager.cy.nodes();
    expect(renderedNodes.length).toBe(mockNodes.length);

    // Check that all edges are rendered
    const renderedEdges = cytoscapeManager.cy.edges();
    expect(renderedEdges.length).toBe(mockEdges.length);
  });
});

describe('Cytoscape Edge Rendering', () => {
  let cytoscapeManager;
  let container;

  beforeEach(() => {
    // Setup
    container = document.createElement('div');
    container.id = 'cy-container';
    document.body.appendChild(container);

    // Initialize Cytoscape with container id (not using new)
    CytoscapeManager.initialize('cy-container');
    cytoscapeManager = CytoscapeManager;

    // Add nodes first since edges need source and target nodes
    mockNodes.forEach(nodeData => {
      cytoscapeManager.renderNode(nodeData);
    });
  });

  afterEach(() => {
    // Cleanup
    document.body.removeChild(container);
  });

  test.skip('renders edges with correct category classes', () => {
    // Render a single edge
    const edge = cytoscapeManager.renderEdge(mockEdges[0]);

    // Verify category was applied as a class
    expect(edge.hasClass('association')).toBe(true);

    // Render multiple edges with different categories
    mockEdges.forEach(edgeData => {
      const renderedEdge = cytoscapeManager.renderEdge(edgeData);
      expect(renderedEdge.hasClass(edgeData.category)).toBe(true);
    });
  });

  test.skip('applies custom width to edges', () => {
    // Default width is 1.5px
    const edge1 = cytoscapeManager.renderEdge(mockEdges[0]); // No custom width
    const edge2 = cytoscapeManager.renderEdge(mockEdges[1]); // width: 2

    // Check that the width was applied correctly
    expect(parseFloat(edge1.style('width'))).toBeCloseTo(1.5);
    expect(parseFloat(edge2.style('width'))).toBeCloseTo(2);
  });

  test.skip('handles bidirectional edges', () => {
    // Create bidirectional edges
    const edge1 = cytoscapeManager.renderEdge({
      id: 'bidir1',
      source: 'node1',
      target: 'node2',
      label: 'Bidirectional 1'
    });

    const edge2 = cytoscapeManager.renderEdge({
      id: 'bidir2',
      source: 'node2',
      target: 'node1',
      label: 'Bidirectional 2'
    });

    // Apply bidirectional handling
    cytoscapeManager.handleBidirectionalEdges();

    // Check that the curve style was adjusted
    expect(edge1.style('curve-style')).toBe('bezier');
    expect(edge2.style('curve-style')).toBe('bezier');
  });

  test.skip('updates edge properties', () => {
    // Create an edge
    const edge = cytoscapeManager.renderEdge(mockEdges[0]);

    // Update the edge
    const updatedProps = {
      label: 'Updated Association',
      category: 'dependency',
      width: 3
    };

    cytoscapeManager.updateEdge(mockEdges[0].id, updatedProps);
    const updatedEdge = cytoscapeManager.cy.$(`edge[id="${mockEdges[0].id}"]`);

    // Check that the properties were updated
    expect(updatedEdge.data('label')).toBe('Updated Association');
    expect(updatedEdge.hasClass('dependency')).toBe(true);
    expect(updatedEdge.hasClass('association')).toBe(false); // Old class removed
    expect(parseFloat(updatedEdge.style('width'))).toBeCloseTo(3);
  });
});
