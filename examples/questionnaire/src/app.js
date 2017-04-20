import React from 'react'
import ReactDOM from 'react-dom'
import QuestionnaireButton from './components/QuestionnaireButton'
import Layout from './pages/Layout'

ReactDOM.render(
  <Layout title={'Questionnaire'} description={'Ipsum Larum Löffelstiel'}>
    <QuestionnaireButton />
  </Layout>,
  document.getElementById('root')
)