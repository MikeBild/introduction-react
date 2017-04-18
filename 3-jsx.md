# JSX Expressions

## Events

```javascript
render () {
  return <button onClick={() => alert('Hello World!')}>Hello World</button>
}
```

## Styles

* Object based bindings
* CamelCase properties
* `style={{...}}` or `className={'css-class-name'}`

```javascript
render () {
  <div>
    <h1 style={{backgroundColor: 'red', }}>Hello World</h1>
    <h2 className={'header'}>Hello World</h2>
  </div>
}
```

## State

* `this.setState` state changes rerenders the UI

```javascript
// set (async)
this.setState({content: 'Hello World'})
this.setState(state => ({content: 'Hello World'}))

// get
const foo = this.state.content
```

## Props

* represents the properties of component
* set by the consumer of the component
* read only

```javascript
<MyComponent value="Hello World!" />
```

## Lists

* `array.map` in expression
* `key` attribute to track changes

```javascript
render () {
  return (
    <ul>
      {
        ['a', 'b', 'c'].map(e => <li key={e}>{e}</li>)
      }
    </ul>
  )
}
```

## Conditional rendering

```javascript
render () {
  const isError = () => true;
  return (
    <div className={isError() ? 'error' : 'success'}>Error occurred</div>
  )
}
```

```javascript
render () {
  return (
    <ul>
      { props.values &&
        props.values.map(e => <li key={e}>{e}</li>)
      }
    </ul>
  )
}
```

## Render DOM-Elements

* Inject virtual DOM Element (React) into real DOM
* Used for initial React-Component injection
* Used for component migrations from VanillaJS, jQuery, etc.

```javascript
import React from 'react'
import ReactDOM drom 'react-dom'

const MyComponent = props => <h1>{props.label || '...'}</h1>

ReactDOM.render(
  <MyComponent label={'Hello World'} />
, document.getElementById('root'))
```
