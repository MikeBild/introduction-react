import '@babel/polyfill'

import React from 'react'
import { render } from 'react-dom'

import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

import { LoginPage } from './pages/login'
import { ProjectePage } from './pages/projekte'
import { ProjectPage } from './pages/projekt'
import { AuthProvider, authContext } from './lib/AuthContext'
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import { AngebotPage } from './pages/angebot'

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:8080/graphql'}),
  cache: new InMemoryCache()
});

render(<AuthProvider value={authContext}>
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={({ history }) => {
          if(!authContext.user.token) return history.push('/login')
          return <ProjectePage />
        }} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/angebot/:angebotsnummer" exact component={AngebotPage} />
        <Route path="*" render={() => <div>404 - <Link to="/">Dashboard</Link></div>} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
</AuthProvider>, document.getElementById('root'))
