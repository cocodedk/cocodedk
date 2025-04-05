# Technical Context

## Technologies Used

### Frontend
- **HTML5**: Structure and canvas element
- **CSS3**: Styling for UI elements and effects
  - Keyframe animations for visual effects
  - CSS transitions for smooth interactions
  - Custom gradients for backgrounds
  - Media queries for responsive design
- **JavaScript**: Core functionality and interactivity
  - Canvas API for rendering
  - DOM manipulation for UI elements
  - Event handling for user interactions
  - ResizeObserver API for tracking element dimensions
  - ES6+ features for clean code organization
  - Interval-based animations for complex effects

### Visual Assets
- Emoji flag icons for language representation
- Matrix-inspired text animations
- CSS gradient backgrounds
- Color-coded node categories

### Development Tools
- Basic text editor / IDE
- Git for version control
- Simple local server for testing
- Browser developer tools for debugging DOM interactions

## Technical Constraints

### Performance
- Must handle rendering of 15+ nodes with connections
- Smooth animations without framerate drops
- Character scrambling animation performance
- Multiple simultaneous CSS and JS animations
- Responsive to window resizing without lag
- Efficient DOM updates for infoBox management
- Memory management for long-running animations

### Browser Compatibility
- Support for modern browsers (Chrome, Firefox, Safari, Edge)
- Fallback for canvas not supported (basic message)
- Responsive design for desktop and mobile devices
- Compatibility with ResizeObserver API
- Support for CSS keyframe animations
- Proper rendering of emoji flags across platforms

### Internationalization
- Support for 11 languages including:
  - Left-to-right: English, Danish, Spanish, French, German, etc.
  - Right-to-left: Arabic, Persian, Urdu
  - Character-based: Chinese, Japanese
  - Complex script: Hindi
- Dynamic language switching with persistent UI state
- Translated node labels in the current language
- Dynamic node resizing based on label text width
- RTL text support in the infoBox prepend system
- Accessible language selection with keyboard navigation

## Development Environment

### Local Setup
- Standard web development environment
- Python simple HTTP server for local testing
- Chrome DevTools for debugging
- Browser extension for additional testing (currently non-functional)

### Deployment
- Static site hosting
- No server-side requirements
- Fast CDN delivery preferred

## Dependencies
- No external JavaScript libraries required
- No build process needed
- No CSS frameworks used
- Native browser APIs only:
  - Canvas
  - ResizeObserver
  - DOM manipulation
  - Interval timers
  - CSS animations
  - Web accessibility API

## Coding Standards
- Vanilla JavaScript using ES6+ features
- Functional approach to UI updates
- Modular code organization with clear responsibilities
- Proper error handling and edge case management
- Console logging for debugging and tracking state changes
- Accessible markup with ARIA attributes
- Mobile-first responsive design
- Performance optimization for animations
