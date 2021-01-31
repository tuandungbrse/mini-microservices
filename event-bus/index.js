const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();

app.use(bodyParser.json());

app.post('/events', (req, res) => {
  const event = req.body;
  console.log(`new event ${event}`);
  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:5000/events', event);
  axios.post('http://localhost:8888/events', event);

  res.send({ status: 'OK' });
});

app.listen(8000, () => {
  console.log(`listening on post 8000`);
});
