const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

const posts = {};

app.use(cors());
app.use(express.json());

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, contents, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, contents, status });
  }

  if (type === 'CommentUpdated') {
    const { id, contents, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find(comment => {
      return comment.id === id;
    });

    comment.status = status;
    comment.contents = contents;
  }
};

app.get('/posts', async (req, res) => {
  res.send(posts);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);

  res.send({});
});

app.listen(8888, async () => {
  console.log(`app running on 8888`);
  const res = await axios.get('http://localhost:8000/events');

  for (let event of res.data) {
    console.log('Processing event:', event.type);

    handleEvent(event.type, event.data);
  }
});
