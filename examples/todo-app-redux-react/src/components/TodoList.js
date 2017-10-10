import React, {Component} from 'react'
import AddTodo from './AddTodo'
import {connect} from 'react-redux'

class TodoList extends Component {
  state = {
    todos: this.props.todos
  }

  render () {
    console.log(this.props)
    const {todos} = this.props

    return (
      <div>
        <ul>
          {
            todos &&
            todos.map((x, i) => <li key={i}>{x}</li>)
          }
        </ul>
        <AddTodo />
      </div>
    )
  }
}

const mapToProps = store => {
  return {
    todos: store.todos
  }
}

export default connect(mapToProps)(TodoList)
