import React, { useState, useEffect } from "react"
import StreamFilter from './StreamFilter';
import PostList from './Postlist';
import axios from 'axios';

const Content = () => {
  const [tag, setTag] = useState(null);
  const user = localStorage.getItem('user');
  


  const likePost = async (arr) => {
    const user = localStorage.getItem('user');
    let likes;
    if(!user){
      return;
    }
    if(arr.likes.includes(user)){
      const index = arr.likes.indexOf(user); 
      arr.likes.splice(index, 1);
      likes = arr.likes;
    } else {
     likes = [...arr.likes, localStorage.getItem('user')]; 
    }
    const body = {id: arr._id, likes} 
    await axios.post('/api/update-post-likes', body);
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
