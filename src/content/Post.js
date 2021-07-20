import React from 'react'
import './post.scss';
const Post = ({ item }) => {
  return (
    <article className="post">
      <p>{item.userName}</p>
      <span>Tags:{item.tags.map(t => t + ' ')}</span>
      <img src={item.image}></img>
      <br></br>
      <p>{item.description}</p>
      <p>Likes:{item.likes.map(l => l + ' ')}</p>
      <span>Nr of likes:{item.likes.length}</span>
      <p>Comments: {item.comments.map(t => t.user  + ': ' + t.text + ' ')}</p> 
    </article>
  )
}

export default Post
