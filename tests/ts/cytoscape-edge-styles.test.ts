/**
 * Test file for the TypeScript version of cytoscape-edge-styles.ts
 */

describe('Cytoscape Edge Styles', () => {
  // Reset global objects between tests
  beforeEach(() => {
    // Clear window.CytoscapeEdgeStyles if it exists
    if ((global as any).window && (global as any).window.CytoscapeEdgeStyles) {
      delete (global as any).window.CytoscapeEdgeStyles;
    }

    // Define window if it doesn't exist in test environment
    if (!(global as any).window) {
      (global as any).window = {};
    }

    // Reset modules
    jest.resetModules();
  });

  test('should export edge style functions', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-edge-styles');

    // Verify the functions are exported
    expect((global as any).window.CytoscapeEdgeStyles).toBeDefined();
    expect((global as any).window.CytoscapeEdgeStyles.getEdgeSpecificStyles).toBeDefined();
    expect((global as any).window.CytoscapeEdgeStyles.getCustomEdgeStyles).toBeDefined();
    expect(typeof (global as any).window.CytoscapeEdgeStyles.getEdgeSpecificStyles).toBe('function');
    expect(typeof (global as any).window.CytoscapeEdgeStyles.getCustomEdgeStyles).toBe('function');
  });

  test('getEdgeSpecificStyles should return an array of style objects', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-edge-styles');

    // Get the edge styles
    const edgeStyles = (global as any).window.CytoscapeEdgeStyles.getEdgeSpecificStyles();

    // Verify it's an array
    expect(Array.isArray(edgeStyles)).toBe(true);

    // Edge styles should have multiple styles
    expect(edgeStyles.length).toBeGreaterThan(0);

    // Each item should have selector and style properties
    edgeStyles.forEach((style: any) => {
      expect(style).toHaveProperty('selector');
      expect(style).toHaveProperty('style');
      expect(typeof style.selector).toBe('string');
      expect(typeof style.style).toBe('object');
    });
  });

  test('should include base edge style', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-edge-styles');

    // Get the edge styles
    const edgeStyles = (global as any).window.CytoscapeEdgeStyles.getEdgeSpecificStyles();

    // Find the base edge style
    const baseEdgeStyle = edgeStyles.find((style: any) => style.selector === 'edge');

    // Verify base edge style exists and has expected properties
    expect(baseEdgeStyle).toBeDefined();
    expect(baseEdgeStyle.style).toHaveProperty('width');
    expect(baseEdgeStyle.style).toHaveProperty('line-color');
    expect(baseEdgeStyle.style).toHaveProperty('target-arrow-color');
    expect(baseEdgeStyle.style).toHaveProperty('target-arrow-shape');
    expect(baseEdgeStyle.style).toHaveProperty('curve-style');
  });

  test('should include hover and selected edge styles', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-edge-styles');

    // Get the edge styles
    const edgeStyles = (global as any).window.CytoscapeEdgeStyles.getEdgeSpecificStyles();

    // Find the hover and selected edge styles
    const hoverStyle = edgeStyles.find((style: any) => style.selector === 'edge.hover');
    const selectedStyle = edgeStyles.find((style: any) => style.selector === 'edge:selected');

    // Verify hover and selected styles exist
    expect(hoverStyle).toBeDefined();
    expect(selectedStyle).toBeDefined();

    // Verify styles have different widths
    expect(hoverStyle.style.width).not.toBe(selectedStyle.style.width);
  });

  test('should include category-specific edge styles', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-edge-styles');

    // Get the edge styles
    const edgeStyles = (global as any).window.CytoscapeEdgeStyles.getEdgeSpecificStyles();

    // Check for category styles
    const serviceStyle = edgeStyles.find(
      (style: any) => style.selector === 'edge[category="Service"]'
    );
    const toolStyle = edgeStyles.find(
      (style: any) => style.selector === 'edge[category="Tool"]'
    );

    // Verify category styles exist
    expect(serviceStyle).toBeDefined();
    expect(toolStyle).toBeDefined();

    // Verify they have different colors
    expect(serviceStyle.style['line-color']).not.toBe(toolStyle.style['line-color']);
  });

  test('getCustomEdgeStyles should return custom styles when options provided', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-edge-styles');

    // Get custom edge styles with highlight option
    const customStyles = (global as any).window.CytoscapeEdgeStyles.getCustomEdgeStyles({
      highlightEdges: true
    });

    // Verify custom styles are returned
    expect(Array.isArray(customStyles)).toBe(true);
    expect(customStyles.length).toBeGreaterThan(0);

    // Find highlight style
    const highlightStyle = customStyles.find(
      (style: any) => style.selector === 'edge.highlight'
    );

    // Verify highlight style exists and has expected properties
    expect(highlightStyle).toBeDefined();
    expect(highlightStyle.style).toHaveProperty('width');
    expect(highlightStyle.style).toHaveProperty('line-color');
    expect(highlightStyle.style).toHaveProperty('target-arrow-color');
  });

  test('getCustomEdgeStyles should return empty array when no options provided', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-edge-styles');

    // Get custom edge styles with no options
    const customStyles = (global as any).window.CytoscapeEdgeStyles.getCustomEdgeStyles();

    // Verify empty array is returned
    expect(Array.isArray(customStyles)).toBe(true);
    expect(customStyles.length).toBe(0);
  });
});
