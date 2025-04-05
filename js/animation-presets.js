/**
 * Node Animation Presets
 *
 * This file provides reusable animation configurations
 * that can be easily applied to the graph visualization.
 */

const AnimationPresets = {
  /**
   * Subtle animations for a "living" graph
   */
  subtle: [
    {
      nodeId: 'cocode.dk',
      type: 'jitter',
      amplitude: 2,
      repeat: 'infinite',
      duration: 5000
    },
    {
      nodeId: 'Software',
      type: 'oscillate',
      axis: 'y',
      amplitude: 5,
      frequency: 0.3,
      repeat: 'infinite',
      duration: 4000
    },
    {
      nodeId: 'Cybersecurity',
      type: 'oscillate',
      axis: 'y',
      amplitude: 5,
      frequency: 0.3,
      repeat: 'infinite',
      duration: 4500, // Slightly different timing for visual interest
      easing: 'easeInOutQuad'
    },
    {
      nodeId: 'Clients',
      type: 'oscillate',
      axis: 'x',
      amplitude: 4,
      frequency: 0.2,
      repeat: 'infinite',
      duration: 5000
    },
    {
      nodeId: 'Contact',
      type: 'oscillate',
      axis: 'x',
      amplitude: 4,
      frequency: 0.2,
      repeat: 'infinite',
      duration: 5500 // Slightly different timing
    }
  ],

  /**
   * Interactive mode - animations triggered by interaction
   * Designed to use with click/hover events
   */
  interactive: {
    // Movement when clicking a node
    clickExpand: function(nodeId) {
      return {
        nodeId: nodeId,
        type: 'move',
        x: '+20', // Relative movement
        y: '+0',
        duration: 300,
        easing: 'easeOutQuad',
        repeat: 0
      };
    },

    // Movement when hovering a node
    hoverPulse: function(nodeId) {
      return {
        nodeId: nodeId,
        type: 'jitter',
        amplitude: 1.5,
        duration: 1000,
        repeat: 3,
        easing: 'easeInOutQuad'
      };
    }
  },

  /**
   * Showcase mode - more pronounced animations for demonstrations
   */
  showcase: [
    {
      nodeId: 'cocode.dk',
      type: 'orbit',
      centerX: 'center', // Special value to be interpreted as canvas center
      centerY: 'center',
      radius: 30,
      speed: 0.1,
      repeat: 'infinite',
      duration: 12000
    },
    {
      nodeId: 'Software',
      type: 'orbit',
      centerX: 'center',
      centerY: 'center',
      radius: 80,
      speed: 0.15,
      startAngle: 1.5, // Different starting position
      repeat: 'infinite',
      duration: 12000
    },
    {
      nodeId: 'Cybersecurity',
      type: 'orbit',
      centerX: 'center',
      centerY: 'center',
      radius: 80,
      speed: 0.15,
      startAngle: 4.7, // Different starting position
      repeat: 'infinite',
      duration: 12000
    },
    {
      nodeId: 'Clients',
      type: 'orbit',
      centerX: 'center',
      centerY: 'center',
      radius: 80,
      speed: 0.15,
      startAngle: 0, // Different starting position
      repeat: 'infinite',
      duration: 12000
    },
    {
      nodeId: 'Contact',
      type: 'orbit',
      centerX: 'center',
      centerY: 'center',
      radius: 80,
      speed: 0.15,
      startAngle: 3.14, // Different starting position
      repeat: 'infinite',
      duration: 12000
    }
  ],

  /**
   * Introductory animation - suitable for when page first loads
   */
  intro: [
    {
      nodeId: 'cocode.dk',
      type: 'move',
      x: '+0', // Start from current position
      y: '-50', // Move up
      duration: 1000,
      easing: 'easeOutElastic',
      repeat: 0
    },
    {
      nodeId: 'Software',
      type: 'move',
      x: '+0',
      y: '-70',
      duration: 1000,
      easing: 'easeOutElastic',
      delay: 100, // Staggered animation
      repeat: 0
    },
    {
      nodeId: 'Cybersecurity',
      type: 'move',
      x: '+0',
      y: '+70',
      duration: 1000,
      easing: 'easeOutElastic',
      delay: 200,
      repeat: 0
    },
    {
      nodeId: 'Clients',
      type: 'move',
      x: '+70',
      y: '+0',
      duration: 1000,
      easing: 'easeOutElastic',
      delay: 300,
      repeat: 0
    },
    {
      nodeId: 'Contact',
      type: 'move',
      x: '-70',
      y: '+0',
      duration: 1000,
      easing: 'easeOutElastic',
      delay: 400,
      repeat: 0
    }
  ]
};

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationPresets;
}
