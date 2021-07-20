import * as React from "react";
import Menubar from '../components/Menubar';
import Content from '../content/Content';
import './index.scss';

// markup
const IndexPage = () => {
  return (
    <div classList="top-container">
      <Menubar />
      { <Content />}
    </div>
  )
}

export default IndexPage
