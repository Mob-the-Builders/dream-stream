import { navigate } from '@reach/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StreamFilter from '../content/streamFilter/StreamFilter';
import PostList from '../content/PostList';
import Menubar from '../components/Menubar';
import './profile.scss';

const Profile = () => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  if (!user) {
    navigate('/login');
  }

  // Handles liking posts
  const [liked, setLiked] = useState(false);

  const likePost = async (arr) => {
    let likes;
    if (!user) {
      return;
    }
    if (arr.likes.includes(user)) {
      likes = arr.likes.filter((like) => like !== user);
    } else {
      likes = [...arr.likes, user];
    }
    const body = { id: arr._id, likes };
    await axios.post('/api/update-post-likes', body);
    setLiked(!liked);
  };

  // Generates the "Your streams" section
  const [streams, updateStreams] = useState([]);

  useEffect(async () => {
    if (user) {
      const response = await axios.post('/api/get-tags-user', { userName: user });
      console.log(response.data.userTags);
      updateStreams(response.data.userTags);
    }
  }, []);

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

        <PostList likePost={likePost} liked={liked} setLiked={setLiked} streams={streams} updateStreams={updateStreams} />

      </main>
    </div>
  );
};

export default Profile;
