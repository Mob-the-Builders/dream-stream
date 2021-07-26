import React from 'react';
import './StreamFilter.scss';
import { useSelector } from 'react-redux';
import FilterButton from './FilterButton';

const StreamFilter = () => {
  const { streams } = useSelector((state) => state.user);
  return (
    <aside className="streamfilter">
      <h3>YOUR STREAMS</h3>

      <div className="streamfilter__buttonlist">
        {streams.map((stream, index) => <FilterButton currentStream={stream} key={index}/>)}

        <FilterButton currentStream={'Testing'}/>
        <FilterButton currentStream={'Testing'}/>
        <FilterButton currentStream={'Testing'}/>
        <FilterButton currentStream={'Testing'}/>
      </div>

    </aside>
  );
};

export default StreamFilter;
