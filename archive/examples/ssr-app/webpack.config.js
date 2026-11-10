module.exports = {
  entry: './client/App.js',
  output: {
    path: __dirname,
    filename: 'server/statics/bundle.js',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
  devtool: 'source-map',
};
