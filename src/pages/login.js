import React, { useState } from 'react';
import axios from 'axios';
import Menubar from '../components/Menubar';
import './login.scss';
import Loader from '../components/Loader/Loader';
import {navToHomeClick, navToSignupClick, navTest} from '../components/utils/navigation';

const LoginPage = () => {
  const [userName, setName] = useState('');
  const [password, setPass] = useState('');
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const [isLoading, setLoading] = useState(false); 

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const login = { userName, password };
    try {
      const response = await axios.post('/api/login-user', login);
      localStorage.setItem('user', userName);
      localStorage.setItem('userId', response.data.userTags);
      navTest();
    } catch (error) {
      console.log(error);
    }
    setName('');
    setPass('');
    setLoading(true);
  };

  return (
    <div className="top-container">
      <Menubar />
      <main className="main">
        <section className="form-container-flex">
          {isLoading ? <Loader /> : <></>}
          <form className="card card--register" onSubmit={onSubmit}>
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
            {/* <label> */}
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
            {/* <div className="label-text">Password</div>
            </label> */}
            <input type="submit" className="card__btn" value="LOGIN" />
          </form>
          <button className="proceed" onClick={navToHomeClick}>Proceed without logging in</button>
          <button className="proceed" onClick={navToSignupClick}>Sign up for a free account</button>
        </section>
      </main>
    </div>

  );
};

export default LoginPage;