/**
 * Initialize Cytoscape visualization
 *
 * args:
 *   ▸ mainCurrentLanguage: string - current language setting
 *   ▸ lastSelectionTime: number - timestamp of last selection (by reference)
 *   ▸ debounceTimeout: number - debounce timeout in milliseconds
 *   ▸ showNodeDescriptionModal: function - function to show node description modal
 *   ▸ fallbackToLegacy: function - function to fallback to legacy implementation
 * return:
 *   ▸ boolean - true if initialization successful, false otherwise
 * raise:
 *   ▸ Error - if initialization fails
 * test:
 *   ▸ /home/bba/0-projects/cocodedk/js/main/test/initializeCytoscape.test.js
 *   ▸ npm test -- --testPathPattern=initializeCytoscape.test.js
 */
export function initializeCytoscape(mainCurrentLanguage, lastSelectionTime, debounceTimeout, showNodeDescriptionModal, fallbackToLegacy) {
  try {
    //console.log('[TDD] Starting Cytoscape initialization');

    // Check if Cytoscape library is loaded
    if (typeof cytoscape !== 'function') {
      console.error('[TDD] Cytoscape library not found');
      fallbackToLegacy();
      return;
    }

    // Check if CytoscapeManager is available
    if (!window.CytoscapeManager) {
      console.error('[TDD] CytoscapeManager not available');
      fallbackToLegacy();
      return;
    }

    // Check if container exists
    const container = document.getElementById('cy-container');
    if (!container) {
      console.error('[TDD] cy-container element not found');
      fallbackToLegacy();
      return;
    }
    //console.log('[TDD] cy-container found, dimensions:', container.offsetWidth, 'x', container.offsetHeight);

    // Initialize Cytoscape with container
    //console.log('[TDD] Calling CytoscapeManager.initialize()');
    const cy = window.CytoscapeManager.initialize('cy-container');

    if (!cy) {
      console.error('[TDD] Failed to initialize Cytoscape - no instance returned');
      fallbackToLegacy();
      return;
    }

    //console.log('[TDD] Cytoscape instance created successfully');

    // Store the Cytoscape instance for later use
    const cytoscapeInstance = cy;


    // Check for null or invalid nodes
    if (window.nodes && Array.isArray(window.nodes)) {
      //console.log('[TDD] Validating nodes structure...');
      for (let i = 0; i < window.nodes.length; i++) {
        const node = window.nodes[i];
        if (!node) {
          console.error(`[TDD] Node at index ${i} is null or undefined`);
          continue;
        }

        // Check for required fields
        if (!node.id) {
          console.error(`[TDD] Node at index ${i} is missing id property`);
        }
        if (typeof node.x !== 'number' || typeof node.y !== 'number') {
          console.error(`[TDD] Node ${node.id} has invalid position: x=${node.x}, y=${node.y}`);
        }
        if (!node.category) {
          console.error(`[TDD] Node ${node.id} is missing category property`);
        }

        // Check for required label in English at minimum
        if (!node.labels || !node.labels.en) {
          console.error(`[TDD] Node ${node.id} is missing English label`);
        }
      }
    }

    // Check for invalid links
    if (window.links && Array.isArray(window.links)) {
      //console.log('[TDD] Validating links structure...');
      const nodeIds = window.nodes.map(node => node.id);
      for (let i = 0; i < window.links.length; i++) {
        const link = window.links[i];
        if (!Array.isArray(link) || link.length !== 2) {
          console.error(`[TDD] Link at index ${i} has invalid format:`, link);
          continue;
        }

        // Check if source and target nodes exist
        if (!nodeIds.includes(link[0])) {
          console.error(`[TDD] Link source '${link[0]}' at index ${i} does not exist in nodes`);
        }
        if (!nodeIds.includes(link[1])) {
          console.error(`[TDD] Link target '${link[1]}' at index ${i} does not exist in nodes`);
        }
      }
    }

    if (!window.nodes || !window.links || !Array.isArray(window.nodes) || !Array.isArray(window.links)) {
      console.error('[TDD] Nodes or links data not available');
      fallbackToLegacy();
      return;
    }

    // Load graph data
    //console.log('[TDD] Loading graph data');

    // Debug - Check node format before conversion
    if (window.nodes && window.nodes.length > 0) {
      // Try to manually convert nodes to debug any issues
      try {
        const convertedNodes = window.CytoscapeManager.convertNodesToCytoscape(window.nodes);
      } catch (conversionError) {
        console.error('[TDD] Error during node conversion test:', conversionError);
      }
    }

    window.CytoscapeManager.loadNodesJsGraph(window.nodes, window.links, {
      language: mainCurrentLanguage,
      responsive: true
    });
    //console.log('[TDD] Graph data loaded with', window.nodes.length, 'nodes and', window.links.length, 'links');

    // Debug - check if any nodes were actually added to Cytoscape
    const cyInstance = window.CytoscapeManager.getInstance();
    if (cyInstance) {
      const nodeCount = cyInstance.nodes().length;
      //console.log('[TDD] Actual nodes in Cytoscape:', nodeCount);
      if (nodeCount === 0) {
        console.error('[TDD] No nodes were added to Cytoscape instance - checking for errors');
        // Try to manually add a test node
        try {
          cyInstance.add({
            group: 'nodes',
            data: { id: 'test-node', label: 'Test Node' },
            position: { x: 100, y: 100 }
          });
          //console.log('[TDD] Test node added successfully:', cyInstance.nodes().length);

          // Force a relayout and redraw
          cyInstance.layout({ name: 'preset' }).run();
          cyInstance.fit();
          cyInstance.center();
        } catch (nodeError) {
          console.error('[TDD] Error adding test node:', nodeError);
        }
      } else {
        // Ensure nodes are visible
        //console.log('[TDD] Running layout and centering nodes');
        cyInstance.layout({ name: 'preset' }).run();
        cyInstance.fit();
        cyInstance.center();
        //console.log('[TDD] Checking container visibility after layout:', container.style.display, container.style.visibility);
      }
    }

    // Register contact modal handler
    //console.log('[TDD] Registering selection handlers');
    //console.log('Checking ContactModal availability before registering handlers:', typeof ContactModal !== 'undefined' ? 'Available' : 'Not available');
    window.CytoscapeManager.registerSelectionHandlers({
      onNodeSelected: (nodeData) => {
        const currentTime = Date.now();
        if (currentTime - lastSelectionTime.value < debounceTimeout) {
          //console.log('[Debounce] Ignoring rapid successive click on node:', nodeData.id);
          return;
        }
        lastSelectionTime.value = currentTime;
        //console.log('[TDD] Node selected:', nodeData);
        //console.log('Checking ContactModal availability during node selection:', typeof ContactModal !== 'undefined' ? 'Available' : 'Not available');
        showNodeDescriptionModal(nodeData);
      }
    });

    // Apply initial language
    //console.log('[TDD] Setting initial language to', mainCurrentLanguage);
    window.CytoscapeManager.setLanguage(mainCurrentLanguage);

        // Initialize subtle animations
    if (typeof NodeAnimation !== 'undefined' && typeof AnimationPresets !== 'undefined') {
      console.log('[ANIMATION] Initializing subtle node animations');
      console.log('[ANIMATION] NodeAnimation available:', typeof NodeAnimation);
      console.log('[ANIMATION] AnimationPresets available:', typeof AnimationPresets);
      console.log('[ANIMATION] Subtle preset:', AnimationPresets.subtle);
      NodeAnimation.initFromConfig(AnimationPresets.subtle);

      // Set up animation update loop integration with Cytoscape
      let animationFrameCount = 0;
      const updateAnimations = () => {
        if (window.nodes && Array.isArray(window.nodes)) {
          NodeAnimation.updateNodePositions(window.nodes);
          // Update Cytoscape node positions
          const currentCy = window.CytoscapeManager.getInstance();
          if (currentCy) {
            window.nodes.forEach(node => {
              const cyNode = currentCy.getElementById(node.id);
              if (cyNode && cyNode.length > 0) {
                cyNode.position({ x: node.x, y: node.y });
              }
            });
          }

          // Debug log every 60 frames (roughly once per second)
          animationFrameCount++;
          if (animationFrameCount % 60 === 0) {
            console.log('[ANIMATION] Frame', animationFrameCount, 'Node positions:', window.nodes.slice(0, 2).map(n => ({id: n.id, x: n.x, y: n.y})));
          }
        }
        requestAnimationFrame(updateAnimations);
      };
      console.log('[ANIMATION] Starting animation loop');
      requestAnimationFrame(updateAnimations);
    }

    //console.log('[TDD] Cytoscape initialization complete');
    return true;
  } catch (e) {
    console.error('[TDD] Error initializing Cytoscape:', e);
    fallbackToLegacy();
    return false;
  }
}
