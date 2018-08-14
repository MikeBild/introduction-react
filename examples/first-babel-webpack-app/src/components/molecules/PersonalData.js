import React, { Component } from "react";

export default class PersonalData extends Component {
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
