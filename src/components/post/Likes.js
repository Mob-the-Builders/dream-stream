import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './post.scss';

const Likes = ({ post }) => {
  /*
  Bugs/problems:
    - Likes will not update properly when several users are logged into the same account

    - Too much logic happens in the client. Iterating over all likes will not be scalable.
      A better alterative would be off loading it to the serverless functions
      and do comparisions instead of iteration.

      Make another API call that gets all liked posts by the user.
      Compare the liked posts to the feed.
      Update liked boolean accordingly.
  */

  const [loading, updateLoading] = useState(true);

  const [liked, setLiked] = useState(false);

  const [likesDisplay, updateLikesDisplay] = useState(0);
  const [allLikes, setLikes] = useState([]);

  const user = localStorage.getItem('user');

  // Get key for deleting like
  const getPropKey = (likes) => {
    console.log(likes);
    // eslint-disable-next-line no-restricted-syntax
    for (const prop in Object.keys(likes)) {
      if (likes[prop].userName === user) {
        return prop;
      }
    }

    return null;
  };

  // Initialize likes and like status
  useEffect(() => {
    try {
      console.log("hello in likes");
      const likes = post.likes.data;

      setLikes(likes);
      updateLikesDisplay(likes.length);
      const propKey = getPropKey(likes);
      console.log(propKey);
      if (propKey !== null) {
        setLiked(true);
      }

      updateLoading(false);
    } catch (error) {
      console.log(error); // NEED TO CHANGE
    }
  }, []);

  // Server call
  const getAllLikesFromServer = async () => {
    const res = await axios.post('/api/get-likes-by-post-id', { id: post._id });
    console.log('server call res');
    console.log(res);

    return res.data.likes;
  };

  // Helper functions
  const handleUnlike = async () => {
    const propKey = getPropKey(allLikes);
    if (!propKey) return;

    updateLikesDisplay(likesDisplay - 1);
    setLiked(false);

    const id = allLikes[propKey]._id;
    await axios.post('/api/delete-post-likes', { id });
  };

  const handleLike = async () => {
    setLiked(true);
    updateLikesDisplay(likesDisplay + 1);
    await axios.post('/api/create-post-likes', { userName: user, postId: post._id });
  };

  // onClick
  const likePost = async () => {
    if (!user) return;
    if (loading) return;

    updateLoading(true);

    if (liked) {
      await handleUnlike();
    } else {
      await handleLike();
    }

    const likes = await getAllLikesFromServer();

    setLikes(likes);
    updateLikesDisplay(likes.length);

    updateLoading(false);
  };

  return (

    <div className="post__heartAlignment">
      {/* <div className="post__heartContainer"> */}
      <div className={`post__heartContainer ${liked ? 'post__heartContainer--liked' : ''}`} onClick={likePost}>
        <span className="post__likes-container-flex" >

          {liked
            ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M20.205,4.791c-1.137-1.131-2.631-1.754-4.209-1.754c-1.483,0-2.892,0.552-3.996,1.558 c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412L12,21.414 l8.207-8.207C22.561,10.854,22.562,7.158,20.205,4.791z" /></svg>
            : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z" /></svg>}

          <span>{likesDisplay}</span>
        </span>
      </div>

    </div>
  );
};

export default Likes;
