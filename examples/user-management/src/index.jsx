import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { User } from './components/pages/User';
import { UserAdd } from './components/pages/UserAdd';
import { About } from './components/pages/About';
import users from './users.json';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Home users={users} />} />
        <Route
          exact
          path="/user/add"
          component={() => (
            <UserAdd
              onAdd={newUser => users.push({ ...newUser, id: Date.now() })}
            />
          )}
        />
        <Route exact path="/user/:id?" component={User} />
        <Route exact path="/about" component={About} />
      </Switch>
    </Router>
  );
};

render(<App />, document.getElementById('root'));
