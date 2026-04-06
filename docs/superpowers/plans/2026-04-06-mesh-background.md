# Mesh Background Parallax — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a living agent-network mesh background with 3-layer scroll+mouse parallax to cocode.dk.

**Architecture:** Vanilla JS canvas engine (`js/components/mesh-background.js`) exposes `window.MeshBackground.init(config)`. Pure helper functions are CommonJS-exported for unit testing. The canvas element is fixed-positioned at z-index -1, pointer-events none, never intercepting clicks.

**Tech Stack:** HTML5 Canvas, requestAnimationFrame, ResizeObserver, Jest + jsdom (tests), Webpack 5 (bundle entry)

> **Note on scope:** This plan covers cocode.dk only. The GitHub.io (cv-generator) deployment is a separate repo and needs its own plan — copy the canvas engine with a different config object.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `js/components/mesh-background.js` | **CREATE** | Canvas engine: pure helpers + draw functions + init |
| `tests/components/mesh-background.test.js` | **CREATE** | All unit tests |
| `templates/template.html` | **EDIT** | Add `<canvas id="mesh-bg">` as first child of body |
| `css/backgrounds.css` | **EDIT** | Add `#mesh-bg` fixed-position rule |
| `webpack.config.js` | **EDIT** | Add `meshBackground` entry |
| `js/main.js` | **EDIT** | Call `MeshBackground.init(config)` on DOMContentLoaded |

---

## Task 1: Test infrastructure + canvas mock

**Files:**
- Create: `tests/components/mesh-background.test.js`

- [ ] **Step 1: Create the test file with canvas mock and empty test**

```js
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
```

- [ ] **Step 2: Run to verify test setup works**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: `PASS tests/components/mesh-background.test.js` with 1 passing test.

---

## Task 2: `hexToRgbStr` pure helper

**Files:**
- Create: `js/components/mesh-background.js` (skeleton only)
- Modify: `tests/components/mesh-background.test.js`

- [ ] **Step 1: Write the failing test**

Add inside `describe('mesh-background', ...)` in the test file:

```js
  const { hexToRgbStr } = require('../../js/components/mesh-background');

  describe('hexToRgbStr', () => {
    test('converts terminal green hex to rgb string', () => {
      expect(hexToRgbStr('#4af626')).toBe('74,246,38');
    });

    test('converts navy blue hex to rgb string', () => {
      expect(hexToRgbStr('#05050f')).toBe('5,5,15');
    });
  });
```

- [ ] **Step 2: Run to verify it fails**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: FAIL — `Cannot find module '../../js/components/mesh-background'`

- [ ] **Step 3: Create the skeleton file with `hexToRgbStr`**

```js
// js/components/mesh-background.js
'use strict';

function hexToRgbStr(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

window.MeshBackground = { init: function () {} };

module.exports = { hexToRgbStr };
```

- [ ] **Step 4: Run to verify tests pass**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: PASS, 2 passing tests.

- [ ] **Step 5: Commit**

```bash
git add js/components/mesh-background.js tests/components/mesh-background.test.js
git commit -m "feat: add mesh-background skeleton with hexToRgbStr"
```

---

## Task 3: `seedNodes` pure helper

**Files:**
- Modify: `js/components/mesh-background.js`
- Modify: `tests/components/mesh-background.test.js`

- [ ] **Step 1: Write the failing tests**

Add to the test file (update the `require` at the top to include `seedNodes`):

```js
  const { hexToRgbStr, seedNodes } = require('../../js/components/mesh-background');
```

Then add:

```js
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
```

- [ ] **Step 2: Run to verify they fail**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: FAIL — `seedNodes is not a function`

- [ ] **Step 3: Implement `seedNodes`**

Add to `js/components/mesh-background.js` (after `hexToRgbStr`):

```js
function seedNodes(layerCfg, w, h, labels) {
  const nodes = [];
  for (let i = 0; i < layerCfg.count; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      label: i < labels.length ? labels[i] : null,
    });
  }
  return nodes;
}
```

Update `module.exports` to add `seedNodes`:

```js
module.exports = { hexToRgbStr, seedNodes };
```

- [ ] **Step 4: Run to verify tests pass**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: PASS, all tests green.

- [ ] **Step 5: Commit**

```bash
git add js/components/mesh-background.js tests/components/mesh-background.test.js
git commit -m "feat: add seedNodes with TDD"
```

---

## Task 4: `edgeOpacity` pure helper

