# CSS

## Using CSS

```bash
npm install style-loader css-loader --save-dev
```

```javascript
import "./style.css";
```

## Using LESS

```bash
npm install less-loader less --save-dev
```

```javascript
import "./style.less";
```

## WebPack CSS extract

[MiniCssExtractPlugin](https://github.com/webpack-contrib/mini-css-extract-plugin)

```bash
npm install --save-dev mini-css-extract-plugin
```

```javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          "css-loader"
        ]
      }
    ]
  }
};
```

## Examples

- [Advanced App](examples/advanced-app/README.md)
