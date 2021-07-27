import React from 'react';
import Menubar from '../components/Menubar';
// import Content from '../content/new-post/Content';
import './new-post.scss';

const NewPost = () => (
  <div className="top-container">
    <Menubar page="newpost" />
    <Content />
  </div>
);

export default NewPost;
