import React from 'react';
import { render } from 'react-dom';
import { Layout } from './components/templates/layout';

const App = () => {
  return (
    <Layout title="Hello World!">
      <p>Content</p>
    </Layout>
  );
};

render(<App />, document.getElementById('root'));
