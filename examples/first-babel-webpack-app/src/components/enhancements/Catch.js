import React, { Component } from "react";

export default class Catch extends Component {
  state = {
    err: null
  };

  componentDidCatch(err) {
    this.setState({ err });
  }

  componentWillReceiveProps(next) {
    if (!this.state.err) return;
    this.setState({ err: null });
  }

  render() {
    const { err } = this.state;

    if (!err) return this.props.children;

    return <pre children={err.toString()} />;
  }
}
