import React, { useState, useEffect } from "react"
import StreamFilter from './StreamFilter';
import PostList from './PostList';
import axios from 'axios';

const Content = () => {
  const user = localStorage.getItem('user');
  
  // Handles liking posts
  const [liked, setLiked] = useState(false);

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

  // Handles filtering feed by tags
  const [tag, setTag] = useState(null);

  const updateTag = (text) => {
    if (tag === text) {
      setTag(null)
    } else {
      setTag(text)
    }
  };

  // Generates the "Your streams" section
  const [streams, updateStreams] = useState([]);

  useEffect(async () => {
    if (user) {
      const response = await axios.post('/api/get-tags-user', { userName: user });
      console.log(response.data.userTags);
      updateStreams(response.data.userTags);
    }
  }, []);

  return (
      <main className={'main'}>
        {user
        ? <StreamFilter tag={tag} setTag={updateTag} streams={streams}/>
        : <></>}
        <PostList tag={tag} likePost={likePost} liked={liked} setLiked={setLiked} streams={streams} updateStreams={updateStreams}/>
      </main>
  )
}

export default Content
