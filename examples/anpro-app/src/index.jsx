import '@babel/polyfill'

import React from 'react'
import { render } from 'react-dom'

import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

import { ProjectePage } from './pages/projekte'
import { ProjectPage } from './pages/projekt'

render(<ProjectePage />, document.getElementById('root'))
