import React from 'react'
import QuestionnaireButton from '../components/QuestionnaireButton'
import QuestionnaireForm from '../components/QuestionnaireForm'

export default class Questionnaire extends React.Component {
  state = {
    foo: 'zszszs'
  }

  onButtonPressed() {
    this.setState({
      foo: 'Määääää'
    })
  }

  render () {
    return (
      <div>
        {this.state.foo}
        <QuestionnaireForm />
        <QuestionnaireButton onClick={() => this.onButtonPressed()} />
      </div>
    )
  }
}