import React from 'react';
import { render } from 'react-dom';
import './style.css';

import ThemeProvider from './components/ThemeProvider';
import ThemedAsFunction from './components/ThemedAsFunction';
import ThemedAsClass from './components/ThemedAsClass';
import {
  ThemedAsHocWithContext,
  ThemedAsHocWithoutContext,
} from './components/ThemedAsHoc';

const theme = {
  color: 'yellow',
  fontFamily: 'Georgia',
};

render(
  <div>
    <ThemeProvider theme={theme}>
      <ThemedAsFunction />
      <ThemedAsClass />
      <ThemedAsHocWithContext />
    </ThemeProvider>
    <ThemedAsHocWithoutContext />
  </div>,
  document.getElementById('root'),
);
