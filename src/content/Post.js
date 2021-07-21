import React from 'react'
import './post.scss';
const Post = ({ item }) => {

  //console.log(item.comments);

  return (
    <article className="post">
      <p>{item.userName}</p>
      <span>Tags:{item.tags.map(t => t + ' ')}</span>
      <img src={item.image} alt="Dummy text"></img>
      <br></br>
      <p>{item.description}</p>
      <p>Likes:{item.likes.map(l => l + ' ')}</p>
      <span>Nr of likes:{item.likes.length}</span>
      <br></br>
      <p>{item.comments.data.length > 0 ? item.comments.data.map(t => t.message )  : <></> }
      </p>
    </article>
// https://i.imgur.com/DwXN2qe.jpeg
  )
}
export default Post
