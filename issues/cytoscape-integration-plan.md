# Cytoscape Integration Implementation Plan

This document outlines the specific tasks required to integrate the completed Cytoscape.js implementation into the production website. While all 31 tasks for developing the Cytoscape migration have been completed, the implementation is not currently being used on the live site.

## Current Status Assessment

The current website:
- Uses `node-display.js` for visualization
- Has no Cytoscape.js library included
- Contains no references to the custom Cytoscape implementation files
- Has no container element specifically configured for Cytoscape rendering

The completed Cytoscape implementation:
- Is fully developed and tested with production data
- Includes all necessary components:
  - `cytoscape-manager.js`: Core management module
  - `cytoscape-edge-styles.js`: Edge styling
  - `cytoscape-edge-interactions.js`: Edge interactivity
  - `cytoscape-stylesheet.js`: Visual styling
  - `cytoscape-accessibility.js`: Accessibility features

## Integration Tasks

### Phase 1: Preparation & Infrastructure (Estimated: 1 day)

1. **Update index.html with required dependencies**
   - [ ] Add Cytoscape.js CDN link in `<head>` section
   - [ ] Include all custom Cytoscape implementation files:
     - cytoscape-manager.js
     - cytoscape-edge-styles.js
     - cytoscape-edge-interactions.js
     - cytoscape-stylesheet.js
     - cytoscape-accessibility.js
   - [ ] Add proper container element for Cytoscape rendering:
     ```html
     <div id="cy-container" class="cy-container" aria-label="Interactive graph visualization of cocode.dk services"></div>
     ```
   - [ ] Configure container with appropriate CSS positioning

2. **Create fallback mechanism**
   - [ ] Implement feature flag in main.js for easy toggling between implementations
   - [ ] Add error detection for Cytoscape initialization
   - [ ] Create fallback function to revert to original visualization if needed

### Phase 2: Module Integration & TDD Fixes (NEW)

1. **Fix module pattern issues using TDD approach**
   - [ ] Create test suite for component availability
   - [ ] Fix `module.exports` in edge-styles.js to use browser-compatible pattern
   - [x] Fix `module.exports` in edge-interactions.js to use browser-compatible pattern
   - [ ] Fix accessibility.js to use window.CytoscapeManager reference
   - [x] Fix cytoscape-manager.js initialization issues
   - [x] Implement missing `getNodes` function in cytoscape-manager.js
   - [x] Add `getStylesheet` function to CytoscapeManager public API
   - [x] Add `registerInteractionHandlers` function to CytoscapeManager public API
   - [x] Add module.exports support for testing environment
   - [x] Implement missing `selectEdge` function in edge-interactions.js
   - [x] Expose edge conversion functions: `convertEdgesToCytoscape`, `convertEdgeToCytoscape`, `parseEdgeData`
   - [x] Expose graph conversion functions: `convertGraphToCytoscape`
   - [x] Expose container related functions: `hasValidContainer`, `getContainerElement`
   - [x] Expose responsive layout functions: `isDesktopViewport`, `applyResponsiveLayout`
   - [x] Expose mobile interaction functions: `enableMobileInteractions`, `setContextMenuCallback`
   - [x] Expose layout functions: `applyLayout`
   - [ ] Create the missing `node-styles.js` module

2. **Fix edge interaction functionality**
   - [ ] Implement `setupEdgeHoverInteractions` function in edge-interactions.js
   - [ ] Create `selectEdge` function for edge selection handling
   - [ ] Add `supportsBidirectionalEdges` flag to CytoscapeManager
   - [ ] Implement bidirectional edge rendering logic
   - [ ] Fix edge selection tests by ensuring proper edge lookup

3. **Fix accessibility implementation**
   - [ ] Resolve accessibility module initialization issues
   - [ ] Fix accessible DOM representation of nodes
   - [ ] Implement proper updates when graph changes
   - [ ] Add modal accessibility with Escape key handling
   - [ ] Ensure screen reader compatibility

