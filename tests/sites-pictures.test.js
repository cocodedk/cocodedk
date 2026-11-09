/** @jest-environment node */
import sharp from 'sharp';
import { JSDOM } from 'jsdom';
import { shrink, housePicture } from '../scripts/sites/pictures';
import { picturePath, PICTURE } from '../scripts/sites/paths';

describe('the pictures on the catalogue cards', () => {
  test('should shrink a share picture to 640x336 WebP', async () => {
    const png = await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#fff' } }).png().toBuffer();
    expect(await sharp(await shrink(png)).metadata()).toMatchObject({ format: 'webp', width: PICTURE.width, height: PICTURE.height });
  });

  test('should refuse something that is not a picture', async () => {
    await expect(shrink(Buffer.from('<html>404</html>'))).rejects.toThrow();
  });

  test('should escape the name in a house-made picture', () => {
    expect(housePicture({ name: 'Tom & <Jerry>', ink: 'lapis' }, '')).toContain('Tom &amp; &lt;Jerry&gt;');
  });

  test('should draw a house-made picture as valid SVG', () => {
    expect(() => new JSDOM(housePicture({ name: 'MCP-servere', ink: 'saffron' }, ''), { contentType: 'image/svg+xml' })).not.toThrow();
  });

  test('should refuse a colour the palette does not have', () => {
    expect(() => housePicture({ name: 'Unity', ink: 'mauve' }, '')).toThrow('no colour called "mauve"');
  });

  test('should name a house-made picture .svg', () => {
    expect(picturePath({ id: 'unity', picture: 'house' })).toBe('images/works/unity.svg');
  });

  test('should name a gathered picture .webp', () => {
    expect(picturePath({ id: 'weather' })).toBe('images/works/weather.webp');
  });
});
