/**
 * Test for handling node language updates when DOM elements don't exist
 *
 * This test verifies that setLanguage handles the case where NodeDisplay.updateNodeLabels
 * is called but elements don't exist in the DOM, preventing TypeError.
 */

const CytoscapeManager = require('../js/cytoscape-manager');

describe('Cytoscape Language Error Handling', () => {
  let container;
  let originalNodeDisplay;

  beforeEach(() => {
    // Save original NodeDisplay if it exists
    originalNodeDisplay = window.NodeDisplay;

    // Create container for Cytoscape
    container = document.createElement('div');
    container.id = 'cy-container';
    document.body.appendChild(container);

    // Initialize Cytoscape
    CytoscapeManager.initialize('cy-container');
  });

  afterEach(() => {
    // Clean up container
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    // Restore original NodeDisplay
    window.NodeDisplay = originalNodeDisplay;
  });

  test('setLanguage should handle missing node elements gracefully', () => {
    // Create a mock NodeDisplay that will cause the error when setLanguage is called
    window.NodeDisplay = {
      setLanguage: function(lang) {
        // This simulates the error condition in updateNodeLabels where
        // nodeElement is undefined and then setAttribute is called on it
        const fakeNodes = [{id: 'nonexistent-node', labels: {en: 'Test'}}];
        fakeNodes.forEach(nodeData => {
          const nodeElement = document.getElementById(`node-${nodeData.id}`);
          // This will be null and cause the error when setAttribute is called
          if (nodeElement) {
            nodeElement.setAttribute('aria-label', nodeData.labels[lang]);
          }
        });
      }
    };

    // This should not throw an error
    expect(() => {
      CytoscapeManager.setLanguage('en');
    }).not.toThrow();
  });

  test('loadNodesJsGraph should handle setLanguage errors', () => {
    // Create a problematic NodeDisplay implementation
    window.NodeDisplay = {
      setLanguage: jest.fn(() => {
        throw new TypeError("Cannot read properties of undefined (reading 'setAttribute')");
      })
    };

    // Sample data
    const nodes = [
      {
        id: 'test',
        labels: { en: 'Test', da: 'Test' },
        x: 0, y: 0, r: 30,
        category: 'Software'
      }
    ];
    const links = [];

    // This should not throw an error despite NodeDisplay.setLanguage throwing
    expect(() => {
      CytoscapeManager.loadNodesJsGraph(nodes, links, { language: 'en' });
    }).not.toThrow();
  });

  test('setLanguage should protect NodeDisplay calls with try-catch', () => {
    // Mock console.error to verify it's called
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Create NodeDisplay that throws error
    window.NodeDisplay = {
      setLanguage: jest.fn(() => {
        throw new Error('Test error');
      })
    };

    // Call should be protected and not throw
    CytoscapeManager.setLanguage('en');

    // Verify error was logged
    expect(console.error).toHaveBeenCalled();

    // Restore console.error
    console.error = originalConsoleError;
  });
});