4. **Create robust testing infrastructure**
   - [ ] Implement debug panel with test controls
   - [ ] Add component-level tests following TDD principles
   - [ ] Create toggle functionality for switching implementations
   - [ ] Add visual indicators for test status
   - [ ] Implement detailed logging for initialization process

### Phase 3: Implementation (Estimated: 2 days)

3. **Update main.js to initialize Cytoscape**
   - [ ] Add initialization code using CytoscapeManager:
     ```javascript
     // Initialize Cytoscape
     const cy = CytoscapeManager.initialize('cy-container');

     // Load graph data
     CytoscapeManager.loadNodesJsGraph(nodes, links, {
       language: currentLanguage,
       responsive: true
     });
     ```
   - [ ] Move language handling to work with Cytoscape:
     ```javascript
     function setLanguage(lang) {
       currentLanguage = lang;
       CytoscapeManager.setLanguage(lang);
       // Update other language-dependent elements
       updateUITexts(lang);

       // Update URL hash
       window.location.hash = lang;
     }
     ```
   - [ ] Integrate contact modal functionality with Cytoscape's node selection:
     ```javascript
     CytoscapeManager.registerSelectionHandlers({
       onNodeSelected: (nodeId, nodeData) => {
         if (nodeData.category === 'Contact') {
           showContactModal(nodeData);
         }
       }
     });
     ```

4. **Update CSS styles for Cytoscape container**
   - [ ] Create or update CSS rules in styles.css:
     ```css
     .cy-container {
       width: 100%;
       height: 80vh;
       position: relative;
       margin: 0 auto;
     }

     /* Responsive adjustments */
     @media screen and (max-width: 768px) {
       .cy-container {
         height: 70vh;
       }
     }
     ```
   - [ ] Ensure tooltip and interactive elements have appropriate styles
   - [ ] Add any necessary animation styles

### Phase 4: Testing & QA (Estimated: 2 days)

5. **Comprehensive testing**
   - [ ] Test across multiple browsers:
     - Chrome
     - Firefox
     - Safari
     - Edge
   - [ ] Test across multiple devices:
     - Desktop (various screen sizes)
     - Mobile (iOS and Android)
     - Tablet
   - [ ] Test multilingual support with all 11 languages
   - [ ] Test all interactive features:
     - Node hover/selection
     - Edge hover/selection
     - Contact node functionality
     - Language switching
   - [ ] Test accessibility features:
     - Screen reader compatibility
     - Keyboard navigation
     - ARIA attributes

6. **Performance optimization**
   - [ ] Measure and optimize load times
   - [ ] Verify smooth animations and interactions
   - [ ] Check memory usage
   - [ ] Optimize for mobile devices

### Phase 5: Deployment (Estimated: 1 day)

7. **Staged deployment**
   - [ ] Deploy to staging/test environment first
   - [ ] Conduct final verification
   - [ ] Plan production deployment with rollback capability
   - [ ] Monitor site after deployment

8. **Documentation update**
   - [ ] Update technical documentation
   - [ ] Document any new or changed functionality
   - [ ] Add maintenance notes

## TDD Approach for Fixing Integration Issues

The following TDD-based approach will be used to fix the current integration issues:

### 1. Test Setup Phase

**Test Cases:**
1. **Module Pattern Test**
   - Test: All Cytoscape files should use browser-compatible module patterns
   - Expected: Exported functions are accessible via window.* objects

2. **Initialization Order Test**
   - Test: CytoscapeManager initializes after all dependencies
   - Expected: No reference errors during initialization sequence

3. **Variable Scoping Test**
   - Test: No duplicate global variables exist
   - Expected: Clean variable scope without redeclarations

### 2. Fix Implementation Phase

**Prioritized Fixes:**

