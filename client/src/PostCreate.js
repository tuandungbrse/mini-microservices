import React, { useState } from 'react';
import axios from 'axios';

export default function PostCreate(props) {
  const [title, setTitle] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    await axios.post('http://localhost:4000/posts', {
      title
    });
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
