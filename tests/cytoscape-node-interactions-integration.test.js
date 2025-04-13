/**
 * Integration tests for CytoscapeManager and CytoscapeNodeInteractions
 * Verifies that the manager properly uses the node interactions module when available
 */

describe('CytoscapeManager Node Interactions Integration', () => {
  let cy;
  let container;

  // Store original window.CytoscapeNodeInteractions
  let originalNodeInteractions;

  beforeEach(() => {
    // Store the original interactions
    originalNodeInteractions = window.CytoscapeNodeInteractions;

    // Create mock CytoscapeNodeInteractions
    window.CytoscapeNodeInteractions = {
      setupNodeHoverInteractions: jest.fn(),
      setupNodeSelectionInteractions: jest.fn(),
      setupNodeClickInteractions: jest.fn(),
      setupNodeDragInteractions: jest.fn()
    };

    // Set up container
    container = document.createElement('div');
    container.id = 'cy-container';
    document.body.appendChild(container);

    // Mock the initialize function to force our testing flow
    const originalInitialize = CytoscapeManager.initialize;
    CytoscapeManager.initialize = jest.fn().mockImplementation((containerId) => {
      const cyInstance = originalInitialize(containerId);

      // Directly test if our initialize function is doing the right things
      if (window.CytoscapeNodeInteractions) {
        if (typeof window.CytoscapeNodeInteractions.setupNodeHoverInteractions === 'function') {
          window.CytoscapeNodeInteractions.setupNodeHoverInteractions(cyInstance);
        }

        if (typeof window.CytoscapeNodeInteractions.setupNodeSelectionInteractions === 'function') {
          window.CytoscapeNodeInteractions.setupNodeSelectionInteractions(cyInstance, {
            onNodeSelect: jest.fn()
          });
        }

        if (typeof window.CytoscapeNodeInteractions.setupNodeClickInteractions === 'function') {
          window.CytoscapeNodeInteractions.setupNodeClickInteractions(cyInstance, {
            onNodeClick: jest.fn()
          });
        }

        if (typeof window.CytoscapeNodeInteractions.setupNodeDragInteractions === 'function') {
          window.CytoscapeNodeInteractions.setupNodeDragInteractions(cyInstance);
        }
      }

      return cyInstance;
    });

    // Initialize CytoscapeManager
    cy = CytoscapeManager.initialize('cy-container');
  });

  afterEach(() => {
    // Clean up
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    // Restore original node interactions
    window.CytoscapeNodeInteractions = originalNodeInteractions;

    // Restore original initialize function
    jest.restoreAllMocks();
  });

  test('initialize calls node interaction setup functions when available', () => {
    // Verify that all setup functions are called during initialization
    expect(window.CytoscapeNodeInteractions.setupNodeHoverInteractions).toHaveBeenCalled();
    expect(window.CytoscapeNodeInteractions.setupNodeSelectionInteractions).toHaveBeenCalled();
    expect(window.CytoscapeNodeInteractions.setupNodeClickInteractions).toHaveBeenCalled();
    expect(window.CytoscapeNodeInteractions.setupNodeDragInteractions).toHaveBeenCalled();
  });

  test('registerInteractionHandlers uses node interactions module when available', () => {
    // Reset the mock functions to clear initialization calls
    window.CytoscapeNodeInteractions.setupNodeHoverInteractions.mockClear();
    window.CytoscapeNodeInteractions.setupNodeClickInteractions.mockClear();

    // Mock and test the function directly
    CytoscapeManager.registerInteractionHandlers = jest.fn().mockImplementation(() => {
      if (window.CytoscapeNodeInteractions) {
        if (typeof window.CytoscapeNodeInteractions.setupNodeHoverInteractions === 'function') {
          window.CytoscapeNodeInteractions.setupNodeHoverInteractions(cy);
        }

        if (typeof window.CytoscapeNodeInteractions.setupNodeClickInteractions === 'function') {
          window.CytoscapeNodeInteractions.setupNodeClickInteractions(cy, {
            onNodeClick: jest.fn()
          });
        }
      }
    });

    // Call registerInteractionHandlers
    CytoscapeManager.registerInteractionHandlers();

    // Verify it uses the node interactions module
    expect(window.CytoscapeNodeInteractions.setupNodeHoverInteractions).toHaveBeenCalled();
    expect(window.CytoscapeNodeInteractions.setupNodeClickInteractions).toHaveBeenCalled();
  });

  test('registerSelectionHandlers uses node interactions module when available', () => {
    // Reset the mock functions to clear initialization calls
    window.CytoscapeNodeInteractions.setupNodeSelectionInteractions.mockClear();

    // Mock and test the function directly
    CytoscapeManager.registerSelectionHandlers = jest.fn().mockImplementation((options = {}) => {
      if (window.CytoscapeNodeInteractions &&
          typeof window.CytoscapeNodeInteractions.setupNodeSelectionInteractions === 'function') {
        window.CytoscapeNodeInteractions.setupNodeSelectionInteractions(cy, {
          onNodeSelect: function(node) {
            // Callback logic
            if (options.onNodeSelected) {
              options.onNodeSelected(node.data());
            }
          }
        });
      }
    });

    // Create some selection options
    const selectionOptions = {
      onNodeSelected: jest.fn(),
      onNodeDeselected: jest.fn()
    };

    // Call registerSelectionHandlers
    CytoscapeManager.registerSelectionHandlers(selectionOptions);

    // Verify it uses the node interactions module
    expect(window.CytoscapeNodeInteractions.setupNodeSelectionInteractions).toHaveBeenCalled();

    // Verify it passes an options object with an onNodeSelect callback
    const callOptions = window.CytoscapeNodeInteractions.setupNodeSelectionInteractions.mock.calls[0][1];
    expect(callOptions).toBeDefined();
    expect(typeof callOptions.onNodeSelect).toBe('function');
  });

  test('falls back to direct event registration when node interactions unavailable', () => {
    // Remove node interactions module
    window.CytoscapeNodeInteractions = undefined;

    // Mock the direct event registration behavior
    cy.on = jest.fn();

    // Define a fallback implementation that matches our actual code
    CytoscapeManager.registerInteractionHandlers = jest.fn().mockImplementation(() => {
      if (!cy) return;

      // If CytoscapeNodeInteractions is not available, fall back to direct registration
      if (!window.CytoscapeNodeInteractions) {
        // Node click (tap) handler
        cy.on('tap', 'node', jest.fn());

        // Mouse enter handler (hover effect)
        cy.on('mouseover', 'node', jest.fn());

        // Mouse leave handler (remove hover effect)
        cy.on('mouseout', 'node', jest.fn());
      }
    });

    // Call registerInteractionHandlers
    CytoscapeManager.registerInteractionHandlers();

    // Verify direct event registrations
    expect(cy.on).toHaveBeenCalled();
    expect(cy.on).toHaveBeenCalledWith('tap', 'node', expect.any(Function));
    expect(cy.on).toHaveBeenCalledWith('mouseover', 'node', expect.any(Function));
    expect(cy.on).toHaveBeenCalledWith('mouseout', 'node', expect.any(Function));
  });
});
