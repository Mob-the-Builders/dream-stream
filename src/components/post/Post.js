import React, { useEffect, useState } from 'react';
import './post.scss';
import TimeAgo from 'react-timeago';
import CommentSection from './CommentSection';
import FollowUnfollowStream from './FollowUnfollowStream';
import DeletePost from './DeletePost';

const Post = ({ post }) => {
  const [postTags, setPostTags] = useState([]);
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  useEffect(() => {
    setPostTags(post.tags);
  }, [post]);

  return (
    <article className="post">

      <div className="post__descriptionArea">
        <span className="post__description">{post.description}</span>
        <div className="post__user">
          <div className="post__profilePic">😊</div>
          {post.userName}
        </div>
      </div>

      {user === post.userName 
      ? <DeletePost currentPost={post} />
      : <></> }

      <img src={post.image} alt="Loading..." className="post__image" />
      <div className="post__infoBar">
        <span className="post__streams">
          Streams:
          {postTags.map((tag) => <FollowUnfollowStream currentStream={tag} />)}
        </span>
        <span className="post__posted"><TimeAgo date={post.date} /></span>
      </div>

      <CommentSection post={post} />

    </article>
  );
};

export default Post;
