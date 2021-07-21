import React, {useState , useEffect } from 'react'
import Post from './Post'
import axios from 'axios'
/*
    userName: String!
    description: String!
    image: String!
    tags: [String!]
    likes: [String!]
*/

const PostList = () => {
  const [status, setStatus ] = useState('loading...');    
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    console.log("CAN YOU SEE ME");
    if (status !== "loading...") return;
    axios("/api/get-post").then(result => {
      if (result.status !== 200) {
        console.error("Error loading posts");
        console.error(result);
        return;
      }
      console.log(result.data);
      setPosts(result.data.messages.reverse());
      setStatus("loaded");
    });
  }, [status]);

  return (
    <div>
      {posts && posts.map((item,index)  => <Post key={index} item={item} />)}
    </div>
  )
}

export default PostList
