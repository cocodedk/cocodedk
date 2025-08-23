// Type definitions for Cytoscape components

// Basic Cytoscape element types
export interface CytoscapeNode {
  id: string;
  data: NodeData;
  position?: { x: number; y: number };
  group?: 'nodes';
  classes?: string;
}

export interface CytoscapeEdge {
  id: string;
  data: EdgeData;
  group?: 'edges';
  classes?: string;
}

export interface NodeData {
  id: string;
  label?: string;
  [key: string]: any; // Allow for additional properties
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
  label?: string;
  [key: string]: any; // Allow for additional properties
}

// Style definitions
export interface CytoscapeStyle {
  selector: string;
  style: {
    [key: string]: string | number | boolean | number[] | any; // Allow arrays and other values for style properties
  };
}

// Event handling
export interface CytoscapeEventHandler {
  selector: string;
  event: string;
  handler: (event: any) => void;
}

// Graph configuration
export interface CytoscapeConfig {
  container: HTMLElement | null;
  elements?: Array<CytoscapeNode | CytoscapeEdge>;
  style?: Array<CytoscapeStyle>;
  layout?: {
    name: string;
    [key: string]: any;
  };
  [key: string]: any; // Other Cytoscape configuration options
}

// Cytoscape Instance definition
export interface CytoscapeInstance {
  style: () => {
    fromJson: (styles: CytoscapeStyle[]) => {
      update: () => void;
    };
  };
  nodes: () => {
    forEach: (callback: (node: any) => void) => void;
    [key: string]: any;
  };
  ready: {
    (callback: () => void): void;
    (callback: (event: CytoscapeEventObject) => void): void;
  };
  // Support different overloads of the on method
  on: {
    (event: string, selector: string, callback: (event: CytoscapeEventObject) => void): void;
    (event: string, callback: (event: CytoscapeEventObject) => void): void;
  };
  layout: (options: any) => { run: () => void };
  animate: (params: any, options: any) => void;
  elements: () => any;
  [key: string]: any; // Other Cytoscape instance methods and properties
}

// Layout options
export interface LayoutOptions {
  name: string;
  animationDuration?: number;
  [key: string]: any; // Other layout options
}

// Event object
export interface CytoscapeEventObject {
  type: string;
  target: any;
  cy: CytoscapeInstance;
  [key: string]: any; // Other event properties
}
