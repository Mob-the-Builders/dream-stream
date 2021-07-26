import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menubar from '../components/Menubar';
import {navToHomeClick, navToLoginClick} from '../components/utils/navigation';
import './login.scss';

const SignupPage = () => {
  const [userName, setName] = useState('');
  const [password, setPass] = useState('');
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if(redirect){
      navToHomeClick();
    }
  }, [redirect])
  
  const createUser = async (pair) => {
    console.log('creating...', pair)
    const res = await axios.post('/api/create-user', pair)
    console.log(res);
    return res.status
  };

  const loginUser = async (pair) => {
    const res = await axios.post('/api/login-user', pair)
    return res
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { userName, password };

      const createUserStatus = await createUser(newUser);
      console.log('past login seq', createUserStatus)
      if(createUserStatus !== 200) {
        return; 
      }

      const loginStatus = await loginUser(newUser);
      if(loginStatus.status !== 200){
        return;
      }
      console.log('past the login seq',loginStatus)

      localStorage.setItem('user', userName);
      localStorage.setItem('userId', loginStatus.data.userTags);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
    // const data = await axios.post('/api/login-user', login)
    setName('');
    setPass('');
    setRedirect(false);
  };

  return (
    <div className="top-container">
      <Menubar />
      <main className="main">
        <form className="card card--register" onSubmit={onSubmit}>
          <p className="card__register-title">Create your account</p>

          <input
            required
            className="card__input"
            type="text"
            id="title"
            autoComplete="off"
            placeholder="Username"
            value={userName}
            onChange={(e) => setName(e.target.value.toLowerCase())}
            onFocus={(e) => e.target.placeholder = ''}
            onBlur={(e) => e.target.placeholder = 'Username'}
          />

          <input
            required
            className="card__input"
            type="password"
            id="description"
            placeholder="Password"
            value={password}
            onChange={(e) => setPass(e.target.value.toLowerCase())}
            onFocus={(e) => e.target.placeholder = ''}
            onBlur={(e) => e.target.placeholder = 'Password'}
          />

          <input type="submit" className="card__btn" value="Sign Up" />

        </form>
        <button className="proceed" onClick={navToLoginClick}>Already have an account?</button>

        <button className="proceed" onClick={navToHomeClick}>Proceed without logging in</button>

      </main>
    </div>
  );
};

export default SignupPage;
