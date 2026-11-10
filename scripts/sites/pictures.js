// The two kinds of picture a catalogue card can show: a site's own share picture, made smaller, or
// a plate in the colour of its group, with the initial of the name, when there is no site to take one from.
import sharp from 'sharp';
import { PALETTE, FONT, GRAIN, esc, svg } from '../readme/svg.js';
import { PICTURE } from './paths.js';

const TOLERANCE = 8;
const near = (data, i, colour) => colour.every((value, c) => Math.abs(data[i + c] - value) <= TOLERANCE);

// Some share pictures were shot from a page shorter than the window, so a plain band of another
// colour runs along the bottom (LifeMeter's did). The band is painted in the picture's colour a few
// rows above it, past the blurred seam of a lossy file. A band the colour of the top-left corner is
// the card's own margin and is left alone.
async function paintBottomBand(buffer) {
  const { data, info } = await sharp(buffer).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const at = (x, y) => (y * width + x) * channels;
  const band = [...data.subarray(at(0, height - 1), at(0, height - 1) + 3)];
  const plainRow = (y) => Array.from({ length: width }, (_, x) => x).every((x) => near(data, at(x, y), band));
  let top = height;
  while (top > height / 2 && plainRow(top - 1)) top -= 1;
  if (height - top < height * 0.03 || top <= height / 2 || near(data, 0, band)) return buffer;
  const seam = at(width >> 1, top - 4);
  const above = [...data.subarray(seam, seam + 3)];
  for (let i = at(0, top); i < data.length; i += channels) above.forEach((value, c) => { data[i + c] = value; });
  return sharp(data, { raw: { width, height, channels } }).png().toBuffer();
}

// Top-aligned, because a share picture puts its title and logo at the top; sharp throws on anything
// that is not an image, so an error page saved as a picture stops the run.
export const shrink = async (buffer) =>
  sharp(await paintBottomBand(buffer))
    .resize(PICTURE.width, PICTURE.height, { fit: 'cover', position: 'top' })
    .webp({ quality: 80 })
    .toBuffer();

// The first letter or digit of a name, as a capital: the name itself is set right under the picture.
export const initial = (name) => (name.match(/[\p{L}\p{N}]/u)?.[0] ?? '?').toLocaleUpperCase('da');

// The same size and ratio as the site's own share picture (templates/og-card.html): a plate in the
// group's colour, a ruled frame and the initial, so the card has an edge against the paper of the page.
export function housePicture({ name, ink }, css) {
  if (!PALETTE[ink]) throw new Error(`"${name}" has no colour called "${ink}"`);
  const plate = PALETTE[ink];
  const mark = ink === 'saffron' ? PALETTE.ink : PALETTE.sheet;
  const size = 360;
  const style = `${css}.initial{font:400 ${size}px ${FONT.serif};fill:${mark}}`;
  const frame = (inset, stroke) =>
    `<rect x="${inset}" y="${inset}" width="${1200 - 2 * inset}" height="${630 - 2 * inset}" fill="none" stroke="${mark}" stroke-width="${stroke}" stroke-opacity=".6"/>`;
  const body = `<rect width="1200" height="630" fill="${plate}"/>
<rect width="1200" height="630" filter="url(#grain)"/>
${frame(30, 3)}
${frame(44, 1.5)}
<text class="initial" text-anchor="middle" x="600" y="${315 + size * 0.33}">${esc(initial(name))}</text>`;
  return svg({ w: 1200, h: 630, title: name, css: style, defs: GRAIN, body });
}