1. **Edge Styles Module (Priority: High)**
   - Issue: `Uncaught ReferenceError: module is not defined`
   - TDD Steps:
     - Write test for window.CytoscapeStyles presence
     - Convert module.exports to window.CytoscapeStyles
     - Verify test passes

2. **Edge Interactions Module (Priority: High)**
   - Issue: `Uncaught ReferenceError: module is not defined`
   - TDD Steps:
     - Write test for window.CytoscapeInteractions presence
     - Convert module.exports to window.CytoscapeInteractions
     - Verify test passes

3. **Accessibility Module (Priority: Medium)**
   - Issue: `CytoscapeManager not found`
   - TDD Steps:
     - Write test for proper window.CytoscapeManager reference
     - Update references to use window.CytoscapeManager
     - Verify test passes

4. **Cytoscape Manager (Priority: High)**
   - Issue: `Uncaught ReferenceError: initialize is not defined`
   - TDD Steps:
     - Write test for proper function scoping
     - Fix function references within module
     - Verify test passes

5. **Main.js Variable Scoping (Priority: Medium)**
   - Issue: `Identifier 'currentLanguage' has already been declared`
   - TDD Steps:
     - Write test for proper variable scoping
     - Remove duplicate declarations
     - Verify test passes

### 3. Integration Verification Phase

1. **End-to-End Initialization Test**
   - Test the complete initialization sequence
   - Verify no console errors appear
   - Confirm Cytoscape graph renders correctly

2. **Feature Flag Test**
   - Test toggling between Cytoscape and legacy visualizations
   - Verify graceful fallback when errors occur
   - Confirm smooth transition between implementations

3. **Browser Compatibility Test**
   - Verify fixes work across multiple browsers
   - Ensure no browser-specific errors occur

## Implementation Details

### HTML Changes Required

```html
<!-- Add to head section -->
<head>
  <!-- Existing head content -->

  <!-- Cytoscape.js library -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/cytoscape/3.24.0/cytoscape.min.js" integrity="sha512-X/cFVV4LXiFIbMyul0BOR/nToBKVz5RkUgeps3oVl2LsZ+1o3KZQRNnzaRQacLQnDQUt0fva1drQkZVkhzQt/w==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

  <!-- Existing CSS -->
</head>

<body>
  <!-- Existing body content -->

  <!-- Add Cytoscape container after header -->
  <div id="cy-container" class="cy-container" aria-label="Interactive graph visualization of cocode.dk services"></div>

  <!-- Replace or keep existing infoBox -->
  <div id="infoBox"></div>

  <!-- Existing content -->

  <!-- Add Cytoscape implementation files before main.js -->
  <script src="js/cytoscape-stylesheet.js?v=1.0.0"></script>
  <script src="js/cytoscape-edge-styles.js?v=1.0.0"></script>
  <script src="js/cytoscape-edge-interactions.js?v=1.0.0"></script>
  <script src="js/cytoscape-accessibility.js?v=1.0.0"></script>
  <script src="js/cytoscape-manager.js?v=1.0.0"></script>

  <!-- Keep existing scripts -->
  <script src="js/nodes.js?v=1.0.2"></script>
  <!-- Can be removed after full transition -->
  <script src="js/node-display.js?v=1.0.0"></script>
  <script src="js/contact-modal.js?v=1.0.2"></script>
  <script src="js/main.js?v=1.0.0"></script>
</body>
```

### main.js Changes Required

The main.js file will need significant modifications:

