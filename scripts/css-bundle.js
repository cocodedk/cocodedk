// The page links one stylesheet: css/*.css joined in cascade order, minified, and named by its content,
// so a change to any of them gets a new name and no visitor keeps a stale copy. It lands in css/ like
// the sources, so the relative url(../fonts/...) in fonts.css still resolves.
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');

// The order is the cascade: tokens and type, the dock, the page, the wider layouts, then the slide.
const CSS_FILES = ['fonts.css', 'base.css', 'dock.css', 'page.css', 'wide.css', 'slide.css'];

function bundleCss(dir, files = CSS_FILES) {
  const paths = files.map((file) => path.join(dir, file));
  const source = paths.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
  // clean-css reports a rule it drops as a warning, not an error, so both stop the build.
  const { styles, errors, warnings } = new CleanCSS().minify(source);
  const problems = [...errors, ...warnings];
  if (problems.length) throw new Error(`css bundle: ${problems.join('; ')}`);
  const hash = crypto.createHash('sha256').update(styles).digest('hex').slice(0, 10);
  return { css: styles, file: `css/site.${hash}.css`, paths };
}

module.exports = { bundleCss, CSS_FILES };
