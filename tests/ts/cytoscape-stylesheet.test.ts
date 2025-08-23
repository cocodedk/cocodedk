/**
 * Test file for the TypeScript version of cytoscape-stylesheet.ts
 */

describe('Cytoscape Stylesheet', () => {
  // Reset global objects between tests
  beforeEach(() => {
    // Clear window.CytoscapeStylesheet if it exists
    if ((global as any).window && (global as any).window.CytoscapeStylesheet) {
      delete (global as any).window.CytoscapeStylesheet;
    }

    // Define window if it doesn't exist in test environment
    if (!(global as any).window) {
      (global as any).window = {};
    }

    // Reset modules
    jest.resetModules();
  });

  test('should export getStylesheet function', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-stylesheet');

    // Verify the function is exported
    expect((global as any).window.CytoscapeStylesheet).toBeDefined();
    expect((global as any).window.CytoscapeStylesheet.getStylesheet).toBeDefined();
    expect(typeof (global as any).window.CytoscapeStylesheet.getStylesheet).toBe('function');
  });

  test('should return an array of style objects', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-stylesheet');

    // Get the stylesheet
    const stylesheet = (global as any).window.CytoscapeStylesheet.getStylesheet();

    // Verify it's an array
    expect(Array.isArray(stylesheet)).toBe(true);

    // Stylesheet should have multiple styles
    expect(stylesheet.length).toBeGreaterThan(0);

    // Each item should have selector and style properties
    stylesheet.forEach((style: any) => {
      expect(style).toHaveProperty('selector');
      expect(style).toHaveProperty('style');
      expect(typeof style.selector).toBe('string');
      expect(typeof style.style).toBe('object');
    });
  });

  test('should include base node styles', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-stylesheet');

    // Get the stylesheet
    const stylesheet = (global as any).window.CytoscapeStylesheet.getStylesheet();

    // Find the base node style
    const nodeStyle = stylesheet.find((style: any) => style.selector === 'node');

    // Verify base node style exists and has expected properties
    expect(nodeStyle).toBeDefined();
    expect(nodeStyle.style).toHaveProperty('label');
    expect(nodeStyle.style).toHaveProperty('background-color');
    expect(nodeStyle.style).toHaveProperty('border-width');
    expect(nodeStyle.style).toHaveProperty('shape');
  });

  test('should include base edge styles', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-stylesheet');

    // Get the stylesheet
    const stylesheet = (global as any).window.CytoscapeStylesheet.getStylesheet();

    // Find the base edge style
    const edgeStyle = stylesheet.find((style: any) => style.selector === 'edge');

    // Verify base edge style exists and has expected properties
    expect(edgeStyle).toBeDefined();
    expect(edgeStyle.style).toHaveProperty('width');
    expect(edgeStyle.style).toHaveProperty('line-color');
    expect(edgeStyle.style).toHaveProperty('curve-style');
  });

  test('should include category-specific styles', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-stylesheet');

    // Get the stylesheet
    const stylesheet = (global as any).window.CytoscapeStylesheet.getStylesheet();

    // Check for specific category styles (software, cybersecurity, etc)
    const softwareStyle = stylesheet.find(
      (style: any) => style.selector === 'node.Software'
    );
    const cybersecurityStyle = stylesheet.find(
      (style: any) => style.selector === 'node.Cybersecurity'
    );

    // Verify category styles exist
    expect(softwareStyle).toBeDefined();
    expect(cybersecurityStyle).toBeDefined();

    // Verify they have different colors
    expect(softwareStyle.style['background-color']).not.toBe(
      cybersecurityStyle.style['background-color']
    );
  });
});
