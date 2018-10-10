const express = require('express');
const app = express();

app.get('/articles', (req, res) => {
  res.send([{ id: 1 }, { id: 2 }]);
});

app.get('/items', (req, res) => {
  res.send([{ id: 1 }, { id: 2 }]);
});

app.listen(6666, () => console.log(`Listen on 6666`));
