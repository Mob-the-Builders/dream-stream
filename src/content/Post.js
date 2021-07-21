import React from 'react'
import './post.scss';
const Post = ({ item }) => {

  //console.log(item.comments);

  return (
    <article className="post">
      <p className="post__userName">{item.userName}</p>
      <img src={item.image} alt="Dummy text" className="post__image"></img>
      <p className="post__streams">Streams:{item.tags.map(t => t + ' ')}</p>
      <p className="post__description">{item.description}</p>
      <span className="post__likes-container-flex">
        {/* <p>Likes:{item.likes.map(l => l + ' ')}</p> */}
        {/* <FaBeer /> */}
        <span>❤️</span>
        <span className="post__likes__nr">{item.likes.length}</span>
      </span> 
      <p>{item.comments.data.length > 0 ? item.comments.data.map(t =>  t.userName + ': ' + t.message + ' ') : <></> }</p>
    </article>
// https://i.imgur.com/DwXN2qe.jpeg
  )
}
export default Post
