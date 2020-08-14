const express = require('express');
// const compression = require("compression");
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 8080;

const data = require('./data.json')

const DATA_SIZE_HALF = "half"
const DATA_SIZE_FULL = "full"

// app.use(compression);

app.get("/api/dataIdList", (req, res) => {
  if (!req.query.datasize) {
    res.status(400).send('Bad Request - missing query')
    return;
  }

  if (req.query.datasize === DATA_SIZE_FULL) {
    res.send(data.rowIdHalfList)
  } else {
    res.send(data.rowIdFullList)
  }
})

app.get("/api/dataItem/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send('Bad Request - missing id')
    return;
  }
  res.send(data.rows["row" + req.params.id])
})

http.listen(port, () => console.log(`Listening on port ${port}`));