# Testing React-Application

## Goods and Bads

![Test Pyramid](test-pyramid.png)

## Classifications

![Test Classifications](test-classifications.png)

## Setup

- [Enzyme](http://airbnb.io/enzyme/index.html)

```bash
npm install mocha react-addons-test-utils jsdom enzyme --save-dev
```

## ECMAScript additionals

```bash
npm install babel-cli babel-core babel-loader babel-preset-env babel-preset-react babel-preset-stage-0 babel-plugin-transform-async-to-generator --save-dev
```

## `package.json`

```json
"scripts": {
  "test": "mocha",
  "testES6": "mocha test --require babel-core/register --recursive",
  "test:watch": "npm test -- --watch",
}
```

## `.babelrc`

```json
{
  "presets": ["env", "stage-0", "react"],
  "plugins": ["transform-async-to-generator"]
}
```

## Running tests

```bash
npm test
npm run test:watch
```

## Implementing tests

- Follow Arrange, Act, Assert (AAA)
- Consider the [Test-Pyramid](https://martinfowler.com/bliki/TestPyramid.html)

```javascript
import assert from 'assert';
describe('A test group', () => {
  it('A test', () => {
    // Arrange
    const sut = new SUT();
    // Act
    const actual = sut.doSomething();
    // Assert
    assert.ok(expected, actual);
  });
});
```

## Testing React

- [Mocha + Enzyme React Basic App](examples/basic-app/test/simple.spec.js)

## Testing React + Redux

```bash
npm install enzyme-redux redux-test-utils --save-dev
```

- [Mocha + Enzyme Redux App](examples/redux-app/test/redux.spec.js)

## Examples

- [Basic App](examples/basic-app/README.md)
- [Redux App](examples/redux-app/README.md)
