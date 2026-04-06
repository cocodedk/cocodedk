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
  const { hexToRgbStr } = require('../../js/components/mesh-background');

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
});
