import React from "react"
import TagButton from './TagButton';

const tagArray = ['cats', 'dogs', 'test', 'abc'];

const StreamFilter = ({ setTag }) => {

  return (
    <aside>
      <h3>Your Streams</h3>
      {tagArray.map((a) => <TagButton buttonText={a} setTag={setTag}/>)}
    </aside>
  )
}

export default StreamFilter;