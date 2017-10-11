const nodeExternals = require("webpack-node-externals");
const path = require("path");
const srcPath = path.resolve(__dirname, "src");
const distPath = path.resolve(__dirname, "dist");

module.exports = {
  target: "node",
  context: srcPath,
  entry: "./server/index.js",
  output: {
    path: distPath,
    filename: "server.js"
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    modules: ["node_modules", "src"],
    extensions: ["*", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  externals: nodeExternals(),
  devtool: "source-map"
};
