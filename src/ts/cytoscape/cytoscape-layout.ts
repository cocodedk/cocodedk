/**
 * TypeScript version of the Cytoscape layout module.
 * Manages and provides layout options for Cytoscape graphs.
 */

import { CytoscapeInstance, LayoutOptions } from '../types/cytoscape';

interface CocodeLayoutOptions extends LayoutOptions {
  name: string;
  animate?: boolean;
  randomize?: boolean;
  fit?: boolean;
  padding?: number;
  boundingBox?: { x1: number; y1: number; w: number; h: number };
  avoidOverlap?: boolean;
  nodeDimensionsIncludeLabels?: boolean;
  spacingFactor?: number;
  radius?: number;
  startAngle?: number;
  sweep?: number;
  clockwise?: boolean;
  sort?: Function | undefined;
  concentric?: Function | undefined;
  levelWidth?: Function | undefined;
  maxLevelDifference?: number;
  gravity?: number;
  numIter?: number;
  initialTemp?: number;
  coolingFactor?: number;
  minTemp?: number;
  maxSimulationTime?: number;
}

/**
 * Get common layout options used across different layouts
 *
 * @returns {CocodeLayoutOptions} Common layout options
 */
function getCommonLayoutOptions(): CocodeLayoutOptions {
  return {
    name: 'preset', // Default layout type
    animate: true,
    animationDuration: 500,
    fit: true,
    padding: 30,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: true
  };
}

/**
 * Get concentric layout options
 *
 * @returns {CocodeLayoutOptions} Concentric layout options
 */
function getConcentricLayoutOptions(): CocodeLayoutOptions {
  const commonOptions = getCommonLayoutOptions();

  return {
    ...commonOptions,
    name: 'concentric',
    concentric: function(node: any) {
      // Root node at the center (level 0)
      if (node.data('category') === 'cocode.dk') {
        return 10;
      }

      // All other nodes at level 1
      return 0;
    },
    levelWidth: function() {
      return 1;
    },
    spacingFactor: 1.5,
    animate: true
  };
}

/**
 * Get circle layout options
 *
 * @returns {CocodeLayoutOptions} Circle layout options
 */
function getCircleLayoutOptions(): CocodeLayoutOptions {
  const commonOptions = getCommonLayoutOptions();

  return {
    ...commonOptions,
    name: 'circle',
    radius: 200,
    startAngle: 3 / 2 * Math.PI, // Start from the top
    animate: true
  };
}

/**
 * Get cose layout options
 *
 * @returns {CocodeLayoutOptions} Cose layout options
 */
function getCoseLayoutOptions(): CocodeLayoutOptions {
  const commonOptions = getCommonLayoutOptions();

  return {
    ...commonOptions,
    name: 'cose',
    idealEdgeLength: 100,
    nodeOverlap: 20,
    refresh: 20,
    fit: true,
    padding: 30,
    randomize: false,
    componentSpacing: 100,
    nodeRepulsion: 400000,
    edgeElasticity: 100,
    nestingFactor: 5,
    gravity: 80,
    numIter: 1000,
    initialTemp: 200,
    coolingFactor: 0.95,
    minTemp: 1.0
  };
}

/**
 * Get breadthfirst layout options
 *
 * @returns {CocodeLayoutOptions} Breadthfirst layout options
 */
function getBreadthFirstLayoutOptions(): CocodeLayoutOptions {
  const commonOptions = getCommonLayoutOptions();

  return {
    ...commonOptions,
    name: 'breadthfirst',
    directed: false,
    spacingFactor: 1.5
  };
}

/**
 * Apply a specific layout to a Cytoscape instance
 *
 * @param {CytoscapeInstance} cy - Cytoscape instance
 * @param {string} layoutName - Name of the layout to apply
 */
function applyLayout(cy: CytoscapeInstance, layoutName: string): void {
  let layoutOptions: CocodeLayoutOptions;

  switch (layoutName) {
    case 'concentric':
      layoutOptions = getConcentricLayoutOptions();
      break;
    case 'circle':
      layoutOptions = getCircleLayoutOptions();
      break;
    case 'cose':
      layoutOptions = getCoseLayoutOptions();
      break;
    case 'breadthfirst':
      layoutOptions = getBreadthFirstLayoutOptions();
      break;
    default:
      layoutOptions = getCommonLayoutOptions();
      break;
  }

  // Apply the layout
  cy.layout(layoutOptions).run();
}

// Create namespace and expose the functions for backward compatibility with JavaScript code
interface CytoscapeLayout {
  getCommonLayoutOptions: typeof getCommonLayoutOptions;
  getConcentricLayoutOptions: typeof getConcentricLayoutOptions;
  getCircleLayoutOptions: typeof getCircleLayoutOptions;
  getCoseLayoutOptions: typeof getCoseLayoutOptions;
  getBreadthFirstLayoutOptions: typeof getBreadthFirstLayoutOptions;
  applyLayout: typeof applyLayout;
}

// Define window with Cytoscape properties for TypeScript
declare global {
  interface Window {
    CytoscapeLayout: CytoscapeLayout;
  }
}

// Initialize the namespace if it doesn't exist
if (!window.CytoscapeLayout) {
  window.CytoscapeLayout = {} as CytoscapeLayout;
}

// Expose the functions globally
window.CytoscapeLayout.getCommonLayoutOptions = getCommonLayoutOptions;
window.CytoscapeLayout.getConcentricLayoutOptions = getConcentricLayoutOptions;
window.CytoscapeLayout.getCircleLayoutOptions = getCircleLayoutOptions;
window.CytoscapeLayout.getCoseLayoutOptions = getCoseLayoutOptions;
window.CytoscapeLayout.getBreadthFirstLayoutOptions = getBreadthFirstLayoutOptions;
window.CytoscapeLayout.applyLayout = applyLayout;

// Export for TypeScript modules
export {
  getCommonLayoutOptions,
  getConcentricLayoutOptions,
  getCircleLayoutOptions,
  getCoseLayoutOptions,
  getBreadthFirstLayoutOptions,
  applyLayout
};
