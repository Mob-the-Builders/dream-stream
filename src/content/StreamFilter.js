import React from "react";
import TagButton from './TagButton';
import './StreamFilter.scss';

const StreamFilter = ({ tag, setTag, streams }) => {
  return (
    <aside className={'streamfilter'}>
      <h3>YOUR STREAMS</h3>
      
      
      <div className={'streamfilter__buttonlist'}>
        {/* <button id={'tagbutton--selected'}>puppy</button> */}
        {streams.map((a) => <TagButton buttonText={a} tag={tag} setTag={setTag}/>)}
      </div>



    </aside>
  )
}

export default StreamFilter;