import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const AddStream = ({ currentStream }) => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  const followedStreams = useSelector((state) => state.user.streams)
  
  // Posts the new set of followed streams to database
  const updateDatabase = async (streams) => {
    const response = await axios.post('/api/update-user-tags', { id: localStorage.getItem('userId'), tags: streams });
    console.log(response);
  };

  // Handles following and unfollowing of streams
  const onClick = () => {

    const action = followedStreams.includes(currentStream) 
    ? 'USER_REMOVE_STREAM' 
    : 'USER_ADD_STREAM';

    useDispatch({
      type: action, payload: currentStream,
    });

    updateDatabase(followedStreams);
  };

  return (
    <>
      {user
        ? <button onClick={onClick}>{currentStream}</button>
        : <button>{currentStream}</button>}
    </>
  );
};

export default AddStream;
