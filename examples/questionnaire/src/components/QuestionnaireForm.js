import React from 'react'
import {check} from '../lib/visitor'


export default class QuestionnaireForm extends React.Component {
  state = {
    questions: {},
    elements: [],
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

  componentDidMount() {
    const questions = {
      'Frage A': 'h1',
      'Frage B': 'h2',
      'Frage E': 'h1',
    }

    check(questions, (nodeValue, nodeName, nodeParent) => {

      switch(nodeValue) {
        case 'h1':
          return Promise.resolve(<h1>{nodeName}</h1>)
        case 'h2':
          return Promise.resolve(<h2>{nodeName}</h2>)
        default:
         return Promise.resolve()
      }
    })
    .then(data => {
      this.setState({ elements: Object.keys(data.result).map(x => data.result[x].value)})
    })
    .catch(console.error)
  }


  render () {
    return (
      <div>
        <h1>Form</h1>
        <div>
          {this.state.elements.map((x, i) => <div key={i}>{x}</div>)}
        </div>
      </div>
    )
  }
}