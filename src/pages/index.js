import * as React from 'react';
import Menubar from '../components/Menubar';
import Content from '../content/index/Content';
import './index.scss';

// markup
const IndexPage = () => (
  <div className="top-container">
    <Menubar page="home" />
    <Content />
  </div>
);

export default IndexPage;
