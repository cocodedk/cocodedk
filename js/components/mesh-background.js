// js/components/mesh-background.js
'use strict';

function hexToRgbStr(hex) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  return r + ',' + g + ',' + b;
}

window.MeshBackground = { init: function () {} };

module.exports = { hexToRgbStr };
