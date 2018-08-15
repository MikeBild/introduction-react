import React, { Component } from "react";

function withLoader(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null
      };
    }

    componentDidMount() {
      this.timeoutRef = setTimeout(() => {
        this.setState({
          data: [{}, {}]
        });
      }, 5000);
    }

    componentWillUnmount() {
      clearTimeout(this.timeoutRef);
    }

    render() {
      const props = { ...this.props, data: this.state.data };
      return <WrappedComponent {...props} />;
    }
  };
}

export default withLoader;
