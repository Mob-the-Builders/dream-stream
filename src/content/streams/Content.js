import React, { useEffect } from 'react';
import { navigate } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import FollowUnfollowStream from '../../components/FollowUnfollowStream';
import './streams.scss';

const Content = () => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  if (!user) {
    navigate('/login');
  }

  const popularStreams = ['cats', 'dogs', 'art', 'programming', 'ossian'];

  const { streams } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Get followed tags server call
  const getUserTags = async () => {
    const res = await axios.post('/api/get-tags-user', { userName: user });
    return res.data.userTags;
  };

  // Initialize followed tags state
  useEffect(async () => {
    if (user) {
      const payload = await getUserTags();
      console.log(payload);
      dispatch({ type: 'USER_GET_STREAMS', payload });
    }
  }, []);

  return (

    <main className="main">
      <h2>Click a stream button to subscribe to it</h2>
      <section className="streams">
        <div className="streams__container">
          <h3>Top Streams</h3>
          <div className="streams__buttonList">

            {popularStreams.map((tag) => <FollowUnfollowStream currentStream={tag} />)}

          </div>
        </div>
        <div className="streams__container">
          <h3>Your Streams</h3>
          <div className="streams__buttonList">

            {streams.map((tag) => <FollowUnfollowStream currentStream={tag} />)}

          </div>

        </div>
      </section>
    </main>

  );
};

export default Content;
