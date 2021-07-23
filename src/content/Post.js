import React from 'react'
import './Post.scss';
import CommentSection from "./CommentSection";
import AddStream from "./AddStream";

const Post = ({ item, likePost, streams, updateStreams }) => {

  return (
    <article className="post">

      <div className={'post__descriptionArea'}>
        <span className="post__description">{item.description}</span>
        <div className={'post__user'}>
                <div className={'post__profilePic'}>🐤</div>
                {item.userName}
        </div>
      </div>
      
      <img src={item.image} alt="Dummy text" className="post__image"></img>

      <div className={'post__infoBar'}>
        {/* <p className="post__streams">Streams: {item.tags.map(t => t + ' ')}</p> */}
        <span className="post__streams">Streams: {item.tags.map(t => <AddStream currentStream={t} followedStreams={streams} updateStreams={updateStreams}/>)}</span>
        <span className="post__posted">Posted 2 hours ago</span>
      </div>

      <CommentSection post={item} likePost={likePost}/>
    </article>
  )
}
export default Post
