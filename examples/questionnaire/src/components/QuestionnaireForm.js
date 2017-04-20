import React from 'react'

export default class QuestionnaireForm extends React.Component {
  state = {
    questions: {},
  }

  constructor(props, context) {
    super(props, context)
    context.store.subscribe(() => {
      const {questions} = context.store.getState().questionnaireData
      this.setState({questions})
    })
  }

  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  }

  render () {
    return (
      <div>
        <h1>Form</h1>
        <pre>{JSON.stringify(this.state.questions, null, 4)}</pre>
      </div>
    )
  }
}