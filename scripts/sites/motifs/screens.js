// Motifs of things on a screen. Each is drawn in a 600 x 400 box and takes its colours from a theme.
import { echo, strokes, repeat } from './kit.js';

// A film strip cut in two, the second piece moved along: the edit.
export function film(c) {
  const holes = (x, w) => repeat(Math.floor(w / 34), (i) =>
    `<rect x="${x + 14 + i * 34}" y="124" width="18" height="16" rx="3"/>`
    + `<rect x="${x + 14 + i * 34}" y="260" width="18" height="16" rx="3"/>`);
  const piece = (x, w, frames) => `${echo('rect', `x="${x}" y="110" width="${w}" height="180" rx="6"`, c.fill, c)}
<g fill="${c.plate}">${holes(x, w)}</g>
${frames.map(([fx, col]) => `<rect x="${x + fx}" y="154" width="92" height="92" rx="4" fill="${col}"/>`).join('')}`;
  return `<g transform="rotate(-7 300 200)">${piece(30, 240, [[20, c.acc], [128, c.acc2]])}
<g transform="translate(20 0)">${piece(306, 240, [[20, c.acc2], [128, c.acc]])}</g>
${strokes(c.line, 4, 'M290 80V320', 'stroke-dasharray="2 14" stroke-opacity=".8"')}</g>`;
}

// A terminal with a running ticker of lit dots over the prompt, spelling ZIP.
export function marquee(c) {
  const word = ['1110111011100', '0010010010100', '0100010011100', '1000010010000', '1110111010000'];
  const dot = (on, x, y) => `<circle cx="${130 + x * 28.3}" cy="${142 + y * 26}" r="9.5" `
    + `fill="${on === '1' ? '#E8A63A' : c.fill}" opacity="${on === '1' ? 1 : 0.16}"/>`;
  const dots = word.flatMap((row, y) => [...row].map((on, x) => dot(on, x, y))).join('');
  return `${echo('rect', 'x="84" y="56" width="432" height="288" rx="16"', c.fill, c)}
<circle cx="114" cy="84" r="8" fill="${c.acc2}"/><circle cx="140" cy="84" r="8" fill="${c.acc}"/>
<circle cx="166" cy="84" r="8" fill="${c.dark}" opacity=".35"/>
<rect x="100" y="112" width="400" height="216" rx="8" fill="${c.dark}"/>${dots}
${strokes(c.acc2, 9, 'M124 282l14 12-14 12')}<rect x="156" y="288" width="18" height="20" fill="${c.fill}"/>`;
}

// A page with a pop-up being lifted off it, and its close button.
export const popup = (c) => `<g transform="translate(-14 4)">
${echo('rect', 'x="70" y="70" width="380" height="270" rx="12"', c.fill, c)}
<circle cx="98" cy="96" r="7" fill="${c.dark}" opacity=".35"/><circle cx="120" cy="96" r="7" fill="${c.dark}" opacity=".35"/>
${strokes(c.dark, 9, 'M106 150h190M106 182h250M106 214h220M106 246h250M106 278h140', 'stroke-opacity=".28"')}
<g transform="rotate(9 400 170)">${echo('rect', 'x="290" y="100" width="230" height="150" rx="10"', c.acc2, c)}
${strokes(c.fill, 8, 'M318 150h120M318 178h90', 'stroke-opacity=".7"')}
<circle cx="500" cy="118" r="34" fill="${c.acc}"/>${strokes(c.onAcc, 9, 'M486 104l28 28M514 104l-28 28')}</g>
${strokes(c.line, 6, 'M540 262l32 14M528 292l36 6M546 232l24 22', 'stroke-opacity=".6"')}</g>`;

// A Latin key turned into a Persian one: b becomes be, drawn as strokes so no Arabic font is needed.
export function keys(c) {
  const key = (x, face) => `<rect x="${x}" y="114" width="184" height="184" rx="24" fill="${c.dark}" `
    + `opacity=".45" transform="translate(0 14)"/>${echo('rect', `x="${x}" y="100" width="184" height="184" rx="24"`, face, c)}`;
  return `<g transform="translate(0 11)">${key(42, c.fill)}
${strokes(c.dark, 17, 'M108 142v100M108 210a32 32 0 1 0 64 0a32 32 0 1 0-64 0')}
${strokes(c.line, 10, 'M264 192h64M308 170l22 22-22 22')}
${key(374, c.acc)}${strokes(c.onAcc, 17, 'M404 176Q404 236 450 236H482Q524 236 526 170')}
<circle cx="464" cy="266" r="12" fill="${c.onAcc}"/></g>`;
}

// A web page: heading, picture and text, for a site made for someone.
export const browser = (c) => `${echo('rect', 'x="90" y="56" width="420" height="290" rx="14"', c.fill, c)}
<circle cx="120" cy="84" r="7" fill="${c.acc2}"/><circle cx="142" cy="84" r="7" fill="${c.acc}"/>
<rect x="170" y="76" width="300" height="16" rx="8" fill="${c.dark}" opacity=".12"/>
<rect x="116" y="120" width="170" height="196" rx="4" fill="${c.acc2}"/><circle cx="246" cy="160" r="18" fill="${c.acc}"/>
${strokes(c.dark, 14, 'M312 142h150', 'stroke-opacity=".8"')}
${strokes(c.dark, 8, 'M312 186h170M312 214h150M312 242h170M312 270h110', 'stroke-opacity=".3"')}`;
