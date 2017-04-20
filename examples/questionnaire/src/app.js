import React from 'react'
import ReactDOM from 'react-dom'
import QuestionnaireButton from './components/QuestionnaireButton'
import Layout from './pages/Layout'

let uu = false;
setTimeout(() => {
  uu = true
}, 3000)

ReactDOM.render(
  <Layout title={'Questionnaire'} description={'Ipsum Larum Löffelstiel'}>
    <QuestionnaireButton enabled={uu} />
  </Layout>,
  document.getElementById('root')
)