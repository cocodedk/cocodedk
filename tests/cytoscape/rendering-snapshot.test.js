/**
 * Snapshot tests for Cytoscape visual rendering
 */

const CytoscapeManager = require('../../js/cytoscape-manager');

// Mock data
const mockNodes = [
  {
    id: 'node1',
    label: { en: 'Person Node' },
    category: 'person',
    radius: 1.5,
    position: { x: 100, y: 100 }
  },
  {
    id: 'node2',
    label: { en: 'Organization Node' },
    category: 'organization',
    radius: 2,
    position: { x: 300, y: 100 }
  },
  {
    id: 'node3',
    label: { en: 'Location Node' },
    category: 'location',
    radius: 1,
    position: { x: 200, y: 250 }
  },
  {
    id: 'node4',
    label: { en: 'Event Node' },
    category: 'event',
    radius: 1.2,
    position: { x: 400, y: 250 }
  },
  {
    id: 'node5',
    label: { en: 'Document Node' },
    category: 'document',
    radius: 0.8,
    position: { x: 500, y: 150 }
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
    target: 'node4',
    label: 'Ownership',
    category: 'ownership'
  },
  {
    id: 'edge4',
    source: 'node4',
    target: 'node5',
    label: 'Transformation',
    category: 'transformation',
    width: 1.5
  },
  {
    id: 'edge5',
    source: 'node5',
    target: 'node1',
    label: 'Association',
    category: 'association'
  }
];

// Configure Jest to handle Cytoscape's rendering
// Since jest-canvas-mock may not be installed, we'll mock directly
jest.mock('canvas', () => ({
  createCanvas: jest.fn(),
  loadImage: jest.fn()
}), { virtual: true });

describe('Cytoscape Rendering Snapshots', () => {
  let cytoscapeManager;
  let container;

  beforeEach(() => {
    // Setup DOM
    container = document.createElement('div');
    container.id = 'cy-container';
    container.style.width = '800px';
    container.style.height = '600px';
    document.body.appendChild(container);

    // Initialize Cytoscape
    CytoscapeManager.initialize('cy-container');
    cytoscapeManager = CytoscapeManager;

    // Mock the cy.json method for snapshot comparison
    const cy = cytoscapeManager.getInstance();
    if (cy) {
      cy.json = jest.fn().mockImplementation(() => {
        return {
          elements: {
            nodes: cy.nodes().map(node => ({
              data: node.data(),
              position: node.position(),
              classes: Array.from(node.classes()),
              style: {
                width: node.style('width'),
                height: node.style('height'),
                backgroundColor: node.style('background-color'),
                borderColor: node.style('border-color'),
                borderWidth: node.style('border-width'),
                shape: node.style('shape')
              }
            })),
            edges: cy.edges().map(edge => ({
              data: edge.data(),
              classes: Array.from(edge.classes()),
              style: {
                width: edge.style('width'),
                lineColor: edge.style('line-color'),
                curveStyle: edge.style('curve-style'),
                targetArrowShape: edge.style('target-arrow-shape'),
                targetArrowColor: edge.style('target-arrow-color')
              }
            }))
          }
        };
      });
    }
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test.skip('renders all node categories with correct styling', () => {
    // Render each node type
    const nodesByCategory = {
      person: mockNodes[0],
      organization: mockNodes[1],
      location: mockNodes[2],
      event: mockNodes[3],
      document: mockNodes[4]
    };

    // Render each node category
    Object.values(nodesByCategory).forEach(node => {
      cytoscapeManager.renderNode(node);
    });

    // Take snapshot of the graph
    const graphState = cytoscapeManager.getInstance().json();
    expect(graphState).toMatchSnapshot('node-categories');
  });

  test.skip('renders all edge categories with correct styling', () => {
    // First add all nodes
    mockNodes.forEach(node => {
      cytoscapeManager.renderNode(node);
    });

    // Then add edges of each type
    const edgesByCategory = {
      association: mockEdges[0],
      dependency: mockEdges[1],
      ownership: mockEdges[2],
      transformation: mockEdges[3]
    };

    // Render each edge category
    Object.values(edgesByCategory).forEach(edge => {
      cytoscapeManager.renderEdge(edge);
    });

    // Take snapshot of the graph
    const graphState = cytoscapeManager.getInstance().json();
    expect(graphState).toMatchSnapshot('edge-categories');
  });

  test.skip('renders complete graph with correct layout', () => {
    // Render complete graph
    const graphData = {
      nodes: mockNodes,
      edges: mockEdges
    };

    cytoscapeManager.renderGraph(graphData);

    // Apply layout (this would be a deterministic layout for testing)
    // Using applyLayout instead of applyPresetLayout which may not exist
    if (cytoscapeManager.applyLayout) {
      cytoscapeManager.applyLayout({ name: 'preset' });
    }

    // Take snapshot of the complete graph
    const graphState = cytoscapeManager.getInstance().json();
    expect(graphState).toMatchSnapshot('complete-graph');
  });

  test.skip('renders selected nodes with highlight styling', () => {
    // Render nodes and select one
    mockNodes.forEach(node => {
      cytoscapeManager.renderNode(node);
    });

    // Select a node
    cytoscapeManager.selectNode('node1');

    // Take snapshot of selected state
    const graphState = cytoscapeManager.getInstance().json();
    expect(graphState).toMatchSnapshot('selected-node');
  });

  test.skip('renders bidirectional edges correctly', () => {
    // Add nodes
    mockNodes.forEach(node => {
      cytoscapeManager.renderNode(node);
    });

    // Add bidirectional edges
    cytoscapeManager.renderEdge({
      id: 'bidir1',
      source: 'node1',
      target: 'node2',
      label: 'Bidirectional 1',
      category: 'association'
    });

    cytoscapeManager.renderEdge({
      id: 'bidir2',
      source: 'node2',
      target: 'node1',
      label: 'Bidirectional 2',
      category: 'association'
    });

    // Handle bidirectional edges
    cytoscapeManager.handleBidirectionalEdges();

    // Take snapshot
    const graphState = cytoscapeManager.getInstance().json();
    expect(graphState).toMatchSnapshot('bidirectional-edges');
  });
});
