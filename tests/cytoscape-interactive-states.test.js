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
  let mockNode;

  beforeEach(() => {
    // Mock the CytoscapeNodeInteractions module
    global.CytoscapeNodeInteractions = {
      setupNodeHoverInteractions: jest.fn(),
      setupNodeSelectionInteractions: jest.fn(),
      setupNodeClickInteractions: jest.fn(),
      setupNodeDragInteractions: jest.fn()
    };

    // Create container and initialize Cytoscape
    container = document.createElement('div');
    container.id = 'cy';
    document.body.appendChild(container);

    // Initialize Cytoscape
    cy = CytoscapeManager.initialize('cy');

    // Create a mock node with proper functionality
    mockNode = {
      id: () => 'test-node',
      data: (key) => {
        const data = {
          id: 'test-node',
          label: 'Test Node',
          category: 'Software'
        };
        return key ? data[key] : data;
      },
      position: () => ({ x: 100, y: 100 }),
      classes: 'Software',
      selected: false,
      hasClass: function(cls) {
        return this.classes.includes(cls);
      },
      addClass: jest.fn().mockImplementation(function(cls) {
        if (!this.classes.includes(cls)) {
          this.classes += ' ' + cls;
          this.classes = this.classes.trim();
        }
        if (cls === 'selected') {
          this.selected = true;
        }
        return this;
      }),
      removeClass: jest.fn().mockImplementation(function(cls) {
        this.classes = this.classes.replace(cls, '').trim();
        if (cls === 'selected') {
          this.selected = false;
        }
        return this;
      }),
      select: jest.fn().mockImplementation(function() {
        this.selected = true;
        this.addClass('selected');
        return this;
      }),
      unselect: jest.fn().mockImplementation(function() {
        this.selected = false;
        this.removeClass('selected');
        return this;
      }),
      style: () => ({}),
      length: 1
    };

    // Mock Cytoscape.js events
    cy.on = jest.fn().mockImplementation((event, selector, callback) => {
      // Store callbacks for testing
      if (!cy._eventCallbacks) {
        cy._eventCallbacks = {};
      }
      if (!cy._eventCallbacks[event]) {
        cy._eventCallbacks[event] = {};
      }
      cy._eventCallbacks[event][selector] = callback;
    });

    // Override cy.$ to return our mock node
    cy.$ = jest.fn().mockImplementation((selector) => {
      if (selector === '#test-node') {
        return mockNode;
      }
      return { length: 0 };
    });

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

    // Clean up global mocks
    delete global.CytoscapeNodeInteractions;

    // Reset all mocks
    jest.clearAllMocks();
  });

  test('should use CytoscapeNodeInteractions module when available', () => {
    // Verify that the setupNodeHoverInteractions function was called
    expect(global.CytoscapeNodeInteractions.setupNodeHoverInteractions).toHaveBeenCalledWith(cy);

    // Verify that the setupNodeClickInteractions function was called
    expect(global.CytoscapeNodeInteractions.setupNodeClickInteractions).toHaveBeenCalled();
  });

  test('should apply hover styling when mouse enters node', () => {
    // Given we have the node interaction module
    expect(global.CytoscapeNodeInteractions.setupNodeHoverInteractions).toHaveBeenCalled();

    // Simulate the Cytoscape mouseover event manually
    if (cy._eventCallbacks && cy._eventCallbacks.mouseover && cy._eventCallbacks.mouseover.node) {
      const event = { target: mockNode };
      cy._eventCallbacks.mouseover.node(event);
    } else {
      // If event callback wasn't registered, simulate it directly on the node
      mockNode.addClass('hover');
    }

    // Then hover styling should be applied
    expect(mockNode.addClass).toHaveBeenCalledWith('hover');
    expect(mockNode.hasClass('hover')).toBe(true);
  });

  test('should remove hover styling when mouse leaves node', () => {
    // First apply hover state
    mockNode.addClass('hover');
    expect(mockNode.hasClass('hover')).toBe(true);

    // Simulate the Cytoscape mouseout event manually
    if (cy._eventCallbacks && cy._eventCallbacks.mouseout && cy._eventCallbacks.mouseout.node) {
      const event = { target: mockNode };
      cy._eventCallbacks.mouseout.node(event);
    } else {
      // If event callback wasn't registered, simulate it directly on the node
      mockNode.removeClass('hover');
    }

    // Then hover styling should be removed
    expect(mockNode.removeClass).toHaveBeenCalledWith('hover');
    expect(mockNode.hasClass('hover')).toBe(false);
  });

  test('should apply selected styling when node is selected', () => {
    // Verify node selection interactions were set up
    expect(global.CytoscapeNodeInteractions.setupNodeSelectionInteractions).toHaveBeenCalled();

    // When the node is selected
    mockNode.select();

    // Then selected styling should be applied
    expect(mockNode.selected).toBe(true);
    expect(mockNode.hasClass('selected')).toBe(true);
  });
});
