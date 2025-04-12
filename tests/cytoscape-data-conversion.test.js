/**
 * Cytoscape.js Data Conversion Tests
 *
 * Tests for converting existing node data to Cytoscape.js format
 */

// Import CytoscapeManager
const CytoscapeManager = require('../js/cytoscape-manager');

describe('Node Data Conversion', () => {
  test('should convert single node data to Cytoscape format', () => {
    // Given a node in the current format
    const nodeData = {
      id: 'node1',
      label: 'Test Node',
      category: 'Software',
      x: 100,
      y: 200
    };

    // When we convert it to Cytoscape format
    const cytoscapeNode = CytoscapeManager.convertNodeToCytoscape(nodeData);

    // Then it should have the correct Cytoscape structure
    expect(cytoscapeNode).toEqual({
      group: 'nodes',
      data: {
        id: 'node1',
        label: 'Test Node',
        category: 'Software'
      },
      position: {
        x: 100,
        y: 200
      },
      classes: 'Software'
    });
  });

  test('should convert multiple nodes to Cytoscape format', () => {
    // Given multiple nodes in the current format
    const nodesData = [
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
    ];

    // When we convert them to Cytoscape format
    const cytoscapeNodes = CytoscapeManager.convertNodesToCytoscape(nodesData);

    // Then they should all have the correct Cytoscape structure
    expect(cytoscapeNodes).toHaveLength(2);
    expect(cytoscapeNodes[0]).toEqual({
      group: 'nodes',
      data: {
        id: 'node1',
        label: 'Software Node',
        category: 'Software'
      },
      position: {
        x: 100,
        y: 200
      },
      classes: 'Software'
    });
    expect(cytoscapeNodes[1]).toEqual({
      group: 'nodes',
      data: {
        id: 'node2',
        label: 'Contact Node',
        category: 'Contact'
      },
      position: {
        x: 300,
        y: 400
      },
      classes: 'Contact'
    });
  });
});
