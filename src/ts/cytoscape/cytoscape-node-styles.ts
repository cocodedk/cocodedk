/**
 * TypeScript version of the Cytoscape node styles module.
 * Provides styling options for nodes in Cytoscape graphs.
 */

// Use relative path to the types
import { CytoscapeStyle, CytoscapeInstance } from '../types/cytoscape.d';

// We're using the CytoscapeInstance from the type definitions now
// import cytoscape from 'cytoscape';

interface NodeStyleOptions {
  iconMap?: Record<string, string>;
  colorScheme?: 'default' | 'pastel' | 'vibrant' | 'monochrome';
  nodeSizeProperty?: string;
  nodeShapeMap?: Record<string, string>;
  labelVisible?: boolean;
  badgeVisible?: boolean;
  shapes?: Record<string, string>;
  sizes?: Record<string, number>;
  colors?: Record<string, string>;
}

/**
 * Get basic node styles for Cytoscape graphs
 *
 * @returns {CytoscapeStyle[]} Array of Cytoscape style objects
 */
function getBaseNodeStyles(): CytoscapeStyle[] {
  return [
    // Base node style
    {
      selector: 'node',
      style: {
        'width': 40,
        'height': 40,
        'background-color': '#5bc0de',
        'border-width': 1,
        'border-color': '#46b8da',
        'shape': 'ellipse',
        'font-size': 12,
        'color': '#333333',
        'text-valign': 'center',
        'text-halign': 'center',
        'text-outline-width': 1,
        'text-outline-color': 'white',
        'label': 'data(label)'
      }
    },

    // Hover state
    {
      selector: 'node:hover',
      style: {
        'background-color': '#31b0d5',
        'border-width': 2,
        'border-color': '#269abc',
        'font-size': 13,
        'font-weight': 'bold',
        'z-index': 999
      }
    },

    // Selected state
    {
      selector: 'node:selected',
      style: {
        'background-color': '#337ab7',
        'border-width': 3,
        'border-color': '#2e6da4',
        'font-weight': 'bold',
        'z-index': 999
      }
    },

    // Node with image
    {
      selector: 'node[image]',
      style: {
        'background-image': 'data(image)',
        'background-fit': 'cover'
      }
    },

    // Node with icon
    {
      selector: 'node[icon]',
      style: {
        'background-image': 'data(icon)',
        'background-width': '60%',
        'background-height': '60%',
        'background-position-x': '50%',
        'background-position-y': '50%',
        'background-fit': 'contain',
        'background-clip': 'none'
      }
    },

    // Different node types
    {
      selector: 'node[type="primary"]',
      style: {
        'background-color': '#337ab7',
        'border-color': '#2e6da4'
      }
    },
    {
      selector: 'node[type="secondary"]',
      style: {
        'background-color': '#5cb85c',
        'border-color': '#4cae4c'
      }
    },
    {
      selector: 'node[type="tertiary"]',
      style: {
        'background-color': '#f0ad4e',
        'border-color': '#eea236'
      }
    },

    // Highlighted node
    {
      selector: 'node.highlight',
      style: {
        'background-color': '#d9534f',
        'border-color': '#d43f3a',
        'border-width': 2,
        'font-weight': 'bold',
        'color': '#ffffff'
      }
    },

    // Parent compound node
    {
      selector: 'node:parent',
      style: {
        'background-opacity': 0.15,
        'border-width': 2,
        'border-opacity': 0.5,
        'background-color': '#f5f5f5',
        'border-color': '#dddddd',
        'shape': 'rectangle',
        'text-valign': 'top',
        'text-halign': 'center',
        'text-margin-y': 5
      }
    }
  ];
}

/**
 * Get category-specific node styles
 *
 * @returns {CytoscapeStyle[]} Array of Cytoscape style objects for categories
 */
