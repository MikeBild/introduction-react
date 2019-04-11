import React from 'react';
import { render } from 'react-dom';
import { Layout } from './components/templates/layout';

const App = () => {
  return (
    <Layout title="Hello World!">
      <div>Content</div>
    </Layout>
  );
};

render(<App />, document.getElementById('root'));
