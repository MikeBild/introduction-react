//Actions
const LOAD_QUESTIONS = 'LOAD_QUESTIONS'
const QUESTIONS_LOADED = 'QUESTIONS_LOADED'

//Action Creators
export const loadQuestions = (questionnaireId) => {
  return (dispatch) => {
    fetch(process.env.QUESTIONNAIRE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: QUESTIONS_LOADED,
        questionnaireData: data,
      })
    })
    .catch(err => console.error(err.message))
  }
}

//Reducers
export const questionnaireInitReducer = (state = {}, action) => {
  switch(action.type) {
    case QUESTIONS_LOADED:
      return action.questionnaireData
    default:
      return state
  }
}