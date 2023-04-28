const express = require("express");

const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const moodValues = {
  default: [10, 20],
};

app.get("/report", (req, res) => {
  res.send(moodValues);
});

app.post("/moods", (req, res) => {
  const { name, value } = req.body;
  if (!moodValues[name]) moodValues[name] = [];
  moodValues[name].push(value);
  res.sendStatus(201);
});

app.listen(8080, () => console.log("Listen on 8080"));
