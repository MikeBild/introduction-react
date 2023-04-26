import React from 'react';
import PropTypes from 'prop-types';

export const SimpleHandler = () => (
  <button onClick={() => alert('Alert!')}>Alert</button>
);

export const InputHandler = () => (
  <input type="text" onBlur={(e) => alert(e.target.value)} />
);

export class StateHandler extends React.Component {
  static propTypes = {
    content: PropTypes.string,
    onContentChanged: PropTypes.func,
  };

  static defaultProps = {
    content: 'default content',
    onContentChanged: () => ({}),
  };

  state = {
    content: this.props.content || 'default content',
  };

  render() {
    return (
      <div>
        <strong data-testid="statehandler-output">{this.state.content}</strong>
        <br />
        <input
          data-testid="statehandler-input"
          type="text"
          onChange={(e) => this.setState({ content: e.target.value })}
          onBlur={(e) => this.props.onContentChanged(e.target.value)}
        />
      </div>
    );
  }
}

export const ParentUseChildHandler = (props) => <StateHandler {...props} />;