function getCategoryNodeStyles(): CytoscapeStyle[] {
  return [
    {
      selector: 'node.category-primary',
      style: {
        'background-color': '#337ab7',
        'border-color': '#2e6da4'
      }
    },
    {
      selector: 'node.category-secondary',
      style: {
        'background-color': '#5cb85c',
        'border-color': '#4cae4c'
      }
    },
    {
      selector: 'node.category-tertiary',
      style: {
        'background-color': '#f0ad4e',
        'border-color': '#eea236'
      }
    }
  ];
}

/**
 * Get custom node styles based on options
 *
 * @param {NodeStyleOptions} options - Styling options
 * @returns {CytoscapeStyle[]} Array of Cytoscape style objects
 */
function getCustomNodeStyles(options: NodeStyleOptions = {}): CytoscapeStyle[] {
  const styles: CytoscapeStyle[] = [];

  // Apply custom shapes
  if (options.shapes) {
    Object.entries(options.shapes).forEach(([selector, shape]) => {
      styles.push({
        selector,
        style: {
          'shape': shape
        }
      });
    });
  }

  // Apply custom sizes
  if (options.sizes) {
    Object.entries(options.sizes).forEach(([selector, size]) => {
      styles.push({
        selector,
        style: {
          'width': size,
          'height': size
        }
      });
    });
  }

  // Apply custom colors
  if (options.colors) {
    Object.entries(options.colors).forEach(([selector, color]) => {
      styles.push({
        selector,
        style: {
          'background-color': color
        }
      });
    });
  }

  // Apply node shape mapping
  if (options.nodeShapeMap) {
    Object.entries(options.nodeShapeMap).forEach(([nodeType, shape]) => {
      styles.push({
        selector: `node[nodeType="${nodeType}"]`,
        style: {
          'shape': shape
        }
      });
    });
  }

  // Apply color scheme
  if (options.colorScheme) {
    switch (options.colorScheme) {
      case 'pastel':
        styles.push(
          {
            selector: 'node[group="1"]',
            style: { 'background-color': '#ffe0e0', 'border-color': '#f8d0d0' }
          },
          {
            selector: 'node[group="2"]',
            style: { 'background-color': '#e0ffe0', 'border-color': '#d0f8d0' }
          },
          {
            selector: 'node[group="3"]',
            style: { 'background-color': '#e0e0ff', 'border-color': '#d0d0f8' }
          },
          {
            selector: 'node[group="4"]',
            style: { 'background-color': '#ffffe0', 'border-color': '#f8f8d0' }
          },
          {
            selector: 'node[group="5"]',
            style: { 'background-color': '#ffe0ff', 'border-color': '#f8d0f8' }
          }
        );
        break;

      case 'vibrant':
        styles.push(
          {
            selector: 'node[group="1"]',
            style: { 'background-color': '#e74c3c', 'border-color': '#c0392b' }
          },
          {
            selector: 'node[group="2"]',
            style: { 'background-color': '#2ecc71', 'border-color': '#27ae60' }
          },
          {
            selector: 'node[group="3"]',
            style: { 'background-color': '#3498db', 'border-color': '#2980b9' }
          },
          {
            selector: 'node[group="4"]',
            style: { 'background-color': '#f1c40f', 'border-color': '#f39c12' }
          },
          {
            selector: 'node[group="5"]',
            style: { 'background-color': '#9b59b6', 'border-color': '#8e44ad' }
          }
        );
        break;

      case 'monochrome':
        styles.push(
          {
            selector: 'node[group="1"]',
            style: { 'background-color': '#f5f5f5', 'border-color': '#e0e0e0' }
          },
          {
            selector: 'node[group="2"]',
            style: { 'background-color': '#e0e0e0', 'border-color': '#cccccc' }
          },
          {
            selector: 'node[group="3"]',
            style: { 'background-color': '#cccccc', 'border-color': '#b8b8b8' }
          },
          {
            selector: 'node[group="4"]',
            style: { 'background-color': '#b8b8b8', 'border-color': '#a5a5a5' }
          },
          {
            selector: 'node[group="5"]',
            style: { 'background-color': '#a5a5a5', 'border-color': '#919191' }
          }
        );
        break;

      default: // default scheme already applied through base styles
        break;
    }
  }

  // Apply variable node sizes based on a node property
  if (options.nodeSizeProperty) {
    styles.push({
      selector: 'node',
      style: {
        'width': `mapData(${options.nodeSizeProperty}, 0, 100, 20, 80)`,
        'height': `mapData(${options.nodeSizeProperty}, 0, 100, 20, 80)`
      }
    });
  }

  // Toggle label visibility
  if (options.labelVisible === false) {
    styles.push({
      selector: 'node',
      style: {
        'label': ''
      }
    });
  }

  // Add badge styling if badges are enabled
  if (options.badgeVisible) {
    styles.push({
      selector: 'node[badge]',
      style: {
        'text-margin-x': 0,
        'text-margin-y': -5
      }
    });

    styles.push({
      selector: 'node[badge][badgeColor]',
      style: {
        'text-outline-color': 'data(badgeColor)'
      }
    });
  }

  return styles;
}

