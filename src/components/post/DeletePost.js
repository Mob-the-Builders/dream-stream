import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const DeletePost = ({ currentPost }) => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  const { posts } = useSelector((state) => state.postList);
  const dispatch = useDispatch();

  const serverCall = async () => {
    await axios.post('/api/delete-post', { id: currentPost._id });
  };

  const onClick = async () => {
    if (user === currentPost.userName) {
      await serverCall();
      const payload = posts.filter((post) => post !== currentPost);
      dispatch({
        type: 'POSTS_LOADED', payload,
      });
    }
  };

  return (
    <button className="deleteButton" onClick={onClick} type="button">X</button>
  );
};

export default DeletePost;
