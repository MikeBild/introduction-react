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

render(<AuthProvider value={authContext}>
  <LoginPage />
  <ProjectePage />
</AuthProvider>, document.getElementById('root'))
