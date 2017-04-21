import React from 'react'
import {Questionnaire} from './Questionnaire'
import {connect} from 'react-redux'

const Layout = ({title, description, children}, context) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
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
    title: state.questionnaireData.title || '',
    description: state.questionnaireData.description || '',
  }
}

export default connect(mapStateToProps)(Layout)