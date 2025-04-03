# cocode.dk Homepage

An interactive network graph visualization showcasing the services and technologies offered:

## Core Elements
- Central "Software" node connected to various technologies and services
- Nodes for key technologies: Python, Django, Neo4j, AI Integrations
- Nodes for service areas: Cybersecurity, Compliance, Audit
- Additional nodes for unique offerings: Podcast, Vibe Coding

## Interactive Features
- Hover over nodes to see tooltips with node names
- Click on nodes to display detailed information in a side panel
- Dark-themed design with high contrast for readability

## Technical Implementation
- Built using HTML Canvas for rendering
- JavaScript for interactivity and graph visualization
- Responsive design that fills the browser window

## Improvement Tasks (Priority Order)

1. [x] Restructure the node layout:
   - Place "cocode.dk" as the central node
   - Create distinct branches for Software, Cybersecurity, Clients, and Contact
   - Reorganize existing nodes to connect to these main branches
   - Add Contact branch with personal information

2. [x] Ensure the graph is always centered on the page:
   - Add code to center the visualization regardless of window size
   - Implement proper scaling to maintain visibility on different devices

3. [x] Improve node text containment:
   - Resize nodes to properly encompass their text content
   - Ensure all text is fully contained within the circle nodes

4. [x] Add hover effects to nodes:
   - Change node background color on mouseover
   - Adjust text color dynamically to maintain contrast
   - Provide visual feedback to improve user interaction

5. [x] Refactor code for DRY principles:
   - Centralize repeated code into functions
   - Create a consistent node/link data structure
   - Improve variable naming and organization

6. [x] Improve infoBox positioning:
   - Dynamically position the infoBox relative to the clicked node
   - Ensure the infoBox is slightly offset to avoid overlapping with the node
   - Enhance readability and maintain context for the user

7. [x] Dynamic infoBox layering:
   - Maintains original top-right position
   - Automatically moves behind nodes when overlapping central area
   - Uses ResizeObserver to detect size changes
   - Checks overlap with central node position
   - Smooth z-index transitions

8. [ ] Animation stability improvements:
   - Add animation queue system
   - Implement interval cleanup for previous animations
   - Add click debouncing during active animations
   - Create proper animation state management
   - Add visual feedback for click registration
