import React from 'react';
import { navigate } from '@reach/router';
import Menubar from '../components/Menubar';
import './streams.scss';
import { useSelector } from 'react-redux';
import FollowUnfollowStream from '../content/streams/FollowUnfollowStream';


const Streams = () => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  if (!user) {
    navigate('/login');
  }

  const { streams } = useSelector((state) => state.user);

  console.log(streams);
  // if (!localStorage.getItem('user')) navigate('/login');

  return (
    <div className="top-container">
      <Menubar page="streams" />
      <main className="main">
        <h2>Click a stream button to subscribe to it</h2>
        <section className="streams">
          <div className="streams__container">
            <h3>Top Streams</h3>
            <div className={'streams__buttonList'}>
            <button className={'tagbutton tagbutton--selected'}>Selected</button>
            <button className={'tagbutton tagbutton--selected'}>Selected</button>
              {/* <FilterButton currentStream={'testing1'} /> */}


              <button className={'tagbutton tagbutton--selected'}>Selected</button>

   
            </div>
          </div>
          <div className="streams__container">
            <h3>Your Streams</h3>
            <div className={'streams__buttonList'}>
              {/* <button className={'tagbutton tagbutton--selected'}>Selected</button> */}
              {streams.map((tag) => <FollowUnfollowStream currentStream={tag} />)}
            </div>
            
          </div>
        </section>
      </main>
    </div>
  );
};

export default Streams;
