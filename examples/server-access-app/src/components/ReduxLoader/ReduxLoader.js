import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './ReduxLoaderActionReducer';

export const ReduxLoader = props => (
  <div>
    <div>Load via Redux/Thunk</div>
    <br />
    <button
      onClick={() =>
        props.loadSome(
          'https://pouchdb-server-example.services.dropstack.run/default/_all_docs',
        )
      }
    >
      Load some items
    </button>
    <pre>{JSON.stringify(props, null, 2)}</pre>
    <hr />
    <ul>{props.items && props.items.map((x, i) => <li key={i}>{x.id}</li>)}</ul>
  </div>
);

function mapStateToProps(state) {
  return { items: state.items };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReduxLoader);
