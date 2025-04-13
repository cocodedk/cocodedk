/**
 * Cytoscape Accessibility Extensions
 *
 * Enhances the CytoscapeManager with accessibility features
 * No keyboard navigation - only Escape key for closing modals
 */

(function() {
  console.log('[TDD] Initializing accessibility module');

  // Determine the environment (browser vs. Node.js/Jest)
  const isBrowser = typeof window !== 'undefined';
  const CytoscapeManagerRef = isBrowser ? window.CytoscapeManager :
                                        (typeof global !== 'undefined' && global.CytoscapeManager ?
                                         global.CytoscapeManager : null);

  // Wait for CytoscapeManager to be defined
  const checkForDependencies = function() {
    if (!CytoscapeManagerRef) {
      console.log('[TDD] Waiting for CytoscapeManager to be defined...');
      setTimeout(checkForDependencies, 100);
      return;
    }

    console.log('[TDD] CytoscapeManager found, enhancing with accessibility features');
    enhanceWithAccessibility();
  };

  // Main function to add accessibility features
  function enhanceWithAccessibility() {
    // Store the original initialization function
    const originalInitialize = CytoscapeManagerRef.initialize;

    /**
     * Create accessible DOM representation of the graph
     */
    function createAccessibleDOM() {
      let cy;

      // Try different approaches to get the Cytoscape instance
      if (CytoscapeManagerRef.getCytoscapeInstance && typeof CytoscapeManagerRef.getCytoscapeInstance === 'function') {
        cy = CytoscapeManagerRef.getCytoscapeInstance();
      } else if (CytoscapeManagerRef.getInstance && typeof CytoscapeManagerRef.getInstance === 'function') {
        cy = CytoscapeManagerRef.getInstance();
      } else {
        console.error('[TDD] No method to get Cytoscape instance found');
        return null;
      }

      if (!cy) {
        console.log('[TDD] No Cytoscape instance found');
        return null;
      }

      // Create container for accessible elements
      let accessibleContainer = document.getElementById('cy-accessible');
      if (!accessibleContainer) {
        console.log('[TDD] Creating new accessible container');
        accessibleContainer = document.createElement('div');
        accessibleContainer.id = 'cy-accessible';
        accessibleContainer.className = 'visually-hidden';
        accessibleContainer.setAttribute('role', 'application');
        accessibleContainer.setAttribute('aria-label', 'Interactive network graph');
        accessibleContainer.setAttribute('aria-roledescription', 'Network visualization');

        // Add summary of graph content
        const nodeSummary = document.createElement('p');
        nodeSummary.id = 'cy-accessible-summary';
        nodeSummary.setAttribute('role', 'status');
        accessibleContainer.appendChild(nodeSummary);

        try {
          // Add to DOM near Cytoscape container
          if (cy.container() && cy.container().parentNode) {
            console.log('[TDD] Adding to container parent node');
            cy.container().parentNode.appendChild(accessibleContainer);
          } else {
            console.log('[TDD] Adding to document body');
            document.body.appendChild(accessibleContainer);
          }
        } catch (e) {
          console.error('[TDD] Error appending accessible container:', e);
          // Fallback to body
          document.body.appendChild(accessibleContainer);
        }
      }

      // Clear existing content except summary
      const summary = accessibleContainer.querySelector('#cy-accessible-summary');
      accessibleContainer.innerHTML = '';

      if (summary) {
        accessibleContainer.appendChild(summary);
      }

      // Create navigation region
      const navRegion = document.createElement('div');
      navRegion.setAttribute('role', 'navigation');
      navRegion.setAttribute('aria-label', 'Graph navigation');
      accessibleContainer.appendChild(navRegion);

      try {
        // Update summary information
        const nodeCount = cy.nodes().length;
        const edgeCount = cy.edges().length;
        const summaryText = `Graph containing ${nodeCount} nodes and ${edgeCount} connections.`;

        const newSummary = document.createElement('p');
        newSummary.id = 'cy-accessible-summary';
        newSummary.setAttribute('role', 'status');
        newSummary.textContent = summaryText;
        accessibleContainer.replaceChild(newSummary, accessibleContainer.querySelector('#cy-accessible-summary') || document.createElement('div'));

        // Create accessible elements for each node
        cy.nodes().forEach(node => {
          try {
            const nodeElement = document.createElement('div');
            nodeElement.id = `accessible-${node.id()}`;
            nodeElement.setAttribute('role', 'button');
            // Elements are intentionally not keyboard focusable - keyboard navigation removed per requirements
            nodeElement.className = 'accessible-node';

            // Set appropriate ARIA attributes
            const nodeLabel = node.data('label') || node.id();
            const nodeCategory = node.data('category') || 'Node';
            const connections = node.connectedEdges().length;

            nodeElement.setAttribute('aria-label', `${nodeLabel}, ${nodeCategory} node with ${connections} connections`);

            // Set selection state
            if (node.selected()) {
              nodeElement.setAttribute('aria-selected', 'true');
              nodeElement.classList.add('selected');
            }

            // Set special attributes for special nodes
            if (node.data('category') === 'Contact' || node.id() === 'node-Contact') {
              nodeElement.setAttribute('aria-haspopup', 'dialog');
              nodeElement.setAttribute('aria-controls', 'contact-modal');
            }

            // Add to accessible container
            navRegion.appendChild(nodeElement);

            // Only add focus handler for screen reader support
            nodeElement.addEventListener('focus', () => {
              CytoscapeManagerRef.selectNode(node.id());
            });
          } catch (e) {
            console.error(`[TDD] Error creating accessible element for node ${node.id()}:`, e);
          }
        });
      } catch (e) {
        console.error('[TDD] Error building accessible DOM:', e);
      }

      return accessibleContainer;
    }

    /**
     * Update accessibility representation when the graph changes
     */
    function updateAccessibility() {
      return createAccessibleDOM();
    }

    /**
     * Setup Escape key handler for modal closing
     * Note: This is NOT for keyboard navigation of the graph, only for closing modals with Escape key
     */
    function setupEscapeKeyHandler() {
      document.addEventListener('keydown', (event) => {
        // Only handle Escape key
        if (event.key === 'Escape') {
          // Close any open modal
          const ContactModal = isBrowser ? window.ContactModal :
                               (typeof global !== 'undefined' && global.ContactModal ?
                                global.ContactModal : null);

          if (ContactModal && ContactModal.hideModal) {
            ContactModal.hideModal();
          }

          // Clear selection in Cytoscape
          if (CytoscapeManagerRef.clearSelection) {
            CytoscapeManagerRef.clearSelection();
          }
        }
      });
    }

    /**
     * Activate node (simulate click)
     * Note: This is only triggered programmatically, not via keyboard
     */
    function activateNode(node) {
      if (!node) return;

      // Handle Contact node specially
      if (node.data('category') === 'Contact' || node.id() === 'node-Contact') {
        const ContactModal = isBrowser ? window.ContactModal :
                             (typeof global !== 'undefined' && global.ContactModal ?
                              global.ContactModal : null);

        if (ContactModal && ContactModal.showModal) {
          ContactModal.showModal();
        }
      }

      // Announce node activation to screen readers
      announceToScreenReader(`${node.data('label') || node.id()} activated`);
    }

    /**
     * Announce message to screen readers
     */
    function announceToScreenReader(message) {
      let announcer = document.getElementById('cy-sr-announcer');

      if (!announcer) {
        announcer = document.createElement('div');
        announcer.id = 'cy-sr-announcer';
        announcer.className = 'sr-only';
        announcer.setAttribute('aria-live', 'assertive');
        announcer.setAttribute('role', 'status');
        document.body.appendChild(announcer);
      }

      announcer.textContent = '';
      // Use setTimeout to ensure the empty string change is processed before adding new content
      setTimeout(() => {
        announcer.textContent = message;
      }, 50);
    }

    /**
     * Setup modal accessibility
     */
    function setupModalAccessibility() {
      // Ensure modals can be closed with Escape key
      setupEscapeKeyHandler();
    }

    // Override the initialize function to add accessibility features
    CytoscapeManagerRef.initialize = function(containerId) {
      // Call the original initialize function first
      const cy = originalInitialize(containerId);

      if (cy) {
        // Add accessibility features
        createAccessibleDOM();
        setupModalAccessibility();

        console.log('[TDD] Accessibility features added to Cytoscape');
      } else {
        console.error('[TDD] Failed to add accessibility features - no Cytoscape instance');
      }

      // Return the Cytoscape instance
      return cy;
    };

    // Add new accessibility methods to CytoscapeManager
    CytoscapeManagerRef.createAccessibleDOM = createAccessibleDOM;
    CytoscapeManagerRef.updateAccessibility = updateAccessibility;

    // Add CSS for accessibility features
    const style = document.createElement('style');
    style.textContent = `
      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      .accessible-node {
        margin: 8px 0;
        padding: 8px;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 4px;
      }

      .accessible-node.selected {
        background: rgba(0, 119, 204, 0.2);
        border-left: 3px solid #0077cc;
      }
    `;
    document.head.appendChild(style);

    console.log('[TDD] Accessibility module initialized successfully');
  }

  // Start checking for dependencies
  checkForDependencies();

  // For Node.js/Jest environment support
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      // Export functions for testing
      createAccessibleDOM: function() {
        return CytoscapeManagerRef && CytoscapeManagerRef.createAccessibleDOM ?
               CytoscapeManagerRef.createAccessibleDOM() : null;
      },
      updateAccessibility: function() {
        return CytoscapeManagerRef && CytoscapeManagerRef.updateAccessibility ?
               CytoscapeManagerRef.updateAccessibility() : null;
      }
    };
  }
})();
