import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const FollowStreams = ({ currentStream }) => {
  const user = typeof window !== 'undefined'
    ? localStorage.getItem('user')
    : null;

  const followedStreams = useSelector((state) => state.user.streams);
  const dispatch = useDispatch();

  const [isFollowed, setFollowed] = useState(false);

  // Updates --selected class
  useEffect(()=>{
    setFollowed(followedStreams.includes(currentStream));
  },[followedStreams]);

  // Posts followed streams to database
  const updateDatabase = async (tags) => {
    const res = await axios.post('/api/update-user-tags', { id: localStorage.getItem('userId'), tags });
    console.log(res);
  };

  // Handles following and unfollowing streams
  const onClick = () => {
    if (isFollowed) {
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
      {isFollowed
        ? <button className="tagbutton tagbutton--selected" onClick={onClick}>{currentStream}</button>
        : <button className="tagbutton" onClick={onClick}>{currentStream}</button>}
    </>
  );
};

export default FollowStreams;
