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

  app.get('/countdown/:mo/:day/:yr', (req, res) => {

    const input = `${req.params.mo}/${req.params.day}/${req.params.yr}`
    const future = new Date(input)
    const today = new Date()
    const countdown = (future - today)

    const seconds = Math.floor(countdown / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    
    res.send({
      "input": input,
      "seconds": seconds % 60,
      "minutes": minutes % 60,
      "hours": hours % 24,
      "days": days % 365,
      "years": years,
    })
  })

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
});
