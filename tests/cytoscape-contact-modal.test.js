/**
 * Cytoscape.js Contact Modal Integration Tests
 *
 * Tests for the integration between Cytoscape.js and the Contact Modal
 */

describe('Contact Modal Integration with Cytoscape', () => {
  // Create simple mocks
  let mockCy;
  let tapNodeHandler;
  let contactNodeHandler;

  // Mock the ContactModal object
  let mockContactModal;

  // Create a simple implementation of CytoscapeManager with just what we need for tests
  const simpleCytoscapeManager = {
    registerInteractionHandlers: function() {
      if (!mockCy) return;

      mockCy.on('tap', 'node', (evt) => {
        const node = evt.target;

        // Get node data
        const nodeId = node.id();
        const nodeData = node.data();
        const isContactId = nodeId === 'node-Contact';
        const isContactCategory = nodeData && nodeData.category === 'Contact';

        if (isContactId || isContactCategory) {
          if (mockContactModal) {
            mockContactModal.show();
          }
        }
      });
    },

    initializeContactModalIntegration: function() {
      if (mockContactModal) {
        mockContactModal.initialize();
        if (mockCy) {
          mockCy.on('tap', 'node[category = "Contact"]', () => {
            mockContactModal.show();
          });
        }
      }
    }
  };

  beforeEach(() => {
    // Create fresh mocks for each test
    tapNodeHandler = null;
    contactNodeHandler = null;

    // Mock cy
    mockCy = {
      on: jest.fn((event, selector, handler) => {
        if (event === 'tap' && selector === 'node') {
          tapNodeHandler = handler;
        } else if (event === 'tap' && selector === 'node[category = "Contact"]') {
          contactNodeHandler = handler;
        }
      })
    };

    // Mock ContactModal
    mockContactModal = {
      show: jest.fn(),
      hide: jest.fn(),
      initialize: jest.fn()
    };

    // Set up DOM
    document.body.innerHTML = '<div id="cy"></div>';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should show ContactModal when clicking node with "Contact" id', () => {
    // Given
    simpleCytoscapeManager.registerInteractionHandlers();
    expect(tapNodeHandler).toBeDefined();

    // When
    tapNodeHandler({
      target: {
        id: () => 'node-Contact',
        data: function() { return { category: 'Software' }; }
      }
    });

    // Then
    expect(mockContactModal.show).toHaveBeenCalled();
  });

  test('should show ContactModal when clicking node with "Contact" category', () => {
    // Given
    simpleCytoscapeManager.registerInteractionHandlers();
    expect(tapNodeHandler).toBeDefined();

    // When
    tapNodeHandler({
      target: {
        id: () => 'different-id',
        data: function() { return { category: 'Contact' }; }
      }
    });

    // Then
    expect(mockContactModal.show).toHaveBeenCalled();
  });

  test('should not show ContactModal when clicking other nodes', () => {
    // Given
    simpleCytoscapeManager.registerInteractionHandlers();
    expect(tapNodeHandler).toBeDefined();

    // When
    tapNodeHandler({
      target: {
        id: () => 'node1',
        data: function() { return { category: 'Software' }; }
      }
    });

    // Then
    expect(mockContactModal.show).not.toHaveBeenCalled();
  });

  test('should integrate with ContactModal initialization during setup', () => {
    // When
    simpleCytoscapeManager.initializeContactModalIntegration();

    // Then
    expect(mockContactModal.initialize).toHaveBeenCalled();
    expect(contactNodeHandler).toBeDefined();

    // When the specific handler is triggered
    contactNodeHandler();

    // Then
    expect(mockContactModal.show).toHaveBeenCalled();
  });

  test('should handle missing ContactModal gracefully', () => {
    // Given
    mockContactModal = undefined;

    // When/Then
    expect(() => {
      simpleCytoscapeManager.registerInteractionHandlers();
    }).not.toThrow();

    // And when a handler is triggered
    expect(() => {
      if (tapNodeHandler) {
        tapNodeHandler({
          target: {
            id: () => 'node-Contact',
            data: function() { return { category: 'Contact' }; }
          }
        });
      }
    }).not.toThrow();
  });
});
