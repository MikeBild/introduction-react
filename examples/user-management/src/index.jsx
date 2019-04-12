import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/pages/Home';
import { User } from './components/pages/User';
import { UserAdd } from './components/pages/UserAdd';
import { About } from './components/pages/About';

class App extends Component {
  constructor() {
    super();
    this.state = { users: [] };
  }

  async componentDidMount() {
    try {
      const users = await delayFetchUsers();
      this.setState({
        users,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Home users={this.state.users} />}
          />
          <Route
            exact
            path="/user/add"
            component={() => (
              <UserAdd
                onAdd={newUser =>
                  this.state.users.push({
                    ...newUser,
                    id: Date.now().toString(),
                  })
                }
              />
            )}
          />
          <Route
            exact
            path="/user/:id?"
            component={props => <User {...props} users={this.state.users} />}
          />
          <Route exact path="/about" component={About} />
        </Switch>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));

async function delayFetchUsers() {
  const response = await fetch(`http://localhost:8080/users`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });
  await delay(2000);
  return await response.json();
}

function delay(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
