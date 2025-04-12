/**
 * Cytoscape.js Edge Conversion Tests
 *
 * Tests for converting existing edge data to Cytoscape.js format
 */

// Import CytoscapeManager
const CytoscapeManager = require('../js/cytoscape-manager');

describe('Edge Data Conversion', () => {
  test('should convert single edge data to Cytoscape format', () => {
    // Given an edge in the current format
    const edgeData = {
      source: 'node1',
      target: 'node2',
      category: 'Software'
    };

    // When we convert it to Cytoscape format
    const cytoscapeEdge = CytoscapeManager.convertEdgeToCytoscape(edgeData);

    // Then it should have the correct Cytoscape structure
    expect(cytoscapeEdge).toEqual({
      group: 'edges',
      data: {
        id: 'node1-node2',
        source: 'node1',
        target: 'node2',
        category: 'Software'
      },
      classes: 'Software'
    });
  });

  test('should convert multiple edges to Cytoscape format', () => {
    // Given multiple edges in the current format
    const edgesData = [
      {
        source: 'node1',
        target: 'node2',
        category: 'Software'
      },
      {
        source: 'node2',
        target: 'node3',
        category: 'Contact'
      }
    ];

    // When we convert them to Cytoscape format
    const cytoscapeEdges = CytoscapeManager.convertEdgesToCytoscape(edgesData);

    // Then they should all have the correct Cytoscape structure
    expect(cytoscapeEdges).toHaveLength(2);
    expect(cytoscapeEdges[0]).toEqual({
      group: 'edges',
      data: {
        id: 'node1-node2',
        source: 'node1',
        target: 'node2',
        category: 'Software'
      },
      classes: 'Software'
    });
    expect(cytoscapeEdges[1]).toEqual({
      group: 'edges',
      data: {
        id: 'node2-node3',
        source: 'node2',
        target: 'node3',
        category: 'Contact'
      },
      classes: 'Contact'
    });
  });
});
