/**
 * Cytoscape.js Data Conversion Tests
 *
 * Tests for converting existing node data to Cytoscape.js format
 *
 * TESTING PHILOSOPHY:
 * - IMPERATIVE: Use real methods and real data wherever possible
 * - Mocking is expensive and creates maintenance burden
 * - Every change to the implementation code requires updating mocks
 * - Tests should focus on verifying behavior, not implementation details
 *
 * WHY THIS APPROACH:
 * 1. Resilience to implementation changes - Tests won't break when internal structures evolve
 * 2. Focuses on what's important - Verifies critical behavior, not exact data structures
 * 3. Maintainability - Tests remain valid even as implementation details change
 * 4. Readability - Individual assertions make it clear what we're verifying
 * 5. Debugging - When tests fail, it's clearer what behavior broke
 *
 * IMPLEMENTATION NOTES:
 * - Using expect.objectContaining() to verify structure without being brittle
 * - Individual property assertions to clearly verify critical behaviors
 * - Tests verify functionality, not exact object structure
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
    // Focus on essential properties instead of exact equality
    expect(cytoscapeNode).toEqual(expect.objectContaining({
      group: 'nodes',
      data: expect.objectContaining({
        id: 'node1',
        label: 'Test Node',
        category: 'Software'
      }),
      position: {
        x: 100,
        y: 200
      },
      classes: 'Software'
    }));

    // Verify each critical property individually
    expect(cytoscapeNode.data.id).toBe('node1');
    expect(cytoscapeNode.data.label).toBe('Test Node');
    expect(cytoscapeNode.data.category).toBe('Software');
    expect(cytoscapeNode.position.x).toBe(100);
    expect(cytoscapeNode.position.y).toBe(200);
    expect(cytoscapeNode.classes).toBe('Software');
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

    // Verify first node's essential properties
    expect(cytoscapeNodes[0].data.id).toBe('node1');
    expect(cytoscapeNodes[0].data.label).toBe('Software Node');
    expect(cytoscapeNodes[0].data.category).toBe('Software');
    expect(cytoscapeNodes[0].position.x).toBe(100);
    expect(cytoscapeNodes[0].position.y).toBe(200);
    expect(cytoscapeNodes[0].classes).toBe('Software');

    // Verify second node's essential properties
    expect(cytoscapeNodes[1].data.id).toBe('node2');
    expect(cytoscapeNodes[1].data.label).toBe('Contact Node');
    expect(cytoscapeNodes[1].data.category).toBe('Contact');
    expect(cytoscapeNodes[1].position.x).toBe(300);
    expect(cytoscapeNodes[1].position.y).toBe(400);
    expect(cytoscapeNodes[1].classes).toBe('Contact');
  });
});
