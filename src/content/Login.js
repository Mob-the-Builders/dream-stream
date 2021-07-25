import React from 'react';
import { navigate } from 'gatsby';

import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
  const { userName } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onClick = () => {
    navigate('/login');
  };

  return (
    <button onClick={onClick}>Login</button>
  );
};

export default Login;
