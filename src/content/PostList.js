import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Post from './post/Post';
import './PostList.scss';

const PostList = () => {
  // THIS STATE VVVVVV needs to be replaced for the redux store state

  const { posts, tags } = useSelector((state) => state.postList);
  const dispatch = useDispatch();

  // Handles server calls
  const getPostsByTag = async () => {
    const res = await axios.post('/api/get-posts-by-tag', { tags: tags[0] });
    console.log(res);
    return res.data.messages.reverse();
  };

  const getAllPosts = async () => {
    const res = await axios('/api/get-post');
    console.log(res);
    return res.data.messages.reverse();
  };

  // Updates displayed posts when filtering by tags
  useEffect(async () => {
    let load = posts;
    if (tags[0]) {
      load = await getPostsByTag();
    } else {
      load = await getAllPosts();
    }
    dispatch({
      type: 'POSTS_LOADED', payload: load,
    });
  }, [tags]);

  return (
    <div className="post-list-container-flex">
      {posts.map((post) => <Post post={post} key={post._id}/>)}
    </div>
  );
};

export default PostList;
