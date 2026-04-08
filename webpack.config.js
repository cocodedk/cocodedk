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
    campaignOverlay: './js/components/campaign-overlay.js',
    campaignCube: './js/components/campaign-cube.js',
    portfolioCard: './js/components/portfolio-card.js',
    activityCard: './js/components/activity-card.js',
    cache: './js/utils/cache.js',
    linkify: './js/utils/linkify.js',
    githubAPI: './js/api/github.js',
    youtubeAPI: './js/api/youtube.js',
    linkedinAPI: './js/api/linkedin.js',
    fitsShowcase: './js/components/fits-showcase.js',
    fitsShowcaseData: './js/data/fits-showcase-data.js',
    skillsSection: './js/components/skills-section.js',
    skillsData: './js/data/skills-data.js',
    portfolioData: './js/data/portfolio/index.js',
    sectionTranslations: './js/data/section-translations.js',
    campaignTranslations: './js/data/campaign-translations.js',

    floatBadges: './js/components/float-badges.js',
    meshBackground: './js/components/mesh-background.js',
    main: './js/main.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist',
    clean: true, // Cleans the output directory before emit
  },
  resolve: {
    extensions: ['.js'],
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
        { from: 'css', to: 'css' },
        { from: 'images', to: 'images' },
        { from: 'llms.txt', to: 'llms.txt' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'sitemap.xml', to: 'sitemap.xml' }
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
