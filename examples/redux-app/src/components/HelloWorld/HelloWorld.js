import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import * as Actions from './HelloWorldActionReducer'

// pure render function
export const HelloWorld = props => (
  <div>
    <input onChange={e => props.updateGreeting(e.target.value)} value={props.greeting}/>
    <p>Hello, {props.greeting}</p>
    <button onClick={() => props.resetGreeting()}>Clear</button>
  </div>
)

// map state from store from reducer to props
function mapStateToProps(state) {
  return {
    greeting: state.greeting,
  }
}

// map actions (creators) to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

// composition to component
export default connect(mapStateToProps, mapDispatchToProps)(HelloWorld)