/**
 * Get all node styles by combining base, category, and custom styles
 *
 * @param {NodeStyleOptions} options - Styling options
 * @returns {CytoscapeStyle[]} Combined array of all styles
 */
function getAllNodeStyles(options: NodeStyleOptions = {}): CytoscapeStyle[] {
  return [
    ...getBaseNodeStyles(),
    ...getCategoryNodeStyles(),
    ...getCustomNodeStyles(options)
  ];
}

/**
 * Apply node styles to a Cytoscape instance
 *
 * @param {CytoscapeInstance} cy - The Cytoscape instance
 * @param {NodeStyleOptions} options - Styling options
 */
function applyNodeStyles(cy: CytoscapeInstance | null, options: NodeStyleOptions = {}): void {
  if (!cy) {
    console.error('Cytoscape instance is required to apply node styles');
    return;
  }

  // Get all node styles
  const nodeStyles = getAllNodeStyles(options);

  // Apply styles to the cytoscape instance
  cy.style().fromJson(nodeStyles).update();

  // Apply icon mapping if provided
  if (options.iconMap && Object.keys(options.iconMap).length > 0) {
    cy.ready(() => {
      cy.nodes().forEach(node => {
        const nodeType = node.data('type');
        if (nodeType && options.iconMap?.[nodeType]) {
          node.data('icon', options.iconMap[nodeType]);
        }
      });
    });
  }

  console.log(`Node styles applied (${nodeStyles.length} style definitions)`);
}

// Create namespace and expose the functions for backward compatibility with JavaScript code
interface CytoscapeNodeStyles {
  getBaseNodeStyles: typeof getBaseNodeStyles;
  getCategoryNodeStyles: typeof getCategoryNodeStyles;
  getCustomNodeStyles: typeof getCustomNodeStyles;
  getAllNodeStyles: typeof getAllNodeStyles;
  applyNodeStyles: typeof applyNodeStyles;
}

// Define window with Cytoscape properties for TypeScript
declare global {
  interface Window {
    CytoscapeNodeStyles: CytoscapeNodeStyles;
  }
}

// Use a more robust way to get the global object
const globalObj = (typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : (typeof self !== 'undefined' ? self : {}))) as any;

// Initialize the namespace if it doesn't exist
if (!globalObj.CytoscapeNodeStyles) {
  globalObj.CytoscapeNodeStyles = {} as CytoscapeNodeStyles;
}

// Expose the functions globally
globalObj.CytoscapeNodeStyles.getBaseNodeStyles = getBaseNodeStyles;
globalObj.CytoscapeNodeStyles.getCategoryNodeStyles = getCategoryNodeStyles;
globalObj.CytoscapeNodeStyles.getCustomNodeStyles = getCustomNodeStyles;
globalObj.CytoscapeNodeStyles.getAllNodeStyles = getAllNodeStyles;
globalObj.CytoscapeNodeStyles.applyNodeStyles = applyNodeStyles;

// Export for TypeScript modules
export {
  getBaseNodeStyles,
  getCategoryNodeStyles,
  getCustomNodeStyles,
  getAllNodeStyles,
  applyNodeStyles
};
