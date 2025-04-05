# System Patterns

## Architecture Overview
The website is built using a simple, dependency-free HTML/CSS/JavaScript architecture:

```
index.html
├── Canvas-based rendering
├── CSS styling (inline)
└── JavaScript (inline)
    ├── Data structures (nodes, links)
    ├── Rendering functions
    ├── Event handlers
    ├── Animation system
    └── InfoBox management
```

## Core Design Patterns

### Graph Visualization Pattern
- Nodes represent services/technologies
- Links represent relationships between nodes
- Force-directed layout (simplified)
- Node categorization by color/style

### Data Structure Patterns
- Node objects with comprehensive properties:
  - Position (x, y)
  - Size (r)
  - Identification (id)
  - Category assignment
  - Multilingual translations
- Link arrays defining node relationships

### Interaction Patterns
- Hover state management
- Click-based information display
- Language selection with real-time updates
- Responsive scaling and positioning
- Scroll-aware UI adjustments

### Animation and Visual Feedback Patterns
- Text typing effect for information display
- Visual feedback on hover/click
- Animation queue for managing multiple animations
- State tracking for busy conditions
- Interval management for cleanup

### InfoBox Management Patterns
- Prepend-based content addition (newest at top)
- Dynamic height management with auto-trimming
- Oldest-entry removal when space constraints hit
- Minimums preservation to maintain context
- Layering based on canvas overlap detection

## Technical Decisions

### Canvas vs. SVG
- Canvas chosen for performance with many nodes
- Direct pixel manipulation for custom effects
- Simplified event handling logic

### Inline vs. External Resources
- Single file approach for simplicity
- No external dependencies to manage
- Facilitates easy deployment and maintenance

### Multilingual Implementation
- Translation objects embedded in node data
- Language-specific display with common visual elements
- Support for right-to-left languages

### Responsive Approach
- Dynamic canvas sizing based on viewport
- Relative positioning based on screen dimensions
- Centered visualization regardless of screen size
- Scroll-aware UI adjustments for infoBox management

### Animation Management
- Queue-based system for pending animations
- State tracking to prevent conflicts
- Interval cleanup to prevent memory leaks
- Visual feedback during busy states
