import React from 'react'

const ThemedAsFunction = (props, context) => (
  <pre>{`This function component got a theme ${JSON.stringify(context.theme)} from ThemeProvider`}</pre>
)

ThemedAsFunction.contextTypes = {
  theme: React.PropTypes.object.isRequired,
}

export default ThemedAsFunction