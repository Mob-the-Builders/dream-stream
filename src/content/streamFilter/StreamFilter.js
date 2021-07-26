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
        {/* <button id={'tagbutton--selected'}>puppy</button> */}
        {streams.map((stream) => <FilterButton currentStream={stream} />)}
      </div>

    </aside>
  );
};

export default StreamFilter;
