import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const FollowUnfollowStream = ({ currentStream }) => {
  const user = typeof window !== 'undefined'
    ? localStorage.getItem('user')
    : null;
  const followedStreams = useSelector((state) => state.user.streams);
  const dispatch = useDispatch();


  console.log(localStorage.getItem('userId'));

  // Posts followed streams to database
  const updateDatabase = async (tags) => {
    const res = await axios.post('/api/update-user-tags', { id: localStorage.getItem('userId'), tags });
    console.log(res);
  };


  // Handles following and unfollowing streams
  const onClick = async () => {
    const action =  'USER_REMOVE_STREAM';
    
    console.log(currentStream);
    dispatch({
      type: action, payload: currentStream,
    });

    await updateDatabase(followedStreams.filter((stream) => stream !== currentStream));
  };

  return (
    <>
      {user
        ? <button onClick={onClick}>{currentStream}</button>
        : <button>{currentStream}</button>}
    </>
  );
};

export default FollowUnfollowStream;
