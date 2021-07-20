import React from 'react'

const Post = ({ item }) => {
  return (
    <article>
      <p>{item.userName}</p>
      <p>{item.description}</p>
      <img src={item.image}></img>
      <br></br>
      <span>Tags:{item.tags.map(t => t + ' ')}</span>
      <p>Likes:{item.likes.map(l => l + ' ')}</p>
      <span>Nr of likes:{item.likes.length}</span>
      <p>Comments: {item.comments.map(t => t.user  + ': ' + t.text + ' ')}</p> 
    </article>
  )
}

export default Post
