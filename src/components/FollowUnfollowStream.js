import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const FollowUnfollowStream = ({ currentStream }) => {
  const followedStreams = useSelector((state) => state.user.streams);
  const dispatch = useDispatch();

  const [isFollowed, setFollowed] = useState(false);

  // Updates --selected class
  useEffect(() => {
    setFollowed(followedStreams.includes(currentStream));
  }, [followedStreams]);

  // Posts followed streams to database
  const updateDatabase = async (tags) => {
    await axios.post('/api/update-user-tags', { id: localStorage.getItem('userId'), tags });
  };

  // Handles following and unfollowing streams
  const onClick = async () => {
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
  };

  return (
    <>
      {isFollowed
        ? <button className="tagbutton tagbutton--selected" onClick={onClick} type="button">{currentStream}</button>
        : <button className="tagbutton" onClick={onClick} type="button">{currentStream}</button>}
    </>
  );
};

export default FollowUnfollowStream;
