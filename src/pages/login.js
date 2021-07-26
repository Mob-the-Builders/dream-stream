import React, { useState, useEffect } from 'react';
import { navigate } from 'gatsby';
import axios from 'axios';
import Menubar from '../components/Menubar';
import './login.scss';

const LoginPage = () => {
  const [userName, setName] = useState('');
  const [password, setPass] = useState('');
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  const onSubmit = async (e) => {
    e.preventDefault();
    const login = { userName, password };
    try {
      const response = await axios.post('/api/login-user', login);
      localStorage.setItem('user', userName);
      localStorage.setItem('userId', response.data.userTags);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
    setName('');
    setPass('');
  };

  return (
    <div className="top-container">
      <Menubar />
      <main className="main">
        <div className="card card--register" >
          <form onSubmit={onSubmit}>
            <p className="card__register-title">Login</p>

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
            <input type="submit" className="card__btn" value="LOGIN" />

          </form>
            <button className="proceed" onClick={() => navigate('/')}>Proceed without logging in</button>
            <button className="proceed" onClick={() => navigate('/signup')}>Sign up for a free account</button>
        </div>

      </main>
    </div>

  );
};

export default LoginPage;
