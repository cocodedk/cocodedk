# Active Context

## Current Focus
The project is currently focusing on enhancing both the functionality and visual design of the interactive visualization with emphasis on these key areas:

1. Improving language selection and multilingual experience:
   - Implementing a vertical language menu with flag icons for each language
   - Displaying node labels in the selected language instead of fixed English text
   - Ensuring proper translation of tooltips and UI elements

2. Enhancing visual appearance:
   - Adding a dark purple gradient background for better aesthetics
   - Implementing a Matrix-style animated title with green glow effects
   - Adding new service nodes for better representation of offerings

3. Maintaining multilingual functionality:
   - Ensuring language switches update all UI components correctly
   - Supporting translated node labels in the graph visualization
   - Preserving proper display for all supported languages
   - Supporting right-to-left language display

4. Improving code organization by separating CSS and JavaScript from HTML
5. Adding glow effect for selected nodes

## Recent Changes
- Implemented a vertical language selector with flags for 11 languages
- Added accessibility features including keyboard navigation and ARIA attributes
- Updated node labels to dynamically reflect the selected language
- Changed background to purple gradient for better aesthetics
- Removed redundant tooltip system in favor of cleaner UI with glow effects
- Moved CSS styles from inline to external stylesheet (styles.css)
- Moved JavaScript code from inline to external file (main.js)
- Added toggle functionality for language menu on mobile

## Active Decisions
- Using vanilla JavaScript without external libraries for visualization
- Maintaining all code in a single HTML file for simplicity
- Using canvas for rendering instead of SVG or DOM elements
- Supporting 11 languages with embedded translation objects for node labels and descriptions
- Adopting a prepend approach for the infoBox content to show newest entries at the top
- Using emoji flags rather than SVG or image files for better cross-platform support
- Implementing animations via both CSS and JavaScript for different effects

## Current Challenges
- Ensuring smooth performance with multiple animations and frequent DOM updates
- Balancing information density with readability in the infoBox
- Ensuring node labels fit within their bubbles across all languages
- Maintaining consistent appearance across different browsers and devices
- Managing the balance between decorative animations and performance

## Next Priorities
1. Further animation and performance optimizations:
   - Add better debouncing during active animations
   - Consider reducing animation complexity on mobile devices
   - Optimize Matrix animation for better performance

2. Additional UI improvements:
   - Consider adding category headers or grouping
   - Explore adding subtle animations to the graph
   - Investigate more interactive features
