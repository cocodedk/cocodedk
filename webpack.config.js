const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    // Data source for service cards
    nodes: './js/nodes.js',
    contactModal: './js/contact-modal.js',
    
    // New redesign components
    terminal: './js/components/terminal.js',
    serviceCard: './js/components/service-card.js',
    activityCard: './js/components/activity-card.js',
    cache: './js/utils/cache.js',
    githubAPI: './js/api/github.js',
    youtubeAPI: './js/api/youtube.js',
    linkedinAPI: './js/api/linkedin.js',
    
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
        { from: 'css', to: 'css' },
        { from: 'images', to: 'images' }
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
