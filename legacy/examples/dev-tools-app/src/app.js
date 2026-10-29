import React from 'react';
import { render } from 'react-dom';
import './style.css';

render(
  <div>
    <h1>Introduction to React {process.env.VERSION}</h1>
  </div>,
  document.getElementById('root'),
);
