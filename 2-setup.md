# Setting up a React Application

## Application Structure

- JSX is a template language to write HTML in declarative way
- Babel transforms JSX/ES5/6/7 to compatible JavaScript
- JavaScript polyfills fills the Browser gaps
- Webpack bundles sources to Single-Page-App
- Webpack-Dev-Server for development
- HTML/Javascript/CSS interaction via React-DOM
- Component-Oriented Design
  - Stateless **"dumb"** component
  - Stateful **"smart"** component

### Setup

- [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env/)

```bash
npm init -f
npm install react react-dom webpack-cli --save
npm install webpack webpack-dev-server babel-cli babel-core babel-loader babel-polyfill babel-preset-env babel-preset-react babel-preset-stage-0 html-webpack-plugin mini-css-extract-plugin css-loader style-loader --save-dev
```

### Static Server (optional)

```bash
npm install static-server
```

### `webpack.config.js` Webpack Build- and Deployment-Process of React-Applications

- [WebPack Configuration](https://webpack.js.org/configuration/)

```javascript
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const debug = true;

module.exports = {
  target: 'web',
  // devtool: "source-map",
  // mode: "development",
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: __dirname + 'dist',
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    noInfo: true,
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-0'],
          },
        },
      },
    ],
  },
};
```

### Scripts

```json
  "scripts": {
    "dev": "webpack-dev-server -d --progress --hot --port 9090",
    "build": "webpack -p --progress",
    "start": "npm run build && static-server ./build",
    "test": "mocha test --compilers js:babel-core/register --recursive",
    "test:watch": "npm test -- --watch"
  },
```

### HTML Template

```html
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Page Title</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="dist/bundle.js" defer></script>
</head>

<body>
  <div id="root" class="app"></div>
</body>

</html>
```

### JSX/ES2015/ES7 Babel configuration

```json
{
  "presets": ["es2015", "stage-0", "react"]
}
```

## JSX Basics

- Every JSX snippet will transform to JavaScript via Babel
- React uses a **Virtual-DOM** to re(renderer)
- React renders the complete virtual DOM on every state change
- React compares changes between virtual and real DOM and applying only the results
- React evaluates and execute inline JavaScript expressions `{...}` to bind state, events, styles, etc.

```javascript
// React.createElement('h1', null, '...')
render () {
  return (
    <h1>...</h1>
  )
}
```
