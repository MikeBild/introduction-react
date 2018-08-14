import React, { Component } from "react";
import { render } from "react-dom";

function HelloWorldHead({ color = "red", onFoo = () => ({}) }) {
  return (
    <h1 onClick={e => onFoo("clicked")} style={{ color }}>
      Hello World!
    </h1>
  );
}

class PersonalData extends Component {
  constructor({ activated = true }) {
    super();
    this.state = {
      activated
    };
  }

  deactivateButton() {
    this.setState({ activated: false });
  }

  render() {
    return (
      <div>
        <span>Name</span>
        <input type="text" />
        <button
          disabled={!this.state.activated}
          onClick={() => this.deactivateButton()}
        >
          Ansenden
        </button>
      </div>
    );
  }
}

render(
  <div>
    <HelloWorldHead color="blue" onFoo={msg => console.log(msg)} />
    <PersonalData />
  </div>,
  document.getElementById("root")
);
