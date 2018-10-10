import React from 'react';
import ReactDOM from 'react-dom';

import HelloWorld from '../universal/HelloWorld';
const greeting = window.__INITIAL_STATE__;
ReactDOM.render(
  <HelloWorld greeting={greeting || 'Client World'} />,
  document.getElementById('root'),
);
