import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './style.css';

import ReduxLoader from './components/ReduxLoader/ReduxLoader';
import { reduxLoaderReducer } from './components/ReduxLoader/ReduxLoaderActionReducer';

const store = createStore(
  combineReducers({
    items: reduxLoaderReducer,
  }),
  applyMiddleware(thunk),
);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <h1>React Server-Access</h1>
      <ReduxLoader />
    </div>
  </Provider>,
  document.getElementById('root'),
);
