const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill', 'whatwg-fetch', './src/app.js'],
  output: {
    path:  __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        VERSION: JSON.stringify(require('./package.json').version),
        QUESTIONNAIRE_URL: JSON.stringify('http://example.com'),
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
}