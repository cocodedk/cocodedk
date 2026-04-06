// tests/components/mesh-background-init.test.js
'use strict';

let mockCtx;

function makeMockCtx() {
  return {
    clearRect: jest.fn(),
    fillRect: jest.fn(),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    stroke: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
    fillText: jest.fn(),
    createRadialGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
    strokeStyle: '',
    fillStyle: '',
    lineWidth: 1,
    font: '',
  };
}

beforeAll(() => {
  global.requestAnimationFrame = jest.fn();
  global.ResizeObserver = jest.fn(() => ({ observe: jest.fn(), disconnect: jest.fn() }));
  global.matchMedia = jest.fn(() => ({
    matches: false,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  }));
});

beforeEach(() => {
  jest.clearAllMocks();
  mockCtx = makeMockCtx();
  HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCtx);
});

describe('mesh-background init', () => {
  const { drawNodes } = require('../../js/components/mesh-background');

  describe('drawNodes', () => {
    test('calls arc and fill for each node', () => {
      const nodes = [
        { x: 100, y: 100, label: null },
        { x: 200, y: 200, label: null },
      ];
      drawNodes(mockCtx, nodes, 0, 0, 2.8, 0.42, '74,246,38', 8);
      expect(mockCtx.arc).toHaveBeenCalledTimes(2);
      expect(mockCtx.fill).toHaveBeenCalledTimes(2);
    });

    test('hub node calls fillText with its label', () => {
      const nodes = [{ x: 100, y: 100, label: 'MCP' }];
      drawNodes(mockCtx, nodes, 0, 0, 2.8, 0.42, '74,246,38', 8);
      expect(mockCtx.fillText).toHaveBeenCalledWith('MCP', expect.any(Number), expect.any(Number));
    });

    test('non-hub node does not call fillText', () => {
      const nodes = [{ x: 100, y: 100, label: null }];
      drawNodes(mockCtx, nodes, 0, 0, 2.8, 0.42, '74,246,38', 8);
      expect(mockCtx.fillText).not.toHaveBeenCalled();
    });

    test('applies offset to node position', () => {
      const nodes = [{ x: 100, y: 100, label: null }];
      drawNodes(mockCtx, nodes, 10, 20, 2.8, 0.42, '74,246,38', 8);
      expect(mockCtx.arc).toHaveBeenCalledWith(110, 120, expect.any(Number), 0, Math.PI * 2);
    });

    test('hub node draws glow halo (extra arc call)', () => {
      const nodes = [{ x: 100, y: 100, label: 'AGENT' }];
      drawNodes(mockCtx, nodes, 0, 0, 2.8, 0.42, '74,246,38', 8);
      expect(mockCtx.arc).toHaveBeenCalledTimes(2);
    });
  });

  describe('init', () => {
    let canvas;

    beforeEach(() => {
      document.body.innerHTML = '<canvas id="mesh-bg"></canvas>';
      canvas = document.getElementById('mesh-bg');
      Object.defineProperty(window, 'innerWidth',  { writable: true, configurable: true, value: 1200 });
      Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 800 });
    });

    const cfg = {
      bg: '#0a0a0a',
      glow: null,
      nodeColor: '#4af626',
      labels: ['MCP', 'AGENT'],
      layers: [
        { count: 4, speed: 0.25, mouseStrength: 4,  size: 1.8, opacity: 0.28 },
        { count: 3, speed: 0.50, mouseStrength: 10, size: 2.8, opacity: 0.42 },
        { count: 2, speed: 0.80, mouseStrength: 18, size: 4.0, opacity: 0.62 },
      ],
    };

    test('sets canvas dimensions to window size', () => {
      require('../../js/components/mesh-background').init(cfg);
      expect(canvas.width).toBe(1200);
      expect(canvas.height).toBe(800);
    });

    test('calls getContext with "2d"', () => {
      require('../../js/components/mesh-background').init(cfg);
      expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d');
    });

    test('clears the canvas on first draw', () => {
      require('../../js/components/mesh-background').init(cfg);
      expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 1200, 800);
    });

    test('fills background with config bg color', () => {
      require('../../js/components/mesh-background').init(cfg);
      expect(mockCtx.fillRect).toHaveBeenCalledWith(0, 0, 1200, 800);
    });

    test('does nothing when canvas element not found', () => {
      document.body.innerHTML = '';
      expect(() => require('../../js/components/mesh-background').init(cfg)).not.toThrow();
    });

    test('attaches scroll listener', () => {
      const addSpy = jest.spyOn(window, 'addEventListener');
      require('../../js/components/mesh-background').init(cfg);
      expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });

    test('skips mousemove listener on touch device', () => {
      global.matchMedia = jest.fn(() => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
      const addSpy = jest.spyOn(window, 'addEventListener');
      require('../../js/components/mesh-background').init(cfg);
      const calls = addSpy.mock.calls.map(c => c[0]);
      expect(calls).not.toContain('mousemove');
      global.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
    });

    test('attaches mousemove listener on non-touch device', () => {
      global.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
      const addSpy = jest.spyOn(window, 'addEventListener');
      require('../../js/components/mesh-background').init(cfg);
      const calls = addSpy.mock.calls.map(c => c[0]);
      expect(calls).toContain('mousemove');
    });

    test('does nothing when getContext returns null', () => {
      HTMLCanvasElement.prototype.getContext = jest.fn(() => null);
      expect(() => require('../../js/components/mesh-background').init(cfg)).not.toThrow();
    });
  });
});
