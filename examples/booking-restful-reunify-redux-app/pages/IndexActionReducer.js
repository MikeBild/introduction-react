// Actions
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS'
export const FETCH_SEARCH_FAILURE = 'FETCH_SEARCH_FAILURE'

// Action creators
function searchSuccess(search) {
  return {
    type: FETCH_SEARCH_SUCCESS,
    search,
  }
}

function searchFailure(error) {
  return {
    type: FETCH_SEARCH_FAILURE,
    error,
  }
}

export function fetchSearchAction({location = ''} = {}) {
  return dispatch => fetch(`http://localhost:3000/search?location=${location}`)
    .then(response => response.json())
    .then(data => dispatch(searchSuccess(data)))
    .catch(error => dispatch(searchFailure(error)))
}

// Reducer
export function searchSuccessReducer(state = [], action) {
  switch (action.type) {
    case FETCH_SEARCH_SUCCESS:
      return action.search
    default:
      return state
  }
}

export function searchFailureReducer(state = false, action) {
  switch (action.type) {
    case FETCH_SEARCH_FAILURE:
      return action.error
    default:
      return state
  }
}