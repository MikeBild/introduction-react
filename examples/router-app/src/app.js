import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router'
import './style.css'
import Layout from './pages/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Resources from './pages/Resources'
import Resource from './pages/Resource'
import NoMatch from './pages/NoMatch'

render(
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Redirect from="start" to="home" />
      <Route path="home" component={Home} />
      <Route path="about" component={About} onEnter={() => alert('New visit!')} />
      <Route path="resources" component={Resources} resources={['A', 'B', 'C']} />
      <Route path="resources/:id" component={Resource} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
  , document.getElementById('root')
)