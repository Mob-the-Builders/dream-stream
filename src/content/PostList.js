import React, { useState , useEffect } from 'react'
import Post from './Post'
import axios from 'axios'
import './PostList.scss';
import { useSelector, useDispatch } from 'react-redux';
import { postsGetAll } from '../state/app';

const PostList = ({ tag, likePost, streams, updateStreams, liked, getPosts, store }) => {
  // THIS STATE VVVVVV needs to be replaced for the redux store state
  const [posts, setPosts] = useState([]);
  const babas = useSelector((state) => state)
  const babasAdd = useSelector((state) => state.add)
  const dispatch = useDispatch()
  // dispatch({type : 'ADD'})

  console.log(babas)
  // console.log(postsRedux);
  // console.log(getPosts);
  // This should still happen
  const getAllPosts = async () => {
    const res = await axios("/api/get-post");

    // Instead of setPosts, a reducer should take care of it
    setPosts(res.data.messages.reverse());
  }

  // ignore for now!
  const getPostsByTag = async () => {
    const res = await axios.post("/api/get-posts-by-tag", { tags: tag });
    console.log(res);
    setPosts(res.data.messages.reverse());
  }

  // Updates post list when filtering by tags or liking post
  // This useEffect should probably still do the same thing? 
  useEffect(() => {
    if (tag) {  
      getPostsByTag();
    } else {
      getAllPosts();
    }
  }, [tag, liked]);
  
  const getReduxPosts = async () => {
    const res = await axios("/api/get-post");

    // Instead of setPosts, a reducer should take care of it
    return res.data.messages.reverse();
  }

  const onClick = async () => {
    const res = await getReduxPosts();

    dispatch({
      type:'POSTS_GET_ALL', payload: res
    });
  }

  return (
    <div className="post-list-container-flex">
      <button onClick={() => onClick()}> TESTER </button>
      {posts.map((item , index)  => <Post key={index} item={item} likePost={likePost} streams={streams} updateStreams={updateStreams}/>)}
    </div>
  )
}

// export default connect(state => ({
//   postsRedux: state
//   }), null)(PostList);

export default PostList;