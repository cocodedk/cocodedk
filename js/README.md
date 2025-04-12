# JavaScript Modules

This directory contains the core JavaScript modules for the application.

## Cytoscape Manager

The `cytoscape-manager.js` file provides an interface for managing the Cytoscape graph visualization. It handles:

- Graph initialization
- Styling
- Node and edge management
- Event handling
- Selection management
- Responsive layouts
- Container management

## Cytoscape Accessibility

The `cytoscape-accessibility.js` file enhances Cytoscape with accessibility features for users with disabilities. Key features include:

- **Screen Reader Support**: Creates an accessible DOM representation of the graph that screen readers can navigate
- **Accessible Node Representation**: Each node in the graph has an accessible counterpart with appropriate ARIA attributes
- **Modal Accessibility**: Modals can be closed using the Escape key
- **Screen Reader Announcements**: Important interactions are announced to screen readers

### Important Notes on Accessibility Implementation

- All keyboard navigation functionality has been **completely removed**
- The only keyboard interaction preserved is the **Escape key** to close modals and clear selection
- Graph elements are not keyboard focusable or navigable
- Screen reader users will interact with the accessible DOM representation rather than the visual graph itself

## Development Guidelines

### Testing Process

1. **DO NOT MODIFY EXISTING TESTS**: All tests marked with `.skip` must remain skipped until explicitly instructed otherwise
2. Follow test plans in the `/issues` directory for the implementation sequence
3. Reference `/issues/test-preservation.md` for the complete test preservation policy

### Implementation Approach

When implementing functionality to make tests pass:
1. Create helper functions as needed
2. Follow existing code style and conventions
3. Document all new functions
4. Ensure backward compatibility

### Responsive Layout

The CytoscapeManager now includes enhanced responsive layout functionality:

- **Viewport Detection**
  - `isDesktopViewport()` - Detects if the current viewport is desktop (≥768px) or mobile
  - Uses standard breakpoints (768px for tablet/desktop)

- **Position Management**
  - `saveOriginalPositions()` - Stores initial node positions for layout transitions
  - `restoreOriginalPositions()` - Restores original positions when returning to desktop view
  - Preserves layout consistency across viewport changes

- **Adaptive Layouts**
  - `applyResponsiveLayout()` - Automatically adjusts layout based on viewport size
  - Desktop layouts use original positions with standard spacing
  - Mobile layouts apply scaling (60% of original size) for more condensed layouts
  - Automatically handles transitions between desktop and mobile views

- **Configuration**
  - `getMobileScalingFactor()` - Returns the scaling factor used for mobile layouts (0.6)
  - Mobile layouts use smaller padding (20px vs 50px for desktop)

This responsive implementation ensures optimal graph visualization across different device sizes without requiring separate layouts.

### Container Reference Handling

For migration and container management, CytoscapeManager includes:

- **Container Management**
  - `getContainerElement()` - Returns the current container element
  - `hasValidContainer()` - Checks if the container element is valid and in the DOM
  - `resetContainer(containerId)` - Resets the container to a new element, preserving graph state

- **Features**
  - Robust DOM validation to detect removed or invalid containers
  - State preservation when migrating between containers (nodes, edges, positions, zoom, pan)
  - Safe fallback handling for testing environments
  - Comprehensive error detection and reporting

- **Error Handling**
  - Gracefully handles non-existent container IDs
  - Detects and reports when containers are removed from the DOM
  - Safely validates container existence before operations
  - Preserves graph state during migration to prevent data loss

This enhanced container handling ensures reliable migration between different container elements, making it ideal for dynamic UI changes, responsive layouts, and feature transitions.

## Testing

To run tests for accessibility features:

```bash
npx jest tests/cytoscape/accessibility.test.js
```
