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
  const { hexToRgbStr, seedNodes } = require('../../js/components/mesh-background');

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
});