**Files:**
- Modify: `js/components/mesh-background.js`
- Modify: `tests/components/mesh-background.test.js`

- [ ] **Step 1: Write failing tests**

Update the `require` line to include `edgeOpacity`, then add:

```js
  const { hexToRgbStr, seedNodes, edgeOpacity } = require('../../js/components/mesh-background');
```

```js
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
```

- [ ] **Step 2: Run to verify they fail**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: FAIL — `edgeOpacity is not a function`

- [ ] **Step 3: Implement `edgeOpacity`**

Add to `js/components/mesh-background.js`:

```js
function edgeOpacity(dist, maxDist, baseOpacity) {
  if (dist >= maxDist) return 0;
  return baseOpacity * 0.55 * (1 - dist / maxDist);
}
```

Update exports:

```js
module.exports = { hexToRgbStr, seedNodes, edgeOpacity };
```

- [ ] **Step 4: Run to verify tests pass**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add js/components/mesh-background.js tests/components/mesh-background.test.js
git commit -m "feat: add edgeOpacity with TDD"
```

---

## Task 5: `nodeOffset` pure helper

**Files:**
- Modify: `js/components/mesh-background.js`
- Modify: `tests/components/mesh-background.test.js`

- [ ] **Step 1: Write failing tests**

Update require to include `nodeOffset`:

```js
  const { hexToRgbStr, seedNodes, edgeOpacity, nodeOffset } = require('../../js/components/mesh-background');
```

Add:

```js
  describe('nodeOffset', () => {
    const layer = { speed: 0.5, mouseStrength: 10 };

    test('scroll moves layer down by speed × scrollY', () => {
      const off = nodeOffset(100, 500, 400, 1000, 800, layer);
      // scrollY=100, speed=0.5 → oy includes -50
      expect(off.oy).toBeCloseTo(-50);
    });

    test('mouse at canvas centre produces zero x offset', () => {
      const off = nodeOffset(0, 500, 400, 1000, 800, layer);
      expect(off.ox).toBeCloseTo(0);
    });

    test('mouse at right edge produces positive x offset', () => {
      // mouseX=1000, canvasW=1000 → (1000-500)/1000 * 10 = 5
      const off = nodeOffset(0, 1000, 400, 1000, 800, layer);
      expect(off.ox).toBeCloseTo(5);
    });

    test('mouse at left edge produces negative x offset', () => {
      const off = nodeOffset(0, 0, 400, 1000, 800, layer);
      expect(off.ox).toBeCloseTo(-5);
    });
  });
```

- [ ] **Step 2: Run to verify they fail**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: FAIL — `nodeOffset is not a function`

- [ ] **Step 3: Implement `nodeOffset`**

Add to `js/components/mesh-background.js`:

```js
function nodeOffset(scrollY, mouseX, mouseY, canvasW, canvasH, layer) {
  return {
    ox: ((mouseX - canvasW / 2) / canvasW) * layer.mouseStrength,
    oy: ((mouseY - canvasH / 2) / canvasH) * layer.mouseStrength - scrollY * layer.speed,
  };
}
```

Update exports:

```js
module.exports = { hexToRgbStr, seedNodes, edgeOpacity, nodeOffset };
```

- [ ] **Step 4: Run to verify tests pass**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add js/components/mesh-background.js tests/components/mesh-background.test.js
git commit -m "feat: add nodeOffset with TDD"
```

---

## Task 6: `drawEdges` canvas function

**Files:**
- Modify: `js/components/mesh-background.js`
- Modify: `tests/components/mesh-background.test.js`

- [ ] **Step 1: Write failing tests**

Update require to include `drawEdges`:

```js
  const { hexToRgbStr, seedNodes, edgeOpacity, nodeOffset, drawEdges } = require('../../js/components/mesh-background');
```

Add:

```js
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
```

- [ ] **Step 2: Run to verify they fail**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: FAIL — `drawEdges is not a function`

- [ ] **Step 3: Implement `drawEdges`**

Add to `js/components/mesh-background.js`:

```js
function drawEdges(ctx, nodes, ox, oy, maxDist, baseOpacity, rgbStr, lineWidth) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const op = edgeOpacity(dist, maxDist, baseOpacity);
      if (op <= 0) continue;
      ctx.beginPath();
      ctx.moveTo(nodes[i].x + ox, nodes[i].y + oy);
      ctx.lineTo(nodes[j].x + ox, nodes[j].y + oy);
      ctx.strokeStyle = `rgba(${rgbStr},${op})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  }
}
```

Update exports:

```js
module.exports = { hexToRgbStr, seedNodes, edgeOpacity, nodeOffset, drawEdges };
```

- [ ] **Step 4: Run to verify tests pass**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add js/components/mesh-background.js tests/components/mesh-background.test.js
git commit -m "feat: add drawEdges with TDD"
```

