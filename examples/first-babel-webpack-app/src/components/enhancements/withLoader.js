import React, { Component } from "react";

function withLoader(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        isLoading: false
      };
    }

    componentDidMount() {
      this.setState({ isLoading: true });

      this.timeoutRef = setTimeout(() => {
        this.setState({
          data: [{}, {}],
          isLoading: false
        });
      }, 5000);
    }

    componentWillUnmount() {
      clearTimeout(this.timeoutRef);
    }

    render() {
      const props = {
        ...this.props,
        data: this.state.data,
        isLoading: this.state.isLoading
      };
      return <WrappedComponent {...props} />;
    }
  };
}

export default withLoader;
