import React, { useState } from 'react'
import axios from 'axios';
import './post.scss';

const CommentSection = ({ post, likePost }) => {
  const user = localStorage.getItem('user');

  const [hide, updateHide] = useState(true);
  const [comment, setComment] = useState('');
  const [commentList, updateComments] = useState(
    post.comments.data.length > 0 
    ? post.comments.data.map(t => <li> {t.userName}: {t.message}</li>) 
    : []);

  const onSubmit = (e) => {
    e.preventDefault();
    serverCall();
    updateComments([...commentList, <li>{user}: {comment}</li>]);
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


      <ul>
        {hide && commentList.length >= 2
        ? [commentList[commentList.length-2], commentList[commentList.length-1]] 
        : commentList}
      </ul>


        <div className={'post_commentsAndHeart'}>


          {commentList.length >= 3
          ? <button onClick={() => updateHide(!hide)}>Show {hide ? "more" : "less"}</button>
          : <></>}

          <div className={'post__heartContainer'}></div>

          <span className="post__likes-container-flex" onClick={() => likePost(post.likes)}>
            <span>❤️</span>
          <span>{post.likes.likes.length}</span>
          </span> 
        </div>
      
      {user
      ? <div className={'post__inputArea'}>
          <form onSubmit={onSubmit}>
            <input required type="text" id="comment" placeholder='Add a comment...' autocomplete='off'
              value={comment}
              onChange={e => setComment(e.target.value)} />
            <input type='submit' value='Post'/>
          </form>
        </div>
      : <></>}
     
    </div>
  )
}
export default CommentSection;