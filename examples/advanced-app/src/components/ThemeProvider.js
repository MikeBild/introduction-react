import React, { Component, PropTypes } from 'react'

export default class ThemeProvider extends Component {
  static propTypes = {
    theme: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    theme: PropTypes.object.isRequired,
  }

  getChildContext() {
   return {
     theme: this.props.theme
    }
  }

  render() {
    return <div>{this.props.children}</div>
  }
}