import React from 'react'
import {Questionnaire} from './Questionnaire'
import {connect} from 'react-redux'

const Layout = ({title = 'Foo', description = 'Bar', children}, context) => {
  return (
    <div>
      <h1>{(context.store.questionnaireData || {}).title || title}</h1>
      <p>{(context.store.questionnaireData || {}).description || description}</p>
      <div>
        {children}
      </div>
      <footer>
        <pre>{process.env.NODE_ENV}:{process.env.VERSION}</pre>
      </footer>
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

function mapStateToProps(state) {
  return {
    title: state.title,
    description: state.description,
  }
}

export default connect(mapStateToProps)(Layout)