import React from 'react';
import './post.scss';
import CommentSection from './CommentSection';
import FollowUnfollowStream from '../FollowUnfollowStream';
import Likes from './Likes';

const Post = ({
  post,
}) => (
  <article className="post">
    <div className="post__descriptionArea">
      <span className="post__description">{post.description}</span>
      <div className="post__user">
        <div className="post__profilePic">🐤</div>
        {post.userName}
      </div>
    </div>
    <img src={post.image} alt="Dummy text" className="post__image" />
    <div className="post__infoBar">
      <span className="post__streams">
        Streams:
        {post.tags.map((tag) => <FollowUnfollowStream currentStream={tag} />)}
      </span>
      <span className="post__posted">Posted 2 hours ago</span>
    </div>
    <CommentSection post={post} />
  </article>
);
export default Post;
