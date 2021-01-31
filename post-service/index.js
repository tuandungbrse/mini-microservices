const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const axios = require('axios');
const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = { id, title };

  await axios.post('http://localhost:8000/events', {
    type: 'PostCreated',
    data: {
      id,
      title
    }
  });

  res.status(201).send(posts[id]);
});

app.post('/events', async (req, res) => {});

app.listen(4000, () => {
  console.log(`post-service is running on 4000!`);
});
