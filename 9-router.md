# React-Router

- Map URLs to components
- Browser-Support for Forward / Backward Navigation
- Bookmark-Support for Single-Page-Apps
- [Router-Example](/examples/router-app/README.md)

## Setup

```bash
npm install react-router-dom --save-dev
```

## Router and Route

- `Router` as Top-Level-Component
- Map URL to React-Component via `Route`

```javascript
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
<Router>
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route
      exact
      path="/resources"
      component={Resource}
      resources={['A', 'B', 'C']}
    />
    <Route exact path="/resources/:id?" component={Resource} />
  </Switch>
</Router>;
```

## Links

- Special react-router tag for deep- or hash linking
- Tag redendering depends on `Router` history "configuration"

```javascript
import { Link } from 'react-router';

const MyPage = props => (
  <ul>
    <li>
      <Link to="/my/path">A link</Link>
    </li>
    <li>
      <Link to={`/resources/${resource.id}`}>A parametrized link</Link>
    </li>
  </ul>
);
```

## Index-, Redirect- and Wildcard-Route

```javascript
<Router>
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Redirect from="start" to="home" />
    <Route path="home" component={Home} />
    <Route path="*" component={NoMatch} />
  </Route>
</Router>
```

## Hooks

- `onEnter` and `onLeave` to hook into
- `(nextState, replaceState, callback)` arguments to control transitions

```javascript
<Route path="about" component={About} onEnter={() => alert('New visit!')} />
```
