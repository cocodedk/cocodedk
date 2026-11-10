/** @jest-environment node */
import sharp from 'sharp';
import { JSDOM } from 'jsdom';
import { shrink, housePicture } from '../scripts/sites/pictures';
import { MOTIFS } from '../scripts/sites/motifs/index';
import { picturePath, PICTURE } from '../scripts/sites/paths';
import { PALETTE } from '../scripts/readme/svg';

// A 1200x630 picture of one colour with a band of another along the bottom.
const banded = (body, band, height) => sharp({ create: { width: 1200, height: 630, channels: 3, background: body } })
  .composite([{ input: { create: { width: 1200, height, channels: 3, background: band } }, top: 630 - height, left: 0 }])
  .png().toBuffer();
const bottomPixel = async (webp) => {
  const { data, info } = await sharp(webp).raw().toBuffer({ resolveWithObject: true });
  return data[((info.height - 1) * info.width + info.width / 2) * info.channels];
};

describe('the pictures on the catalogue cards', () => {
  test('should shrink a share picture to 640x336 WebP', async () => {
    const png = await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#fff' } }).png().toBuffer();
    expect(await sharp(await shrink(png)).metadata()).toMatchObject({ format: 'webp', width: PICTURE.width, height: PICTURE.height });
  });

  test('should paint over a plain band that a share picture has along its bottom', async () => {
    expect(await bottomPixel(await shrink(await banded('#16100a', '#ffffff', 87)))).toBeLessThan(40);
  });

  test('should keep a bottom margin that has the colour of the card itself', async () => {
    expect(await bottomPixel(await shrink(await banded('#ffffff', '#ffffff', 87)))).toBeGreaterThan(240);
  });

  test('should refuse something that is not a picture', async () => {
    await expect(shrink(Buffer.from('<html>404</html>'))).rejects.toThrow();
  });

  test('should escape the name in a house-made picture', () => {
    expect(housePicture({ name: 'Tom & <Jerry>', ink: 'lapis' })).toContain('Tom &amp; &lt;Jerry&gt;');
  });

  test('should draw a house-made picture as valid SVG', () => {
    expect(() => new JSDOM(housePicture({ name: 'MCP-servere', ink: 'saffron' }), { contentType: 'image/svg+xml' })).not.toThrow();
  });

  test('should draw a house-made picture on a plate in the colour of its group', () => {
    expect(housePicture({ name: 'Unity', ink: 'lapis' })).toContain(`<rect width="1200" height="630" fill="${PALETTE.lapis}"/>`);
  });

  test('should set no text but the title in a house-made picture', () => {
    expect(housePicture({ name: 'Unity', ink: 'ink', motif: 'dove' })).not.toContain('<text');
  });

  test('should draw the fallback motif for an entry that names none', () => {
    expect(housePicture({ name: 'Unity', ink: 'ink' })).toBe(housePicture({ name: 'Unity', ink: 'ink', motif: 'shapes' }));
  });

  test('should draw the motif an entry names', () => {
    expect(housePicture({ name: 'Unity', ink: 'ink', motif: 'dove' })).not.toBe(housePicture({ name: 'Unity', ink: 'ink' }));
  });

  test('should refuse a motif the library does not have', () => {
    expect(() => housePicture({ name: 'Unity', ink: 'ink', motif: 'kite' })).toThrow('no motif called "kite"');
  });

  test('should have a drawing of two people talking for the therapist', () => {
    expect(housePicture({ name: 'LP Terapi', ink: 'ink', motif: 'talk' })).not.toBe(housePicture({ name: 'LP Terapi', ink: 'ink' }));
  });

  test.each(Object.keys(MOTIFS))('should draw the %s motif as valid SVG on every plate', (motif) => {
    const drawn = ['ink', 'saffron', 'lapis'].map((ink) => housePicture({ name: motif, ink, motif }));
    expect(() => drawn.forEach((s) => new JSDOM(s, { contentType: 'image/svg+xml' }))).not.toThrow();
  });

  test('should refuse a colour the palette does not have', () => {
    expect(() => housePicture({ name: 'Unity', ink: 'mauve' })).toThrow('no colour called "mauve"');
  });

  test('should name a house-made picture .svg', () => {
    expect(picturePath({ id: 'unity', picture: 'house' })).toBe('images/works/unity.svg');
  });

  test('should name a gathered picture .webp', () => {
    expect(picturePath({ id: 'weather' })).toBe('images/works/weather.webp');
  });
});
