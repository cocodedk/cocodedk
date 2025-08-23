/**
 * Test file for the TypeScript version of cytoscape-node-styles.ts
 */

describe('Cytoscape Node Styles', () => {
  // Setup mock console.log to verify logging
  const originalConsoleLog = console.log;
  let consoleLogSpy: jest.SpyInstance;

  // Reset global objects between tests
  beforeEach(() => {
    // Clear window.CytoscapeNodeStyles if it exists
    if ((global as any).window && (global as any).window.CytoscapeNodeStyles) {
      delete (global as any).window.CytoscapeNodeStyles;
    }

    // Define window if it doesn't exist in test environment
    if (!(global as any).window) {
      (global as any).window = {};
    }

    // Setup console spy
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    // Reset modules
    jest.resetModules();
  });

  afterEach(() => {
    // Restore console.log
    consoleLogSpy.mockRestore();
    console.log = originalConsoleLog;
  });

  test('should export node style functions', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-node-styles');

    // Verify the functions are exported
    expect((global as any).window.CytoscapeNodeStyles).toBeDefined();
    expect((global as any).window.CytoscapeNodeStyles.getBaseNodeStyles).toBeDefined();
    expect((global as any).window.CytoscapeNodeStyles.getCategoryNodeStyles).toBeDefined();
    expect((global as any).window.CytoscapeNodeStyles.getCustomNodeStyles).toBeDefined();
    expect((global as any).window.CytoscapeNodeStyles.getAllNodeStyles).toBeDefined();
    expect((global as any).window.CytoscapeNodeStyles.applyNodeStyles).toBeDefined();
  });

  test('getBaseNodeStyles should return base node styles', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-node-styles');

    // Get the base node styles
    const baseStyles = (global as any).window.CytoscapeNodeStyles.getBaseNodeStyles();

    // Verify it's an array
    expect(Array.isArray(baseStyles)).toBe(true);
    expect(baseStyles.length).toBeGreaterThan(0);

    // Find the base node style
    const nodeStyle = baseStyles.find((style: any) => style.selector === 'node');

    // Verify node style exists and has expected properties
    expect(nodeStyle).toBeDefined();
    expect(nodeStyle.style).toHaveProperty('label');
    expect(nodeStyle.style).toHaveProperty('background-color');
    expect(nodeStyle.style).toHaveProperty('border-width');
    expect(nodeStyle.style).toHaveProperty('shape');
  });

  test('getCategoryNodeStyles should return category-specific styles', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-node-styles');

    // Get the category node styles
    const categoryStyles = (global as any).window.CytoscapeNodeStyles.getCategoryNodeStyles();

    // Verify it's an array
    expect(Array.isArray(categoryStyles)).toBe(true);
    expect(categoryStyles.length).toBeGreaterThan(0);

    // Check for at least primary and secondary category styles
    const primaryStyle = categoryStyles.find(
      (style: any) => style.selector === 'node.category-primary'
    );
    const secondaryStyle = categoryStyles.find(
      (style: any) => style.selector === 'node.category-secondary'
    );

    // Verify styles exist
    expect(primaryStyle).toBeDefined();
    expect(secondaryStyle).toBeDefined();

    // Verify they have different colors
    expect(primaryStyle.style['background-color']).not.toBe(
      secondaryStyle.style['background-color']
    );
  });

  test('getCustomNodeStyles should return custom styles based on options', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-node-styles');

    // Define custom options
    const options = {
      shapes: {
        'node.custom': 'rectangle'
      },
      sizes: {
        'node.large': 80
      },
      colors: {
        'node.highlighted': '#ff0000'
      }
    };

    // Get custom node styles
    const customStyles = (global as any).window.CytoscapeNodeStyles.getCustomNodeStyles(options);

    // Verify styles array
    expect(Array.isArray(customStyles)).toBe(true);
    expect(customStyles.length).toBe(3); // One for each option type

    // Find custom styles
    const shapeStyle = customStyles.find(
      (style: any) => style.selector === 'node.custom'
    );
    const sizeStyle = customStyles.find(
      (style: any) => style.selector === 'node.large'
    );
    const colorStyle = customStyles.find(
      (style: any) => style.selector === 'node.highlighted'
    );

    // Verify custom styles
    expect(shapeStyle).toBeDefined();
    expect(shapeStyle.style.shape).toBe('rectangle');

    expect(sizeStyle).toBeDefined();
    expect(sizeStyle.style.width).toBe(80);
    expect(sizeStyle.style.height).toBe(80);

    expect(colorStyle).toBeDefined();
    expect(colorStyle.style['background-color']).toBe('#ff0000');
  });

  test('getAllNodeStyles should combine all style types', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-node-styles');

    // Define custom options
    const options = {
      shapes: {
        'node.custom': 'rectangle'
      }
    };

    // Get all node styles
    const allStyles = (global as any).window.CytoscapeNodeStyles.getAllNodeStyles(options);

    // Verify combined styles
    expect(Array.isArray(allStyles)).toBe(true);

    // Check that both base, category, and custom styles are included
    const baseStyle = allStyles.find((style: any) => style.selector === 'node');
    const categoryStyle = allStyles.find(
      (style: any) => style.selector === 'node.category-primary'
    );
    const customStyle = allStyles.find(
      (style: any) => style.selector === 'node.custom'
    );

    expect(baseStyle).toBeDefined();
    expect(categoryStyle).toBeDefined();
    expect(customStyle).toBeDefined();

    // Total length should be sum of all style types
    const baseLength = (global as any).window.CytoscapeNodeStyles.getBaseNodeStyles().length;
    const categoryLength = (global as any).window.CytoscapeNodeStyles.getCategoryNodeStyles().length;
    const customLength = (global as any).window.CytoscapeNodeStyles.getCustomNodeStyles(options).length;

    expect(allStyles.length).toBe(baseLength + categoryLength + customLength);
  });

  test('applyNodeStyles should apply styles to cytoscape instance', () => {
    // Import the module
    require('../../src/ts/cytoscape/cytoscape-node-styles');

    // Create mock cytoscape instance
    const mockStyle = {
      fromJson: jest.fn().mockReturnThis(),
      update: jest.fn()
    };
    const mockCy = {
      style: jest.fn().mockReturnValue(mockStyle)
    };

    // Apply styles
    (global as any).window.CytoscapeNodeStyles.applyNodeStyles(mockCy);

    // Verify cytoscape style methods called
    expect(mockCy.style).toHaveBeenCalled();
    expect(mockStyle.fromJson).toHaveBeenCalled();
    expect(mockStyle.update).toHaveBeenCalled();

    // Verify styles passed to fromJson
    const styles = mockStyle.fromJson.mock.calls[0][0];
    expect(Array.isArray(styles)).toBe(true);
    expect(styles.length).toBeGreaterThan(0);

    // Verify log message
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining('Node styles applied')
    );
  });

  test('applyNodeStyles should handle missing cytoscape instance', () => {
    // Mock console.error
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

    // Import the module
    require('../../src/ts/cytoscape/cytoscape-node-styles');

    // Apply styles with null cy
    (global as any).window.CytoscapeNodeStyles.applyNodeStyles(null);

    // Verify error logged
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Cytoscape instance is required')
    );

    // Clean up
    consoleErrorSpy.mockRestore();
  });
});
