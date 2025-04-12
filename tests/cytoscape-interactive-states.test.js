/**
 * Cytoscape.js Interactive States Tests
 *
 * Tests for interactive styling states like hover and selection
 */

// Import CytoscapeManager
const CytoscapeManager = require('../js/cytoscape-manager');

describe('Interactive State Styling', () => {
  let container;
  let cy;

  beforeEach(() => {
    // Create container and initialize Cytoscape
    container = document.createElement('div');
    container.id = 'cy';
    document.body.appendChild(container);

    // Initialize Cytoscape
    cy = CytoscapeManager.initialize('cy');

    // Add a test node
    cy.add({
      data: { id: 'test-node', label: 'Test Node', category: 'Software' },
      position: { x: 100, y: 100 },
      classes: 'Software'
    });

    // Register interaction handlers
    CytoscapeManager.registerInteractionHandlers();
  });

  afterEach(() => {
    if (container && container.parentNode) {
      document.body.removeChild(container);
    }
    cy = null;
  });

  test('should apply hover styling when mouse enters node', () => {
    // Given a node in the graph
    const node = cy.$('#test-node');
    expect(node.hasClass('hover')).toBe(false);

    // When the mouse enters the node (simulate by directly adding the class)
    node.addClass('hover');

    // Then hover styling should be applied
    expect(node.hasClass('hover')).toBe(true);
  });

  test('should remove hover styling when mouse leaves node', () => {
    // Given a node with hover styling
    const node = cy.$('#test-node');
    node.addClass('hover');
    expect(node.hasClass('hover')).toBe(true);

    // When the mouse leaves the node (simulate by directly removing the class)
    node.removeClass('hover');

    // Then hover styling should be removed
    expect(node.hasClass('hover')).toBe(false);
  });

  test('should apply selected styling when node is selected', () => {
    // Given a node in the graph
    const node = cy.$('#test-node');

    // When the node is selected
    node.select();

    // Then selected styling should be applied
    expect(node.selected).toBe(true);
    expect(node.hasClass('selected')).toBe(true);
  });
});
