import React, { Component, PropTypes } from 'react'

export default class ThemedAsClass extends Component {
  static contextTypes = {
    theme: PropTypes.object.isRequired,
  }

  render() {
    return <pre style={{color: this.context.theme.color}}>{`This class component got a theme ${JSON.stringify(this.context.theme)} from ThemeProvider`}</pre>
  }
}