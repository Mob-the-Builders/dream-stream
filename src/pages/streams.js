import React from 'react';
import { navigate } from '@reach/router';
import Menubar from '../components/Menubar';
import Content from '../content/streams/Content';

const Streams = () => (
  <div className="top-container">
    <Menubar page="streams" />
    <Content />
  </div>
);

export default Streams;
