// Actions
export const UPDATE_GREETING = 'UPDATE_GREETING'
export const RESET_GREETING = 'RESET_GREETING'

// Action creators
export function updateGreeting(greeting) {
  return {
    type: UPDATE_GREETING,
    greeting,
  }
}

export function resetGreeting() {
  return {
    type: RESET_GREETING,
  }
}

// Reducer
export function greetingReducer(state = 'World', action) {
  switch (action.type) {
    case UPDATE_GREETING:
      return action.greeting
    case  RESET_GREETING:
      return ''
    default:
      return state
  }
}