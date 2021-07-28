import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import axios from 'axios';
import Menubar from '../components/Menubar';
import { navToHomeClick } from '../components/utils/navigation';
import './login.scss';
import Loader from '../components/Loader/Loader';
import Popup from '../components/Popup/Popup' 

const SignupPage = () => {
  const [userName, setName] = useState('');
  const [password, setPass] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (redirect) {
      navToHomeClick();
    }
  }, [redirect]);
  
  const createUser = async (pair) => {
    const res = await axios.post('/api/create-user', pair);
    return res;
  };

  const loginUser = async (pair) => {
    const res = await axios.post('/api/login-user', pair);
    return res;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newUser = { userName, password };
      const createUserStatus = await createUser(newUser);
      if (createUserStatus.status !== 200) {
        return;
      }

      const loginStatus = await loginUser(newUser);
      if (loginStatus.status !== 200) {
        return;
      }
      localStorage.setItem('user', userName);
      localStorage.setItem('userId', loginStatus.data.userTags);
      setRedirect(true);
    } catch (err) {
      return;
    }

    setName('');
    setPass('');
    setRedirect(false);
    setLoading(false);
  };

  return (
    <div className="top-container">
      <Menubar />
      <main className="main">

        {isLoading ? <Loader /> : <></>}
        
        <section className="form-container-flex">

          <form className="card card--register" onSubmit={onSubmit}>
            <p className="card__register-title">Create your account</p>

            <input
              required
              type="text"
              id="title"
              autoComplete="off"
              placeholder="Username"
              value={userName}
              onChange={(e) => { setName(e.target.value.toLowerCase()); }}
              onFocus={(e) => { e.target.placeholder = ''; }}
              onBlur={(e) => { e.target.placeholder = 'Username'; }}
            />

            <input
              required
              className="card__input"
              type="password"
              id="description"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPass(e.target.value.toLowerCase()); }}
              onFocus={(e) => { e.target.placeholder = ''; }}
              onBlur={(e) => { e.target.placeholder = 'Password'; }}
            />

            <input type="submit" className="card__btn" value="Sign Up" />

          </form>
          <span className="card__nav-container">
            <Link to="/login" className="card__link">Log in to DreamStream</Link>
            <Link to="/" className="card__link">Proceed without logging in</Link>
          </span>
        </section>
      </main>
    </div>
  );
};

export default SignupPage;
