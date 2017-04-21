const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', 'whatwg-fetch', './src/app.js'],
  output: {
    path:  __dirname + '/build',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
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
        NODE_ENV: JSON.stringify('development'),
        VERSION: JSON.stringify(require('./package.json').version),
        QUESTIONNAIRE_URL: JSON.stringify('http://example.com'),
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
}