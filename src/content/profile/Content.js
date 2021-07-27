import { navigate } from '@reach/router';
import Post from '../../components/post/Post';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.scss';
import { useSelector, useDispatch } from 'react-redux';

const Content = () => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  if (!user) {
    navigate('/login');
  }

  const [buttonChoice, setButtonChoice] = useState('posted');

  const [jsx, setJSX] = useState(<></>);

  const { posts } = useSelector((state) => state.postList);

  const dispatch = useDispatch();

  // Get liked posts from server
  const getPostsUserLiked = async () => {
    const res = await axios.post('/api/get-posts-user-liked', { userName: user });
    return res.data.messages.reverse();
  };

  const getPostUserMade = async () => {
    const res = await axios.post('/api/get-post-by-name', { userName: user });
    return res.data.messages.reverse();
  };

  const createJSX = (p, a) => (a ? (p.map((post) => <Post post={post.post} />)) : (p.map((post) => <Post post={post} />)));

  // Load posts
  useEffect(async () => {
    const payload = await getPostUserMade();

    dispatch({
      type: 'POSTS_LOADED', payload,
    });
    const jsx = createJSX(payload, false);
    setJSX(jsx);
  }, []);

  const clickLiked = async () => {
    const payload = await getPostsUserLiked();
    dispatch({
      type: 'POSTS_LOADED', payload,
    });
    setButtonChoice('liked');
    const jsx = createJSX(payload, true);
    setJSX(jsx);
  };

  const clickPosted = async () => {
    const payload = await getPostUserMade();
    dispatch({
      type: 'POSTS_LOADED', payload,
    });
    setButtonChoice('posted');
    const jsx = createJSX(payload, false);
    setJSX(jsx);
  };

  return (
    <main className="main">

      <aside className="streamfilter">
        <div className="profile__buttonlist">
          <button onClick={clickPosted} className={`profile__button ${buttonChoice === 'posted' ? 'profile__button--selected' : ''}`}>Posts Made By You</button>
          <button onClick={clickLiked} className={`profile__button ${buttonChoice === 'posted' ? '' : 'profile__button--selected'}`}>Posts You Liked</button>
        </div>
      </aside>

      <div className="post-list-container-flex">
        {jsx}
      </div>
    </main>
  );
};

export default Content;
