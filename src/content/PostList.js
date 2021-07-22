import React, {useState , useEffect } from 'react'
import Post from './Post'
import axios from 'axios'
import './PostList.scss';
/*
    userName: String!
    description: String!
    image: String!
    tags: [String!]
    likes: [String!]
*/

const PostList = ({ tag }) => {
  console.log("IN POSTLIST", tag);
  const [status, setStatus ] = useState('loading...');    
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if(!tag){
      axios("/api/get-post")
        .then(res => {
          console.log('Hello in axios get post!')
          console.log(res);
          setPosts(res.data.messages.reverse());
          setStatus("loaded");
        })
    } else {
      axios.post("/api/get-posts-by-tag", { tags: tag })
      .then(result => {
        if (result.status !== 200) {
          console.error("Error loading posts");
          console.error(result);
          return;
        }
      setPosts(result.data.messages.reverse());
    });
    }
  }, [tag]);


  return (
    <div className="post-list-container-flex">
      {posts && posts.map((item , index)  => <Post key={index} item={item} />)}
    </div>
  )
}

export default PostList
