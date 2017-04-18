import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'

import HelloWorld from './components/HelloWorld/HelloWorld'
import {greetingReducer} from './components/HelloWorld/HelloWorldActionReducer'

const store = createStore(combineReducers({
  greeting: greetingReducer,
}))

ReactDOM.render(
  <Provider store={store}>
    <HelloWorld />
  </Provider>,
  document.getElementById('root')
)