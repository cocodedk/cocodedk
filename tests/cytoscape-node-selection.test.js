/**
 * Cytoscape.js Node Interaction Tests
 *
 * Tests for node interaction behavior in Cytoscape.js
 */

// Import CytoscapeManager
const CytoscapeManager = require('../js/cytoscape-manager');

describe('Node Interaction', () => {
  let container;
  let cy;

  beforeEach(() => {
    // Mock ContactModal globally if not already mocked
    global.ContactModal = global.ContactModal || {
      show: jest.fn(),
      showModal: jest.fn()
    };

    // Set up a DOM container for Cytoscape
    container = document.createElement('div');
    container.id = 'cy';
    document.body.appendChild(container);

    // Initialize Cytoscape
    cy = CytoscapeManager.initialize('cy');

    // Add test nodes
    cy.add([
      {
        data: { id: 'node1', label: 'Node 1', category: 'Software' }
      },
      {
        data: { id: 'node-Contact', label: 'Contact Us', category: 'Contact' }
      }
    ]);
  });

  afterEach(() => {
    // Clean up
    if (container && container.parentNode) {
      document.body.removeChild(container);
    }
    cy = null;
    jest.clearAllMocks();
  });

  test('should show Contact modal when Contact node is clicked', () => {
    // Register interaction handlers
    CytoscapeManager.registerInteractionHandlers();

    // Get the Contact node
    const contactNode = cy.$('#node-Contact');

    // Simulate click/tap on the Contact node
    contactNode.emit('tap');

    // Verify modal is shown
    expect(global.ContactModal.show).toHaveBeenCalled();
  });

  test('should not show Contact modal when other nodes are clicked', () => {
    // Register interaction handlers
    CytoscapeManager.registerInteractionHandlers();

    // Get a non-Contact node
    const regularNode = cy.$('#node1');

    // Simulate click/tap on the regular node
    regularNode.emit('tap');

    // Verify modal is NOT shown
    expect(global.ContactModal.show).not.toHaveBeenCalled();
  });
});
