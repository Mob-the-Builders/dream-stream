import React, { useState , useEffect } from 'react'
import Post from './Post'
import axios from 'axios'
import './PostList.scss';
import { useSelector, useDispatch } from 'react-redux';

const PostList = ({ tag, likePost, streams, updateStreams, liked }) => {
  // THIS STATE VVVVVV needs to be replaced for the redux store state

  const { posts, tags } = useSelector((state) => state.postList)
  const dispatch = useDispatch()

  const getPostsByTag = async () => {
    const res = await axios.post("/api/get-posts-by-tag", { tags: tags[0] });
    console.log(res);
    return res.data.messages.reverse();
  }

  const getAllPosts = async () => {
    const res = await axios("/api/get-post");
    return res.data.messages.reverse();
  }

  useEffect(async () => {
    console.log(tags);
    if (tags[0]) {  
      const load = await getPostsByTag();
      dispatch({
        type:'POSTS_GET_ALL', payload: load
      });
    } else {
      const load = await getAllPosts();
      dispatch({
        type:'POSTS_GET_ALL', payload: load
      });
    }
  }, [tags]);// LIKED var här

  const tagDispatch = () => {
    const tag = ['cats'];
    dispatch({
      type:'POSTS_GET_TAG', payload: tag
    });
  }

  const tester = async () => {
    const res = await getAllPosts();
    dispatch({
      type:'POSTS_GET_ALL', payload: res
    });
  }

  return (
    <div className="post-list-container-flex">
      <button onClick={() => tester()}> TESTER </button>
      {posts.map((post, index)  => <Post key={index} post={post} likePost={likePost} streams={streams} updateStreams={updateStreams}/>)}
    </div>
  )
}

export default PostList;