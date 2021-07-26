import { navigate } from '@reach/router';
import React, { useState, useEffect } from 'react';
import Post from '../content/post/Post';
import Menubar from '../components/Menubar';

import axios from 'axios';

import './profile.scss';

import { useSelector, useDispatch } from 'react-redux';


const Profile = () => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  if (!user) {
    navigate('/login');
  }

  const [buttonChoice, setButtonChoice] = useState("liked")

  const [jsx, setJSX] = useState(<></>)

  const { posts } = useSelector((state) => state.postList);

  const dispatch = useDispatch();

  // Get liked posts from server
  const getPostsUserLiked = async () => {
    const res = await axios.post('/api/get-posts-user-liked', { userName: user });
    console.log("user liked res");
    console.log(res);
    return res.data.messages.reverse();
  };

  const getPostUserMade = async () => {
    const res = await axios.post('/api/get-post-by-name', { userName: user });
    console.log("user made res ");
    console.log(res);
    return res.data.messages.reverse();
  }


  const createJSX = (p, a) => a ? (p.map((post) => <Post post={post.post} />)) :  (p.map((post) => <Post post={post} />));

  // Load posts 
  useEffect(async () => {
    const  payload = await getPostUserMade();

    dispatch({
      type: 'POSTS_LOADED', payload: payload,
    });
    const jsx = createJSX(payload, false);
    setJSX(jsx);

  },[])

  const clickLiked = async () => {
    const payload = await getPostsUserLiked();
    dispatch({
      type: 'POSTS_LOADED', payload: payload,
    });
    setButtonChoice("liked");
    const jsx = createJSX(payload, true);
    setJSX(jsx);

  }

  const clickPosted = async () => {
    const payload = await getPostUserMade();
    dispatch({
      type: 'POSTS_LOADED', payload: payload,
    });
    setButtonChoice("posted");
    const jsx = createJSX(payload, false);
    setJSX(jsx);


  }

  return (
    <div className="top-container">
      <Menubar page="profile" />
      <main className="main">

        {/* {user
        ? <StreamFilter tag={tag} setTag={updateTag} streams={streams}/>
        : <></>} */}

        <aside className="streamfilter">
          {/* <h3>YOUR STREAMS</h3> */}
          <div className="profile__buttonlist">
            <button onClick={clickPosted} className="profile__button--selected">Posts Made By You</button>
            <button onClick={clickLiked} className="profile__button profile__button">Posts You Liked</button>

            {/* {streams.map((a) => <TagButton buttonText={a} tag={tag} setTag={setTag}/>)} */}
          </div>
        </aside>
        
        <div className="post-list-container-flex">
          {/* {posts.map(post => {console.log('lol:', post.post)})} */}
          {jsx}
        </div>
        {/* <PostList liked={liked} setLiked={setLiked} streams={streamsTag} updateStreamsTag={updateStreamsTag} /> */}
        {/* <PostList liked={liked} setLiked={setLiked} streams={streamsLike} updateStreamsLike={updateStreamsLike} /> */}

      </main>
    </div>
  );
};

export default Profile;
