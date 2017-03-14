# Setting up a React Application

## Application Structure

* JSX is a template language to write HTML in declarative way
* Babel transforms JSX/ES5/6/7 to compatible JavaScript
* JavaScript polyfills fills the Browser gaps
* Webpack bundles sources to Single-Page-App
* Webpack-Dev-Server for development
* HTML/Javascript/CSS interaction via React-DOM
* Component-Oriented Design
  * Stateless __"dumb"__ component
  * Stateful __"smart"__ component

### Setup

```bash
npm init
npm install react react-dom --save
npm install webpack webpack-dev-server babel-cli babel-core babel-loader babel-polyfill babel-preset-es2015 babel-preset-react babel-preset-stage-0 html-webpack-plugin css-loader style-loader --save-dev
```

### `webpack.config.js` Webpack Build- and Deployment-Process of React-Applications

```javascript
const webpack = require('webpack');

module.exports = {
  entry: './app.js',
  output: {
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
};
```

### JSX/ES2015/ES7 Babel configuration

```json
{
  "presets": [
    "es2015",
    "stage-0",
    "react"
  ]
}
```

## JSX Basics

* Every JSX snippet will transform to JavaScript via Babel/Webpack
* React uses a __Virtual-DOM__ to re(renderer) fast
* React renders the complete virtual DOM on every state change
* React compares changes between virtual and real DOM and applying only the results
* React evaluates and execute inline JavaScript expressions `{...}` to bind state, events, styles, etc.

```javascript
// React.createElement('h1', null, '...')
render () {
  return (
    <h1>...</h1>
  )
}
```
