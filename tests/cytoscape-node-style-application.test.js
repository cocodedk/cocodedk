/**
 * Unit tests for Cytoscape node style application
 * Tests the styling component of the renderNode function in isolation
 */

describe('Cytoscape Node Style Application', () => {
  // Mock node for testing style application
  let mockNode;

  beforeEach(() => {
    // Reset mock node before each test with basic data
    mockNode = {
      data: jest.fn(key => {
        const nodeData = {
          id: 'test-node',
          label: 'Test Node',
          category: 'Software',
          tooltip: 'Test tooltip',
          image: 'test-image.png'
        };
        return key ? nodeData[key] : nodeData;
      }),
      style: jest.fn(),
      classes: ''
    };
  });

  /**
   * Extracted function to test image style application
   */
  function applyImageStyles(node) {
    if (!node) return false;

    try {
      // Handle image property if present
      const image = typeof node.data === 'function' ? node.data('image') : node.data?.image;

      if (image) {
        node.style('background-image', image);
        node.style('background-fit', 'cover');
        node.style('background-clip', 'node');
        return true;
      }
    } catch (e) {
      console.error('Error applying image styles:', e);
    }

    return false;
  }

  /**
   * Extracted function to test tooltip handling
   */
  function applyTooltipData(node) {
    if (!node) return false;

    try {
      // Handle tooltip property if present
      const tooltip = typeof node.data === 'function' ? node.data('tooltip') : node.data?.tooltip;

      if (tooltip) {
        // Store tooltip text in node data for later use
        if (typeof node.data === 'function') {
          // Already has data function, assuming it has setters too
          node.data('tooltip', tooltip);
        }
        return true;
      }
    } catch (e) {
      console.error('Error applying tooltip data:', e);
    }

    return false;
  }

  /**
   * Extracted function to test multilingual label handling
   */
  function applyLanguageSpecificLabel(node, language = 'en') {
    if (!node) return false;

    try {
      // Set label based on current language if multilingual
      const labels = typeof node.data === 'function' ?
                    node.data('labels') :
                    node.data?.labels;

      if (labels && labels[language]) {
        node.style('label', labels[language]);

        // Also update the label in data for accessibility
        if (typeof node.data === 'function') {
          node.data('label', labels[language]);
        }
        return true;
      }
    } catch (e) {
      console.error('Error applying language label:', e);
    }

    return false;
  }

  test('applies image styles when image data is present', () => {
    // Call the function
    const result = applyImageStyles(mockNode);

    // Verify style calls were made correctly
    expect(result).toBe(true);
    expect(mockNode.style).toHaveBeenCalledWith('background-image', 'test-image.png');
    expect(mockNode.style).toHaveBeenCalledWith('background-fit', 'cover');
    expect(mockNode.style).toHaveBeenCalledWith('background-clip', 'node');
  });

  test('doesnt apply image styles when no image data exists', () => {
    // Override the data method to not include image
    mockNode.data.mockImplementation(key => {
      const data = { label: 'Test Node', category: 'Software' }; // No image property
      return key ? data[key] : data;
    });

    // Call the function
    const result = applyImageStyles(mockNode);

    // Verify no style calls were made
    expect(result).toBe(false);
    expect(mockNode.style).not.toHaveBeenCalled();
  });

  test('applies tooltip data when tooltip is present', () => {
    // Setup a specialized mock to track data setting
    const node = {
      data: jest.fn().mockImplementation(function(key, value) {
        if (value !== undefined) {
          this.dataStore = this.dataStore || {};
          this.dataStore[key] = value;
          return this;
        }

        const data = {
          tooltip: 'Test tooltip'
        };
        return this.dataStore?.[key] || data[key];
      })
    };

    // Call the function
    const result = applyTooltipData(node);

    // Verify tooltip was stored
    expect(result).toBe(true);
    expect(node.data).toHaveBeenCalledWith('tooltip', 'Test tooltip');
  });

  test('applies language-specific label when available', () => {
    // Setup multilingual data
    const node = {
      data: jest.fn().mockImplementation(function(key, value) {
        if (value !== undefined) {
          this.dataStore = this.dataStore || {};
          this.dataStore[key] = value;
          return this;
        }

        const data = {
          labels: {
            'en': 'English Label',
            'es': 'Etiqueta Española',
            'da': 'Dansk Etiket'
          }
        };

        return key ? (this.dataStore?.[key] || data[key]) : data;
      }),
      style: jest.fn()
    };

    // Test English (default)
    let result = applyLanguageSpecificLabel(node);
    expect(result).toBe(true);
    expect(node.style).toHaveBeenCalledWith('label', 'English Label');

    // Test Spanish
    node.style.mockClear();
    result = applyLanguageSpecificLabel(node, 'es');
    expect(result).toBe(true);
    expect(node.style).toHaveBeenCalledWith('label', 'Etiqueta Española');

    // Test Danish
    node.style.mockClear();
    result = applyLanguageSpecificLabel(node, 'da');
    expect(result).toBe(true);
    expect(node.style).toHaveBeenCalledWith('label', 'Dansk Etiket');
  });

  test('handles nodes with no multilingual data', () => {
    // Override the data method to not include labels
    mockNode.data.mockImplementation(key => {
      const data = { label: 'Simple Label' }; // No multilingual labels
      return key ? data[key] : data;
    });

    // Call the function
    const result = applyLanguageSpecificLabel(mockNode);

    // Verify no style calls were made
    expect(result).toBe(false);
    expect(mockNode.style).not.toHaveBeenCalled();
  });

  test('gracefully handles null node', () => {
    // These shouldn't throw errors
    expect(applyImageStyles(null)).toBe(false);
    expect(applyTooltipData(null)).toBe(false);
    expect(applyLanguageSpecificLabel(null)).toBe(false);
  });
});