```javascript
// Global variables
let currentLanguage = 'en';
let useCytoscape = true; // Feature flag for easy toggling

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
  // Initialize based on feature flag
  if (useCytoscape) {
    initializeCytoscape();
  } else {
    initializeLegacyVisualization();
  }

  // Setup language handling
  setupLanguageHandling();

  // Other initialization
});

function initializeCytoscape() {
  try {
    // Initialize Cytoscape with container
    const cy = CytoscapeManager.initialize('cy-container');
    if (!cy) {
      console.error('Failed to initialize Cytoscape');
      fallbackToLegacy();
      return;
    }

    // Load graph data
    CytoscapeManager.loadNodesJsGraph(nodes, links, {
      language: currentLanguage,
      responsive: true
    });

    // Register contact modal handler
    CytoscapeManager.registerSelectionHandlers({
      onNodeSelected: (nodeId, nodeData) => {
        if (nodeData.category === 'Contact') {
          showContactModal(nodeData);
        }
      }
    });

    // Apply initial language
    CytoscapeManager.setLanguage(currentLanguage);

    console.log('Cytoscape initialization complete');
  } catch (e) {
    console.error('Error initializing Cytoscape:', e);
    fallbackToLegacy();
  }
}

function fallbackToLegacy() {
  console.warn('Falling back to legacy visualization');
  useCytoscape = false;
  initializeLegacyVisualization();
}

function initializeLegacyVisualization() {
  // Original initialization code
  initializeGraph();
  // Other legacy initialization
}

function setLanguage(lang) {
  currentLanguage = lang;
  CytoscapeManager.setLanguage(lang);
  // Update other language-dependent elements
  updateUITexts(lang);

  // Update URL hash
  window.location.hash = lang;
}

// Other functions remain the same
```

## Debugging Tools

To assist with the TDD approach, debug tools have been added:

1. **Debug Panel**
   - Toggle button to switch implementations
   - Test buttons for each implementation
   - Detailed test output with pass/fail indicators

2. **Console Logging**
   - Detailed initialization logs with [DEBUG] prefix
   - Error reporting with component information
   - Performance metrics for key operations

3. **Visual Indicators**
   - DOM attribute showing active implementation
   - CSS styling to highlight active implementation
   - Test result styling with clear pass/fail colors

## Potential Issues and Mitigation

1. **Performance Degradation**
   - Issue: Cytoscape.js might perform differently than the custom implementation
   - Mitigation: Extensive performance testing, optimize Cytoscape settings

2. **Visual Differences**
   - Issue: Styling differences between implementations
   - Mitigation: Careful CSS adjustments, A/B comparison testing

3. **Mobile Compatibility**
   - Issue: Touch interactions might differ
   - Mitigation: Dedicated mobile testing, ensure mobile-specific handlers work

4. **Browser Compatibility**
   - Issue: Different browser implementations
   - Mitigation: Cross-browser testing, polyfills if needed

5. **Accessibility Regression**
   - Issue: Changes could affect existing accessibility
   - Mitigation: ARIA compliance testing, screen reader verification

## Success Criteria

The integration will be considered successful when:

1. The Cytoscape visualization correctly displays the node/edge graph
2. All interactions (hover, click, selection) work correctly
3. Performance metrics meet or exceed the legacy implementation
4. Multilingual support functions across all supported languages
5. No accessibility regressions are introduced
6. Mobile and touch devices have full functionality

## Testing Checklist

- [ ] Visualization renders properly on initial load
- [ ] All nodes and edges display with correct styling
- [ ] Hover states work correctly on nodes
- [ ] Hover states work correctly on edges
- [ ] Clicking Contact node shows modal
- [ ] All 11 languages display correctly
- [ ] Language switching updates the visualization immediately
- [ ] Mobile touch interactions work properly
- [ ] Responsive layout functions on window resize
- [ ] Performance is acceptable on lower-end devices
- [ ] Accessible using keyboard navigation
- [ ] Screen readers can interpret the graph content

## Rollback Plan

If critical issues are encountered post-deployment:

1. Revert to the feature flag `useCytoscape = false` in main.js
2. If needed, revert HTML changes to remove Cytoscape dependencies
3. Document encountered issues for future resolution

## Next Steps After Integration

Once the integration is successfully completed, potential future enhancements include:

1. Complete removal of legacy visualization code
2. Performance optimizations specific to Cytoscape
3. Additional interactive features
4. Animation enhancements
5. Advanced filtering capabilities
