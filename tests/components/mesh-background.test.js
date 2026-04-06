// tests/components/mesh-background.test.js
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

describe('mesh-background', () => {
  const { hexToRgbStr, seedNodes, edgeOpacity, nodeOffset, drawEdges, drawNodes } = require('../../js/components/mesh-background');

  test('infrastructure check', () => {
    expect(true).toBe(true);
  });

  describe('hexToRgbStr', () => {
    test('converts terminal green hex to rgb string', () => {
      expect(hexToRgbStr('#4af626')).toBe('74,246,38');
    });

    test('converts navy blue hex to rgb string', () => {
      expect(hexToRgbStr('#05050f')).toBe('5,5,15');
    });
  });

  describe('seedNodes', () => {
    const layerCfg = { count: 6 };
    const labels = ['MCP', 'AGENT', 'GDPR'];

    test('returns correct node count', () => {
      const nodes = seedNodes(layerCfg, 1000, 800, labels);
      expect(nodes).toHaveLength(6);
    });

    test('nodes have positions within canvas bounds', () => {
      const nodes = seedNodes(layerCfg, 1000, 800, labels);
      nodes.forEach(n => {
        expect(n.x).toBeGreaterThanOrEqual(0);
        expect(n.x).toBeLessThanOrEqual(1000);
        expect(n.y).toBeGreaterThanOrEqual(0);
        expect(n.y).toBeLessThanOrEqual(800);
      });
    });

    test('nodes have velocity within ±0.3', () => {
      const nodes = seedNodes(layerCfg, 1000, 800, labels);
      nodes.forEach(n => {
        expect(Math.abs(n.vx)).toBeLessThanOrEqual(0.3);
        expect(Math.abs(n.vy)).toBeLessThanOrEqual(0.3);
      });
    });

    test('first N nodes get labels from config', () => {
      const nodes = seedNodes(layerCfg, 1000, 800, labels);
      const labelled = nodes.filter(n => n.label !== null);
      expect(labelled).toHaveLength(3);
      expect(labelled.map(n => n.label)).toEqual(['MCP', 'AGENT', 'GDPR']);
    });

    test('remaining nodes have null label', () => {
      const nodes = seedNodes(layerCfg, 1000, 800, labels);
      const unlabelled = nodes.filter(n => n.label === null);
      expect(unlabelled).toHaveLength(3);
    });

    test('returns empty array when count is 0', () => {
      expect(seedNodes({ count: 0 }, 1000, 800, [])).toHaveLength(0);
    });
  });

  describe('edgeOpacity', () => {
    test('returns 0 when distance equals maxDist', () => {
      expect(edgeOpacity(130, 130, 0.42)).toBe(0);
    });

    test('returns 0 when distance exceeds maxDist', () => {
      expect(edgeOpacity(150, 130, 0.42)).toBe(0);
    });

    test('returns max opacity at distance 0', () => {
      expect(edgeOpacity(0, 130, 0.42)).toBeCloseTo(0.42 * 0.55);
    });

    test('returns half max opacity at half maxDist', () => {
      expect(edgeOpacity(65, 130, 0.42)).toBeCloseTo(0.42 * 0.55 * 0.5);
    });
  });

  describe('nodeOffset', () => {
    const layer = { speed: 0.5, mouseStrength: 10 };

    test('scroll moves layer down by speed × scrollY', () => {
      const off = nodeOffset(100, 500, 400, 1000, 800, layer);
      expect(off.oy).toBeCloseTo(-50);
    });

    test('mouse at canvas centre produces zero x offset', () => {
      const off = nodeOffset(0, 500, 400, 1000, 800, layer);
      expect(off.ox).toBeCloseTo(0);
    });

    test('mouse at right edge produces positive x offset', () => {
      const off = nodeOffset(0, 1000, 400, 1000, 800, layer);
      expect(off.ox).toBeCloseTo(5);
    });

    test('mouse at left edge produces negative x offset', () => {
      const off = nodeOffset(0, 0, 400, 1000, 800, layer);
      expect(off.ox).toBeCloseTo(-5);
    });
  });

  describe('drawEdges', () => {
    test('draws a stroke between two nearby nodes', () => {
      const nodes = [
        { x: 0, y: 0, label: null },
        { x: 50, y: 0, label: null },
      ];
      drawEdges(mockCtx, nodes, 0, 0, 130, 0.42, '74,246,38', 0.7);
      expect(mockCtx.beginPath).toHaveBeenCalled();
      expect(mockCtx.moveTo).toHaveBeenCalledWith(0, 0);
      expect(mockCtx.lineTo).toHaveBeenCalledWith(50, 0);
      expect(mockCtx.stroke).toHaveBeenCalled();
    });

    test('does not draw stroke when nodes are beyond maxDist', () => {
      const nodes = [
        { x: 0, y: 0, label: null },
        { x: 200, y: 0, label: null },
      ];
      drawEdges(mockCtx, nodes, 0, 0, 130, 0.42, '74,246,38', 0.7);
      expect(mockCtx.stroke).not.toHaveBeenCalled();
    });

    test('applies offset to node positions', () => {
      const nodes = [
        { x: 10, y: 10, label: null },
        { x: 20, y: 10, label: null },
      ];
      drawEdges(mockCtx, nodes, 5, 3, 130, 0.42, '74,246,38', 0.7);
      expect(mockCtx.moveTo).toHaveBeenCalledWith(15, 13);
      expect(mockCtx.lineTo).toHaveBeenCalledWith(25, 13);
    });

    test('skips duplicate pairs (i < j only)', () => {
      const nodes = [
        { x: 0, y: 0, label: null },
        { x: 10, y: 0, label: null },
      ];
      drawEdges(mockCtx, nodes, 0, 0, 130, 0.42, '74,246,38', 0.7);
      expect(mockCtx.stroke).toHaveBeenCalledTimes(1);
    });
  });

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
});
