# React-Components

* Key-Concept in React
* Encapsulates UI-Elements

## Function vs. Class Implementation

* Stateful __class-based components__ are available React > 0.13 (previously React.createClass)
* Stateless __functional components__ are available React > 0.14

> Use upper case names for components

### Functional Component

* easy to use
* prefered for implementation
* return `null` doesn't render DOM-Element
* stateless
  * no `this.state`
  * no lifecycle
  * no `this.refs`

```javascript
import React from 'react'

export const Header = props => <h1>Hello World Header</h1>
export function Footer () {
  return <div>Hello World Footer</div>
}
```

### Class Component

* supports full features of React
* stateful

```javascript
import React from 'react'

class Body extends React.Component {
  render () {
    return <h1>Hello World Body</h1>
  }
}

export default Body
```

### Use Components

```javascript
import React from 'react'
import Body from './components/Body'
import { Header, Footer } from './components/Layout'

export default props => (
  <div>
    <Header />
    <Body />
    <Footer />
  </div>
)
```

## Passing `props` down

* passing down to children via object-spread-operator

```javascript
<div title={props.title} content={props.content}></div>
<div {...props}></div>
```

## (default)Props

```javascript
class MyComponent extends React.Component {
  static defaultProps = {
    content: 'Hello World',
  }

  constructor (props) {
    super(props)
  }
}
```

## PropTypes

* `PropTypes` to verify the "correctness" of `props` at __runtime__
* Verify optional, mandatory, type of component properties

```javascript
import React from 'react'

MyComponent.propTypes = {
  label: React.PropTypes.string.isRequired,
}
```

## State

* Key-Concept to rerender component (side-effect)
* Asynchron execution to "sometimes in the future"
* (currentState, object) -> newState - `setState` merges (like Object.assign)

```javascript
// set state with callback
this.setState((currentState, currentProps) => ({
  counter: currentState + 1,
}))

//set state with object
this.setState({
  content: 'Hello World',
})
```

* Inital state via constructor
* Initial state via ES7 property initializer

```javascript
class MyComponent extends React.Component {
  // via property initializer
  state = {
    content: this.props.content || 'Hello World',
  }

  // via constructor
  constructor(props) {
    super(props);
    this.state = {
      content: props.content || 'Hello World',
    }
  }
}
```

## Life-Cycle

### Inital Lifecycle (unmounted component)

1. constructor(props)
2. componentWillMount()
3. render()
4. componentDidMount()
5. componentWillUnmount()

### Change Lifecycle (mounted component)

1. componentWillReceiveProps(nextProps)
2. shouldComponentUpdate(nextProps, nextState)
3. componentWillUpdate(nextProps, nextState)
4. render()
5. componentDidUpdate(prevProps, prevState)

## Accessing DOM-Elements with `refs`

* accessing native DOM-Elements

```javascript
class MyComponent extends Recact.Component {
  componentDidMount () {
    // via `refs` reference (outdated)
    this.refs.nameInputField.focus()
  }

  render () {
    return (
      <div>
        <input type="text" ref="nameInputField" />
        <input type="text" ref={node => node.focus()} />
      </div>
    )
  }
}
```

## Working with Component-Hierarchies

```javascript
import React from 'react'

export default function Layout({children}) {
  return (
    <div className="root-body">
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: React.PropTypes.element.isRequired,
}
```