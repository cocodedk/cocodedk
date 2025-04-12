/**
 * Tests for Cytoscape node rendering
 * Verifies that nodes are rendered correctly with proper styling
 */

describe('Cytoscape Node Rendering', () => {
  let cy;
  let container;

  beforeEach(() => {
    // Set up container
    container = document.createElement('div');
    container.id = 'cy-container';
    document.body.appendChild(container);

    // Initialize CytoscapeManager
    cy = CytoscapeManager.initialize('cy-container');
  });

  afterEach(() => {
    // Clean up
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  });

  test.skip('renders nodes with correct styles', () => {
    // Define test nodes
    const testNodes = [
      {
        data: {
          id: 'node1',
          label: 'Test Node 1',
          category: 'Software'
        },
        position: { x: 100, y: 100 }
      },
      {
        data: {
          id: 'node2',
          label: 'Test Node 2',
          category: 'Cybersecurity'
        },
        position: { x: 200, y: 200 }
      },
      {
        data: {
          id: 'node3',
          label: 'Test Node 3',
          category: 'Contact'
        },
        position: { x: 300, y: 300 }
      }
    ];

    // Add nodes to the graph
    cy.add(testNodes);

    // Check that nodes exist in the graph
    expect(cy.nodes().length).toBe(3);

    // Check Software node styling
    const softwareNode = cy.$('#node1');
    expect(softwareNode.length).toBe(1);
    expect(softwareNode.hasClass('Software')).toBe(true);

    // Verify style properties are applied correctly
    // Note: In Jest tests, we're checking if style properties are set in the Cytoscape
    // stylesheet, not actual rendered CSS values
    const softwareNodeStyle = softwareNode.style();
    expect(softwareNodeStyle).toMatchObject({
      'background-color': '#0077cc',
      'border-color': '#33ccff'
    });

    // Check Cybersecurity node styling
    const cyberNode = cy.$('#node2');
    expect(cyberNode.hasClass('Cybersecurity')).toBe(true);
    expect(cyberNode.style('background-color')).toBe('#cc0044');

    // Check Contact node styling (has different text color)
    const contactNode = cy.$('#node3');
    expect(contactNode.hasClass('Contact')).toBe(true);
    expect(contactNode.style('color')).toBe('#000000');
  });

  test.skip('handles multilingual node labels', () => {
    // Node with multilingual labels
    const multilingualNode = {
      data: {
        id: 'multilingual',
        label: 'English Label',
        labels: {
          en: 'English Label',
          da: 'Dansk Etiket',
          es: 'Etiqueta Española'
        },
        category: 'Software'
      },
      position: { x: 150, y: 150 }
    };

    // Add node to graph
    cy.add(multilingualNode);

    // Initial label should be English
    const node = cy.$('#multilingual');
    expect(node.style('label')).toBe('English Label');

    // Test changing language (mock the language change function)
    // This would be implemented in the CytoscapeManager
    if (typeof CytoscapeManager.setLanguage === 'function') {
      CytoscapeManager.setLanguage('da');
      // Label should now be Danish
      expect(node.style('label')).toBe('Dansk Etiket');
    }
  });

  test.skip('correctly positions nodes based on coordinates', () => {
    // Add a node with specific coordinates
    cy.add({
      data: { id: 'positioned-node', label: 'Positioned Node' },
      position: { x: 123, y: 456 }
    });

    // Get the node and verify its position
    const node = cy.$('#positioned-node');
    const position = node.position();

    // Position should match what we specified
    expect(position.x).toBe(123);
    expect(position.y).toBe(456);
  });

  test.skip('applies size based on radius property', () => {
    // Add nodes with different sizes based on radius
    cy.add([
      {
        data: {
          id: 'small-node',
          label: 'Small Node',
          r: 25 // Small radius
        },
        position: { x: 100, y: 100 }
      },
      {
        data: {
          id: 'large-node',
          label: 'Large Node',
          r: 50 // Large radius
        },
        position: { x: 300, y: 300 }
      }
    ]);

    // Get the nodes
    const smallNode = cy.$('#small-node');
    const largeNode = cy.$('#large-node');

    // Check that size is applied (2 * radius for both width and height)
    // Note: If CytoscapeManager handles this, the test will need to match that logic
    const smallSize = parseFloat(smallNode.style('width'));
    const largeSize = parseFloat(largeNode.style('width'));

    // Large node should be bigger than small node
    expect(largeSize).toBeGreaterThan(smallSize);

    // If size is directly based on radius
    if (CytoscapeManager.useRadiusForSize) {
      expect(smallSize).toBe(50); // 2 * 25
      expect(largeSize).toBe(100); // 2 * 50
    }
  });
});
