import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import Menubar from '../components/Menubar';
import './login.scss';


const LoginPage = () => {
  const [userName, setName] = useState('');
  const [password, setPass] = useState('');

  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;


  const onSubmit = async e => {
    e.preventDefault();
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



    <div className='top-container'>
      <Menubar page={'streams'}/>
      <main className={'main'}>


      {/* <button onClick={() => navigate('/')}>Proceed without logging in</button> */}



      <form className="card card--register" onSubmit={onSubmit}>
        <p className='card__register-title'>Login</p>

        <input required className='card__input' type="text" id="title" autocomplete='off' placeholder='Username'
          value={userName}
          onChange={e => setName(e.target.value.toLowerCase())}
          onFocus={e => e.target.placeholder = ""}
          onBlur={e => e.target.placeholder = "Username"}
        ></input>

        <input required className='card__input' type="password" id="description"
          placeholder='Password'
          value={password}
          onChange={e => setPass(e.target.value.toLowerCase())}
          onFocus={e => e.target.placeholder = ""}
          onBlur={e => e.target.placeholder = "Password"}
        ></input>

        <input type="submit" className="card__btn" value="LOGIN"></input>

        <button className={'proceed'} onClick={() => navigate('/')}>Proceed without logging in</button>
      </form>
      

      </main>
    </div>
      
  );
};

export default LoginPage;