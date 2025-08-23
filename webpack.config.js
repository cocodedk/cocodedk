const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    nodes: './js/nodes.js',
    nodeDisplay: './js/node-display.js',
    contactModal: './js/contact-modal.js',

    cytoscapeStylesheet: './js/cytoscape-stylesheet.js',
    cytoscapeEdgeStyles: './js/cytoscape-edge-styles.js',
    cytoscapeAccessibility: './js/cytoscape-accessibility.js',
    cytoscapeEdgeInteractions: './js/cytoscape-edge-interactions.js',

    cytoscapeGraph: './src/ts/cytoscape/cytoscape-graph.ts',

    cytoscapeManager: './js/cytoscape-manager.js',
    cytoscapeNodeInteractions: './js/cytoscape-node-interactions.js',

    // Use TypeScript version for node styles
    cytoscapeNodeStyles: './src/ts/cytoscape/cytoscape-node-styles.ts',

    animationPresets: './js/animation-presets.js',
    nodeAnimation: './js/node-animation.js',
    main: './js/main.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist',
    clean: true, // Cleans the output directory before emit
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/, /tests/],
        use: 'ts-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'templates/template.html',
      inject: 'body',
      scriptLoading: 'defer',
      minify: {
        removeComments: false,
        collapseWhitespace: false
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'css', to: 'css' }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    hot: true,
    open: true,
  },
};
