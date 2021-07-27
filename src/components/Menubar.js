import React from 'react';
import { Link } from 'gatsby';
import Logo from './Logo';
import './Menubar.scss';
import Logout from './LogoutButton';
import Login from './LoginButton';

const Menubar = ({ page }) => {
  const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;

  return (
    <div className="sidebar">
      <Logo />
      <ul className="menuList">
        {/* <li><Link to="/"><svg className={`menuList__svg  `} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path d="M3,13h1v2v5c0,1.103,0.897,2,2,2h3h6h3c1.103,0,2-0.897,2-2v-5v-2h1c0.404,0,0.77-0.244,0.924-0.617 c0.155-0.374,0.069-0.804-0.217-1.09l-9-9c-0.391-0.391-1.023-0.391-1.414,0l-9,9c-0.286,0.286-0.372,0.716-0.217,1.09 C2.23,12.756,2.596,13,3,13z M10,20v-5h4v5H10z M12,4.414l6,6V15l0,0l0.001,5H16v-5c0-1.103-0.897-2-2-2h-4c-1.103,0-2,0.897-2,2v5 H6v-5v-3v-1.586L12,4.414z"/></svg>Home</Link> </li> */}
        <li>
          <Link to="/" className={`menuList__link  ${page === 'home' ? 'menuList__link--selected' : ''}`}>
            <svg className={`menuList__svg  ${page === 'home' ? 'menuList__svg--selected' : ''}`} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path d="M3,13h1v2v5c0,1.103,0.897,2,2,2h3h6h3c1.103,0,2-0.897,2-2v-5v-2h1c0.404,0,0.77-0.244,0.924-0.617 c0.155-0.374,0.069-0.804-0.217-1.09l-9-9c-0.391-0.391-1.023-0.391-1.414,0l-9,9c-0.286,0.286-0.372,0.716-0.217,1.09 C2.23,12.756,2.596,13,3,13z M10,20v-5h4v5H10z M12,4.414l6,6V15l0,0l0.001,5H16v-5c0-1.103-0.897-2-2-2h-4c-1.103,0-2,0.897-2,2v5 H6v-5v-3v-1.586L12,4.414z" /></svg>
            Home
          </Link>
          {' '}
        </li>
        <li>
          <Link to="/streams" className={`menuList__link  ${page === 'streams' ? 'menuList__link--selected' : ''}`}>
            <svg className={`menuList__svg  ${page === 'streams' ? 'menuList__svg--selected' : ''}`} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path d="M5.996 9c1.413 0 2.16-.747 2.705-1.293C9.191 7.217 9.432 7 9.993 7s.802.217 1.292.707C11.83 8.253 12.577 9 13.991 9c1.415 0 2.163-.747 2.71-1.293C17.192 7.217 17.433 7 17.996 7s.804.217 1.295.707C19.837 8.253 20.585 9 22 9V7c-.563 0-.804-.217-1.295-.707C20.159 5.747 19.411 5 17.996 5s-2.162.747-2.709 1.292C14.796 6.783 14.556 7 13.991 7c-.562 0-.802-.217-1.292-.707C12.154 5.747 11.407 5 9.993 5S7.832 5.747 7.287 6.293C6.797 6.783 6.557 7 5.996 7S5.195 6.783 4.705 6.293C4.16 5.747 3.413 5 2 5v2c.561 0 .801.217 1.291.707C3.836 8.253 4.583 9 5.996 9zM5.996 14c1.413 0 2.16-.747 2.705-1.293C9.191 12.217 9.432 12 9.993 12s.802.217 1.292.707C11.83 13.253 12.577 14 13.991 14c1.415 0 2.163-.747 2.71-1.293C17.192 12.217 17.433 12 17.996 12s.804.217 1.295.707C19.837 13.253 20.585 14 22 14v-2c-.563 0-.804-.217-1.295-.707C20.159 10.747 19.411 10 17.996 10s-2.162.747-2.709 1.292C14.796 11.783 14.556 12 13.991 12c-.562 0-.802-.217-1.292-.707C12.154 10.747 11.407 10 9.993 10s-2.161.747-2.706 1.293C6.797 11.783 6.557 12 5.996 12s-.801-.217-1.291-.707C4.16 10.747 3.413 10 2 10v2c.561 0 .801.217 1.291.707C3.836 13.253 4.583 14 5.996 14zM5.996 19c1.413 0 2.16-.747 2.705-1.293C9.191 17.217 9.432 17 9.993 17s.802.217 1.292.707C11.83 18.253 12.577 19 13.991 19c1.415 0 2.163-.747 2.71-1.293C17.192 17.217 17.433 17 17.996 17s.804.217 1.295.707C19.837 18.253 20.585 19 22 19v-2c-.563 0-.804-.217-1.295-.707C20.159 15.747 19.411 15 17.996 15s-2.162.747-2.709 1.292C14.796 16.783 14.556 17 13.991 17c-.562 0-.802-.217-1.292-.707C12.154 15.747 11.407 15 9.993 15s-2.161.747-2.706 1.293C6.797 16.783 6.557 17 5.996 17s-.801-.217-1.291-.707C4.16 15.747 3.413 15 2 15v2c.561 0 .801.217 1.291.707C3.836 18.253 4.583 19 5.996 19z" /></svg>
            Streams
          </Link>
          {' '}
        </li>
        <li>
          <Link to="/profile" className={`menuList__link  ${page === 'profile' ? 'menuList__link--selected' : ''}`}>
            <svg className={`menuList__svg  ${page === 'profile' ? 'menuList__svg--selected' : ''}`} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
              <path fill="none" d="M12,8c-1.178,0-2,0.822-2,2s0.822,2,2,2s2-0.822,2-2S13.178,8,12,8z" />
              <path fill="none" d="M12,4c-4.337,0-8,3.663-8,8c0,2.176,0.923,4.182,2.39,5.641c0.757-1.8,2.538-3.068,4.61-3.068h2 c2.072,0,3.854,1.269,4.61,3.068C19.077,16.182,20,14.176,20,12C20,7.663,16.337,4,12,4z M12,14c-2.28,0-4-1.72-4-4s1.72-4,4-4 s4,1.72,4,4S14.28,14,12,14z" />
              <path fill="none" d="M13,16.572h-2c-1.432,0-2.629,1.01-2.926,2.354C9.242,19.604,10.584,20,12,20s2.758-0.396,3.926-1.073 C15.629,17.582,14.432,16.572,13,16.572z" />
              <path d="M12,2C6.579,2,2,6.579,2,12c0,3.189,1.592,6.078,4,7.924V20h0.102C7.77,21.245,9.813,22,12,22s4.23-0.755,5.898-2H18 v-0.076c2.408-1.846,4-4.734,4-7.924C22,6.579,17.421,2,12,2z M8.074,18.927c0.297-1.345,1.494-2.354,2.926-2.354h2 c1.432,0,2.629,1.01,2.926,2.354C14.758,19.604,13.416,20,12,20S9.242,19.604,8.074,18.927z M17.61,17.641 c-0.757-1.8-2.538-3.068-4.61-3.068h-2c-2.072,0-3.854,1.269-4.61,3.068C4.923,16.182,4,14.176,4,12c0-4.337,3.663-8,8-8 s8,3.663,8,8C20,14.176,19.077,16.182,17.61,17.641z" />
              <path d="M12,6c-2.28,0-4,1.72-4,4s1.72,4,4,4s4-1.72,4-4S14.28,6,12,6z M12,12c-1.178,0-2-0.822-2-2s0.822-2,2-2s2,0.822,2,2 S13.178,12,12,12z" />
            </svg>
            Profile
          </Link>
          {' '}
        </li>
        <li>
          <Link to="/new-post" className={`menuList__link  ${page === 'newpost' ? 'menuList__link--selected' : ''}`}>
            <svg className={`menuList__svg  ${page === 'newpost' ? 'menuList__svg--selected' : ''}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="M20 2H8c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zM8 16V4h12l.002 12H8z" />
              <path d="M4 8H2v12c0 1.103.897 2 2 2h12v-2H4V8zm11-2h-2v3h-3v2h3v3h2v-3h3V9h-3z" />
            </svg>
            New Post
          </Link>
          {' '}
        </li>
      </ul>

      {user
        ? <div className="logout"><Logout /></div>
        : <div className="login"><Login /></div>}
    </div>
  );
};

export default Menubar;
