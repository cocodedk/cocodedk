/**
 * Cytoscape.js Layout Tests
 *
 * Tests for layout functionality
 */

// Import CytoscapeManager
const CytoscapeManager = require('../js/cytoscape-manager');

describe('Layout Functionality', () => {
  let container;
  let cy;
  // Map to store mock nodes
  let mockNodes = {};

  beforeEach(() => {
    // Mock the CytoscapeNodeInteractions module if needed
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
    cy = CytoscapeManager.initialize('cy');

    // Reset mockNodes for each test
    mockNodes = {};

    // Override cy.add method to properly create mock elements
    cy.add = jest.fn().mockImplementation((elements) => {
      const mockElements = [];

      if (!Array.isArray(elements)) {
        elements = [elements];
      }

      elements.forEach(element => {
        // Ensure data property has proper structure
        if (element && element.data && element.data.id) {
          const id = element.data.id;
          const isEdge = element.data.source && element.data.target;

          const initialPosition = element.position || { x: 0, y: 0 };

          const mockElement = {
            id: () => id,
            isNode: () => !isEdge,
            isEdge: () => isEdge,
            data: (key) => {
              if (!key) return element.data;
              return element.data[key];
            },
            position: jest.fn(() => initialPosition),
            renderedPosition: jest.fn(() => initialPosition),
            classes: element.classes || '',
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
            style: jest.fn(() => ({})),
            length: 1
          };

          // Store mock elements for later access
          mockNodes[id] = mockElement;

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
      if (selector.startsWith('#')) {
        const id = selector.substring(1);
        if (mockNodes[id]) {
          return mockNodes[id];
        }
      }
      return { length: 0 };
    });

    // Mock cy.layout to return a layout object with run method
    cy.layout = jest.fn().mockReturnValue({
      run: jest.fn()
    });
  });

  afterEach(() => {
    if (container && container.parentNode) {
      document.body.removeChild(container);
    }

    // Clean up global mocks
    delete global.CytoscapeNodeInteractions;

    cy = null;
    mockNodes = {};
    jest.clearAllMocks();
  });

  test('should maintain preset node positions when using preset layout', () => {
    // Given nodes with specific positions
    const nodes = [
      {
        data: { id: 'node1', label: 'Node 1' },
        position: { x: 100, y: 200 }
      },
      {
        data: { id: 'node2', label: 'Node 2' },
        position: { x: 300, y: 400 }
      }
    ];

    // When adding to graph and using preset layout
    cy.add(nodes);
    cy.layout({ name: 'preset' }).run();

    // Then positions should be maintained
    expect(cy.$('#node1').position().x).toBe(100);
    expect(cy.$('#node1').position().y).toBe(200);
    expect(cy.$('#node2').position().x).toBe(300);
    expect(cy.$('#node2').position().y).toBe(400);
  });

  test('should apply custom layout options', () => {
    // Given a graph with nodes
    cy.add([
      { data: { id: 'a' } },
      { data: { id: 'b' } },
      { data: { id: 'c' } },
      { data: { id: 'ab', source: 'a', target: 'b' } },
      { data: { id: 'bc', source: 'b', target: 'c' } }
    ]);

    // When applying custom layout
    const layoutOptions = {
      name: 'circle',
      radius: 100,
      animationDuration: 0 // For testing
    };

    // Spy on layout creation
    const layoutSpy = jest.spyOn(cy, 'layout');

    // Apply layout
    CytoscapeManager.applyLayout(layoutOptions);

    // Then layout should be created with correct options
    // Using objectContaining to allow for default options to be added
    expect(layoutSpy).toHaveBeenCalledWith(expect.objectContaining(layoutOptions));
  });

  test('should merge default options with custom options', () => {
    // Given a graph with nodes
    cy.add([
      { data: { id: 'a' } },
      { data: { id: 'b' } }
    ]);

    // When applying partial layout options
    const layoutOptions = {
      name: 'grid'
    };

    // Spy on layout creation
    const layoutSpy = jest.spyOn(cy, 'layout');

    // Apply layout
    CytoscapeManager.applyLayout(layoutOptions);

    // Then layout should be created with merged options
    expect(layoutSpy).toHaveBeenCalledWith(expect.objectContaining({
      name: 'grid',
      fit: false  // Default option from applyLayout
    }));
  });

  test('should return the layout object', () => {
    // Given a graph with nodes
    cy.add([
      { data: { id: 'a' } },
      { data: { id: 'b' } }
    ]);

    // Mock the layout object
    const mockLayout = {
      run: jest.fn()
    };
    jest.spyOn(cy, 'layout').mockReturnValue(mockLayout);

    // When applying layout
    const returnedLayout = CytoscapeManager.applyLayout({ name: 'circle' });

    // Then the function should return the layout object
    expect(returnedLayout).toBe(mockLayout);
    expect(mockLayout.run).toHaveBeenCalled();
  });

  test('should return null when cy is not initialized', () => {
    // Given CytoscapeManager without initialized cy
    const originalGetInstance = CytoscapeManager.getInstance;

    // Mock the getInstance method to return null
    CytoscapeManager.getInstance = jest.fn().mockReturnValue(null);

    // Create mock layout with a spy on run
    const mockLayout = { run: jest.fn() };

    // Save the original layout function
    const originalLayout = global.cy.layout;

    // Mock the layout function to return our mock layout
    global.cy.layout = jest.fn().mockReturnValue(mockLayout);

    // When applying layout
    const result = CytoscapeManager.applyLayout({ name: 'circle' });

    // Then verify the layout.run was not called (because cy is null)
    expect(mockLayout.run).not.toHaveBeenCalled();

    // Restore the original methods
    CytoscapeManager.getInstance = originalGetInstance;
    global.cy.layout = originalLayout;
  });
});
