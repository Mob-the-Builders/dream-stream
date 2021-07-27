import { navigate } from '@reach/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.scss';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../../components/post/Post';
const [isLoading, setLoading] = useState(false);


const Content = () => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  if (!user) {
    navigate('/login');
  }

  const [postsSelected, setPostsSelected] = useState(true);

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

  const removeNull = (pay) => {
    const cleanPosts = [];
    console.log('remmove null');
    for (const prop in pay) {
      if (pay[prop].post !== null) {
        cleanPosts.push(pay[prop].post);
      }
    }
    return cleanPosts;
  };

  const createJSX = (postsJ) => postsJ.map((post) => <Post post={post} />);

  const init = async () => {
    const payload = await getPostUserMade();
    removeNull(payload);
    dispatch({
      type: 'POSTS_LOADED', payload,
    });
  };

  useEffect(() => {
    if (posts !== [] && postsSelected) {
      console.log('init useeffect');
      init();
    }
  }, []);

  // might use this I WAS HERE
  useEffect(() => {
    console.log(posts);
    console.log('Hello we are almost there!');
    const jsx = createJSX(posts);
    console.log(jsx);
    setJSX(jsx);
  }, [posts]); // posts

  const clickLiked = async () => {
    console.log('I clicked liked!');
    const res = await getPostsUserLiked();

    const payload = removeNull(res);
    console.log(payload);

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
        {jsx}
      </div>
    </main>
  );
};

export default Content;
