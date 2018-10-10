# Recompose

Function components have several key advantages:

- Help prevent abuse of the setState() API, favoring props instead
- Encourage the "smart" vs. "dumb" component pattern
- Encourage code that is more reusable and modular
- Building of higher-order components via functional composition (lift)

## Setup

- [Recompose](https://github.com/acdlite/recompose)

```bash
npm install recompose --save
```

```javascript
import { compose, mapProps, withState } from 'recompose';
```

## `compose`

```javascript
const MyComponent = props => {...}

const enhance = compose(
  withState(...),
  mapProps(...),
  pure
)

/* Alternative
let EnhancedComponent = pure(MyComponent)
EnhancedComponent = mapProps(...)(EnhancedComponent)
EnhancedComponent = withState(...)(EnhancedComponent)
*/

const EnhancedMyComponent = enhance(MyComponent)
export default EnhancedMyComponent
```

## withState

```javascript
const enhance = withState('counter', 'setCounter', 0);
const Counter = enhance(({ counter, setCounter }) => (
  <div>
    Count: {counter}
    <button onClick={() => setCounter(n => n + 1)}>Increment</button>
    <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
  </div>
));
```

## Redux Reducers

```javascript
const counterReducer = (count, action) => {
  switch (action.type) {
    case INCREMENT:
      return count + 1;
    case DECREMENT:
      return count - 1;
    default:
      return count;
  }
};

const enhance = withReducer('counter', 'dispatch', counterReducer, 0);
const Counter = enhance(({ counter, dispatch }) => (
  <div>
    Count: {counter}
    <button onClick={() => dispatch({ type: INCREMENT })}>Increment</button>
    <button onClick={() => dispatch({ type: DECREMENT })}>Decrement</button>
  </div>
));
```
