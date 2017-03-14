# React-Router

* Map URLs to components
* Browser-Support for Forward / Backward Navigation
* Bookmark-Support for Single-Page-Apps
* [Router-Example](/examples/router-app/README.md)

> New APU in react-router >= 4.0.0!

## Setup

```bash
npm install react-router@^3.0.2 --save
```

## Router and Route

* `Router` as Top-Level-Component
* Map URL to React-Component via `Route`

```javascript
<Router history={browserHistory}>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/resources" component={Resource} resources={['A', 'B', 'C']}/>
  <Route path="/resources/:id" component={Resource} />
</Router>
```

## Links

* Special react-router tag for deep- or hash linking
* Tag redendering depends on `Router` history "configuration"

```javascript
import { Link } from 'react-router'

const MyPage = props => (
  <ul>
    <li><Link to="/my/path">A link</Link></li>
    <li><Link to={`/resources/${resource.id}`}>A parametrized link</Link></li>
  </ul>
)
```

## History

* Use `browserHistory` for HTML5 History API
* Use `hashHistory` for Deep-Links with `#` Hash-Tags

## Index-, Redirect- and Wildcard-Route

```javascript
<Router history={browserHistory}>
  <Route path="/" component={Layout}>
    <IndexRoute component={Home} />
    <Redirect from="start" to="home" />
    <Route path="home" component={Home} />
    <Route path="*" component={NoMatch} />
  </Route>
</Router>
```

## Hooks

* `onEnter` and `onLeave` to hook into
* `(nextState, replaceState, callback)` arguments to control transitions

```javascript
<Route path="about" component={About} onEnter={() => alert('New visit!')} />
```

