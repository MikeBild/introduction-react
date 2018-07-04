import React, { Fragment as F } from "react";

class Loading extends React.Component {
  state = {
    show: true
  };

  render() {
    return (
      <F>
        {this.state.show && <div>Loading...</div>}
        <button onClick={() => this.setState({ show: true })}>Show</button>{" "}
        <button onClick={() => this.setState({ show: false })}>Hide</button>{" "}
        <button onClick={() => this.setState({ show: !this.state.show })}>
          Toggle
        </button>
      </F>
    );
  }
}

export default Loading;
