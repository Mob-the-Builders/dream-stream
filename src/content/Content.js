import React, { useState, useEffect } from "react"
import StreamFilter from './StreamFilter';
import PostList from './PostList';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const Content = () => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  
  // Handles liking posts
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();
  const likePost = async (arr) => {
    let likes;
    if (!user) {
      return;
    }
    if (arr.likes.includes(user)) {
      likes = arr.likes.filter(like => like !== user);
    } else {
     likes = [...arr.likes, user]; 
    }
    const body = {id: arr._id, likes} 
    await axios.post('/api/update-post-likes', body);
    setLiked(!liked)
  }

  // Generates the "Your streams" section
  const [str, updateStreams] = useState([]);
  const streams = useSelector((state) => state.user.streams);
  
  const getUserTags = async () => {
    const res = await axios.post('/api/get-tags-user', { userName: user })
    return res.data.userTags
  };

  useEffect(async () => {
    if (user) {
      const response = await axios.post('/api/get-tags-user', { userName: user });
      const load = await getUserTags();
      dispatch({type: 'USER_GET_STREAMS', payload: load});
      updateStreams(response.data.userTags);
    }
  }, []);

  return (
      <main className={'main'}>
        {user
        ? <StreamFilter />
        : <></>}
        <PostList likePost={likePost} liked={liked} setLiked={setLiked} streams={streams} updateStreams={updateStreams}/>
      </main>
  )
}

export default Content
