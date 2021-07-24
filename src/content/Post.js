import React from 'react'
import './post.scss';
import CommentSection from "./CommentSection";
import AddStream from "./AddStream";
import { useSelector, useDispatch } from 'react-redux';


const Post = ({ post, likePost, streams, updateStreams }) => {

  //working with redux now!
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <article className="post">

      <div className={'post__descriptionArea'}>
        <span className="post__description">{post.description}</span>
        <div className={'post__user'}>
          <div className={'post__profilePic'}>🐤</div>
          {post.userName}
        </div>
      </div>
      <img src={post.image} alt="Dummy text" className="post__image"></img>

      <div className={'post__infoBar'}>
        <span className="post__streams">Streams: {post.tags.map(t => 
        <AddStream currentStream={t} followedStreams={streams} updateStreams={updateStreams}/>)}</span>
        <span className="post__posted">Posted 2 hours ago</span>
      </div>
      <CommentSection post={post} likePost={likePost}/>
    </article>
  )
}
export default Post
