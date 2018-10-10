const SERVICE_PORT = 8080;
import express from 'express';
const app = express();
app.listen(SERVICE_PORT, () => console.log(`Listen on ${SERVICE_PORT}`));
app.use(express.static(__dirname + '/statics'));

import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import HelloWorld from '../universal/HelloWorld';

app.get('/server-renderer', (req, res) => {
  const html = renderToStaticMarkup(
    <HelloWorld greeting={'Server only world'} />,
  );
  res.send(renderServerOnlyPage(html));
});

app.get('/universal-renderer', (req, res) => {
  const html = renderToStaticMarkup(
    <HelloWorld greeting={'Universal world'} />,
  );
  res.send(renderUniversalPage(html));
});

app.get('/universal-renderer-data', (req, res) => {
  const initialData = 'Universal World with initial data';
  const html = renderToStaticMarkup(<HelloWorld />);
  res.send(renderUniversalPageWithData(html, initialData));
});

function renderServerOnlyPage(html) {
  return `<html>
  <head lang="de">
    <meta charset="UTF-8">
    <title>React</title>
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>`;
}

function renderUniversalPage(html) {
  return `<html>
  <head lang="de">
    <meta charset="UTF-8">
    <title>React</title>
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
  <script src="/bundle.js"></script>
</html>`;
}

function renderUniversalPageWithData(html, initialData) {
  return `<html>
  <head lang="de">
    <meta charset="UTF-8">
    <title>React</title>
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
  <script>
    window.__INITIAL_STATE__ = ${JSON.stringify(initialData)};
  </script>
  <script src="/bundle.js"></script>
</html>`;
}
