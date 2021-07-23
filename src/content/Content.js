import React, { useState, useEffect } from "react"
import StreamFilter from './StreamFilter';
import PostList from './Postlist';
import axios from 'axios';

const Content = () => {
  const user = localStorage.getItem('user');
  const [liked, setLiked] = useState(false);
  
  const likePost = async (arr) => {
    let likes;
    if(!user){
      return;
    }
    if(arr.likes.includes(user)){
      const index = arr.likes.indexOf(user);
      // likes = arr.likes.filter(like => like !== user);
      arr.likes.splice(index, 1);
      likes = arr.likes;
    } else {
     likes = [...arr.likes, user]; 
    }
    const body = {id: arr._id, likes} 
    await axios.post('/api/update-post-likes', body);
    setLiked(!liked)
  }

  const [tag, setTag] = useState(null);
  const updateTag = (text) => {
    if(tag === text){
      setTag(null)
    } else{
      setTag(text)
    }
  };

  const [streams, updateStreams] = useState([]);
  useEffect(async () => {
    console.log(user);
    if (user) {
      const response = await axios.post('/api/get-tags-user', { userName: user });
      console.log(response.data.userTags);
      updateStreams(response.data.userTags);
    }
  }, []);

  return (
      <main className={'main'}>
        {user
        ? <StreamFilter setTag={updateTag} streams={streams}/>
        : <></>}
        <PostList tag={tag} likePost={likePost} liked={liked} setLiked={setLiked} streams={streams} updateStreams={updateStreams}/>
      </main>
  )
}

export default Content