---

## Task 7: `drawNodes` canvas function

**Files:**
- Modify: `js/components/mesh-background.js`
- Modify: `tests/components/mesh-background.test.js`

- [ ] **Step 1: Write failing tests**

Update require to include `drawNodes`:

```js
  const { hexToRgbStr, seedNodes, edgeOpacity, nodeOffset, drawEdges, drawNodes } = require('../../js/components/mesh-background');
```

Add:

```js
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
      // arc called with (nx, ny, ...) where nx=110, ny=120
      expect(mockCtx.arc).toHaveBeenCalledWith(110, 120, expect.any(Number), 0, Math.PI * 2);
    });

    test('hub node draws glow halo (extra arc call)', () => {
      const nodes = [{ x: 100, y: 100, label: 'AGENT' }];
      drawNodes(mockCtx, nodes, 0, 0, 2.8, 0.42, '74,246,38', 8);
      // 1 halo arc + 1 node arc = 2 arc calls
      expect(mockCtx.arc).toHaveBeenCalledTimes(2);
    });
  });
```

- [ ] **Step 2: Run to verify they fail**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: FAIL — `drawNodes is not a function`

- [ ] **Step 3: Implement `drawNodes`**

Add to `js/components/mesh-background.js`:

```js
function drawNodes(ctx, nodes, ox, oy, size, opacity, rgbStr, fontSize) {
  nodes.forEach(function (n) {
    var nx = n.x + ox;
    var ny = n.y + oy;
    var sz = n.label ? size * 1.4 : size;
    var op = n.label ? opacity : opacity * 0.7;

    if (n.label) {
      ctx.beginPath();
      ctx.arc(nx, ny, sz * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + rgbStr + ',' + (op * 0.07) + ')';
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(nx, ny, sz, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + rgbStr + ',' + op + ')';
    ctx.fill();

    if (n.label) {
      ctx.font = fontSize + "px 'Courier New',monospace";
      ctx.fillStyle = 'rgba(' + rgbStr + ',' + (op * 0.85) + ')';
      ctx.fillText(n.label, nx + sz + 3, ny + 3);
    }
  });
}
```

Update exports:

```js
module.exports = { hexToRgbStr, seedNodes, edgeOpacity, nodeOffset, drawEdges, drawNodes };
```

- [ ] **Step 4: Run to verify tests pass**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add js/components/mesh-background.js tests/components/mesh-background.test.js
git commit -m "feat: add drawNodes with TDD"
```

---

## Task 8: `init` — wiring it all together

**Files:**
- Modify: `js/components/mesh-background.js`
- Modify: `tests/components/mesh-background.test.js`

- [ ] **Step 1: Write failing tests**

Add to the test file (after all describe blocks, but inside the outer describe):

```js
  describe('init', () => {
    let canvas;

    beforeEach(() => {
      document.body.innerHTML = '<canvas id="mesh-bg"></canvas>';
      canvas = document.getElementById('mesh-bg');
      // Reset window dimensions
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1200 });
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
      global.matchMedia = jest.fn(() => ({ matches: true })); // touch device
      const addSpy = jest.spyOn(window, 'addEventListener');
      require('../../js/components/mesh-background').init(cfg);
      const calls = addSpy.mock.calls.map(c => c[0]);
      expect(calls).not.toContain('mousemove');
      global.matchMedia = jest.fn(() => ({ matches: false })); // reset
    });

    test('attaches mousemove listener on non-touch device', () => {
      global.matchMedia = jest.fn(() => ({ matches: false }));
      const addSpy = jest.spyOn(window, 'addEventListener');
      require('../../js/components/mesh-background').init(cfg);
      const calls = addSpy.mock.calls.map(c => c[0]);
      expect(calls).toContain('mousemove');
    });
  });
```

- [ ] **Step 2: Run to verify they fail**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: FAIL — multiple failures (init doesn't do anything yet).

- [ ] **Step 3: Implement `init` — complete the file**

Replace `js/components/mesh-background.js` with the full implementation:

```js
// js/components/mesh-background.js
'use strict';

function hexToRgbStr(hex) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return r + ',' + g + ',' + b;
}

