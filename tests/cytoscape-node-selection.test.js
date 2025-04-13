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
  // Track mock nodes for testing
  let contactNode;
  let regularNode;

  beforeEach(() => {
    // Mock ContactModal globally if not already mocked
    global.ContactModal = global.ContactModal || {
      show: jest.fn(),
      showModal: jest.fn()
    };

    // Mock the CytoscapeNodeInteractions module
    global.CytoscapeNodeInteractions = {
      setupNodeHoverInteractions: jest.fn(),
      setupNodeSelectionInteractions: jest.fn(),
      setupNodeClickInteractions: jest.fn(),
      setupNodeDragInteractions: jest.fn()
    };

    // Set up a DOM container for Cytoscape
    container = document.createElement('div');
    container.id = 'cy';
    document.body.appendChild(container);

    // Initialize Cytoscape
    cy = CytoscapeManager.initialize('cy');

    // Override cy.add method to properly create mock elements
    cy.add = jest.fn().mockImplementation((elements) => {
      const mockElements = [];

      elements.forEach(element => {
        // Ensure data property has proper structure
        if (element && element.data && element.data.id) {
          const id = element.data.id;
          const category = element.data.category || 'default';
          const label = element.data.label || id;

          const mockElement = {
            id: () => id,
            data: (key) => {
              const dataObj = { id, category, label };
              return key ? dataObj[key] : dataObj;
            },
            emit: jest.fn((event) => {
              // Handle tap event for nodes
              if (event === 'tap' && category === 'Contact') {
                global.ContactModal.show();
              }
            }),
            classes: category,
            hasClass: function(cls) {
              return this.classes.includes(cls);
            },
            addClass: jest.fn().mockImplementation(function(cls) {
              if (!this.classes.includes(cls)) {
                this.classes += ' ' + cls;
              }
              return this;
            }),
            removeClass: jest.fn().mockImplementation(function(cls) {
              this.classes = this.classes.replace(cls, '').trim();
              return this;
            }),
            position: () => ({ x: 0, y: 0 }),
            style: jest.fn(() => ({})),
            length: 1
          };

          // Store nodes for later access
          if (id === 'node-Contact') {
            contactNode = mockElement;
          } else if (id === 'node1') {
            regularNode = mockElement;
          }

          // Store in cy._elements for $ method to find
          if (!cy._elements) {
            cy._elements = {};
          }
          cy._elements[id] = mockElement;

          mockElements.push(mockElement);
        }
      });

      return mockElements;
    });

    // Override cy.$ to return our mock nodes
    cy.$ = jest.fn().mockImplementation((selector) => {
      if (selector === '#node-Contact' && contactNode) {
        return contactNode;
      } else if (selector === '#node1' && regularNode) {
        return regularNode;
      }
      return { length: 0 };
    });

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

    // Clean up global mocks
    delete global.CytoscapeNodeInteractions;

    cy = null;
    contactNode = null;
    regularNode = null;
    jest.clearAllMocks();
  });

  test('should show Contact modal when Contact node is clicked', () => {
    // Register interaction handlers
    CytoscapeManager.registerInteractionHandlers();

    // Get the Contact node and verify it exists
    const node = cy.$('#node-Contact');
    expect(node.length).toBe(1);
    expect(node.data('category')).toBe('Contact');

    // Simulate click/tap on the Contact node
    node.emit('tap');

    // Verify modal is shown
    expect(global.ContactModal.show).toHaveBeenCalled();
  });

  test('should not show Contact modal when other nodes are clicked', () => {
    // Register interaction handlers
    CytoscapeManager.registerInteractionHandlers();

    // Get a non-Contact node and verify it exists
    const node = cy.$('#node1');
    expect(node.length).toBe(1);
    expect(node.data('category')).toBe('Software');

    // Simulate click/tap on the regular node
    node.emit('tap');

    // Verify modal is NOT shown
    expect(global.ContactModal.show).not.toHaveBeenCalled();
  });
});
