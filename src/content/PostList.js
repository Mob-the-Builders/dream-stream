import React, {useState , useEffect } from 'react'
import Post from './Post'
import axios from 'axios'
import './PostList.scss';

const PostList = ({ tag, likePost, streams, updateStreams, liked }) => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const res = await axios("/api/get-post");
    console.log(res);
    setPosts(res.data.messages.reverse());
  }

  const getPostsByTag = async () => {
    const res = await axios.post("/api/get-posts-by-tag", { tags: tag });
    console.log(res);
    setPosts(res.data.messages.reverse());
  }

  // Updates post list when filtering by tags or liking post
  useEffect(() => {
    if (tag) {  
      getPostsByTag();
    } else {
      getAllPosts();
    }
  }, [tag, liked]);

  return (
    <div className="post-list-container-flex">
      {posts.map((item , index)  => <Post key={index} item={item} likePost={likePost} streams={streams} updateStreams={updateStreams}/>)}
    </div>
  )
}

export default PostList
