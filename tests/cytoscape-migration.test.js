/**
 * Cytoscape.js Migration Tests
 *
 * Tests for migrating from custom HTML nodes to Cytoscape.js
 */

// Import CytoscapeManager
const CytoscapeManager = require('../js/cytoscape-manager');

describe('Cytoscape Initialization', () => {
  let container;

  beforeEach(() => {
    // Set up a DOM container for Cytoscape
    container = document.createElement('div');
    container.id = 'cy';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.position = 'absolute';
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up
    if (container && container.parentNode) {
      document.body.removeChild(container);
    }
  });

  test('should initialize Cytoscape instance successfully', () => {
    // Given a container exists in the DOM
    expect(document.getElementById('cy')).not.toBeNull();

    // When we initialize Cytoscape
    const cy = CytoscapeManager.initialize('cy');

    // Then we should have a valid Cytoscape instance
    expect(cy).toBeDefined();

    // Check that container exists and has the correct ID
    const cyContainer = cy.container();
    expect(cyContainer).toBeDefined();
    expect(cyContainer.id).toBe('cy');

    expect(typeof cy.add).toBe('function');
  });
});
