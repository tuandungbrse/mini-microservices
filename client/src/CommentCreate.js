import axios from 'axios';
import React, { useState } from 'react';

export default function CommentCreate({ postId }) {
  const [contents, setContents] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    await axios.post(`http://localhost:5000/posts/${postId}/comments`, {
      contents
    });
    setContents('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input
            className="form-control"
            value={contents}
            onChange={e => setContents(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
