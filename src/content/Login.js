import React from 'react'
import { navigate } from 'gatsby';


const Login = () => {
  const onClick = () => {
    navigate('/login');
  }

  return (
    <button onClick={onClick}>Login</button>
  )
}

export default Login;