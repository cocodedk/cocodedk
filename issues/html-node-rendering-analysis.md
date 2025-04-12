# HTML Node Rendering System Analysis

This document analyzes the existing HTML-based node rendering system to ensure proper conversion to Cytoscape.js.

## Current Implementation Overview

The current visualization is implemented using HTML DOM elements with CSS styling rather than canvas-based rendering. The system consists of several key JavaScript files:

- `nodes.js`: Defines node data and relationships
- `node-display.js`: Handles DOM manipulation and interactions
- `node-animation.js`: Provides animation effects for nodes
- `main.js`: Coordinates initialization and app flow

## Node Data Structure

### Current Node Format
```javascript
{
  id: 'cocode.dk',
  x: 0, y: 0, r: 50,
  labels: {
    en: 'cocode.dk',
    da: 'cocode.dk',
    // Other language translations
  },
  translations: {
    en: 'cocode.dk is a freelance IT consultancy...',
    da: 'cocode.dk er en freelance IT-konsulentvirksomhed...',
    // Other language translations
  },
  category: 'cocode.dk'
}
```

### Key Properties:
- `id`: Unique identifier for the node
- `x`, `y`: Position coordinates
- `r`: Radius (size)
- `labels`: Multilingual label text
- `translations`: Multilingual description text
- `category`: Used for styling and behavior grouping

## DOM Rendering Approach

The current system creates DOM elements for each node and connection:

1. **Node Container**: A parent div holds all nodes and connections
2. **Node Elements**: Individual divs with:
   - Category-based styling
   - Positioning based on x,y coordinates
   - Size based on radius
   - Event listeners for interactions
3. **Link Elements**: Divs representing connections, styled as lines

### HTML Structure
```html
<div class="node-container">
  <!-- Node elements -->
  <div id="node-cocode.dk" class="node node-cocode\.dk" role="button" tabindex="0">
    <div class="node-label">cocode.dk</div>
  </div>

  <!-- Link elements -->
  <div class="node-link link-Software"></div>
</div>
```

## Interaction Behavior

The current system implements several interaction patterns:

1. **Click/Tap**:
   - Shows detailed node information in a modal
   - Special handling for Contact node (shows contact modal)

2. **Hover**:
   - Visual highlight effect via CSS
   - Size expansion animation

3. **Keyboard Navigation**:
   - Enter/Space activates nodes (opens modal)
   - REMOVED: Arrow key navigation between nodes
   - Escape key closes modals

4. **Screen Resizing**:
   - Responsive positioning adjustments
   - Mobile-specific optimizations

## Modal System

The system features a modal display for showing node details:

1. **Creation**: Dynamically created modal and overlay
2. **Content**: Shows node title and multilingual description
3. **Accessibility**: Close button, escape key handler, ARIA attributes
4. **Animation**: Title animations and visual effects

## Special Node Handling

The "Contact" node has special behavior:
- Opens a dedicated contact modal
- Different styling
- Has dedicated JS module (contact-modal.js)

## Conversion Considerations

When migrating to Cytoscape.js, the following aspects need careful consideration:

1. **Data Structure Mapping**:
   - Convert position and size attributes
   - Map multilingual data to Cytoscape data fields
   - Preserve categories for styling

2. **Style Migration**:
   - Convert CSS styles to Cytoscape style format
   - Match hover/select state appearances
   - Ensure consistent typography and colors

3. **Interaction Parity**:
   - Maintain click behavior and modal integration
   - Replicate hover effects
   - Handle special node behavior (Contact node)

4. **Accessibility Requirements**:
   - Create parallel DOM structure for screen readers
   - Maintain ARIA attributes
   - Keep Escape key for closing modals (no other keyboard navigation)

5. **Responsive Behavior**:
   - Ensure layout adapts to screen size
   - Match mobile optimizations
