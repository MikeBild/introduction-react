import React, {Component, PropTypes} from 'react'
import './QuestionnaireButton.css'

export default class QuestionnaireButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired,
  }

  state = {
    text: this.props.text || 'Überprüfen und Senden',
  }

  render() {
    return <button className="QuestionnaireButton-button" onClick={() => this.props.onClick()}>{this.state.text}</button>
  }
}