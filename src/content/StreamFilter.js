import React from 'react';
import TagButton from './TagButton';
import './StreamFilter.scss';
import { useSelector, useDispatch } from 'react-redux';

const StreamFilter = () => {
  const streams = useSelector((state) => state.user.streams);
  return (
    <aside className="streamfilter">
      <h3>YOUR STREAMS</h3>

      <div className="streamfilter__buttonlist">
        {/* <button id={'tagbutton--selected'}>puppy</button> */}
        {streams.map((stream) => <TagButton buttonText={stream} />)}
      </div>
      {
      }

    </aside>
  );
};

export default StreamFilter;
