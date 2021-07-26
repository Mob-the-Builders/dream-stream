import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import StreamFilter from './streamFilter/StreamFilter';
import PostList from './PostList';

const Content = () => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const dispatch = useDispatch();

  // Get followed tags server call
  const getUserTags = async () => {
    const res = await axios.post('/api/get-tags-user', { userName: user });
    return res.data.userTags;
  };

  // Updates followed tags after server call is made
  useEffect(async () => {
    if (user) {
      //await axios.post('/api/get-tags-user', { userName: user });
      const payload = await getUserTags();
      console.log(payload);
      dispatch({ type: 'USER_GET_STREAMS', payload });
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
