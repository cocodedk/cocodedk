/**
 * Cytoscape.js Style Conversion Tests
 *
 * Tests for converting CSS styles to Cytoscape.js stylesheet
 */

// Import CytoscapeManager
const CytoscapeManager = require('../js/cytoscape-manager');

describe('Style Conversion', () => {
  test('should generate basic stylesheet for Cytoscape', () => {
    // When we get the stylesheet
    const stylesheet = CytoscapeManager.getStylesheet();

    // Then it should have basic style elements
    expect(Array.isArray(stylesheet)).toBe(true);

    // Check for node default style
    const nodeStyle = stylesheet.find(style => style.selector === 'node');
    expect(nodeStyle).toBeDefined();
    expect(nodeStyle.style['background-color']).toBeDefined();

    // Check for edge default style
    const edgeStyle = stylesheet.find(style => style.selector === 'edge');
    expect(edgeStyle).toBeDefined();
    expect(edgeStyle.style['line-color']).toBeDefined();
  });

  test('should include styles for different node categories', () => {
    // When we get the stylesheet
    const stylesheet = CytoscapeManager.getStylesheet();

    // Then it should have styles for different categories

    // Check for Software nodes
    const softwareStyle = stylesheet.find(style => style.selector === '.Software');
    expect(softwareStyle).toBeDefined();
    expect(softwareStyle.style['background-color']).toBe('#0077cc');
    expect(softwareStyle.style['border-color']).toBe('#33ccff');

    // Check for Contact nodes
    const contactStyle = stylesheet.find(style => style.selector === '.Contact');
    expect(contactStyle).toBeDefined();
    expect(contactStyle.style['background-color']).toBe('#f1c40f');
    expect(contactStyle.style['border-color']).toBe('#f39c12');
    expect(contactStyle.style['color']).toBe('#000000');

    // Check for Cybersecurity nodes
    const cybersecurityStyle = stylesheet.find(style => style.selector === '.Cybersecurity');
    expect(cybersecurityStyle).toBeDefined();
    expect(cybersecurityStyle.style['background-color']).toBe('#cc0044');
  });

  test('should include styles for different edge categories', () => {
    // When we get the stylesheet
    const stylesheet = CytoscapeManager.getStylesheet();

    // Then it should have styles for different edge categories

    // Check for Software edges
    const softwareEdgeStyle = stylesheet.find(style => style.selector === 'edge.Software');
    expect(softwareEdgeStyle).toBeDefined();
    expect(softwareEdgeStyle.style['line-color']).toBe('rgba(51, 204, 255, 0.4)');

    // Check for Contact edges
    const contactEdgeStyle = stylesheet.find(style => style.selector === 'edge.Contact');
    expect(contactEdgeStyle).toBeDefined();
    expect(contactEdgeStyle.style['line-color']).toBe('rgba(243, 156, 18, 0.4)');
  });
});
