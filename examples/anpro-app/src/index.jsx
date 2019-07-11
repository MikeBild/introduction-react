import '@babel/polyfill'

import React from 'react'
import { render } from 'react-dom'

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

import { LoginPage } from './pages/login'
import { ProjectePage } from './pages/projekte'
import { ProjectPage } from './pages/projekt'
import { AuthProvider, authContext } from './lib/AuthContext'
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom'

render(<AuthProvider value={authContext}>
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={({ history }) => {
        if(!authContext.user.token) return history.push('/login')
        return <ProjectePage />
      }} />
      <Route path="/login" exact component={LoginPage} />
      <Route path="*" render={() => <div>404 - <Link to="/">Dashboard</Link></div>} />
    </Switch>
  </BrowserRouter>
</AuthProvider>, document.getElementById('root'))
