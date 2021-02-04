const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://localhost:8000/events', {
      type: 'CommentModerated',
      data: {
        ...data,
        status: status
      }
    });
  }
  res.send({});
});

app.listen(8040, () => console.log(`service is running on port 8040!`));
