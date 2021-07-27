import React from 'react';
import { navigate } from 'gatsby';

const Login = () => {
  const onClick = () => {
    navigate('/login');
  };

  return (
    <button onClick={onClick} type="button">Login</button>
  );
};

export default Login;
