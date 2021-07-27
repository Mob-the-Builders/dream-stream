import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const DeletePost = ({ currentPost }) => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  const { posts } = useSelector((state) => state.postList);
  const dispatch = useDispatch();
  

  const serverCall = async () => {
    const res = await axios.post('/api/delete-post', { id: currentPost._id });
    console.log(res);
  };

  const onClick = async () => {
    console.log(posts);
    console.log();

    if (user === currentPost.userName) {
      await serverCall();
      const payload = posts.filter((post) => post !== currentPost);
      dispatch({
        type: 'POSTS_LOADED', payload
      });

    } else {
      console.log('not your post');
    }
  };

  return (
    <button onClick={onClick}>X</button>
  );
};

export default DeletePost;
