

import React from 'react'
import {render} from 'react-dom'
import TodoList from './components/TodoList'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import {todosReducer} from './todosActionReducer'

const store = createStore(
  combineReducers({todos: todosReducer}),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const App = props => (
  <Provider store={store}>
    <div>
      <h1>Todo App</h1>
      <TodoList todos={[]} />
    </div>
  </Provider>
)

render(<App />, document.getElementById('root'))

