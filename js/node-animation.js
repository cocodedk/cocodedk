/**
 * Node Animation System - Handles animated movement of graph nodes
 *
 * This module provides a self-contained animation system for nodes in the graph visualization.
 * It can be used independently of the main visualization code.
 */

const NodeAnimation = (function() {
  // Private state variables
  const animations = new Map(); // Stores active animations by nodeId
  const initialPositions = new Map(); // Remember original positions of nodes
  let animationFrameId = null;
  let isRunning = false;
  let lastTimestamp = 0;

  // Configuration options with defaults
  const config = {
    defaultDuration: 1000, // Animation duration in ms
    defaultEasing: 'easeInOutQuad',
    autoPlay: true,
    fps: 60 // Target frames per second
  };

  // Easing functions for smoother animations
  const easings = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (--t) * t * t + 1,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInOutElastic: t => {
      const c5 = (2 * Math.PI) / 4.5;
      return t === 0 ? 0 : t === 1 ? 1 :
        t < 0.5 ? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * c5)) / 2 :
        (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * c5)) / 2 + 1;
    }
  };

  // Animation types/patterns
  const animationTypes = {
    // Simple movement from current position to target position
    move: function(node, params, progress, easing) {
      if (!initialPositions.has(node.id)) {
        initialPositions.set(node.id, { x: node.x, y: node.y });
      }

      const initial = initialPositions.get(node.id);
      const easedProgress = easings[easing](progress);

      if (params.x !== undefined) {
        node.x = initial.x + (params.x - initial.x) * easedProgress;
      }

      if (params.y !== undefined) {
        node.y = initial.y + (params.y - initial.y) * easedProgress;
      }
    },

    // Circular orbit around a center point
    orbit: function(node, params, progress, easing) {
      if (!initialPositions.has(node.id)) {
        initialPositions.set(node.id, { x: node.x, y: node.y });

        // Store the initial angle if not provided
        if (params.startAngle === undefined) {
          const dx = node.x - params.centerX;
          const dy = node.y - params.centerY;
          params.startAngle = Math.atan2(dy, dx);
        }
      }

      // Continuous orbit doesn't use progress for completion, just for timing
      const angle = params.startAngle + progress * params.speed * Math.PI * 2;

      node.x = params.centerX + Math.cos(angle) * params.radius;
      node.y = params.centerY + Math.sin(angle) * params.radius;
    },

    // Oscillation along an axis
    oscillate: function(node, params, progress, easing) {
      if (!initialPositions.has(node.id)) {
        initialPositions.set(node.id, { x: node.x, y: node.y });
      }

      const initial = initialPositions.get(node.id);
      // Use sine wave for smooth oscillation, adjusted by frequency
      const wave = Math.sin(progress * params.frequency * Math.PI * 2);

      if (params.axis === 'x' || params.axis === undefined) {
        node.x = initial.x + wave * params.amplitude;
      }

      if (params.axis === 'y' || params.axis === undefined) {
        node.y = initial.y + wave * params.amplitude;
      }
    },

    // Random movement within bounds
    jitter: function(node, params, progress, easing) {
      if (!initialPositions.has(node.id)) {
        initialPositions.set(node.id, { x: node.x, y: node.y });
        // Initialize seed for deterministic jitter if needed
        params._seed = params._seed || Math.random() * 1000;
      }

      const initial = initialPositions.get(node.id);
      const amplitude = params.amplitude || 5;

      // Use pseudo-random based on progress to get smooth but random movement
      const seed = params._seed + progress * 10;
      const randomX = Math.sin(seed) * amplitude;
      const randomY = Math.cos(seed * 1.3) * amplitude;

      node.x = initial.x + randomX;
      node.y = initial.y + randomY;
    }
  };

  /**
   * Register a new animation for a specific node
   */
  function registerAnimation(nodeId, type, params, options = {}) {
    const animation = {
      nodeId,
      type: type || 'move',
      params: params || {},
      startTime: null,
      duration: options.duration || config.defaultDuration,
      easing: options.easing || config.defaultEasing,
      repeat: options.repeat || 0,
      currentRepeat: 0,
      completed: false
    };

    animations.set(nodeId, animation);

    // Auto-start animation if configured
    if (config.autoPlay && !isRunning) {
      start();
    }

    return animation;
  }

  /**
   * Start or resume the animation system
   */
  function start() {
    if (!isRunning && animations.size > 0) {
      isRunning = true;
      lastTimestamp = performance.now();
      animationFrameId = requestAnimationFrame(animationLoop);
    }
    return this;
  }

  /**
   * Stop all animations
   */
  function stop() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    isRunning = false;
    return this;
  }

  /**
   * Reset all animations and return nodes to original positions
   */
  function reset(nodes) {
    stop();

    // Restore original positions
    if (nodes) {
      initialPositions.forEach((pos, id) => {
        const node = nodes.find(n => n.id === id);
        if (node) {
          node.x = pos.x;
          node.y = pos.y;
        }
      });
    }

    // Clear animation state
    animations.clear();
    initialPositions.clear();

    return this;
  }

  /**
   * The main animation loop
   */
  function animationLoop(timestamp) {
    // Calculate delta time since last frame
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    let hasActiveAnimations = false;

    // Process each animation
    animations.forEach((animation, nodeId) => {
      if (animation.completed) return;

      // Initialize start time if this is the first frame
      if (animation.startTime === null) {
        animation.startTime = timestamp;
      }

      // Calculate animation progress
      const elapsed = timestamp - animation.startTime;
      let progress = Math.min(elapsed / animation.duration, 1);

      if (progress >= 1) {
        // Animation completed
        if (animation.repeat === 'infinite' || animation.currentRepeat < animation.repeat) {
          // Restart for next repetition
          animation.startTime = timestamp;
          animation.currentRepeat++;
          progress = 0;
          hasActiveAnimations = true;
        } else {
          animation.completed = true;
        }
      } else {
        hasActiveAnimations = true;
      }

      // Mark as active if any animation is still running
      if (!animation.completed) {
        hasActiveAnimations = true;
      }
    });

    // Stop animation loop if all animations are complete
    if (!hasActiveAnimations) {
      stop();
    } else {
      // Schedule next frame
      animationFrameId = requestAnimationFrame(animationLoop);
    }
  }

  /**
   * Update all node positions based on active animations
   * This is the main integration point with the graph visualization
   */
  function updateNodePositions(nodes) {
    if (!nodes || !Array.isArray(nodes)) return;

    animations.forEach((animation, nodeId) => {
      if (animation.completed) return;

      const node = nodes.find(n => n.id === nodeId);
      if (!node) return;

      // Calculate current progress if animation has started
      if (animation.startTime !== null) {
        const now = performance.now();
        const elapsed = now - animation.startTime;
        const progress = Math.min(elapsed / animation.duration, 1);

        // Apply the animation based on its type
        const animationFn = animationTypes[animation.type];
        if (typeof animationFn === 'function') {
          animationFn(node, animation.params, progress, animation.easing);
        }
      }
    });
  }

  /**
   * Create animations from a configuration object
   */
  function initFromConfig(animationConfig) {
    if (!Array.isArray(animationConfig)) return;

    // Clear existing animations
    animations.clear();

    // Register each animation from config
    animationConfig.forEach(cfg => {
      registerAnimation(
        cfg.nodeId,
        cfg.type,
        cfg, // Pass the entire config as params
        {
          duration: cfg.duration,
          easing: cfg.easing,
          repeat: cfg.repeat
        }
      );
    });

    // Start animations if configured
    if (config.autoPlay) {
      start();
    }

    return this;
  }

  // Return public API
  return {
    register: registerAnimation,
    start: start,
    stop: stop,
    reset: reset,
    updateNodePositions: updateNodePositions,
    initFromConfig: initFromConfig,
    config: config
  };
})();

// Export for ES modules if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NodeAnimation;
}
