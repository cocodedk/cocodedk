

### Analysis of `cytoscape-manager.js`
## Path `/home/bba/0-projects/cocodedk/js/cytoscape-manager.js`

After reviewing the content of `cytoscape-manager.js`, I've identified several logical groupings of functionality that can be split into separate modules. The file (1922 lines) contains a wide range of functionalities related to initializing and managing a Cytoscape graph, including node and edge rendering, interactions, layouts, and responsive design.

### Proposed Modular Structure

To make the codebase more manageable and adhere to the project's code structure guidelines (maximum 300 lines per file), I propose the following modular breakdown under `src/ts/cytoscape/manager/`:

1. **Initialization Module** (`initialization.ts`)
   - Handles the initialization of the Cytoscape instance, container management, and basic setup.
   - Key functions: `initialize`, `getInstance`, `getContainerElement`, `hasValidContainer`, `resetContainer`.

2. **Node Management Module** (`node-management.ts`)
   - Manages node rendering, styling, and data conversion.
   - Key functions: `renderNode`, `applyNodeSize`, `applyNodeClasses`, `convertNodeToCytoscape`, `convertNodesToCytoscape`.

3. **Edge Management Module** (`edge-management.ts`)
   - Manages edge rendering, styling, and data conversion, including bidirectional edge handling.
   - Key functions: `renderEdge`, `renderEdges`, `handleBidirectionalEdges`, `convertEdgeToCytoscape`, `convertEdgesToCytoscape`, `convertLinksToCytoscapeEdges`, `updateEdge`.

4. **Layout Management Module** (`layout-management.ts`)
   - Handles layout application and responsive design adjustments.
   - Key functions: `applyLayout`, `applyResponsiveLayout`, `saveOriginalPositions`, `restoreOriginalPositions`, `isDesktopViewport`, `getMobileScalingFactor`, `resetResponsiveState`.

5. **Interaction Management Module** (`interaction-management.ts`)
   - Manages user interactions including selection, clicks, and mobile touch events.
   - Key functions: `registerInteractionHandlers`, `registerSelectionHandlers`, `selectNode`, `clearSelection`, `enableMobileInteractions`, `setContextMenuCallback`, `hasRegisteredHandlers`, `initializeContactModalIntegration`.

6. **Stylesheet Management Module** (`stylesheet-management.ts`)
   - Manages stylesheet generation and application for nodes and edges.
   - Key functions: `getStylesheet`, `getCompleteStylesheet`.

7. **Data Management Module** (`data-management.ts`)
   - Handles graph data loading, conversion, and language settings.
   - Key functions: `renderGraph`, `convertGraphToCytoscape`, `loadNodesJsGraph`, `setLanguage`, `getCurrentLanguage`, `getNodes`.

8. **Main Manager Module** (`cytoscape-manager.ts`)
   - Serves as the entry point, importing and exposing functionalities from other modules, maintaining backward compatibility with global namespace.
   - Key functions: Aggregates and exports functions from other modules, handles global namespace setup.

### Test Plan with Assertions

Following TDD principles, I'll define test cases for each module before implementation. Each module will have its own test file in `tests/ts/` with specific assertions to ensure functionality is preserved during migration.

1. **Initialization Module Tests** (`initialization.test.ts`)
   - Assertions:
     1. Cytoscape instance can be initialized with a valid container ID.
     2. Returns null for invalid container ID.
     3. Container element can be retrieved after initialization.
     4. Validates container presence in DOM.
     5. Can reset container to a new element.
   - Test Command: `npm test -- --bail tests/ts/initialization.test.ts`

2. **Node Management Module Tests** (`node-management.test.ts`)
   - Assertions:
     1. Can render a node with correct data and styling.
     2. Applies node size based on radius property.
     3. Applies correct CSS classes based on category and data.
     4. Converts node data to Cytoscape format correctly.
   - Test Command: `npm test -- --bail tests/ts/node-management.test.ts`

