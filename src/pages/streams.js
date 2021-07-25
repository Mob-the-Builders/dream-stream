import React from 'react';
import { navigate } from '@reach/router';
import Menubar from '../components/Menubar';
import './streams.scss';

const Streams = () => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  if (!user) {
    navigate('/login');
  }
  // if (!localStorage.getItem('user')) navigate('/login');

  return (
    <div className="top-container">
      <Menubar page="streams" />
      <main className="main">
        <h3>Click a stream button to subscribe to it</h3>
        <section className="streams">
          <div className="streams__container" />
          <div className="streams__container" />
        </section>
      </main>
    </div>
  );
};

export default Streams;
