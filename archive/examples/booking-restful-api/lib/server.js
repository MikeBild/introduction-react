const express = require('express');
const expressCors = require('cors');
const expressMorgan = require('morgan');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-adapter-node-websql'));
const DefaultPouch = PouchDB.defaults({
  prefix: 'databases/',
  adapter: 'websql',
});
const expressPouchDB = require('express-pouchdb')(DefaultPouch, {
  logPath: 'databases/pouchdb.log',
  configPath: 'pouchdb-config.json',
  mode: 'fullCouchDB',
});

const databases = {};
const app = express();

app.disable('x-powered-by');
app.use(expressMorgan('dev'));
app.use(expressCors());

app.get('/search', (req, res, next) => {
  const { location } = req.query;

  Promise.all([
    databases.flights
      .allDocs({ include_docs: true })
      .then(result =>
        result.rows.map(x => Object.assign({}, x.doc, { source: 'Flight' })),
      ),
    databases.hotels
      .allDocs({ include_docs: true })
      .then(result =>
        result.rows.map(x => Object.assign({}, x.doc, { source: 'Hotel' })),
      ),
    databases.cars
      .allDocs({ include_docs: true })
      .then(result =>
        result.rows.map(x => Object.assign({}, x.doc, { source: 'Car' })),
      ),
  ])
    .then(results => results.reduce((s, n) => s.concat(n), []))
    .then(results =>
      results.filter(x => (location ? x.location === location : true)),
    )
    .then(result => res.send(result))
    .catch(error => res.status(500).send({ error: error.message }));
});
app.use(expressPouchDB);

let server = undefined;
module.exports = {
  start: ({ port, isMemory = false }) => {
    return new Promise(resolve => {
      databases.flights = new DefaultPouch('flights');
      databases.hotels = new DefaultPouch('hotels');
      databases.cars = new DefaultPouch('cars');
      server = app.listen(port, () =>
        resolve({
          server,
          app,
          databases,
        }),
      );
    });
  },
  stop: () => new Promise(resolve => server.close(() => resolve())),
};
