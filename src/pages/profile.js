import { navigate } from '@reach/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../content/post/Post';
import StreamFilter from '../content/streamFilter/StreamFilter';
import PostList from '../content/PostList';
import Menubar from '../components/Menubar';
import './profile.scss';
import { useSelector, useDispatch } from 'react-redux';



const Profile = () => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  if (!user) {
    navigate('/login');
  }

  const [buttonChoice, setButtonChoice] = useState("liked")

  const { liked, posts } = useSelector((state) => state.postList);
  const dispatch = useDispatch();

  const getPostsUserLiked = async () => {
    const res = await axios.post('/api/get-posts-user-liked', { userName: user });
    console.log(res);
    return res.data.messages.reverse();
  };

    // Updates displayed posts when filtering by tags
    useEffect(async () => {
      let load = posts;
      // if (tags[0]) {
      //   load = await getPostsByTag();
      // } else {
      //   load = await getAllPosts();
      // }
      load = await getPostsUserLiked();
      dispatch({
        type: 'POSTS_LOADED', payload: load,
      });
      console.log('USEEFFECT LOAD:', load)
      console.log("USEEFFECT", posts);
    }, [buttonChoice]); // LIKED var här


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
            <button className="profile__button profile__button--selected">Posts You Liked</button>
            <button className="profile__button">Posts Made By You</button>

            {/* {streams.map((a) => <TagButton buttonText={a} tag={tag} setTag={setTag}/>)} */}
          </div>
        </aside>
        
        <div className="post-list-container-flex">
          {console.log('in JSX profile', posts)}
          {posts.map(post => {console.log('lol:', post.post)})}
          {/* {posts.map((post, index) => <Post key={index} post={post} />)} */}
        </div>
        {/* <PostList liked={liked} setLiked={setLiked} streams={streamsTag} updateStreamsTag={updateStreamsTag} /> */}
        {/* <PostList liked={liked} setLiked={setLiked} streams={streamsLike} updateStreamsLike={updateStreamsLike} /> */}

      </main>
    </div>
  );
};

export default Profile;
