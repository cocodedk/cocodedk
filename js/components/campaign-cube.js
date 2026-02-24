/* 3D Cube animation: morphs hexagon -> cube -> hexagon, pulses */

let animId = null;

// Hexagon vertices (flat, centered at 0,0)
const HEX = [
  [0, -1], [0.866, -0.5], [0.866, 0.5],
  [0, 1], [-0.866, 0.5], [-0.866, -0.5]
];

// Cube vertices (8 corners of a unit cube centered at origin)
const CUBE = [
  [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
  [-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]
];

const EDGES = [
  [0,1],[1,2],[2,3],[3,0],
  [4,5],[5,6],[6,7],[7,4],
  [0,4],[1,5],[2,6],[3,7]
];

// Faces as quad indices + color
const FACES = [
  { verts: [0,1,2,3], color: '#16a34a' },
  { verts: [4,5,6,7], color: '#4ade80' },
  { verts: [0,1,5,4], color: '#22c55e' },
  { verts: [2,3,7,6], color: '#15803d' },
  { verts: [0,3,7,4], color: '#86efac' },
  { verts: [1,2,6,5], color: '#166534' }
];

function rotateY(v, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0]*c + v[2]*s, v[1], -v[0]*s + v[2]*c];
}

function rotateX(v, a) {
  const c = Math.cos(a), s = Math.sin(a);
  return [v[0], v[1]*c - v[2]*s, v[1]*s + v[2]*c];
}

function project(v, cx, cy, scale) {
  const z = v[2] || 0;
  const f = 6 / (6 + z * 0.3); // gentle perspective
  return [cx + v[0] * scale * f, cy + v[1] * scale * f, z];
}

function lerp(a, b, t) { return a + (b - a) * t; }

function drawFrame(ctx, w, h, t) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2, cy = h / 2;

  // Morph cycle: 0-0.4 hex, 0.4-0.5 morph to cube, 0.5-0.9 cube, 0.9-1 morph to hex
  const cycle = (t * 0.12) % 1;
  let morph;
  if (cycle < 0.4) morph = 0;
  else if (cycle < 0.5) morph = (cycle - 0.4) / 0.1;
  else if (cycle < 0.9) morph = 1;
  else morph = 1 - (cycle - 0.9) / 0.1;

  // Smooth easing
  morph = morph * morph * (3 - 2 * morph);

  // Pulse: breathe in scale
  const pulse = 1 + 0.08 * Math.sin(t * 2);
  const baseScale = 28 * pulse;

  // Rotation: steady Y spin, fixed gentle X tilt
  const ry = t * 0.6;
  const rx = -0.35;

  if (morph < 0.01) {
    // Draw flat hexagon
    drawHexagon(ctx, cx, cy, baseScale, ry, t);
  } else if (morph > 0.99) {
    // Draw full cube
    drawCube(ctx, cx, cy, baseScale, rx, ry);
  } else {
    // Morphing: interpolate between hex and cube
    drawMorph(ctx, cx, cy, baseScale, rx, ry, morph);
  }
}

function drawHexagon(ctx, cx, cy, scale, ry, t) {
  const pulse = scale;
  const pts = HEX.map(([x, y]) => {
    let v = [x * 1.2, y * 1.2, 0];
    v = rotateY(v, ry);
    return project(v, cx, cy, pulse);
  });

  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.closePath();
  ctx.fillStyle = '#22c55e';
  ctx.globalAlpha = 0.3 + 0.1 * Math.sin(t * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = '#4ade80';
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawCube(ctx, cx, cy, scale, rx, ry) {
  const transformed = CUBE.map(v => {
    let r = rotateY(v, ry);
    r = rotateX(r, rx);
    return r;
  });

  // Sort faces by average z (painter's algorithm)
  const sorted = FACES.map(f => {
    const avgZ = f.verts.reduce((s, i) => s + transformed[i][2], 0) / 4;
    return { ...f, avgZ };
  }).sort((a, b) => a.avgZ - b.avgZ);

  sorted.forEach(face => {
    const pts = face.verts.map(i => project(transformed[i], cx, cy, scale));
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    ctx.fillStyle = face.color;
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
}

function drawMorph(ctx, cx, cy, scale, rx, ry, morph) {
  // Interpolate cube vertices with slight collapse toward center for low morph
  const transformed = CUBE.map(v => {
    const m = v.map(c => c * morph);
    let r = rotateY(m, ry);
    r = rotateX(r, rx);
    return r;
  });

  const sorted = FACES.map(f => {
    const avgZ = f.verts.reduce((s, i) => s + transformed[i][2], 0) / 4;
    return { ...f, avgZ };
  }).sort((a, b) => a.avgZ - b.avgZ);

  sorted.forEach(face => {
    const pts = face.verts.map(i => project(transformed[i], cx, cy, scale));
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    ctx.globalAlpha = lerp(0.4, 1, morph);
    ctx.fillStyle = face.color;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = lerp(0, 1, morph) > 0.5 ? '#000' : '#4ade80';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  });
}

function start() {
  const canvas = document.querySelector('.campaign-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const t0 = performance.now() / 1000;

  function loop() {
    const t = performance.now() / 1000 - t0;
    drawFrame(ctx, w, h, t);
    animId = requestAnimationFrame(loop);
  }
  animId = requestAnimationFrame(loop);
}

function stop() {
  if (animId) { cancelAnimationFrame(animId); animId = null; }
}

window.CampaignCube = { start, stop };
