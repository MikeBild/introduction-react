import React from 'react'

export const SimpleHandler = props => <button onClick={e => alert('Alert!')}>Alert</button>
export const InputHandler = props => <input type="text" onBlur={e => alert(e.target.value)} />
export class StateHandler extends React.Component {
  static propTypes = {
    content: React.PropTypes.string,
    onContentChanged: React.PropTypes.func,
  }

  static defaultProps = {
    content: 'default content',
    onContentChanged: e => ({}),
  }

  state = {
    content: this.props.content || 'default content',
  }

  render () {
    return (
      <div>
        <strong>{this.state.content}</strong>
        <br/>
        <input type="text" onChange={e => this.setState({content: e.target.value})} onBlur={e => this.props.onContentChanged(e.target.value)} />
      </div>
    )
  }
}
export const ParentUseChildHandler = props => <StateHandler {...props} />