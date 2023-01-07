const express = require('express');
const app = express();
const data = require('./data.json');

app.get('/', (req, res) => {
  res.send(data);
});

app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const toSend = data[id]
  const validIds = data.length - 1;

  if (toSend) {
    res.send(data[id])
  } else {
    res.send(`Invalid ID, valid IDs: 0-${validIds}`);
  }
})

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
