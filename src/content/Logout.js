import React from 'react'
import { navigate } from 'gatsby'; //import navigate from gatsby

const Logout = () => {
  const onClick = () => {
    localStorage.getItem('user')
    localStorage.setItem('user', '');
    navigate('/login');
  }

  return (
    <button onClick={onClick}>Logout</button>
  )
}

export default Logout;