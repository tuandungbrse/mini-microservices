import React from 'react';
// import axios from 'axios';

export default function CommentList({ comments }) {
  // const [comments, setComments] = useState([]);

  // const fetchComments = async () => {
  //   const res = await axios.get(
  //     `http://localhost:5000/posts/${postId}/comments`
  //   );
  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchComments();
  // }, []);

  const renderComments = comments.map(comment => {
    return <li key={comment.id}>{comment.contents}</li>;
  });

  return <ul>{renderComments}</ul>;
}
