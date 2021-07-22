import React, { useState, useEffect } from "react"
import TagButton from './TagButton';
import axios from 'axios';

const StreamFilter = ({ setTag, streams }) => {
  return (
    <aside>
      <h3>Your Streams</h3>
      {streams.map((a) => <TagButton buttonText={a} setTag={setTag}/>)}
    </aside>
  )
}

export default StreamFilter;