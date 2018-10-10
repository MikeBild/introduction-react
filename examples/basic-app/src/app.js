import React from 'react';
import { render } from 'react-dom';
import './style.css';
import Body from './components/Body';
import { Header, Footer } from './components/Layout';
import {
  InputHandler,
  SimpleHandler,
  StateHandler,
  ParentUseChildHandler,
} from './components/EventHandler';

render(
  <div>
    <h1>Layout</h1>
    <Header />
    <Body />
    <Footer />
    <hr />
    <h1>Event Binding</h1>
    <div>
      Simple: <SimpleHandler />
    </div>
    <br />
    <div>
      Input: <InputHandler />
    </div>
    <br />
    <div>
      State Changes: <StateHandler />
    </div>
    <br />
    <div>
      Passing down properties:{' '}
      <ParentUseChildHandler content="Content from Parent" />
    </div>
    <br />
    <div>
      Passing up events:{' '}
      <StateHandler
        onContentChanged={content => alert(`Entered: ${content}`)}
      />
    </div>
    <br />
  </div>,
  document.getElementById('root'),
);
