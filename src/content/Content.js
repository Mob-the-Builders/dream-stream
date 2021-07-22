import React, { useState, useEffect } from "react"
import StreamFilter from './StreamFilter';
import PostList from './Postlist';

const Content = () => {
  const [tag, setTag] = useState(null);
  useEffect(() => {
    console.log(tag)
  }, [tag]);
  
  const updateTag = (text) => {
    if(tag === text){
      setTag(null)
    } else{
      setTag(text)
    }
  };
  
  return (
      <main className={'main'}>
        <StreamFilter setTag={updateTag}/>
        <PostList tag={tag}/>
      </main>
  )
}

export default Content
