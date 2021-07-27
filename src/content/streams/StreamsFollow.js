import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const FollowStreams = ({ currentStream }) => {
  const user = typeof window !== 'undefined'
    ? localStorage.getItem('user')
    : null;

  const followedStreams = useSelector((state) => state.user.streams);
  const dispatch = useDispatch();

  // Posts followed streams to database
  const updateDatabase = async (tags) => {
    const res = await axios.post('/api/update-user-tags', { id: localStorage.getItem('userId'), tags });
    console.log(res);
  };

  // Handles following and unfollowing streams
  const onClick = () => {

    if (followedStreams.includes(currentStream)) {
      dispatch({
        type: 'USER_REMOVE_STREAM', payload: currentStream,
      });

     updateDatabase(followedStreams.filter((stream) => stream !== currentStream));

    } else {
      dispatch({
        type: 'USER_ADD_STREAM', payload: currentStream,
      });
     updateDatabase([...followedStreams, currentStream]);
    }

    console.log(currentStream);
    
  };

  return (
    <>
      {user
        ? <button className={'tagbutton'} onClick={onClick}>{currentStream}</button>
        : <button className={'tagbutton'}>{currentStream}</button>}
    </>
  );
};

export default FollowStreams;
