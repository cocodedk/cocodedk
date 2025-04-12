/**
 * Cytoscape.js Graph Conversion Tests
 *
 * Tests for converting complete graph data to Cytoscape.js format
 */

// Import CytoscapeManager
const CytoscapeManager = require('../js/cytoscape-manager');

describe('Full Graph Conversion', () => {
  test('should convert complete graph (nodes and edges) to Cytoscape format', () => {
    // Given a graph with nodes and edges
    const graphData = {
      nodes: [
        {
          id: 'node1',
          label: 'Software Node',
          category: 'Software',
          x: 100,
          y: 200
        },
        {
          id: 'node2',
          label: 'Contact Node',
          category: 'Contact',
          x: 300,
          y: 400
        }
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2',
          category: 'Software'
        }
      ]
    };

    // When we convert to Cytoscape format
    const cytoscapeElements = CytoscapeManager.convertGraphToCytoscape(graphData);

    // Then we should get an array with both nodes and edges
    expect(Array.isArray(cytoscapeElements)).toBe(true);
    expect(cytoscapeElements.length).toBe(3); // 2 nodes + 1 edge

    // Check that nodes were converted correctly
    const nodes = cytoscapeElements.filter(el => el.group === 'nodes' || !el.data.source);
    expect(nodes.length).toBe(2);

    // Check that edges were converted correctly
    const edges = cytoscapeElements.filter(el => el.group === 'edges' || el.data.source);
    expect(edges.length).toBe(1);
    expect(edges[0].data.source).toBe('node1');
    expect(edges[0].data.target).toBe('node2');
  });

  test('should handle empty graph data', () => {
    // Given empty graph data
    const emptyGraph = { nodes: [], edges: [] };

    // When we convert to Cytoscape format
    const elements = CytoscapeManager.convertGraphToCytoscape(emptyGraph);

    // Then we should get an empty array
    expect(Array.isArray(elements)).toBe(true);
    expect(elements.length).toBe(0);
  });

  test('should convert minimal graph with a single node', () => {
    // Given a simple graph with a single node
    const minimalGraph = {
      nodes: [
        {
          id: 'node1',
          label: 'Test Node',
          category: 'Software',
          x: 100,
          y: 200
        }
      ],
      edges: []
    };

    // When we convert to Cytoscape format
    const cytoscapeElements = CytoscapeManager.convertGraphToCytoscape(minimalGraph);

    // Then we should get an array with just the node
    expect(Array.isArray(cytoscapeElements)).toBe(true);
    expect(cytoscapeElements.length).toBe(1);

    // Check that the node was converted correctly
    expect(cytoscapeElements[0].data.id).toBe('node1');
    expect(cytoscapeElements[0].data.label).toBe('Test Node');
    expect(cytoscapeElements[0].data.category).toBe('Software');
    expect(cytoscapeElements[0].position.x).toBe(100);
    expect(cytoscapeElements[0].position.y).toBe(200);
  });

  test('should handle null or undefined graph data', () => {
    // Given null graph data
    const nullGraph = null;

    // When we convert to Cytoscape format
    const elements1 = CytoscapeManager.convertGraphToCytoscape(nullGraph);

    // Then we should get an empty array
    expect(Array.isArray(elements1)).toBe(true);
    expect(elements1.length).toBe(0);

    // Given undefined graph data
    const undefinedGraph = undefined;

    // When we convert to Cytoscape format
    const elements2 = CytoscapeManager.convertGraphToCytoscape(undefinedGraph);

    // Then we should get an empty array
    expect(Array.isArray(elements2)).toBe(true);
    expect(elements2.length).toBe(0);
  });
});
