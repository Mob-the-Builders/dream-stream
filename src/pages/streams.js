import React from 'react';
import { navigate } from '@reach/router';
import Menubar from '../components/Menubar';
import './streams.scss';
import FilterButton from '../content/streamFilter/FilterButton';


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
        <h2>Click a stream button to subscribe to it</h2>
        <section className="streams">
          <div className="streams__container">
            <h3>Top Streams</h3>
            <div className={'streams__buttonList'}>
            <button className={'tagbutton tagbutton--selected'}>Selected</button>
            <button className={'tagbutton tagbutton--selected'}>Selected</button>
              <FilterButton currentStream={'testing1'} />
              <FilterButton currentStream={'testing2'} />
              <FilterButton currentStream={'testing3'} />
              <button className={'tagbutton tagbutton--selected'}>Selected</button>
              <FilterButton currentStream={'testing4'} />
              <FilterButton currentStream={'testing5'} />
              <FilterButton currentStream={'testing6'} />
              <FilterButton currentStream={'testing7'} />
              <button className={'tagbutton tagbutton--selected'}>Selected</button>
              <button className={'tagbutton tagbutton--selected'}>Selected</button>
              <button className={'tagbutton tagbutton--selected'}>Selected</button>
              <FilterButton currentStream={'testing8'} />
              <FilterButton currentStream={'testing9'} />
              <FilterButton currentStream={'testing10'} />
              <FilterButton currentStream={'testing11'} />
              <FilterButton currentStream={'testing12'} />
            </div>
          </div>
          <div className="streams__container">
            <h3>Recommended Streams</h3>
            <div className={'streams__buttonList'}>
              <FilterButton currentStream={'testing13'} />
              <FilterButton currentStream={'testing14'} />
              <FilterButton currentStream={'testing15'} />
              <button className={'tagbutton tagbutton--selected'}>Selected</button>

              <FilterButton currentStream={'testing16'} />
              <button className={'tagbutton tagbutton--selected'}>Selected</button>
              <button className={'tagbutton tagbutton--selected'}>Selected</button>
              <FilterButton currentStream={'testing17'} />
              <FilterButton currentStream={'testing18'} />
              <FilterButton currentStream={'testing19'} />

              <FilterButton currentStream={'testing20'} />
              <button className={'tagbutton tagbutton--selected'}>Selected</button>
              <FilterButton currentStream={'testing21'} />
              <FilterButton currentStream={'testing22'} />
              <FilterButton currentStream={'testing23'} />
              <button className={'tagbutton tagbutton--selected'}>Selected</button>
              <FilterButton currentStream={'testing24'} />
              <FilterButton currentStream={'testing25'} />
            </div>
            
          </div>
        </section>
      </main>
    </div>
  );
};

export default Streams;
