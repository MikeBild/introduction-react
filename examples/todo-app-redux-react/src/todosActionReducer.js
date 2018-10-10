const ADD_TODO = 'ADD_TODO';

// Action creators
export function createAddTodo(payload) {
  return {
    type: ADD_TODO,
    payload,
  };
}

// Todos Reducer
export const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.payload]);
    default:
      return state;
  }
};
