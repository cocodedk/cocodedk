/**
 * @jest-environment node
 */
// The live site must ship a production build, whatever NODE_ENV the deploy runner has.
const pkg = require('../package.json');
const config = require('../webpack.config.js');

describe('build mode', () => {
  test('should make npm run build a production build', () => {
    expect(pkg.scripts.build).toMatch(/--mode production\b/);
  });

  test('should keep npm run dev a development build', () => {
    expect(pkg.scripts.dev).toMatch(/--mode development\b/);
  });

  test('should leave the mode to the command line, not NODE_ENV', () => {
    expect(config.mode).toBeUndefined();
  });
});
