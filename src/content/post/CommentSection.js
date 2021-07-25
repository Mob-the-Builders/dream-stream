import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './post.scss';
import Likes from './Likes';

const CommentSection = ({ post }) => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  const [hide, updateHide] = useState(true);
  const [comment, setComment] = useState('');
  const [commentList, updateCommentList] = useState([]);

  // Creates JSX object for commentList
  const createJSX = (comments) => comments.map((currentComment) => (
    <li>
      {' '}
      <b>{currentComment.userName}</b>
      :
      {' '}
      {currentComment.message}
    </li>
  ));

  // Updates comment list when post loads
  useEffect(() => {
    if (post.comments.data.length > 0) {
      updateCommentList(createJSX(post.comments.data));
    } else {
      updateCommentList([]);
    }
  }, [post]);

  // Handles server calls
  const getComments = async () => {
    const res = await axios.post('/api/get-comments-by-post-id', { id: post._id });
    return res.data.messages;
  };

  const postComment = async (userName, message) => {
    await axios.post('/api/create-comment', {
      userName,
      message,
      postId: post._id,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  // Handles submitting comment
  const onSubmit = async (e) => {
    e.preventDefault();
    const userName = user; const message = comment;
    const commentJSX = (
      <li>
        <b>{userName}</b>
        :
        {' '}
        {message}
      </li>
    );
    setComment('');
    updateCommentList([...commentList, commentJSX]);

    await postComment(userName, message);

    const allComments = await getComments();
    updateCommentList([...createJSX(allComments)]);
  };

  return (
    <div className="post__commentSection">
      <div className="post__commentsAndHeart">
        <ul>
          {hide && commentList.length >= 3
            ? [commentList[commentList.length - 3], commentList[commentList.length - 2], commentList[commentList.length - 1]]
            : commentList}
        </ul>

        <Likes post={post} />

      </div>

      {commentList.length >= 4
        ? (
          <button className="post__allComments" onClick={() => updateHide(!hide)}>
            View
            {hide ? ' all comments' : ' less'}
          </button>
        )
        : <></>}

      {user
        ? (
          <div className="post__inputArea">
            <form onSubmit={onSubmit}>
              <input
                className="post__inputArea-field"
                required
                type="text"
                id="comment"
                placeholder="Add a comment..."
                autoComplete="off"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onFocus={(e) => e.target.placeholder = ''}
                onBlur={(e) => e.target.placeholder = 'Add a comment...'}
              />
              <input className="post__inputArea-btn" type="submit" value="Post" />
            </form>
          </div>
        )
        : <></>}

    </div>
  );
};
export default CommentSection;
