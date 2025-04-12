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

- Keyboard navigation for the Cytoscape container has been **intentionally removed**
- The only keyboard interaction preserved is the **Escape key** to close modals and clear selection
- Accessible nodes are still keyboard navigable via tab key as they have tabindex="0"
- Screen reader users will interact with the accessible DOM representation rather than the visual graph itself

## Testing

To run tests for accessibility features:

```bash
npx jest tests/cytoscape/accessibility.test.js
```
