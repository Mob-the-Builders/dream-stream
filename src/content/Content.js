import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import StreamFilter from './StreamFilter';
import PostList from './PostList';

const Content = () => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  
  // Generates the "Your streams" section
  const [str, updateStreams] = useState([]);
  const streams = useSelector((state) => state.user.streams);
  const dispatch = useDispatch();

  const getUserTags = async () => {
    const res = await axios.post('/api/get-tags-user', { userName: user });
    return res.data.userTags;
  };

  useEffect(async () => {
    if (user) {
      const response = await axios.post('/api/get-tags-user', { userName: user });
      const load = await getUserTags();
      dispatch({ type: 'USER_GET_STREAMS', payload: load });
      console.log(response.data.userTags);
    }
  }, []);

  return (
    <main className="main">
      {user
        ? <StreamFilter />
        : <></>}
      <PostList />
    </main>
  );
};

export default Content;
