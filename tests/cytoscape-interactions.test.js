/**
 * Cytoscape.js Interactions Tests
 *
 * Tests for user interactions with Cytoscape nodes
 */

// Import CytoscapeManager
const CytoscapeManager = require('../js/cytoscape-manager');

describe('Node Interactions', () => {
  let container;
  let cy;

  beforeEach(() => {
    // Mock the ContactModal
    global.ContactModal = {
      show: jest.fn(),
      hide: jest.fn()
    };

    // Set up a DOM container for Cytoscape
    container = document.createElement('div');
    container.id = 'cy';
    document.body.appendChild(container);

    // Initialize Cytoscape
    cy = CytoscapeManager.initialize('cy');

    // Add some test nodes
    cy.add([
      {
        data: { id: 'node1', label: 'Software Node', category: 'Software' },
        position: { x: 100, y: 100 },
        classes: 'Software'
      },
      {
        data: { id: 'node-Contact', label: 'Contact', category: 'Contact' },
        position: { x: 200, y: 200 },
        classes: 'Contact'
      }
    ]);
  });

  afterEach(() => {
    // Clean up
    if (container && container.parentNode) {
      document.body.removeChild(container);
    }

    cy = null;

    // Reset mocks
    jest.resetAllMocks();
  });

  test('should register click handlers for nodes', () => {
    // Given Cytoscape is initialized with nodes
    expect(cy.nodes().length).toBe(2);

    // When we register interaction handlers
    CytoscapeManager.registerInteractionHandlers();

    // Then click handlers should be registered
    // We'll verify this by checking if the cy object has event listeners
    // This is an implementation detail, but we need to verify the listeners are added
    expect(cy.$('node').hasEventListener('tap')).toBe(true);
  });

  test('should show contact modal when Contact node is clicked', () => {
    // Given Cytoscape is initialized with a Contact node
    expect(cy.$('#node-Contact').length).toBe(1);

    // When we register interaction handlers
    CytoscapeManager.registerInteractionHandlers();

    // And we simulate a click on the Contact node
    cy.$('#node-Contact').emit('tap');

    // Then the contact modal should be shown
    expect(global.ContactModal.show).toHaveBeenCalled();
  });

  test('should not show contact modal when other nodes are clicked', () => {
    // Given Cytoscape is initialized with a non-Contact node
    expect(cy.$('#node1').length).toBe(1);

    // When we register interaction handlers
    CytoscapeManager.registerInteractionHandlers();

    // And we simulate a click on a non-Contact node
    cy.$('#node1').emit('tap');

    // Then the contact modal should not be shown
    expect(global.ContactModal.show).not.toHaveBeenCalled();
  });
});
