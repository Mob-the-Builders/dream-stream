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
  const onClick = async () => {

    

    const action = followedStreams.includes(currentStream)
    ? 'USER_REMOVE_STREAM'
    : 'USER_ADD_STREAM';
    
    console.log(currentStream);

    dispatch({
      type: action, payload: currentStream,
    });

    await updateDatabase([...followedStreams, currentStream]);
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
