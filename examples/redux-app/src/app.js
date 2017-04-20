import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'

import HelloWorld from './components/HelloWorld/HelloWorld'
import HelloWorldAsClass from './components/HelloWorld/HelloWorldAsClass'
import {greetingReducer} from './components/HelloWorld/HelloWorldActionReducer'

const store = createStore(combineReducers({
  greeting: greetingReducer,
}))

ReactDOM.render(
  <Provider store={store}>
    <div>
      <HelloWorld />
      <HelloWorldAsClass />
    </div>
  </Provider>,
  document.getElementById('root')
)