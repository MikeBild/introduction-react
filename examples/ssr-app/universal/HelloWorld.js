import React from 'react';

export default class HelloWorld extends React.Component {
  state = {
    greeting: this.props.greeting,
  };

  updateModel(event) {
    this.setState({ greeting: event.target.value });
  }

  render() {
    return (
      <div>
        <input
          onChange={e => this.updateModel(e)}
          value={this.state.greeting}
          style={{ minWidth: '200px' }}
        />
        <p>Hello, {this.state.greeting}</p>
      </div>
    );
  }
}
