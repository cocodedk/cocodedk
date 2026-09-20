const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// The page is one document, kept in pieces so no file outgrows the 200-line limit.
// templates/template.html places each piece with <%= partials.name %>.
const partialsDir = path.join(__dirname, 'templates/partials');
const partials = Object.fromEntries(
  fs.readdirSync(partialsDir)
    .filter((file) => file.endsWith('.html'))
    .map((file) => [path.basename(file, '.html'), fs.readFileSync(path.join(partialsDir, file), 'utf8')])
);

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
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
      templateParameters: { partials },
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
        { from: 'css', to: 'css' },
        { from: 'fonts', to: 'fonts' },
        { from: 'images', to: 'images' },
        // GitHub Pages reads the custom domain from this file in the published output.
        // Without it the domain is dropped on the next deploy.
        { from: 'CNAME', to: 'CNAME' },
        { from: 'llms.txt', to: 'llms.txt' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'sitemap.xml', to: 'sitemap.xml' },
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
