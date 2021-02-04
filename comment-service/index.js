const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const commentsByPostId = {};
const axios = require('axios');
app.use(bodyParser.json());

app.use(cors());
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const cid = randomBytes(6).toString('hex');
  const { contents } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: cid, contents: contents, status: 'pending' });
  commentsByPostId[req.params.id] = comments;

  await axios.post('http://localhost:8000/events', {
    type: 'CommentCreated',
    data: {
      id: cid,
      postId: req.params.id,
      contents: contents,
      status: 'pending'
    }
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { postId, id, status, contents } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find(comment => comment.id === id);
    comment.status = status;

    await axios.post('http://localhost:8000/events', {
      type: 'CommentUpdated',
      data: {
        ...data
      }
    });
  }
  res.send({});
});

app.listen(5000, () => {
  console.log(`post-service is running on 5000!`);
});
