import React, { useState } from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';
export default function App(props) {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />
      <hr></hr>
      <h1>Post List</h1>
      <PostList />
    </div>
  );
}
