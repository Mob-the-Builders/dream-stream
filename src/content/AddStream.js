import React, { useState, useEffect } from "react"
import axios from 'axios';

const AddStream = ({ currentStream, followedStreams, updateStreams }) => {
  
  const onClick = () => {
    if (followedStreams.includes(currentStream)) {
      console.log("stream unfollowed");
      updateStreams(followedStreams.filter(stream => stream !== currentStream));
      console.log(followedStreams);
    } else {
      console.log("stream followed");
      updateStreams([...followedStreams, currentStream]);
      console.log(followedStreams);
    }
  }
  return (
    <button onClick={onClick}>{currentStream}</button>
  )
}

export default AddStream;