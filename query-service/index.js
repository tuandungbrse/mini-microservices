const express = require('express');
const cors = require('cors');

const app = express();

const posts = {};

app.use(cors());
app.use(express.json());

app.get('/posts', async (req, res) => {
  res.send(posts);
});

app.post('/events', async (req, res) => {
  const { type, data } = req.body;
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, contents, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, contents });
  }
  console.log(type, data);
  res.send({});
});

app.listen(6000, () => {
  console.log(`app running on 6000`);
});
