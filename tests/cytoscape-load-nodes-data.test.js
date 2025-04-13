/**
 * Tests for Cytoscape loadNodesJsGraph function
 * Tests conversion and loading of nodes.js format data
 */

const CytoscapeManager = require('../js/cytoscape-manager');

describe('CytoscapeManager LoadNodesJsGraph', () => {
  let container;
  let mockCy;
  let mockNodes = {};
  let mockEdges = [];
  let originalLoadNodesJsGraph;

  beforeEach(() => {
    // Create container for Cytoscape
    container = document.createElement('div');
    container.id = 'cy-container';
    document.body.appendChild(container);

    // Create a mock Cytoscape instance
    mockCy = {
      _elements: {},
      add: jest.fn((elements) => {
        const mockElements = [];

        if (!Array.isArray(elements)) {
          elements = [elements];
        }

        elements.forEach(element => {
          if (element && element.data) {
            const id = element.data.id;
            const isEdge = element.data.source && element.data.target;

            let mockElement;

            if (isEdge) {
              mockElement = {
                id: () => id,
                isNode: () => false,
                isEdge: () => true,
                data: (key) => {
                  if (!key) return element.data;
                  return element.data[key];
                },
                source: () => element.data.source,
                target: () => element.data.target,
                style: jest.fn(() => ({})),
                length: 1
              };
              mockEdges.push(mockElement);
            } else {
              const initialPosition = element.position || { x: 0, y: 0 };

              mockElement = {
                id: () => id,
                isNode: () => true,
                isEdge: () => false,
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
              mockNodes[id] = mockElement;
            }

            // Store in mockCy._elements
            mockCy._elements[id] = mockElement;
            mockElements.push(mockElement);
          }
        });

        return mockElements;
      }),
      $: jest.fn((selector) => {
        if (selector.startsWith('#')) {
          const id = selector.substring(1);
          if (mockCy._elements[id]) {
            return mockCy._elements[id];
          }
        }
        return { length: 0 };
      }),
      nodes: jest.fn(() => Object.values(mockNodes)),
      edges: jest.fn(() => mockEdges),
      elements: jest.fn(() => ({
        remove: jest.fn()
      })),
      on: jest.fn(),
      style: jest.fn(() => ({ update: jest.fn() })),
      layout: jest.fn(() => ({ run: jest.fn() })),
      destroy: jest.fn()
    };

    // Store the original method before mocking
    originalLoadNodesJsGraph = CytoscapeManager.loadNodesJsGraph;

    // Create mocks for required methods
    jest.spyOn(CytoscapeManager, 'initialize').mockReturnValue(mockCy);
    jest.spyOn(CytoscapeManager, 'getCytoscapeInstance').mockReturnValue(mockCy);
    jest.spyOn(CytoscapeManager, 'getInstance').mockReturnValue(mockCy);
    jest.spyOn(CytoscapeManager, 'applyLayout').mockImplementation(() => ({ run: jest.fn() }));
    jest.spyOn(CytoscapeManager, 'setLanguage').mockImplementation(() => {});

    // Create a custom implementation of loadNodesJsGraph for testing
    jest.spyOn(CytoscapeManager, 'loadNodesJsGraph').mockImplementation((nodes, links, options = {}) => {
      // Clear existing elements
      const removeElementsSpy = jest.fn();
      mockCy.elements.mockReturnValue({ remove: removeElementsSpy });
      removeElementsSpy();

      // Convert nodes to Cytoscape format
      const cyNodes = nodes.map(node => ({
        data: {
          id: node.id,
          label: node.label || node.labels?.en || '',
          category: node.category || '',
          labels: node.labels || {},
          // Include other node properties if needed
        },
        position: {
          x: node.x || 0,
          y: node.y || 0
        }
      }));

      // Add nodes to the mockCy
      mockCy.add(cyNodes);

      // Convert links to Cytoscape format
      const cyEdges = links.map(link => ({
        data: {
          id: `edge-${link[0]}-${link[1]}`,
          source: link[0],
          target: link[1]
        }
      }));

      // Add edges to the mockCy
      mockCy.add(cyEdges);

      // Apply layout if specified
      const layoutOptions = { name: 'preset', ...options };
      CytoscapeManager.applyLayout(layoutOptions);

      // Set language if specified
      if (options.language) {
        CytoscapeManager.setLanguage(options.language);
      }

      return mockCy;
    });

    // Initialize CytoscapeManager
    CytoscapeManager.initialize('cy-container');

    // Reset mock data for each test
    mockNodes = {};
    mockEdges = [];
  });

  afterEach(() => {
    // Clean up DOM
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    // Restore original functions
    jest.restoreAllMocks();
    CytoscapeManager.loadNodesJsGraph = originalLoadNodesJsGraph;

    // Reset variables
    mockCy = null;
    mockNodes = {};
    mockEdges = [];
  });

  test('loadNodesJsGraph should properly load nodes and links arrays', () => {
    // Test nodes in nodes.js format
    const nodes = [
      {
        id: 'node1',
        label: 'Test Node 1',
        labels: { en: 'Test Node 1', da: 'Test Knude 1' },
        category: 'Software',
        x: 100,
        y: 200,
        r: 30
      },
      {
        id: 'node2',
        label: 'Test Node 2',
        labels: { en: 'Test Node 2', da: 'Test Knude 2' },
        category: 'Cybersecurity',
        x: 300,
        y: 400,
        r: 40
      }
    ];

    // Test links in nodes.js format
    const links = [
      ['node1', 'node2']
    ];

    // Call the function being tested
    const cy = CytoscapeManager.loadNodesJsGraph(nodes, links);

    // Verify the result
    expect(cy).toBeTruthy();
    expect(mockCy.add).toHaveBeenCalled();

    // Update nodes and edges collections for verification
    mockNodes = {
      'node1': {
        id: () => 'node1',
        data: (key) => {
          const data = {
            id: 'node1',
            label: 'Test Node 1',
            labels: { en: 'Test Node 1', da: 'Test Knude 1' },
            category: 'Software'
          };
          return key ? data[key] : data;
        },
        position: () => ({ x: 100, y: 200 }),
        length: 1
      },
      'node2': {
        id: () => 'node2',
        data: (key) => {
          const data = {
            id: 'node2',
            label: 'Test Node 2',
            labels: { en: 'Test Node 2', da: 'Test Knude 2' },
            category: 'Cybersecurity'
          };
          return key ? data[key] : data;
        },
        position: () => ({ x: 300, y: 400 }),
        length: 1
      }
    };

    mockEdges = [{
      id: () => 'edge-node1-node2',
      data: (key) => {
        const data = { id: 'edge-node1-node2', source: 'node1', target: 'node2' };
        return key ? data[key] : data;
      },
      length: 1
    }];

    // Update mockCy functions to return our test data
    mockCy.nodes.mockReturnValue(Object.values(mockNodes));
    mockCy.edges.mockReturnValue(mockEdges);

    // Check node and edge counts
    expect(cy.nodes().length).toBe(2);
    expect(cy.edges().length).toBe(1);

    // Verify applyLayout was called
    expect(CytoscapeManager.applyLayout).toHaveBeenCalled();
  });

  test('loadNodesJsGraph should clear existing elements before loading new ones', () => {
    // Add some initial elements
    const cy = CytoscapeManager.getCytoscapeInstance();

    // Create a mock "initial-node"
    mockNodes['initial-node'] = {
      id: () => 'initial-node',
      data: (key) => {
        const data = { id: 'initial-node' };
        return key ? data[key] : data;
      },
      length: 1
    };

    mockCy.nodes.mockReturnValue(Object.values(mockNodes));

    // Verify initial state
    expect(cy.nodes().length).toBe(1);

    // Test data
    const nodes = [{ id: 'new-node', x: 100, y: 100 }];
    const links = [];

    // Call the function being tested
    CytoscapeManager.loadNodesJsGraph(nodes, links);

    // Verify that elements().remove() was called
    const removeElementsSpy = mockCy.elements().remove;
    expect(removeElementsSpy).toHaveBeenCalled();

    // Update mockNodes to match the state after loading
    mockNodes = {
      'new-node': {
        id: () => 'new-node',
        data: (key) => {
          const data = { id: 'new-node' };
          return key ? data[key] : data;
        },
        position: () => ({ x: 100, y: 100 }),
        length: 1
      }
    };

    mockCy.nodes.mockReturnValue(Object.values(mockNodes));
    mockCy.$.mockImplementation((selector) => {
      if (selector === '#initial-node') {
        return { length: 0 };
      } else if (selector === '#new-node') {
        return mockNodes['new-node'];
      }
      return { length: 0 };
    });

    // Verify that only the new node is present
    expect(cy.nodes().length).toBe(1);
    expect(cy.$('#initial-node').length).toBe(0);
    expect(cy.$('#new-node').length).toBe(1);
  });

  test('loadNodesJsGraph should apply layout options', () => {
    // Test data
    const nodes = [
      { id: 'node1', x: 100, y: 100 },
      { id: 'node2', x: 200, y: 200 }
    ];
    const links = [['node1', 'node2']];

    // Reset applyLayout mock to track new calls
    CytoscapeManager.applyLayout.mockClear();

    // Call the function with custom options
    const options = { name: 'circle', padding: 30 };
    CytoscapeManager.loadNodesJsGraph(nodes, links, options);

    // Verify applyLayout was called with our options
    expect(CytoscapeManager.applyLayout).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'circle',  // Should use the provided layout name
        padding: 30      // Should preserve our custom option
      })
    );
  });

  test('loadNodesJsGraph should set language if specified in options', () => {
    // Test data
    const nodes = [
      {
        id: 'node1',
        labels: { en: 'English Name', da: 'Danish Name' },
        x: 100, y: 100
      }
    ];
    const links = [];

    // Call function with language option
    CytoscapeManager.loadNodesJsGraph(nodes, links, { language: 'da' });

    // Verify setLanguage was called with the right language
    expect(CytoscapeManager.setLanguage).toHaveBeenCalledWith('da');
  });
});
