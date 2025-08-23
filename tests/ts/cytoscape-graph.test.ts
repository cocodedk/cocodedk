/**
 * Test file for the TypeScript version of cytoscape-graph.ts
 */

// Mock the cytoscape object
const mockCytoscape = jest.fn();
// @ts-ignore
global.cytoscape = mockCytoscape;

// Mock document methods
// @ts-ignore
document.getElementById = jest.fn();
const mockAddEventListener = jest.spyOn(document, 'addEventListener');

// We'll require the module dynamically to avoid issues with imports
let cytoscapeGraph: any;

describe('TypeScript Cytoscape Graph Initialization', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Set up the mock DOM element
    const mockContainer = document.createElement('div');
    // @ts-ignore
    document.getElementById.mockReturnValue(mockContainer);

    // Clear the module cache to reset the state
    jest.resetModules();

    // Require the module dynamically
    cytoscapeGraph = require('../../src/ts/cytoscape/cytoscape-graph');
  });

  test('should initialize Cytoscape when DOM is loaded', () => {
    // Check if the event listener was added
    expect(mockAddEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));

    // Simulate DOMContentLoaded event
    // @ts-ignore
    const eventCallback = mockAddEventListener.mock.calls[0][1];
    eventCallback({});

    // Verify cytoscape was initialized with the right arguments
    expect(mockCytoscape).toHaveBeenCalled();
    const cytoscapeConfig = mockCytoscape.mock.calls[0][0];

    // Check basic config properties
    expect(cytoscapeConfig).toHaveProperty('container');
    expect(cytoscapeConfig).toHaveProperty('style');
    expect(cytoscapeConfig).toHaveProperty('layout');
    expect(cytoscapeConfig).toHaveProperty('elements');

    // Check elements
    expect(cytoscapeConfig.elements.nodes).toHaveLength(5);
    expect(cytoscapeConfig.elements.edges).toHaveLength(4);
  });

  test('should not initialize Cytoscape if container is missing', () => {
    // Set up the container to be null to simulate missing element
    // @ts-ignore
    document.getElementById.mockReturnValue(null);

    // Create a spy on console.error
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    // Clear module cache and re-require to trigger initialization with null container
    jest.resetModules();
    require('../../src/ts/cytoscape/cytoscape-graph');

    // Check if the event listener was added
    expect(mockAddEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));

    // Simulate DOMContentLoaded event
    // @ts-ignore
    const eventCallback = mockAddEventListener.mock.calls[0][1];
    eventCallback({});

    // Cytoscape should not be called, and an error should be logged
    expect(mockCytoscape).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Cytoscape container not found');

    // Clean up
    consoleSpy.mockRestore();
  });
});
