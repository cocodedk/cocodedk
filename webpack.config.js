const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { bundleCss } = require('./scripts/css-bundle.js');

// The page is one document, kept in pieces so no file outgrows the 200-line limit.
// templates/template.html places each piece with <%= partials.name %>.
const partialsDir = path.join(__dirname, 'templates/partials');
const partials = Object.fromEntries(
  fs.readdirSync(partialsDir)
    .filter((file) => file.endsWith('.html'))
    .map((file) => [path.basename(file, '.html'), fs.readFileSync(path.join(partialsDir, file), 'utf8')])
);

module.exports = {
  // mode comes from the command line: npm run build passes production, npm run dev development
  entry: { main: './js/main.js' },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: { loader: 'babel-loader' } },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'templates/template.html',
      // Built per compilation, so the dev server picks up a css change and the page links the new name.
      // cache: false, or a rebuild reuses the old page and drops the stylesheet emitted here.
      cache: false,
      templateParameters: (compilation) => {
        const { css, file, paths } = bundleCss(path.join(__dirname, 'css'));
        compilation.emitAsset(file, new compilation.compiler.webpack.sources.RawSource(css));
        compilation.fileDependencies.addAll(paths);
        return { partials, stylesheet: file };
      },
      inject: 'body',
      scriptLoading: 'defer',
      minify: false,
    }),
    // OG_CARD=1 also emits dist/og-card.html, the source of the share picture. See templates/og-card.html.
    ...(process.env.OG_CARD ? [new HtmlWebpackPlugin({
      template: 'templates/og-card.html',
      filename: 'og-card.html',
      templateParameters: { partials },
      inject: false,
      minify: false,
    })] : []),
    new CopyWebpackPlugin({
      patterns: [
        // the page links the bundle; only the share-picture source links the split files
        ...(process.env.OG_CARD ? [{ from: 'css', to: 'css' }] : []),
        { from: 'fonts', to: 'fonts' },
        { from: 'images', to: 'images' },
        // Pages takes the custom domain from the repository setting when a workflow deploys, so this file is
        // belt and braces. toType matters: a name without an extension is otherwise taken for a folder,
        // and the site shipped a CNAME/ directory for a while.
        { from: 'CNAME', to: 'CNAME', toType: 'file' },
        { from: 'llms.txt', to: 'llms.txt' },
        { from: 'robots.txt', to: 'robots.txt' },
        // every deploy rebuilds the page, so the build date is the page's last change
        {
          from: 'sitemap.xml',
          to: 'sitemap.xml',
          transform: (content) => content.toString().replace('BUILD_DATE', new Date().toISOString().slice(0, 10)),
        },
      ],
    }),
  ],
  devServer: {
    static: { directory: path.join(__dirname, 'dist') },
    compress: true,
    port: 8080,
    hot: true,
    open: true,
  },
};
