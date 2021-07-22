import React, { useState, useEffect } from "react"
import StreamFilter from './StreamFilter';
import PostList from './Postlist';
import axios from 'axios';

const Content = () => {
  const [tag, setTag] = useState(null);
  // useEffect(() => {
  //   console.log(tag)
  // }, [tag]);
  const user = localStorage.getItem('user');
  
  const likePost = async (arr) => {
    const user = localStorage.getItem('user');
    const id = arr._id;
    if(!user){
      return;
    }
    
    if(arr.likes.includes(user)){
      return;
    }
    const likes = [...arr.likes, localStorage.getItem('user')];
    const body = {id, likes} 
    console.log(body)
    const data = await axios.post('/api/update-post-likes', body);
    console.log(data);
  }

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
    const response = await axios.post('/api/get-tags-user', { userName: user });
    console.log(response.data.userTags);
    updateStreams(response.data.userTags);
  }, []);

  
  return (
      <main className={'main'}>
        {user
        ? <StreamFilter setTag={updateTag} streams={streams}/>
        : <></>}
        <PostList tag={tag} likePost={likePost} streams={streams} updateStreams={updateStreams}/>
      </main>
  )
}

export default Content
