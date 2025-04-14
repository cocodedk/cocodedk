const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    nodes: './js/nodes.js',
    nodeDisplay: './js/node-display.js',
    contactModal: './js/contact-modal.js',

    cytoscapeStylesheet: './js/cytoscape-stylesheet.js',
    cytoscapeEdgeStyles: './js/cytoscape-edge-styles.js',
    cytoscapeAccessibility: './js/cytoscape-accessibility.js',
    cytoscapeEdgeInteractions: './js/cytoscape-edge-interactions.js',

    cytoscapeGraph: './js/cytoscape-graph.js',
    cytoscapeManager: './js/cytoscape-manager.js',
    cytoscapeNodeInteractions: './js/cytoscape-node-interactions.js',
    cytoscapeNodeStyles: './js/cytoscape-node-styles.js',



    animationPresets: './js/animation-presets.js',
    nodeAnimation: './js/node-animation.js',
    main: './js/main.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist',
    clean: true, // Cleans the output directory before emit
  },
  module: {
    rules: [
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
};
