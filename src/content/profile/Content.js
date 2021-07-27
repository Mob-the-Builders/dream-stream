import { navigate } from '@reach/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.scss';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../../components/post/Post';

const Content = () => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  if (!user) {
    navigate('/login');
  }

  const [postsSelected, setPostsSelected] = useState(true);
  const [postList, updatePostList] = useState(<></>);

  const { posts } = useSelector((state) => state.postList);
  const dispatch = useDispatch();

  // Get liked posts from server
  const getPostsUserLiked = async () => {
    const res = await axios.post('/api/get-posts-user-liked', { userName: user });
    return res.data.messages.reverse();
  };

  // Get user made posts from server
  const getPostUserMade = async () => {
    const res = await axios.post('/api/get-post-by-name', { userName: user });
    return res.data.messages.reverse();
  };

  // Helper functions
  const dataCleaner = (postData) => {
    const cleanPosts = [];
    Object.values(postData).forEach((value) => {
      if (value.post !== null) {
        cleanPosts.push(value.post);
      }
    })
    return cleanPosts;
  };

  const createJSX = () => posts.map((post) => <Post post={post} />);

  // Initialize posts
  const init = async () => {
    const payload = await getPostUserMade();
    dispatch({
      type: 'POSTS_LOADED', payload,
    });
  };

  useEffect(() => {
    if (posts !== [] && postsSelected) {
      init();
    }
  }, []);

  // Update posts
  useEffect(() => {
    const jsx = createJSX(posts);
    updatePostList(jsx);
  }, [posts]);

  // Hande onClick
  const clickLiked = async () => {
    const res = await getPostsUserLiked();
    const payload = dataCleaner(res);

    dispatch({
      type: 'POSTS_LOADED', payload,
    });
    setPostsSelected(false);
  };

  const clickPosted = async () => {
    const payload = await getPostUserMade();
    dispatch({
      type: 'POSTS_LOADED', payload,
    });
    setPostsSelected(true);
  };

  return (
    <main className="main">

      <aside className="streamfilter">
        <div className="profile__buttonlist">
          <button onClick={clickPosted} className={`profile__button ${postsSelected ? 'profile__button--selected' : ''}`} type="button">Posts Made By You</button>
          <button onClick={clickLiked} className={`profile__button ${postsSelected ? '' : 'profile__button--selected'}`} type="button">Posts You Liked</button>
        </div>
      </aside>

      <div className="post-list-container-flex">
        {postList}
      </div>
    </main>
  );
};

export default Content;
