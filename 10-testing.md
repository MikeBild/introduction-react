# Testing React-Application

## Setup

```bash
npm install mocha react-addons-test-utils jsdom enzyme --save-dev
```

## `package.json`

```json
"scripts": {
  "test": "mocha",
  "testES6": "mocha test --compilers js:babel-core/register --recursive",
  "test:watch": "npm test -- --watch",
}
```

## Running tests

```bash
npm test
npm run test:watch
```

## Implementing tests

* Follow Arrange, Act, Assert (AAA)
* Consider the [Test-Pyramid](https://martinfowler.com/bliki/TestPyramid.html)

```javascript
import assert from 'assert'
describe('A test group', () => {
  it('A test', () => {
    // Arrange
    const sut = new SUT()
    // Act
    const actual = sut.doSomething()
    // Assert
    assert.ok(expected, actual)
  })
})
```

## Testing React

* [Mocha + Enzyme Basic App](examples/basic-app/test/simple.spec.js)
* [Jest](https://facebook.github.io/jest/docs/tutorial-react.html)

## Examples

* [Basic App](examples/basic-app/README.md)
* [Redux App](examples/redux-app/README.md)