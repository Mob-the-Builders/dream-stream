import React, { useState , useEffect } from 'react'
import Post from './Post'
import axios from 'axios'
import './PostList.scss';
import { useSelector, useDispatch } from 'react-redux';

const PostList = ({ likePost, streams, updateStreams, liked }) => {
  // THIS STATE VVVVVV needs to be replaced for the redux store state

  const { posts, tags } = useSelector((state) => state.postList)
  const dispatch = useDispatch()

  // Handles server calls
  const getPostsByTag = async () => {
    const res = await axios.post("/api/get-posts-by-tag", { tags: tags[0] });
    console.log(res);
    return res.data.messages.reverse();
  }

  const getAllPosts = async () => {
    const res = await axios("/api/get-post");
    return res.data.messages.reverse();
  }

  // Updates displayed posts when filtering by tags
  useEffect(async () => {
    let load = posts;
    if (tags[0]) {  
      load = await getPostsByTag();
    } else {
      load = await getAllPosts();
    }
    dispatch({
      type:'POSTS_GET_ALL', payload: load
    });
  }, [tags]);  // LIKED var här

  return (
    <div className="post-list-container-flex">
      {posts.map((post, index)  => <Post key={index} post={post} likePost={likePost} streams={streams} updateStreams={updateStreams}/>)}
    </div>
  )
}

export default PostList;