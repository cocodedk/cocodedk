/**
 * Unit tests for Cytoscape node category styling
 * Tests the category styling component of the renderNode function in isolation
 */

describe('Cytoscape Node Category Styling', () => {
  // Mock node for testing category styling
  let mockNode;

  beforeEach(() => {
    // Reset mock node before each test
    mockNode = {
      data: jest.fn(key => {
        const nodeData = {
          id: 'test-node',
          label: 'Test Node',
          category: 'Software'
        };
        return key ? nodeData[key] : nodeData;
      }),
      addClass: jest.fn(),
      removeClass: jest.fn(),
      hasClass: jest.fn().mockReturnValue(false),
      classes: jest.fn()
    };
  });

  /**
   * Extracted function to test category-based styling
   * Adds CSS classes based on node category
   */
  function applyCategoryStyles(node) {
    if (!node) return false;

    try {
      // Get node category
      const category = typeof node.data === 'function' ? node.data('category') : node.data?.category;

      if (!category) return false;

      // Convert category to lowercase and handle special formatting
      const normalizedCategory = category.toLowerCase().replace(/\s+/g, '-');

      // Add category class to node
      if (node.addClass) {
        node.addClass(`category-${normalizedCategory}`);

        // Map categories to general groups if needed
        const groupMappings = {
          'software': 'technical',
          'hardware': 'technical',
          'application': 'technical',
          'server': 'technical',
          'person': 'human',
          'customer': 'human',
          'employee': 'human',
          'vendor': 'human',
          'document': 'resource',
          'policy': 'resource'
        };

        // Add group class if applicable
        if (groupMappings[normalizedCategory]) {
          node.addClass(`group-${groupMappings[normalizedCategory]}`);
        }

        return true;
      }
    } catch (e) {
      console.error('Error applying category styles:', e);
    }

    return false;
  }

  /**
   * Extracted function to test removing category styling
   */
  function removeCategoryStyles(node) {
    if (!node) return false;

    try {
      if (typeof node.classes === 'function') {
        // Get all classes
        const classes = node.classes();

        // Find and remove category and group classes
        if (typeof classes === 'string') {
          const categoryClasses = classes.split(' ')
            .filter(cls => cls.startsWith('category-') || cls.startsWith('group-'));

          if (categoryClasses.length > 0) {
            categoryClasses.forEach(cls => node.removeClass(cls));
            return true;
          }
        }
      }
    } catch (e) {
      console.error('Error removing category styles:', e);
    }

    return false;
  }

  test('adds appropriate class for basic category', () => {
    // Call the function
    const result = applyCategoryStyles(mockNode);

    // Verify class was added
    expect(result).toBe(true);
    expect(mockNode.addClass).toHaveBeenCalledWith('category-software');
    expect(mockNode.addClass).toHaveBeenCalledWith('group-technical');
  });

  test('handles categories with spaces correctly', () => {
    // Override the data method to return a category with spaces
    mockNode.data.mockImplementation(key => {
      const data = { category: 'Cloud Service' };
      return key ? data[key] : data;
    });

    // Call the function
    const result = applyCategoryStyles(mockNode);

    // Verify class was added with spaces converted to hyphens
    expect(result).toBe(true);
    expect(mockNode.addClass).toHaveBeenCalledWith('category-cloud-service');
  });

  test('normalizes category casing', () => {
    // Override the data method to return mixed case
    mockNode.data.mockImplementation(key => {
      const data = { category: 'PeRsOn' };
      return key ? data[key] : data;
    });

    // Call the function
    const result = applyCategoryStyles(mockNode);

    // Verify classes with correct casing
    expect(result).toBe(true);
    expect(mockNode.addClass).toHaveBeenCalledWith('category-person');
    expect(mockNode.addClass).toHaveBeenCalledWith('group-human');
  });

  test('adds appropriate group class for known category', () => {
    // Test different categories in human group
    const humanCategories = ['Person', 'Customer', 'Employee', 'Vendor'];

    for (const category of humanCategories) {
      // Reset mock
      mockNode.addClass.mockClear();
      mockNode.data.mockImplementation(key => ({ category })[key] || { category });

      // Call the function
      const result = applyCategoryStyles(mockNode);

      // Verify correct classes
      expect(result).toBe(true);
      expect(mockNode.addClass).toHaveBeenCalledWith(`category-${category.toLowerCase()}`);
      expect(mockNode.addClass).toHaveBeenCalledWith('group-human');
    }

    // Test different categories in resource group
    const resourceCategories = ['Document', 'Policy'];

    for (const category of resourceCategories) {
      // Reset mock
      mockNode.addClass.mockClear();
      mockNode.data.mockImplementation(key => ({ category })[key] || { category });

      // Call the function
      const result = applyCategoryStyles(mockNode);

      // Verify correct classes
      expect(result).toBe(true);
      expect(mockNode.addClass).toHaveBeenCalledWith(`category-${category.toLowerCase()}`);
      expect(mockNode.addClass).toHaveBeenCalledWith('group-resource');
    }
  });

  test('handles node with no category', () => {
    // Override the data method to return no category
    mockNode.data.mockImplementation(key => {
      const data = { label: 'No Category Node' }; // No category property
      return key ? data[key] : data;
    });

    // Call the function
    const result = applyCategoryStyles(mockNode);

    // Verify no class was added
    expect(result).toBe(false);
    expect(mockNode.addClass).not.toHaveBeenCalled();
  });

  test('removes category and group classes', () => {
    // Setup node with existing category classes
    const node = {
      classes: jest.fn().mockReturnValue('node-base category-software group-technical highlighted'),
      removeClass: jest.fn()
    };

    // Call the function
    const result = removeCategoryStyles(node);

    // Verify classes were removed
    expect(result).toBe(true);
    expect(node.removeClass).toHaveBeenCalledWith('category-software');
    expect(node.removeClass).toHaveBeenCalledWith('group-technical');
    expect(node.removeClass).not.toHaveBeenCalledWith('node-base');
    expect(node.removeClass).not.toHaveBeenCalledWith('highlighted');
  });

  test('gracefully handles null node', () => {
    // These shouldn't throw errors
    expect(applyCategoryStyles(null)).toBe(false);
    expect(removeCategoryStyles(null)).toBe(false);
  });
});
