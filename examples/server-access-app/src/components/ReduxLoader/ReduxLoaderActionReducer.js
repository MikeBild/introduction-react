// Actions
export const LOAD_SOME = 'LOAD_SOME'

// Action creators
export function loadSome(url) {
  return (dispatch) => {
    fetch(url)
    .then(response => response.json())
    .then(data => dispatch({type: LOAD_SOME, items: data.rows}));
  };
}

// Reducer
export function reduxLoaderReducer(state = [], action) {
  switch (action.type) {
    case LOAD_SOME:
      return action.items
    default:
      return state
  }
}
