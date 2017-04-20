import React from 'react'
import ReactDOM from 'react-dom'
import QuestionnaireButton from './components/QuestionnaireButton'
import Layout from './pages/Layout'
import Questionnaire from './pages/Questionnaire'

ReactDOM.render(
  <Layout title={'Questionnaire'} description={'Ipsum Larum Löffelstiel'}>
    <Questionnaire />
  </Layout>,
  document.getElementById('root')
)