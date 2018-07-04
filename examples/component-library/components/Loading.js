import React, { Fragment as F } from "react";

class Loading extends React.PureComponent {
  state = {
    show: true
  };

  toogleState(show = !this.state.show) {
    this.setState({ show });
  }

  render() {
    return (
      <F>
        {this.state.show && <div>Loading...</div>}
        <button onClick={() => this.toogleState(true)}>Show</button>{" "}
        <button onClick={() => this.toogleState(false)}>Hide</button>{" "}
        <button onClick={() => this.toogleState()}>Toggle</button>
      </F>
    );
  }
}

export default Loading;
