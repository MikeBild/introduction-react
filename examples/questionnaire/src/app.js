import React from 'react'
import ReactDOM from 'react-dom'
import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import QuestionnaireButton from './components/QuestionnaireButton'
import Layout from './pages/Layout'
import Questionnaire from './pages/Questionnaire'
import {questionnaireInitReducer, loadQuestions} from './pages/QuestionnaireActionReducer'

const store = createStore(combineReducers({
  questionnaireData: questionnaireInitReducer,
}), applyMiddleware(thunk))

store.dispatch(loadQuestions('dkdkdkdk'))

ReactDOM.render(
  <Provider store={store}>
    <Layout title={'Questionnaire'} description={'Ipsum Larum Löffelstiel'}>
      <Questionnaire />
    </Layout>
  </Provider>,
  document.getElementById('root')
)