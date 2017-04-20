import React from 'react'
import {Questionnaire} from './Questionnaire'

const Layout = ({title = 'Foo', description = 'Bar', children}, context) => {
  return (
    <div>
      <h1>{(context.store.questionnaireData || {}).title || title}</h1>
      <p>{description}</p>
      <div>
        {children}
      </div>
    </div>
  )
}

Layout.contextTypes = {
  store: React.PropTypes.object.isRequired,
}

Layout.propTypes = {
  title: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
}

export default Layout