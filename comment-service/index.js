const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const commentsByPostId = {};

app.use(bodyParser.json());

app.use(cors());
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const cid = randomBytes(6).toString('hex');
  const { contents } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: cid, contents: contents });
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});

app.listen(5000, () => {
  console.log(`post-service is running on 5000!`);
});
