const express = require('express');
const app = express();
const cors = require('cors');
const users = require('./users.json');

app.use(cors());

app.get('/users', (req, res) => {
  res.send(users);
});

app.listen(8080, () => {
  console.log(`Listen on 8080`);
});
