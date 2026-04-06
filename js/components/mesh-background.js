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

window.MeshBackground = { init: function () {} };

module.exports = { hexToRgbStr, seedNodes };
