// js/components/mesh-background.js
'use strict';

function hexToRgbStr(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

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

function drawNodes(ctx, nodes, ox, oy, size, opacity, rgbStr, fontSize) {
  nodes.forEach(function (n) {
    const nx = n.x + ox;
    const ny = n.y + oy;
    const sz = n.label ? size * 1.4 : size;
    const op = n.label ? opacity : opacity * 0.7;

    if (n.label) {
      ctx.beginPath();
      ctx.arc(nx, ny, sz * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgbStr},${op * 0.07})`;
      ctx.fill();
    }

    ctx.beginPath();
    ctx.arc(nx, ny, sz, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${rgbStr},${op})`;
    ctx.fill();

    if (n.label) {
      ctx.font = `${fontSize}px 'Courier New',monospace`;
      ctx.fillStyle = `rgba(${rgbStr},${op * 0.85})`;
      ctx.fillText(n.label, nx + sz + 3, ny + 3);
    }
  });
}

function init(config) {
  const canvas = document.getElementById('mesh-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const rgbStr = hexToRgbStr(config.nodeColor);
  const thresholds = [130, 110, 90];
  const fontSizes = [7, 8, 9];
  const lineWidths = [0.5, 0.7, 0.9];

  let scrollY = 0;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;
  let layers = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    layers = config.layers.map(l => ({
      cfg: l,
      nodes: seedNodes(l, canvas.width, canvas.height, config.labels),
    }));
  }

  function draw() {
    mouseX += (targetMouseX - mouseX) * 0.06;
    mouseY += (targetMouseY - mouseY) * 0.06;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = config.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (config.glow) {
      const grad = ctx.createRadialGradient(
        canvas.width * 0.5, canvas.height * 0.4, 0,
        canvas.width * 0.5, canvas.height * 0.4, canvas.width * 0.6
      );
      grad.addColorStop(0, config.glow);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    layers.forEach(function (layer, i) {
      const off = nodeOffset(scrollY, mouseX, mouseY, canvas.width, canvas.height, layer.cfg);
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

  if (!window.matchMedia('(hover: none)').matches) {
    window.addEventListener('mousemove', function (e) {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    });
  }

  const ro = new ResizeObserver(resize);
  ro.observe(document.body);

  draw();
}

if (typeof window !== 'undefined') {
  window.MeshBackground = { init };
}

module.exports = { hexToRgbStr, seedNodes, edgeOpacity, nodeOffset, drawEdges, drawNodes, init };
