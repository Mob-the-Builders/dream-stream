import React from 'react'
import './post.scss';
const Post = ({ item, likePost }) => {

  //console.log(item.comments);

  return (
    <article className="post">
      <p className="post__userName">{item.userName}</p>
      <img src={item.image} alt="Dummy text" className="post__image"></img>
      <p className="post__streams">Streams:{item.tags.map(t => t + ' ')}</p>
      <p className="post__description">{item.description}</p>

      <span className="post__likes-container-flex" onClick={() => likePost('LOL')}>
        {/* <p>Likes:{item.likes.map(l => l + ' ')}</p> */}
        {/* <FaBeer /> */}
        <span>❤️</span>
        <span className="post__likes__nr">{item.likes.length}</span>
      </span> 

      <ul>
        {item.comments.data.length > 0 
      ? item.comments.data.map(t => <li> {t.userName}
      : {t.message}</li>) : <></> }
      </ul>

      <form>
        <input type="text" id="comment" placeholder='Add a comment...'/>
        <input type='submit' value='Post'/>
     </form>
    </article>
// https://i.imgur.com/DwXN2qe.jpeg
  )
}
export default Post
