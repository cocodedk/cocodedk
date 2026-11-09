/** @jest-environment node */
// The collector runs in Node: jsdom is a library here, not the test environment.
import { readMeta } from '../scripts/sites/meta';

const PAGE = 'https://a.cocode.dk/';

describe('what a page says about itself', () => {
  test('should prefer og:title over <title>', () => {
    expect(readMeta('<title>T</title><meta property="og:title" content="OG">', PAGE).title).toBe('OG');
  });

  test('should fall back to <title> without og:title', () => {
    expect(readMeta('<title> Just a title </title>', PAGE).title).toBe('Just a title');
  });

  test('should prefer og:description over the description meta', () => {
    const html = '<meta name="description" content="plain"><meta property="og:description" content="share">';
    expect(readMeta(html, PAGE).description).toBe('share');
  });

  test('should fall back to the description meta without og:description', () => {
    expect(readMeta('<meta name="description" content="plain">', PAGE).description).toBe('plain');
  });

  test('should decode entities in the description', () => {
    expect(readMeta('<meta name="description" content="Tom &amp; Jerry">', PAGE).description).toBe('Tom & Jerry');
  });

  test('should read the site name', () => {
    expect(readMeta('<meta property="og:site_name" content="Chess Puzzles">', PAGE).siteName).toBe('Chess Puzzles');
  });

  test('should read the language of the page', () => {
    expect(readMeta('<html lang="da"><body></body></html>', PAGE).lang).toBe('da');
  });

  test('should give null for what the page does not say', () => {
    expect(readMeta('<p>hello</p>', PAGE)).toEqual({
      lang: null, title: null, description: null, siteName: null, image: null, alternates: {},
    });
  });

  test('should resolve a relative og:image against the page', () => {
    expect(readMeta('<meta property="og:image" content="og.png">', 'https://a.cocode.dk/da/').image).toBe('https://a.cocode.dk/da/og.png');
  });

  test('should keep an absolute og:image as it is', () => {
    expect(readMeta('<meta property="og:image" content="https://a.cocode.dk/img/share.png">', PAGE).image).toBe('https://a.cocode.dk/img/share.png');
  });

  test('should list alternates by language without x-default', () => {
    const html = '<link rel="alternate" hreflang="fa" href="/fa/"><link rel="alternate" hreflang="x-default" href="/">';
    expect(readMeta(html, PAGE).alternates).toEqual({ fa: 'https://a.cocode.dk/fa/' });
  });

  test('should keep the language tag as the page writes it', () => {
    expect(readMeta('<link rel="alternate" hreflang="zh-Hans" href="/zh/">', PAGE).alternates).toEqual({ 'zh-Hans': 'https://a.cocode.dk/zh/' });
  });

  test('should ignore an alternate link that names no language', () => {
    expect(readMeta('<link rel="alternate" type="application/rss+xml" href="/feed.xml">', PAGE).alternates).toEqual({});
  });
});
