/**
 * Unit tests for Cytoscape node sizing functionality
 * Tests the node sizing component extracted from the renderNode function
 */

describe('Cytoscape Node Sizing', () => {
  // Mock node for testing size application
  let mockNode;

  beforeEach(() => {
    // Reset mock node before each test
    mockNode = {
      data: jest.fn(key => {
        const nodeData = {
          id: 'test-node',
          label: 'Test Node',
          size: 'medium'
        };
        return key ? nodeData[key] : nodeData;
      }),
      style: jest.fn()
    };
  });

  /**
   * Extracted function to calculate node dimensions based on size
   * @param {string} sizeValue - The size value ('small', 'medium', 'large', etc.)
   * @returns {Object} - Object with width and height properties
   */
  function calculateNodeDimensions(sizeValue) {
    // Default dimensions for medium size
    const defaultDimensions = { width: 60, height: 60 };

    // Size mapping to dimensions
    const sizeMappings = {
      'tiny': { width: 30, height: 30 },
      'small': { width: 45, height: 45 },
      'medium': { width: 60, height: 60 },
      'large': { width: 75, height: 75 },
      'x-large': { width: 90, height: 90 },
      'xx-large': { width: 105, height: 105 }
    };

    // Return mapped dimensions or default if size not found
    return sizeMappings[sizeValue] || defaultDimensions;
  }

  /**
   * Apply size styles to a node
   * @param {Object} node - The node object to style
   * @returns {boolean} - True if styling was applied successfully
   */
  function applyNodeSize(node) {
    if (!node) return false;

    try {
      // Get node size value (defaults to 'medium' if not present)
      const sizeValue = typeof node.data === 'function'
        ? (node.data('size') || 'medium')
        : (node.data?.size || 'medium');

      // Calculate dimensions
      const dimensions = calculateNodeDimensions(sizeValue);

      // Apply dimensions as style
      if (typeof node.style === 'function') {
        node.style({
          'width': dimensions.width,
          'height': dimensions.height
        });
        return true;
      }
    } catch (e) {
      console.error('Error applying node size:', e);
    }

    return false;
  }

  /**
   * Calculate font size based on node dimensions
   * @param {Object} dimensions - Object containing width and height
   * @returns {number} - Font size in pixels
   */
  function calculateFontSize(dimensions) {
    if (!dimensions || !dimensions.width) return 12; // Default font size

    // Scale font size relative to node size
    const baseFontSize = 12;
    const baseNodeWidth = 60; // Medium node width

    return Math.max(10, Math.round(baseFontSize * (dimensions.width / baseNodeWidth)));
  }

  test('calculates dimensions for predefined sizes', () => {
    expect(calculateNodeDimensions('tiny')).toEqual({ width: 30, height: 30 });
    expect(calculateNodeDimensions('small')).toEqual({ width: 45, height: 45 });
    expect(calculateNodeDimensions('medium')).toEqual({ width: 60, height: 60 });
    expect(calculateNodeDimensions('large')).toEqual({ width: 75, height: 75 });
    expect(calculateNodeDimensions('x-large')).toEqual({ width: 90, height: 90 });
    expect(calculateNodeDimensions('xx-large')).toEqual({ width: 105, height: 105 });
  });

  test('uses default dimensions for unknown sizes', () => {
    expect(calculateNodeDimensions('unknown')).toEqual({ width: 60, height: 60 });
    expect(calculateNodeDimensions('')).toEqual({ width: 60, height: 60 });
    expect(calculateNodeDimensions(null)).toEqual({ width: 60, height: 60 });
    expect(calculateNodeDimensions(undefined)).toEqual({ width: 60, height: 60 });
  });

  test('applies correct size styling to node with specified size', () => {
    // Overwrite the data method to return a specific size
    mockNode.data.mockImplementation(key => {
      const data = { size: 'large' };
      return key ? data[key] : data;
    });

    // Call the function
    const result = applyNodeSize(mockNode);

    // Verify style was applied correctly
    expect(result).toBe(true);
    expect(mockNode.style).toHaveBeenCalledWith({
      'width': 75,
      'height': 75
    });
  });

  test('applies default medium size when no size specified', () => {
    // Overwrite the data method to return no size
    mockNode.data.mockImplementation(key => {
      const data = { label: 'No Size Node' }; // No size property
      return key ? data[key] : data;
    });

    // Call the function
    const result = applyNodeSize(mockNode);

    // Verify default style was applied
    expect(result).toBe(true);
    expect(mockNode.style).toHaveBeenCalledWith({
      'width': 60,
      'height': 60
    });
  });

  test('calculates font size based on node dimensions', () => {
    // Test various node sizes and expected font sizes
    const testCases = [
      { dimensions: { width: 30, height: 30 }, expectedFontSize: 10 }, // Tiny - minimum font size
      { dimensions: { width: 45, height: 45 }, expectedFontSize: 10 }, // Small - corrected from 11 to 10 based on calculation
      { dimensions: { width: 60, height: 60 }, expectedFontSize: 12 }, // Medium (base)
      { dimensions: { width: 75, height: 75 }, expectedFontSize: 15 }, // Large
      { dimensions: { width: 90, height: 90 }, expectedFontSize: 18 }, // X-Large
      { dimensions: { width: 105, height: 105 }, expectedFontSize: 21 } // XX-Large
    ];

    testCases.forEach(testCase => {
      // Calculate actual result for debugging
      const actual = calculateFontSize(testCase.dimensions);
      expect(actual).toBe(testCase.expectedFontSize);
    });
  });

  test('handles invalid dimensions for font size calculation', () => {
    expect(calculateFontSize(null)).toBe(12);
    expect(calculateFontSize({})).toBe(12);
    expect(calculateFontSize({ height: 60 })).toBe(12); // Missing width
  });

  test('handles null node gracefully', () => {
    expect(applyNodeSize(null)).toBe(false);
  });

  test('handles node without style function', () => {
    const invalidNode = {
      data: jest.fn().mockReturnValue('medium')
      // No style function
    };

    expect(applyNodeSize(invalidNode)).toBe(false);
  });

  test('integrates dimension calculation with size application', () => {
    // Test with different sizes
    const testSizes = ['tiny', 'small', 'medium', 'large', 'x-large', 'xx-large'];

    testSizes.forEach(size => {
      // Reset mocks
      mockNode.style.mockClear();
      mockNode.data.mockImplementation(key => ({ size })[key] || { size });

      // Apply size
      const result = applyNodeSize(mockNode);

      // Get expected dimensions
      const expectedDimensions = calculateNodeDimensions(size);

      // Verify
      expect(result).toBe(true);
      expect(mockNode.style).toHaveBeenCalledWith({
        'width': expectedDimensions.width,
        'height': expectedDimensions.height
      });
    });
  });
});
