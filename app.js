const express = require('express');
const app = express();
const data = require('./data.json');
const cors = require('cors')
const PORT = process.env.PORT || 3000


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
    months30 = ['4', '6',' 9', '11'] 

    let validDays = months30.includes(req.params.mo) ? 30 : 31

    if (req.params.mo === '2') {
      if (parseInt(req.params.yr) % 4 === 0){
        validDays = 29
      } else { 
        validDays = 28
      }
    }

    if (req.params.mo > 12 || req.params.day > validDays || !req.params.yr) {
      res.send("Error in your date input, use the format MM/DD/YYYY. Months with 30 days: 4, 6, 9, 11. Month 2 has 28 days normally, and 29 days in years divisible by 4. All other months have 31 days.")
    }

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

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
