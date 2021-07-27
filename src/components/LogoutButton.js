import React from 'react';
import { navigate } from 'gatsby';

const Logout = () => {
  const onClick = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <button onClick={onClick} type="button">Logout</button>
  );
};

export default Logout;
