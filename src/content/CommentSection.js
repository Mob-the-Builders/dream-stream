import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './post.scss';
import { useSelector, useDispatch } from 'react-redux';

const CommentSection = ({ post, likePost }) => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  const [hide, updateHide] = useState(true);
  const [comment, setComment] = useState('');
  const [commentList, updateComments] = useState([]);

  //working with redux now!
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  // console.log("post in commentsection " + post.comments.data);

  const testCommentGetApi = async () => {
   const res = await axios.post("/api/get-comments-by-post-id", {id: post._id});
    console.log(res);
    // dispatch({
    //   type:'POSTS_GET_ALL', payload: res
    // });

  }


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

  return (
    <div className={'post__commentSection'}>
        <div className={'post__commentsAndHeart'}>
          <button onClick={() => testCommentGetApi()}></button>
          
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