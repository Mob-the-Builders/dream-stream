import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './post.scss';

const CommentSection = ({ post, likePost }) => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  const [hide, updateHide] = useState(true);
  const [comment, setComment] = useState('');
  const [commentList, updateComments] = useState([]);

  // Creates JSX object for commentList
  const createJSX = comments => comments.map(comment => <li> <b>{comment.userName}</b>: {comment.message}</li>);

  // Updates commentList when post loads
  useEffect(() => {
    if (post.comments.data.length > 0) {
      updateComments(createJSX(post.comments.data));
    } else {
      updateComments([]);
    }
  }, [post]);


  const getComments = async () => {
    const res = await axios.post("/api/get-comments-by-post-id", {id: post._id});
    return res.data.messages;
  }

  const postComment = async (userName, message) => {
    await axios.post("/api/create-comment", {
      "userName": userName,
      "message": message,
      "postId": post._id
      },
      { 
        headers: { 
        "Content-Type": "application/json"
        } 
      });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const userName = user; 
    const message = comment; 
    const commentJSX = <li><b>{userName}</b>: {message}</li>;
    setComment('');
    updateComments([...commentList, commentJSX]);
    await postComment(userName, message);
    
    const allComments = await getComments();
    updateComments([...createJSX(allComments)]);
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