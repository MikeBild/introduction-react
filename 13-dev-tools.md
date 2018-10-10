# Development Tools

## WebPack

- Bundles JavaScript to one file
- Extentions via modules and plugins
- Multiple config files for multiple environments
- Add scripts to `package.json`
  - `"dev": "webpack-dev-server -d --progress --hot --inline --no-info --port 9090"`
  - `"build": "NODE_ENV=production webpack -p --progress --config webpack.config.prod.js"`

### `.webpack.config.js`

```javascript
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: '/build',
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        VERSION: JSON.stringify(require('./package.json').version),
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
};
```

## Babel

- Transpiles ES2015 / ES6 / ES7 / JSX to JavaScript

### `.babelrc`

```json
{
  "presets": ["es2015", "stage-0", "react"]
}
```

## ES-Lint

```bash
npm install eslint eslint-loader babel-eslint eslint-plugin-import eslint-plugin-node eslint-plugin-react eslint-plugin-standard eslint-config-standard eslint-plugin-promise eslint-config-standard-react --save-dev
```

### `.eslintrc`

```json
{
  "parser": "babel-eslint",
  "extends": ["standard", "standard-react"],
  "env": {
    "browser": true
  },
  "rules": {
    "semi": [2, "never"],
    "comma-dangle": [2, "always-multiline"],
    "space-infix-ops": 0,
    "max-len": [2, 300, 2],
    "react/jsx-boolean-value": 0,
    "react/jsx-no-bind": [
      1,
      {
        "allowArrowFunctions": true
      }
    ],
    "jsx-quotes": [2, "prefer-double"]
  }
}
```

### `.webpack.config.js`

```javascript
module: {
  loaders: [
    {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
    {test: /\.js$/, loader: 'eslint-loader', exclude: /node_modules/},
  ],
},
```

## Example

- [Dev-Tools App](examples/dev-tools-app/README.md)
