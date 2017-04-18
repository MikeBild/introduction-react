import React from 'react'
import withThemeFromContext from './withThemeFromContext'
import {withContext, compose} from 'recompose'
import './ThemedAsHoc.less'

export const ThemedAsHoc = props => (
  <pre className="Hoc-Component">{`This HOC component got a theme ${JSON.stringify(props.theme)}`}</pre>
)
export const ThemedAsHocWithContext = withThemeFromContext({})(ThemedAsHoc)
export const ThemedAsHocWithoutContext = compose(
  withContext({theme: React.PropTypes.object.isRequired}, () => ({theme: {color: 'blue'}})),
  withThemeFromContext(),
)(ThemedAsHoc)

// export const ThemedAsHocWithoutContext = withContext({theme: React.PropTypes.object.isRequired}, () => ({theme: {color: 'blue'}}))(withThemeFromContext()(ThemedAsHoc))