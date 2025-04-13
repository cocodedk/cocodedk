/**
 * Test to verify that the nodes.js file properly exposes
 * nodes and links arrays to the global/window object
 */

describe('Nodes Global Exposure', () => {
  let originalWindow;

  beforeEach(() => {
    // Save original window properties
    originalWindow = {
      nodes: window.nodes,
      links: window.links,
      categoryHoverColors: window.categoryHoverColors
    };

    // Reset window properties to simulate clean environment
    window.nodes = undefined;
    window.links = undefined;
    window.categoryHoverColors = undefined;
  });

  afterEach(() => {
    // Restore original window properties
    window.nodes = originalWindow.nodes;
    window.links = originalWindow.links;
    window.categoryHoverColors = originalWindow.categoryHoverColors;
  });

  test('nodes.js should expose nodes, links, and categoryHoverColors to window object', () => {
    // Load the nodes.js file
    // We need to simulate how the browser loads and executes it

    // First, let's create a mock execution environment
    const executionContext = {
      categoryHoverColors: null,
      nodes: null,
      links: null,
      window: window
    };

    // Mock the window object for execution
    window.executionContext = executionContext;

    // This is where we'd normally load the file content and eval it,
    // but since we can't do that directly, we'll verify what we expect:
    // Load and execute the nodes.js file
    require('../js/nodes.js');

    // Now we should have the global variables set
    expect(window.nodes).toBeDefined();
    expect(Array.isArray(window.nodes)).toBe(true);
    expect(window.nodes.length).toBeGreaterThan(0);

    expect(window.links).toBeDefined();
    expect(Array.isArray(window.links)).toBe(true);
    expect(window.links.length).toBeGreaterThan(0);

    expect(window.categoryHoverColors).toBeDefined();
    expect(typeof window.categoryHoverColors).toBe('object');
  });
});
