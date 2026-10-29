import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './style.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Resources from './pages/Resources';
import Resource from './pages/Resource';
import NoMatch from './pages/NoMatch';

render(
  <Router>
    <Layout>
      <Switch>
        <Redirect from="/start" to="home" />
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route
          exact
          path="/about"
          component={About}
          onEnter={() => alert('New visit!')}
        />
        <Route
          exact
          path="/resources"
          render={() => <Resources resources={['A', 'B', 'C']} />}
        />
        <Route exact path="/resources/:id" component={Resource} />
        <Route exact path="*" component={NoMatch} />
      </Switch>
    </Layout>
  </Router>,
  document.getElementById('root'),
);