function seedNodes(layerCfg, w, h, labels) {
  var nodes = [];
  for (var i = 0; i < layerCfg.count; i++) {
    nodes.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      label: i < labels.length ? labels[i] : null,
    });
  }
  return nodes;
}

function edgeOpacity(dist, maxDist, baseOpacity) {
  if (dist >= maxDist) return 0;
  return baseOpacity * 0.55 * (1 - dist / maxDist);
}

function nodeOffset(scrollY, mouseX, mouseY, canvasW, canvasH, layer) {
  return {
    ox: ((mouseX - canvasW / 2) / canvasW) * layer.mouseStrength,
    oy: ((mouseY - canvasH / 2) / canvasH) * layer.mouseStrength - scrollY * layer.speed,
  };
}

function isTouchDevice() {
  return window.matchMedia('(hover: none)').matches;
}

function drawGlow(ctx, w, h, glowColor) {
  if (!glowColor) return;
  var grad = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, w * 0.6);
  grad.addColorStop(0, glowColor);
  grad.addColorStop(1, 'transparent');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

function drawEdges(ctx, nodes, ox, oy, maxDist, baseOpacity, rgbStr, lineWidth) {
  for (var i = 0; i < nodes.length; i++) {
    for (var j = i + 1; j < nodes.length; j++) {
      var dx = nodes[i].x - nodes[j].x;
      var dy = nodes[i].y - nodes[j].y;
      var dist = Math.sqrt(dx * dx + dy * dy);
      var op = edgeOpacity(dist, maxDist, baseOpacity);
      if (op <= 0) continue;
      ctx.beginPath();
      ctx.moveTo(nodes[i].x + ox, nodes[i].y + oy);
      ctx.lineTo(nodes[j].x + ox, nodes[j].y + oy);
      ctx.strokeStyle = 'rgba(' + rgbStr + ',' + op + ')';
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  }
}

function drawNodes(ctx, nodes, ox, oy, size, opacity, rgbStr, fontSize) {
  nodes.forEach(function (n) {
    var nx = n.x + ox;
    var ny = n.y + oy;
    var sz = n.label ? size * 1.4 : size;
    var op = n.label ? opacity : opacity * 0.7;

    if (n.label) {
      ctx.beginPath();
      ctx.arc(nx, ny, sz * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + rgbStr + ',' + (op * 0.07) + ')';
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(nx, ny, sz, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(' + rgbStr + ',' + op + ')';
    ctx.fill();

    if (n.label) {
      ctx.font = fontSize + "px 'Courier New',monospace";
      ctx.fillStyle = 'rgba(' + rgbStr + ',' + (op * 0.85) + ')';
      ctx.fillText(n.label, nx + sz + 3, ny + 3);
    }
  });
}

function init(config) {
  var canvas = document.getElementById('mesh-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var scrollY = 0;
  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;
  var targetMouseX = mouseX;
  var targetMouseY = mouseY;
  var rgbStr = hexToRgbStr(config.nodeColor);
  var thresholds = [130, 110, 90];
  var fontSizes = [7, 8, 9];
  var lineWidths = [0.5, 0.7, 0.9];
  var layers = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    layers = config.layers.map(function (l) {
      return { cfg: l, nodes: seedNodes(l, canvas.width, canvas.height, config.labels) };
    });
  }

  function draw() {
    mouseX += (targetMouseX - mouseX) * 0.06;
    mouseY += (targetMouseY - mouseY) * 0.06;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = config.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGlow(ctx, canvas.width, canvas.height, config.glow);

    layers.forEach(function (layer, i) {
      var off = nodeOffset(scrollY, mouseX, mouseY, canvas.width, canvas.height, layer.cfg);
      layer.nodes.forEach(function (n) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = canvas.width + 20;
        if (n.x > canvas.width + 20) n.x = -20;
        if (n.y < -20) n.y = canvas.height + 20;
        if (n.y > canvas.height + 20) n.y = -20;
      });
      drawEdges(ctx, layer.nodes, off.ox, off.oy, thresholds[i], layer.cfg.opacity, rgbStr, lineWidths[i]);
      drawNodes(ctx, layer.nodes, off.ox, off.oy, layer.cfg.size, layer.cfg.opacity, rgbStr, fontSizes[i]);
    });

    requestAnimationFrame(draw);
  }

  resize();

  window.addEventListener('scroll', function () { scrollY = window.scrollY; });

  if (!isTouchDevice()) {
    window.addEventListener('mousemove', function (e) {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    });
  }

  var ro = new ResizeObserver(resize);
  ro.observe(document.body);

  draw();
}

window.MeshBackground = { init: init };

module.exports = { hexToRgbStr, seedNodes, edgeOpacity, nodeOffset, drawEdges, drawNodes, init };
```

- [ ] **Step 4: Run all tests**

```bash
npx jest tests/components/mesh-background.test.js --no-coverage
```

Expected: PASS — all tests green.

- [ ] **Step 5: Check file length**

```bash
wc -l js/components/mesh-background.js
```

Expected: ≤ 200 lines.

- [ ] **Step 6: Commit**

```bash
git add js/components/mesh-background.js tests/components/mesh-background.test.js
git commit -m "feat: implement mesh-background canvas engine with full TDD"
```

---

## Task 9: Wire up template, CSS, and webpack

**Files:**
- Modify: `templates/template.html`
- Modify: `css/backgrounds.css`
- Modify: `webpack.config.js`

- [ ] **Step 1: Add canvas element to template**

In `templates/template.html`, add as the **first child of `<body>`** (before the existing `.header-container` div):

```html
<body>
  <canvas id="mesh-bg" aria-hidden="true"></canvas>
  <div class="header-container">
```

- [ ] **Step 2: Add CSS rule for canvas positioning**

In `css/backgrounds.css`, append after the existing `html, body` rule:

```css
#mesh-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  display: block;
}
```

- [ ] **Step 3: Add webpack entry**

In `webpack.config.js`, add to the `entry` object (after the `main` entry):

```js
    meshBackground: './js/components/mesh-background.js',
```

- [ ] **Step 4: Verify build succeeds**

```bash
npm run build 2>&1 | tail -20
```

Expected: webpack build completes with no errors. `meshBackground.bundle.js` appears in `dist/`.

- [ ] **Step 5: Commit**

```bash
git add templates/template.html css/backgrounds.css webpack.config.js
git commit -m "feat: wire mesh-background canvas into template, CSS, and webpack"
```

---

## Task 10: Initialize from main.js

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Add the config constant and init call**

In `js/main.js`, inside the `document.addEventListener('DOMContentLoaded', function() {` block, after the terminal init block (around line 94), add:

```js
  // Initialize mesh background
  if (window.MeshBackground && typeof window.MeshBackground.init === 'function') {
    window.MeshBackground.init({
      bg: '#0a0a0a',
      glow: null,
      nodeColor: '#4af626',
      labels: ['MCP', 'AGENT', 'GDPR', 'NIS2', 'DORA', 'WORKFLOW'],
      layers: [
        { count: 8, speed: 0.25, mouseStrength: 4,  size: 1.8, opacity: 0.28 },
        { count: 6, speed: 0.50, mouseStrength: 10, size: 2.8, opacity: 0.42 },
        { count: 4, speed: 0.80, mouseStrength: 18, size: 4.0, opacity: 0.62 },
      ],
    });
  }
```

- [ ] **Step 2: Run the full test suite**

```bash
npm test -- --no-coverage
```

Expected: all tests pass, no regressions.

- [ ] **Step 3: Run the dev server and visually verify**

```bash
npm run dev
```

Open http://localhost:8080 in a browser. Verify:
- [ ] Green mesh nodes visible behind all content
- [ ] Hub nodes show labels (MCP, AGENT, GDPR, NIS2, DORA, WORKFLOW)
- [ ] Moving the mouse shifts the layers
- [ ] Scrolling down moves layers at different speeds
- [ ] Content (header, hero text, buttons) is fully readable and clickable

- [ ] **Step 4: Commit**

```bash
git add js/main.js
git commit -m "feat: initialize MeshBackground from main.js on DOMContentLoaded"
```

---

## Task 11: Add `.superpowers/` to .gitignore

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Check if already present**

```bash
grep -c 'superpowers' .gitignore || echo "not present"
```

- [ ] **Step 2: Add if missing**

If not present, append to `.gitignore`:

```
.superpowers/
```

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "chore: ignore .superpowers/ brainstorm artefacts"
```

---

## Done

All tests should pass: `npm test -- --no-coverage`

Line length check: `npm run lint:length`

The GitHub.io (cv-generator) deployment is a **separate plan** — copy `js/components/mesh-background.js` into that repo with:
- `bg: '#05050f'`
- `glow: 'rgba(20, 50, 200, 0.18)'`
- `labels: ['CV', 'SKILLS', 'EXPERIENCE', 'PROJECTS', 'CONTACT']`
