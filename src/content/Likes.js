import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './post.scss';

const Likes = ({ post }) => {

  const [liked, setLiked] = useState(false);
  
  const likePost = async (arr) => {
    let likes;
    if (!user) {
      return;
    }
    if (arr.likes.includes(user)) {
      likes = arr.likes.filter((like) => like !== user);
    } else {
      likes = [...arr.likes, user];
    }
    const body = { id: arr._id, likes };
    await axios.post('/api/update-post-likes', body);
    setLiked(!liked);
  };

  return (

        <div className="post__heartAlignment">
          <div className="post__heartContainer">
            <span className="post__likes-container-flex" onClick={() => likePost(post.likes)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M20.205,4.791c-1.137-1.131-2.631-1.754-4.209-1.754c-1.483,0-2.892,0.552-3.996,1.558 c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412L12,21.414 l8.207-8.207C22.561,10.854,22.562,7.158,20.205,4.791z" /></svg>
              <span>{post.likes.likes.length}</span>
            </span>
          </div>

        </div>
  );
};
export default Likes;
