import React from 'react';
import axios from 'axios';

const AddStream = ({ currentStream, followedStreams, updateStreams }) => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
 
  // Handles following and unfollowing of streams
  const onClick = () => {
    let newStreams = followedStreams;

    if (followedStreams.includes(currentStream)) {
      console.log("stream unfollowed");
      newStreams = followedStreams.filter(stream => stream !== currentStream);
      updateStreams(newStreams);
    } else {
      console.log("stream followed");
      newStreams = [...followedStreams, currentStream]
      updateStreams(newStreams);
    }

    updateDatabase(newStreams);
  }
  
  // Posts the new set of followed streams to database
  const updateDatabase = async (streams) => {
    const response = await axios.post('/api/update-user-tags', { id: localStorage.getItem('userId'), tags: streams});
    console.log(response);
  }
   
    return (
      <>
      {user
        ? <button onClick={onClick}>{currentStream}</button>
        : <button>{currentStream}</button>}
      </>
    )
}

export default AddStream;