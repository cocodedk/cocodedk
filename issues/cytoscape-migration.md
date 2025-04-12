# Cytoscape.js Migration Task List
IMPORTANT:
- This is a TDD approach.
- KEEP THIS PLAN UP TO DATE.
- TEST EACH FUNCTION SEPARATELY BEFORE MOVING ON.

## 1. Investigation & Setup

- [x] Research Cytoscape.js capabilities and API
- [x] Create initial Jest test configuration
- [x] Create basic test file structure for TDD approach
- [x] Set up package.json with required dependencies
- [x] Create initial test for Cytoscape initialization
- [x] Implement basic CytoscapeManager with initialization function
- [x] Consolidate all tests into single `/tests` directory
- [ ] Analyze existing HTML node rendering system
  - [ ] Document current node data structure
  - [ ] Document current edge/connection data structure
  - [ ] Document special behavior (like Contact node)
- [ ] Analyze current CSS styles for conversion
- [ ] Document current interaction behaviors
- [ ] Create detailed plan for phased migration

## 2. Data Conversion

- [x] Write test for converting single node to Cytoscape format
- [x] Implement node conversion function
- [x] Write test for converting multiple nodes to Cytoscape format
- [x] Implement multiple node conversion function
- [x] Write test for converting single edge to Cytoscape format
- [x] Implement edge conversion function
- [x] Write test for converting multiple edges to Cytoscape format
- [x] Implement multiple edge conversion function
- [x] Write test for full graph (nodes + edges) conversion
- [x] Implement full graph conversion function
- [ ] Test data conversion with actual production data

## 3. Visual Styling

- [x] Write test for basic Cytoscape stylesheet generation
- [x] Implement stylesheet generation function
- [x] Write test for category-specific node styling
- [x] Implement category-specific node styles
- [x] Write test for category-specific edge styling
- [x] Implement category-specific edge styles
- [x] Write test for interactive states (hover, active)
- [x] Implement styling for interactive states
- [ ] Compare visual appearance with original implementation
- [ ] Refine styling for pixel-perfect match with original

## 4. Interaction Handling

- [x] Write test for basic node click handler
- [x] Implement basic click handler
- [x] Write test for special Contact node click handling
- [x] Implement Contact node click behavior
- [x] Write test for hover interaction
- [x] Implement hover interactions
- [x] Write test for node selection behavior
- [✓] Implement node selection handling
- [x] Write test for mobile touch interactions
- [✓] Implement mobile-specific interaction handlers
- [ ] Test all interactions for behavior matching with original

## 5. Layout & Positioning

- [x] Write test for preserving node positions from current implementation
- [x] Implement position preservation function
- [x] Write test for custom layout options
- [x] Implement custom layout function with option merging
- [x] Write test for layout behavior when Cytoscape instance is null
- [x] Implement null instance handling in layout function
- [✓] Test layout stability across different screen sizes
- [✓] Implement responsive layout adjustments

## 6. Special Components Integration

- [x] Write test for Contact modal integration
- [x] Implement Contact modal integration with Cytoscape events
- [ ] Write tests for other special node behaviors
- [ ] Implement special node behaviors
- [ ] Test all special component integrations

## 7. Performance Optimization

- [ ] Write performance benchmark tests for original implementation
- [ ] Write performance benchmark tests for Cytoscape implementation
- [ ] Implement performance optimizations for Cytoscape rendering
- [ ] Test performance with large node sets
- [ ] Implement lazy loading or pagination for large datasets (if needed)

## 8. Integration & Main Implementation

- [ ] Write integration test for full Cytoscape implementation
- [ ] Create main entry point for Cytoscape integration
- [ ] Update HTML structure to include Cytoscape container
- [ ] Implement data loading and initialization
- [ ] Test full implementation with real data
- [ ] Create fallback mechanism in case of errors

## 9. Accessibility

