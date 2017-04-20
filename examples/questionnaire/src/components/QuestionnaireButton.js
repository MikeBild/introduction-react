import React, {Component, PropTypes} from 'react'
import './QuestionnaireButton.css'

export default class QuestionnaireButton extends Component {

  constructor({title}, context){
    super(props, context)
    this.state = {
      text: props.text,
    }
  }

  static propTypes = {
    text: PropTypes.string,
    enabled: PropTypes.bool,
  }

  state = {
    text: this.props.text || 'Überprüfen und Senden',
    enabled: this.props.enabled,
  }

  waitForSomeSecondsAndReset(text) {
    this.setState({text: 'Bitte warten ...'})
    setTimeout(() => {
      this.setState({text})
    }, 2000)
  }

  render() {
    return <button className="QuestionnaireButton-button" disabled={!this.props.enabled} onClick={() => this.waitForSomeSecondsAndReset(this.state.text)}>{this.state.text}</button>
  }
}