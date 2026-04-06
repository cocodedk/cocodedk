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
  mockCtx = makeMockCtx();
  HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCtx);
  global.requestAnimationFrame = jest.fn();
  global.ResizeObserver = jest.fn(() => ({ observe: jest.fn(), disconnect: jest.fn() }));
  global.matchMedia = jest.fn(() => ({ matches: false }));
});

beforeEach(() => {
  jest.clearAllMocks();
  mockCtx = makeMockCtx();
  HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCtx);
});

describe('mesh-background', () => {
  test('infrastructure check', () => {
    expect(true).toBe(true);
  });
});
