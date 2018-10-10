import React from 'react';
import PropType from 'prop-types';
import { connect } from 'redux';
import { createAddTodo } from '../todosActionReducer';

export class AddTodo extends React.Component {
  static contextTypes = {
    store: PropType.object.isRequired,
  };

  state = {
    todoText: '',
    //onAddTodo: this.props.onAddTodo || (() => ({}))
  };

  render() {
    console.log(this.context);
    // event passing
    // const addTodo = () => this.state.onAddTodo(this.state.todoText)
    const addTodo = () =>
      this.context.store.dispatch(createAddTodo(this.state.todoText));

    return (
      <div>
        <input
          type="text"
          onBlur={e => this.setState({ todoText: e.target.value })}
        />
        &nbsp;
        <button onClick={() => addTodo()}>AddTodo</button>
      </div>
    );
  }
}

export default AddTodo;
