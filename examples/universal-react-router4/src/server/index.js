import express from 'express';
import React from 'react';
import App from '../shared/App';
import NoMatch from '../shared/NoMatch';
import Error from '../shared/Error';
import { StaticRouter, matchPath } from 'react-router';
import render from './render';
import 'isomorphic-fetch';

const routes = ['/', '/g/:gistId'];

const app = express();
app.use('/static', express.static('./dist'));

app.get('*', (req, res) => {
  const match = routes.reduce(
    (acc, route) => matchPath(req.url, route, { exact: true }) || acc,
    null,
  );
  if (!match) {
    res.status(404).send(render(<NoMatch />));
    return;
  }

  fetch('https://api.github.com/gists')
    .then(r => r.json())
    .then(gists => {
      res.status(200).send(
        render(
          <StaticRouter context={{}} location={req.url}>
            <App gists={gists} />
          </StaticRouter>,
          gists,
        ),
      );
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(render(<Error />));
    });
});

app.listen(8080, () => console.log('Listening on port 8080'));
