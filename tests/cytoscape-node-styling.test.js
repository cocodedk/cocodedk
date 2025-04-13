/**
 * Unit tests for Cytoscape node styling
 * Specifically tests the class assignment logic from renderNode function
 */

describe('Cytoscape Node Class Handling', () => {
  // Create a simple mock node with just the necessary methods for testing class handling
  let mockNode;

  beforeEach(() => {
    // Reset mock node before each test
    mockNode = {
      classes: '',
      addClass: jest.fn().mockImplementation(function(cls) {
        if (!this.classes.includes(cls)) {
          this.classes += ' ' + cls;
          this.classes = this.classes.trim();
        }
        return this;
      }),
      hasClass: function(cls) {
        return this.classes.split(' ').includes(cls);
      }
    };
  });

  /**
   * The class handling logic extracted from renderNode function
   * This is what we're actually testing
   */
  function applyNodeClasses(node, cytoscapeNode) {
    // Apply category as class if present
    const category = cytoscapeNode.data?.category;
    if (category) {
      node.addClass(category);
    }

    // Add additional classes if provided
    if (cytoscapeNode.classes && typeof cytoscapeNode.classes === 'string') {
      const classNames = cytoscapeNode.classes.split(' ');
      classNames.forEach(className => {
        if (className && className.trim() !== '' && className.trim() !== category) {
          node.addClass(className.trim());
        }
      });
    }

    return node;
  }

  test('applies category as a class', () => {
    const nodeData = {
      data: {
        id: 'test-node',
        category: 'Software'
      }
    };

    applyNodeClasses(mockNode, nodeData);

    expect(mockNode.addClass).toHaveBeenCalledWith('Software');
    expect(mockNode.addClass).toHaveBeenCalledTimes(1);
    expect(mockNode.classes).toContain('Software');
  });

  test('applies multiple classes correctly', () => {
    const nodeData = {
      data: {
        id: 'test-node',
        category: 'Software'
      },
      classes: 'Software highlight special-node'
    };

    applyNodeClasses(mockNode, nodeData);

    expect(mockNode.addClass).toHaveBeenCalledWith('Software');
    expect(mockNode.addClass).toHaveBeenCalledWith('highlight');
    expect(mockNode.addClass).toHaveBeenCalledWith('special-node');
    expect(mockNode.classes).toContain('Software');
    expect(mockNode.classes).toContain('highlight');
    expect(mockNode.classes).toContain('special-node');
  });

  test('properly handles whitespace in class names', () => {
    const nodeData = {
      data: {
        id: 'test-node',
        category: 'Cybersecurity'
      },
      classes: '   Cybersecurity    important-node    with-spaces   '
    };

    applyNodeClasses(mockNode, nodeData);

    expect(mockNode.addClass).toHaveBeenCalledWith('Cybersecurity');
    expect(mockNode.addClass).toHaveBeenCalledWith('important-node');
    expect(mockNode.addClass).toHaveBeenCalledWith('with-spaces');
    expect(mockNode.classes).toContain('Cybersecurity');
    expect(mockNode.classes).toContain('important-node');
    expect(mockNode.classes).toContain('with-spaces');
  });

  test('skips empty class names', () => {
    const nodeData = {
      data: {
        id: 'test-node',
        category: 'Contact'
      },
      classes: 'Contact  '  // Only category and an empty class
    };

    applyNodeClasses(mockNode, nodeData);

    expect(mockNode.addClass).toHaveBeenCalledWith('Contact');
    expect(mockNode.addClass).toHaveBeenCalledTimes(1);
    expect(mockNode.classes).toBe('Contact');
  });

  test('handles nodes with no classes property', () => {
    const nodeData = {
      data: {
        id: 'test-node',
        category: 'Contact'
      }
      // No classes property
    };

    applyNodeClasses(mockNode, nodeData);

    expect(mockNode.addClass).toHaveBeenCalledWith('Contact');
    expect(mockNode.addClass).toHaveBeenCalledTimes(1);
    expect(mockNode.classes).toBe('Contact');
  });

  test('handles nodes with empty classes string', () => {
    const nodeData = {
      data: {
        id: 'test-node',
        category: 'Software'
      },
      classes: ''  // Empty classes string
    };

    applyNodeClasses(mockNode, nodeData);

    expect(mockNode.addClass).toHaveBeenCalledWith('Software');
    expect(mockNode.addClass).toHaveBeenCalledTimes(1);
    expect(mockNode.classes).toBe('Software');
  });

  test('avoids duplicate class names', () => {
    const nodeData = {
      data: {
        id: 'test-node',
        category: 'Software'
      },
      classes: 'Software Software Software highlight highlight'  // Duplicate classes
    };

    applyNodeClasses(mockNode, nodeData);

    // Should only add each class once
    expect(mockNode.addClass).toHaveBeenCalledWith('Software');
    expect(mockNode.addClass).toHaveBeenCalledWith('highlight');
    expect(mockNode.classes).toBe('Software highlight');
  });
});
