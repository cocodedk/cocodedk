/**
 * @jest-environment node
 */
// The page links one stylesheet: the split sources joined in cascade order, minified, named by content.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { bundleCss, CSS_FILES } = require('../scripts/css-bundle.js');

const fixture = (files) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'css-bundle-'));
  Object.entries(files).forEach(([name, body]) => fs.writeFileSync(path.join(dir, name), body));
  return dir;
};

describe('css bundle', () => {
  test('should keep the files in the order given', () => {
    const dir = fixture({ 'b.css': '.b { color: red; }', 'a.css': '.a { color: blue; }' });
    const { css } = bundleCss(dir, ['b.css', 'a.css']);
    expect(css.indexOf('.b')).toBeLessThan(css.indexOf('.a'));
  });

  test('should minify the joined css', () => {
    const dir = fixture({ 'a.css': '.a {\n  color: blue;\n}\n' });
    expect(bundleCss(dir, ['a.css']).css).toBe('.a{color:#00f}');
  });

  test('should change the file name when the content changes', () => {
    const before = bundleCss(fixture({ 'a.css': '.a{color:red}' }), ['a.css']).file;
    const after = bundleCss(fixture({ 'a.css': '.a{color:green}' }), ['a.css']).file;
    expect(after).not.toBe(before);
  });

  test('should emit beside the sources so ../fonts/ urls still resolve', () => {
    const dir = fixture({ 'a.css': '.a{color:red}' });
    expect(bundleCss(dir, ['a.css']).file).toMatch(/^css\/site\.[0-9a-f]{10}\.css$/);
  });

  test('should fail rather than silently drop a rule clean-css cannot parse', () => {
    const dir = fixture({ 'a.css': '.f{--dir:-1}\n/* a; b */\n.g{--p:#000}' });
    expect(() => bundleCss(dir, ['a.css'])).toThrow(/css bundle/);
  });

  test('should keep every plate rule from the real stylesheets', () => {
    expect(bundleCss(path.join(__dirname, '..', 'css')).css).toContain('.scene--guard{');
  });

  test('should bundle the real stylesheets in cascade order', () => {
    expect(CSS_FILES).toEqual(['fonts.css', 'base.css', 'dock.css', 'page.css', 'wide.css', 'slide.css']);
  });
});
