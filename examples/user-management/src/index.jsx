import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { User } from './components/pages/User';
import { About } from './components/pages/About';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user" component={User} />
        <Route exact path="/about" component={About} />
      </Switch>
    </Router>
  );
};

render(<App />, document.getElementById('root'));
