import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const FollowUnfollowStream = ({ currentStream }) => {
  const user = typeof window !== 'undefined'
    ? localStorage.getItem('user')
    : null;
  const followedStreams = useSelector((state) => state.user.streams);
  const dispatch = useDispatch();

  // Posts followed streams to database
  const updateDatabase = async () => {
    await axios.post('/api/update-user-tags', { id: localStorage.getItem('userId'), tags: followedStreams });
  };

  // Handles following and unfollowing streams
  const onClick = async () => {
    const action = followedStreams.includes(currentStream)
      ? 'USER_REMOVE_STREAM'
      : 'USER_ADD_STREAM';

    dispatch({
      type: action, payload: currentStream,
    });

    await updateDatabase();
  };

  return (
    <>
      {user
        ? <button onClick={onClick} type="button">{currentStream}</button>
        : <button type="button">{currentStream}</button>}
    </>
  );
};

export default FollowUnfollowStream;
