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

if (typeof window !== 'undefined') {
  window.MeshBackground = { init: function () {} };
}

module.exports = { hexToRgbStr, seedNodes, edgeOpacity, nodeOffset, drawEdges, drawNodes };
