import React from 'react';
import Menubar from '../components/Menubar';
import Content from '../content/profile/Content';

import './profile.scss';


const Profile = () => {

  return (
    <div className="top-container">
      <Menubar page="profile" />
      <Content />
    </div>
  );
};

export default Profile;
