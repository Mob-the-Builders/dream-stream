import React from 'react';
import Menubar from '../components/Menubar';
import Content from '../content/profile/Content';

import './profile.scss';

const Profile = () => (
  <div className="top-container">
    <Menubar page="profile" />
    <Content />
  </div>
);

export default Profile;
