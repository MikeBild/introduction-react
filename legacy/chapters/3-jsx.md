# JSX Expressions

## Events

```javascript
render () {
  return <button onClick={() => alert('Hello World!')}>Hello World</button>
}
```

## Styles

- Object based bindings
- CamelCase properties
- `style={{...}}` or `className={'css-class-name'}`

```javascript
render () {
  <div>
    <h1 style={{backgroundColor: 'red', }}>Hello World</h1>
    <h2 className={'header'}>Hello World</h2>
  </div>
}
```

## State

- `this.setState` state changes rerenders the UI

```javascript
// set (async)
this.setState({ content: 'Hello World' });
this.setState(state => ({ content: 'Hello World' }));

// get
const foo = this.state.content;
```

## Props

- represents the properties of component
- set by the consumer of the component
- read only

```javascript
<MyComponent value="Hello World!" />
```

## Lists

- `array.map` in expression
- `key` attribute to track changes

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

### Ternary operator
```javascript
const isError = () => true;
return (
  <div className={isError() ? 'error' : 'success'}>Error occurred</div>
)
```

### `&&` (only-if)

```javascript
return (
  <ul>
    { props.values &&
      props.values.map(e => <li key={e}>{e}</li>)
    }
  </ul>
)
```

### Early return
```javascript
if (!user) return null;
return <div>{user.name}</div>;
```

### Preparing variables

```typescript
type Props = { error?: string; data?: string };

export function Box({ error, data }: Props) {
  let body: JSX.Element | null = null;

  if (error) body = <p role="alert">{error}</p>;
  else if (!data) body = <p>Lade…</p>;
  else body = <p>{data}</p>;

  return <section>{body}</section>;
}
``` 

### Optional Chaining / Nullish Coalescing

```tsx
// rendert nur wenn vorhanden
{user?.avatarUrl && <img src={user.avatarUrl} alt="" />}

// Fallback-Werte
<p>{user?.name ?? "Gast"}</p>
```

### „Switch“-Style

```tsx
type Status = "idle" | "loading" | "success" | "error";
type Props = { status: Status };

export function Loader({ status }: Props) {
  switch (status) {
    case "loading": return <p>Lade…</p>;
    case "success": return <p>Fertig!</p>;
    case "error":   return <p>Fehler!</p>;
    default:        return null;
  }
}
```

## Render DOM-Elements

- Inject virtual DOM Element (React) into real DOM
- Used for initial React-Component injection
- Used for component migrations from VanillaJS, jQuery, etc.

```javascript
import React from 'react'
import ReactDOM drom 'react-dom'

const MyComponent = props => <h1>{props.label || '...'}</h1>

ReactDOM.render(
  <MyComponent label={'Hello World'} />
, document.getElementById('root'))
```
