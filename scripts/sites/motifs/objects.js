// Motifs of things in the hand. Each is drawn in a 600 x 400 box and takes its colours from a theme.
// Holes are cut with fill-rule="evenodd" rather than painted in the plate colour, which would show
// as a patch against the plate's grain.
import { echo, strokes } from './kit.js';

// A spanner: a ring at one end, an open jaw at the other, 380 long and centred on 0 0.
const SPANNER = 'M-190 0a36 36 0 1 0 72 0a36 36 0 1 0-72 0zm20 0a16 16 0 1 1 32 0a16 16 0 1 1-32 0z'
  + 'M-124-13H118V13H-124z'
  + 'M187.5-13H130A13 13 0 0 0 130 13H187.5A38 38 0 1 1 187.5-13z';

// A car with a spanner over it: the workshop.
export function workshop(c) {
  const body = 'M104 286C90 286 84 276 86 262L92 228C94 214 104 208 118 206L190 198 236 148'
    + 'C244 140 254 136 266 136H372C386 136 396 142 404 152L444 200 494 208'
    + 'C508 210 516 220 516 234V266C516 278 508 286 496 286Z';
  const wheel = (x) => `<circle cx="${x}" cy="286" r="44" fill="${c.dark}" stroke="${c.fill}" stroke-width="10"/>`
    + `<circle cx="${x}" cy="286" r="17" fill="${c.acc}"/>`;
  return `<g transform="translate(0 16)">
<path d="${SPANNER}" fill="${c.acc}" fill-rule="evenodd" transform="translate(300 88) rotate(-12) scale(.82)"/>
${echo('path', `d="${body}"`, c.acc2, c)}
<path d="M248 158C252 152 258 150 264 150H312V202H202Z" fill="${c.fill}"/>
<path d="M328 150H372C378 150 384 152 388 158L424 202H328Z" fill="${c.fill}"/>
${strokes(c.dark, 6, 'M318 214V270M470 228H500', 'stroke-opacity=".35"')}
<rect x="496" y="220" width="20" height="14" rx="4" fill="${c.acc}"/>
${wheel(196)}${wheel(410)}</g>`;
}

// A back seen from behind, its spine down the middle and the low back warmed: the clinic.
export function back(c) {
  const body = 'M278 116C278 130 276 140 270 146C230 152 176 160 156 186C144 202 142 222 140 250L136 372'
    + 'H464L460 250C458 222 456 202 444 186C424 160 370 152 330 146C324 140 322 130 322 116Z';
  const bones = Array.from({ length: 10 }, (_, i) => {
    const w = 20 + i * 1.8;
    return `<rect x="${(300 - w / 2).toFixed(1)}" y="${152 + i * 21}" width="${w.toFixed(1)}" height="14" rx="7"/>`;
  }).join('');
  return `<g transform="translate(300 214) scale(.92) translate(-300 -222)">
<circle cx="300" cy="76" r="42" fill="${c.fill}"/>
${echo('path', `d="${body}"`, c.fill, c)}
<ellipse cx="300" cy="326" rx="74" ry="34" fill="${c.acc2}" opacity=".3"/>
${strokes(c.dark, 6, 'M182 222C194 270 202 320 200 372M418 222C406 270 398 320 400 372', 'stroke-opacity=".2"')}
${strokes(c.dark, 6, 'M248 196C238 222 244 248 264 260M352 196C362 222 356 248 336 260', 'stroke-opacity=".2"')}
<g fill="${c.acc}">${bones}</g></g>`;
}