3. **Edge Management Module Tests** (`edge-management.test.ts`)
   - Assertions:
     1. Can render an edge with correct source and target.
     2. Applies styling based on edge properties (directed, bidirectional).
     3. Handles bidirectional edges with correct styling.
     4. Converts edge data to Cytoscape format correctly.
     5. Can update existing edge properties.
   - Test Command: `npm test -- --bail tests/ts/edge-management.test.ts`

4. **Layout Management Module Tests** (`layout-management.test.ts`)
   - Assertions:
     1. Can apply a layout with specified options.
     2. Adjusts layout based on viewport size (desktop vs mobile).
     3. Saves and restores original node positions correctly.
     4. Determines viewport type correctly.
   - Test Command: `npm test -- --bail tests/ts/layout-management.test.ts`

5. **Interaction Management Module Tests** (`interaction-management.test.ts`)
   - Assertions:
     1. Registers interaction handlers for node clicks and selections.
     2. Can select a node programmatically by ID.
     3. Clears selection correctly.
     4. Enables mobile touch interactions (tap, pinch-to-zoom).
     5. Sets and triggers context menu callback.
   - Test Command: `npm test -- --bail tests/ts/interaction-management.test.ts`

6. **Stylesheet Management Module Tests** (`stylesheet-management.test.ts`)
   - Assertions:
     1. Generates a stylesheet with correct node and edge styles.
     2. Combines base and edge-specific styles correctly.
   - Test Command: `npm test -- --bail tests/ts/stylesheet-management.test.ts`

7. **Data Management Module Tests** (`data-management.test.ts`)
   - Assertions:
     1. Renders a complete graph with nodes and edges.
     2. Converts full graph data to Cytoscape format.
     3. Loads graph data from nodes.js format.
     4. Sets language and updates node labels accordingly.
     5. Retrieves current language setting.
     6. Retrieves all node data from the graph.
   - Test Command: `npm test -- --bail tests/ts/data-management.test.ts`

8. **Main Manager Module Tests** (`cytoscape-manager.test.ts`)
   - Assertions:
     1. Exports all necessary functions from sub-modules.
     2. Maintains backward compatibility with global namespace.
   - Test Command: `npm test -- --bail tests/ts/cytoscape-manager.test.ts`

### Test-First Checklist for Step 7

1. **Create Test Files for Each Module**: Write test files with the above assertions for each proposed module before any implementation. (`npm test -- --bail tests/ts/*.test.ts` to verify initial failures)
2. **Implement Initialization Module**: Convert initialization-related code from `cytoscape-manager.js` to TypeScript in `initialization.ts`. (`npm test -- --bail tests/ts/initialization.test.ts`)
3. **Implement Node Management Module**: Convert node management code to `node-management.ts`. (`npm test -- --bail tests/ts/node-management.test.ts`)
4. **Implement Edge Management Module**: Convert edge management code to `edge-management.ts`. (`npm test -- --bail tests/ts/edge-management.test.ts`)
5. **Implement Layout Management Module**: Convert layout management code to `layout-management.ts`. (`npm test -- --bail tests/ts/layout-management.test.ts`)
6. **Implement Interaction Management Module**: Convert interaction code to `interaction-management.ts`. (`npm test -- --bail tests/ts/interaction-management.test.ts`)
7. **Implement Stylesheet Management Module**: Convert stylesheet code to `stylesheet-management.ts`. (`npm test -- --bail tests/ts/stylesheet-management.test.ts`)
8. **Implement Data Management Module**: Convert data handling code to `data-management.ts`. (`npm test -- --bail tests/ts/data-management.test.ts`)
9. **Update Main Manager Module**: Update `cytoscape-manager.ts` to import and export functionalities from all sub-modules, ensuring backward compatibility. (`npm test -- --bail tests/ts/cytoscape-manager.test.ts`)
10. **Integration Testing**: Run full test suite to ensure all modules work together seamlessly. (`npm test`)

This plan adheres to the absolute TDD principles by ensuring tests are written first for each module, and no implementation is done until corresponding tests are in place and failing. Each module will be kept under 300 lines as per the code structure guidelines, focusing on single responsibilities.

I'll transition to the ACT mode next to start creating the test files for each module as outlined. If you have any modifications to this plan or specific modules to prioritize, please let me know before I proceed.
