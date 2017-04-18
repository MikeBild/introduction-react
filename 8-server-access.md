# Server-Access

## Fetch

* Using "native" fetch with `babel-polyfill`
* "Register" the polyfill via `require`, `import` or in `webpack.config.js`

```bash
npm install babel-polyfill --save-dev
```

```javascript
module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
};
```

```javascript
fetch('http://localhost:8080/posts')
.then(response => response.json)
.then(data => this.setState({content: data.content}))
.catch(error => this.setState({error: error.message}))
```

## Redux-Thunk

* Async dispatching Redux Action-Creator

## Example

* [Server-Access App](examples/server-access-app/README.md)