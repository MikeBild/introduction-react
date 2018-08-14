import React, { Component, createRef } from "react";

export default class PersonalData extends Component {
  constructor({ activated = true }) {
    super();
    this.nameInput = createRef();
    this.state = {
      activated
    };
  }

  deactivateButton() {
    this.setState({ activated: false });
  }

  onSubmit(evt) {
    evt.preventDefault();
    this.deactivateButton();

    const body = {
      name: this.nameInput.value
    };
    console.log(body);
    //validate -> fetch(...url, {body}) -> error || success -> activateButton
  }

  render() {
    return (
      <div>
        <form onSubmit={evt => this.onSubmit(evt)}>
          <input
            type="text"
            required
            ref={elm => (this.nameInput = elm)}
            onBlur={evt => this.setState({ name: evt.target.value })}
          />
          <input
            type="submit"
            disabled={!this.state.activated}
            value="Absenden"
          />
        </form>
      </div>
    );
  }
}