// A dove with an olive sprig in its beak: the charity.
export function dove(c) {
  const body = 'M178 246C222 206 296 196 356 186C374 154 410 136 438 148C454 156 460 168 458 180L486 190 '
    + '456 198C442 228 402 254 340 262C278 270 220 266 178 246Z';
  const wing = 'M354 192C356 128 304 70 206 44C214 96 232 152 282 200Z';
  const feathers = 'M226 70C246 74 262 82 276 92M236 108C254 110 270 116 284 126M252 146C266 148 280 152 292 160';
  const tail = 'M190 240L96 206 108 230 84 240 108 252 98 274 196 262Z';
  const leaf = ([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="20" ry="8" transform="rotate(${r} ${x} ${y})"/>`;
  const leaves = [[494, 210, -30], [500, 236, 56], [520, 226, -24], [522, 258, 64], [544, 254, -14]].map(leaf).join('');
  return `<g transform="translate(-17 36)">${echo('path', `d="${tail}"`, c.fill, c)}${echo('path', `d="${body}"`, c.fill, c)}
${echo('path', `d="${wing}"`, c.fill, c)}${strokes(c.dark, 5, feathers, 'stroke-opacity=".22"')}
${strokes(c.acc, 6, 'M478 196C500 212 522 238 540 272')}
<g fill="${c.acc}">${leaves}</g><circle cx="536" cy="282" r="9" fill="${c.acc2}"/>
<circle cx="436" cy="166" r="5" fill="${c.dark}"/></g>`;
}

// Rock, paper and scissors on a ring of arrows: each beats the next.
export function rps(c) {
  const ring = (d, head) => strokes(c.line, 6, `${d}${head}`, 'stroke-opacity=".7"');
  const blade = `${echo('path', 'd="M-12 6L-58-116C-54-128-40-130-34-120L12-2Z"', c.fill, c)}`
    + `${strokes(c.acc, 13, 'M2 4L22 44')}<circle cx="30" cy="70" r="24" fill="none" stroke="${c.acc}" stroke-width="13"/>`;
  const rock = 'M238 134L252 84 296 58 346 70 366 112 348 148 270 152Z';
  return `<g transform="translate(275 222) scale(.92) translate(-300 -236)">
${ring('M375 106A150 150 0 0 1 448 210', 'M455 196L448 210 437 199')}
${ring('M375 366A150 150 0 0 1 225 366', 'M232 381L225 366 241 364')}
${ring('M150 236A150 150 0 0 1 225 106', 'M209 105L225 106 218 121')}
<g transform="translate(0 -18)">${echo('path', `d="${rock}"`, c.acc2, c)}
<path d="M252 84L296 58 302 102Z" fill="${c.fill}" opacity=".35"/>
<path d="M296 58L346 70 302 102Z" fill="${c.fill}" opacity=".18"/>
<path d="M302 102L366 112 348 148Z" fill="${c.dark}" opacity=".22"/>
<path d="M302 102L348 148 270 152Z" fill="${c.dark}" opacity=".12"/></g>
<g transform="rotate(-8 170 311)">${echo('path', 'd="M122 251h72l24 24v96H122z"', c.fill, c)}
<path d="M194 251v24h24" fill="${c.dark}" opacity=".15"/>
${strokes(c.dark, 6, 'M140 298h60M140 322h60M140 346h40', 'stroke-opacity=".5"')}</g>
<g transform="translate(462 300) rotate(28) scale(.86)">${blade}<g transform="scale(-1 1)">${blade}</g>
<circle r="7" fill="${c.dark}"/></g></g>`;
}

// Two people facing each other, their words overlapping where they meet: the couples therapist.
export function talk(c) {
  const left = 'M241.1 159.1A86 56 0 1 0 200.7 146.9L204 186Z';
  const right = 'M363.9 179.2A80 52 0 1 1 401.4 167.8L400 190Z';
  // A head and shoulders, the shoulders leaning in and the head turned a little towards the other.
  const bust = (x, lean, fill) => `<circle cx="${x - lean * 2}" cy="240" r="44" fill="${fill}"/>`
    + `<g transform="translate(${x} 372) skewX(${lean}) translate(${-x} -372)">`
    + echo('path', `d="M${x - 92} 372C${x - 92} 314 ${x - 52} 290 ${x} 290C${x + 52} 290 ${x + 92} 314 ${x + 92} 372Z"`, fill, c)
    + '</g>';
  return `<g transform="translate(0 4)"><defs><clipPath id="talk-meet"><path d="${left}"/></clipPath></defs>
${bust(176, -7, c.fill)}${bust(424, 7, c.acc2)}
${echo('path', `d="${left}"`, c.fill, c)}${echo('path', `d="${right}"`, c.acc2, c)}
<path d="${right}" fill="${c.acc}" clip-path="url(#talk-meet)"/></g>`;
}
