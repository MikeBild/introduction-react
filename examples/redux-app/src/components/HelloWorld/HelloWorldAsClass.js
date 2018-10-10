import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from './HelloWorldActionReducer';

export default class HelloWorldAsClass extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object.isRequired,
  };

  state = {
    greeting: 'World',
  };

  constructor(props, context) {
    super(props);

    context.store.subscribe(() => {
      const newState = context.store.getState();
      this.setState({
        greeting: newState.greeting,
      });
    });
  }

  render() {
    return (
      <div>
        <input
          onChange={e =>
            this.context.store.dispatch(Actions.updateGreeting(e.target.value))
          }
          value={this.state.greeting}
        />
        <p>Hello, {this.state.greeting}</p>
        <button
          onClick={() => this.context.store.dispatch(Actions.resetGreeting())}
        >
          Clear
        </button>
      </div>
    );
  }
}
