import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './post.scss';

const CommentSection = ({ post, likePost }) => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  const [hide, updateHide] = useState(true);
  const [comment, setComment] = useState('');
  const [commentList, updateComments] = useState([]);

  useEffect(() => {
    if (post.comments.data.length > 0) {
      updateComments(post.comments.data.map(t => <li> <b>{t.userName}</b>: {t.message}</li>));
    } else {
      updateComments([]);
    }
  }, [post]);

  const onSubmit = (e) => {
    e.preventDefault();
    postComments();
    updateComments([...commentList, <li><b>{user}</b>: {comment}</li>]);
    setComment('');
  }

  const postComments = async () => {
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

  const getComments = async () => {
    // Make API call in here later...
  }

  return (
    <div className={'post__commentSection'}>

        <div className={'post__commentsAndHeart'}>
          <ul>
            {hide && commentList.length >= 3
            ? [commentList[commentList.length-3], commentList[commentList.length-2], commentList[commentList.length-1]]
            : commentList}
          </ul>

          <div className={'post__heartAlignment'}>
            <div className={'post__heartContainer'}>
              <span className="post__likes-container-flex" onClick={() => likePost(post.likes)}>
                {/* <span>❤️</span> */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M20.205,4.791c-1.137-1.131-2.631-1.754-4.209-1.754c-1.483,0-2.892,0.552-3.996,1.558 c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412L12,21.414 l8.207-8.207C22.561,10.854,22.562,7.158,20.205,4.791z"/></svg>
                <span>{post.likes.likes.length}</span>
              </span> 
            </div>

          </div>

        </div>

      {commentList.length >= 4
        ? <button className={'post__allComments'} onClick={() => updateHide(!hide)}>View {hide ? "all comments" : "less"}</button>
        : <></>}
      
      {user
      ? <div className={'post__inputArea'}>
          <form onSubmit={onSubmit}>
            <input
              className={'post__inputArea-field'}required type="text" id="comment" placeholder='Add a comment...' autocomplete='off' value={comment}
              onChange={e => setComment(e.target.value)}
              onFocus={e => e.target.placeholder = ""}
              onBlur={e => e.target.placeholder = "Add a comment..."}
           />
            <input className={'post__inputArea-btn'} type='submit' value='Post'/>
          </form>
        </div>
      : <></>}
     
    </div>
  )
}
export default CommentSection;