import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby'; //import navigate from gatsby
import axios from 'axios';

const LoginPage = () => {
  const [userName, setName] = useState('');
  const [password, setPass] = useState('');
    // getLogin({ name, pass });

  if (localStorage.getItem('user')) {
    navigate('/');
  }

  const onSubmit = async e => {
    e.preventDefault();
    console.log(userName, password)
    const login = { userName, password }
    try {
      const response = await axios.post('/api/login-user', login)
      localStorage.setItem('user', userName);
      localStorage.setItem('userId', response.data.userTags)
      console.log(localStorage.getItem('userId'));
      console.log(localStorage.getItem('user'));

      navigate('/');
      
    } catch (error) {
      console.log(error)
    }
    //const data = await axios.post('/api/login-user', login)
    console.log('login')
    setName('');
    setPass('');
  };

  return (
    <>
      <button onClick={() => navigate('/')}>Proceed without logging in</button>
      <form className="card card--register" onSubmit={onSubmit}>
        <h1 className='card__register-title'>Login / Create User</h1>
        <label>Name</label>
        <input required className='card__input' type="text" id="title" placeholder='UserName'
        value={userName}
        onChange={e => setName(e.target.value.toLowerCase())}></input>
        <label>Password</label>
        <input required className='card__input' type="text" id="description"
        placeholder='Password'
        value={password}
        onChange={e => setPass(e.target.value.toLowerCase())}></input>
        <input type="submit" className="card__btn" value="Login"></input>
      </form>

      </>
      
  );
};

export default LoginPage;