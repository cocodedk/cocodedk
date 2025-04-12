# JavaScript Modules

This directory contains the core JavaScript modules for the application.

## Cytoscape Manager

The `cytoscape-manager.js` file provides an interface for managing the Cytoscape graph visualization. It handles:

- Graph initialization
- Styling
- Node and edge management
- Event handling
- Selection management

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

## Testing

To run tests for accessibility features:

```bash
npx jest tests/cytoscape/accessibility.test.js
```