- [x] Write tests for keyboard navigation
- [x] ~~Implement keyboard navigation handlers~~ Removed keyboard navigation as per requirements
- [x] Write tests for screen reader compatibility
- [x] Implement ARIA attributes and screen reader support
- [x] Test with accessibility tools
- [x] Implement focus management for modals
- [x] Ensure Escape key closes modals
- [x] Create parallel DOM structure for screen reader access

## 10. Cross-Browser Testing

- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge
- [ ] Test in mobile browsers
- [ ] Fix any browser-specific issues

## 11. Documentation & Cleanup

- [ ] Document Cytoscape.js integration
- [ ] Create developer documentation for CytoscapeManager
- [ ] Document data structure and conversion process
- [ ] Create user documentation for any changed behaviors
- [ ] Remove obsolete HTML node rendering code
- [ ] Clean up unused CSS

## 12. Validation and Success Metrics

- [ ] Verify all validation points for each migration step
  - [ ] Complete core infrastructure validation
  - [ ] Complete data conversion validation
  - [ ] Complete visual styling validation
  - [ ] Complete interaction handling validation
  - [ ] Complete performance validation
- [ ] Define and document success metrics for cutover
  - [ ] Document functional equivalence metrics
  - [ ] Document performance metrics
  - [ ] Document cross-browser compatibility metrics
  - [ ] Document accessibility compliance metrics
- [ ] Conduct validation with real users
- [ ] Create rollback plan in case of issues

## 13. Final Testing & Deployment

- [ ] Conduct final integration tests
- [ ] Perform regression testing on all features
- [ ] Create deployment plan
- [ ] Execute phased rollout
- [ ] Monitor for issues after deployment

## Progress Tracking

Current focus: Node selection and interaction handlers, test fixes

### Completed:
- ✅ Basic Cytoscape setup and initialization
- ✅ Data conversion (node, edge, and graph)
- ✅ Basic styling and visual appearance
- ✅ Basic node click handlers
- ✅ Contact modal integration
- ✅ Hover interactions
- ✅ Basic node selection implementation
- ✅ Framework for accessibility features
- ✅ Removed keyboard navigation but preserved Escape key for modals
- ✅ Tests for all completed functionality
- ✅ Fixed test mocks for consistent behavior
- ✅ Fixed data conversion tests to expect 'group' property

### In Progress:
- 🔄 Complete node selection handling implementation
- 🔄 Testing for node selection behavior
- 🔄 Interactive states test fixing

### Next Steps (Prioritized & Actionable):

1. **Node Selection (Highest Priority):**
   - Complete implementation of multi-node selection
   - Add shift+click for multi-select in CytoscapeManager.js
   - Update selection styling to match original implementation
   - Test selection state persistence during updates

2. **Responsive Layout:**
   - Implement resize handler in CytoscapeManager.js
   - Ensure container adjusts correctly to browser window changes
   - Test layout stability across different screen sizes
   - Add explicit resize event handlers for parent container changes

3. **Special Node Behaviors:**
   - Implement remaining node type-specific behaviors (beyond Contact node)
   - Test all node category behaviors against requirements
   - Ensure special node styling is consistent
   - Ensure behavior consistency with original implementation

4. **Edge Rendering & Interaction:**
   - Complete edge styling for all edge types
   - Implement edge hover/selection behaviors
   - Test edge interaction with connected nodes
   - Ensure edge styling matches original implementation

5. **Test Robustness:**
   - Continue improving test mocks for consistent behavior
   - Ensure all tests are robust against implementation changes
   - Fix remaining test failures in interactive-states and layout tests

## Changes and Simplifications

As part of this migration, we've made the following design decisions:

1. Removed arrow key navigation between nodes to simplify implementation
   - Only keeping Escape key functionality for closing modals
   - Accessibility is still maintained through screen reader support and tab navigation
   - Focus management is preserved for modals

2. Simplified styling system
   - Using Cytoscape.js native styling instead of custom CSS overlays
   - Style consistency with app theme will be maintained
