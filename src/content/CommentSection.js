import React, { useState } from 'react'
import axios from 'axios';
import './post.scss';

const CommentSection = ({ post, likePost }) => {
  const user = localStorage.getItem('user');

  const [hide, updateHide] = useState(true);
  const [comment, setComment] = useState('');
  const [commentList, updateComments] = useState(
    post.comments.data.length > 0 
    ? post.comments.data.map(t => <li> <b>{t.userName}</b>: {t.message}</li>) 
    : []);

  const onSubmit = (e) => {
    e.preventDefault();
    serverCall();
    // updateComments([...commentList, <li>{user}: {comment}</li>]);
    updateComments([...commentList, <li><b>{user}</b>: {comment}</li>]);
    setComment('');
  }

  const serverCall = async () => {
    await axios.post("/api/create-comment", {
      "userName": user,
      "message": comment,
      "postId": post._id
      },
      { 
        headers: { 
        "Content-Type": "application/json"
        } 
      });
  }

  return (
    <div className={'post__commentSection'}>

        <div className={'post__commentsAndHeart'}>
          
          <ul>
            {/* {hide && commentList.length >= 2
            ? [commentList[commentList.length-2], commentList[commentList.length-1]]  */}
            {hide && commentList.length >= 3
            ? [commentList[commentList.length-3], commentList[commentList.length-2], commentList[commentList.length-1]]
            : commentList}
          </ul>

          <div className={'post__heartContainer'}>
            <span className="post__likes-container-flex" onClick={() => likePost(post.likes)}>
              <span>❤️</span>
              <span>{post.likes.likes.length}</span>
            </span> 
          </div>
        </div>

      {commentList.length >= 4
        ? <button onClick={() => updateHide(!hide)}>Show {hide ? "all comments" : "less"}</button>
        : <></>}
      
      {user
      ? <div className={'post__inputArea'}>
          <form onSubmit={onSubmit}>
            <input className={'post__inputArea-field'} required type="text" id="comment" placeholder='Add a comment...' autocomplete='off'
              value={comment}
              onChange={e => setComment(e.target.value)} />
            <input className={'post__inputArea-btn'} type='submit' value='Post'/>
          </form>
        </div>
      : <></>}
     
    </div>
  )
}
export default CommentSection;