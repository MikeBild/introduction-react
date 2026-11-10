const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/articles", (req, res) => {
  res.send([{ id: 1 }, { id: 2 }]);
});

app.get("/items", async (req, res) => {
  await delay(2000);
  res.send([{ id: 1 }, { id: 2 }]);
});

app.listen(8080, () => console.log(`Listen on 8080`));

async function delay(inMs) {
  return new Promise((resolve) => {
    const timeoutRef = setTimeout(() => {
      clearTimeout(timeoutRef);
      resolve();
    }, inMs);
  });
}
