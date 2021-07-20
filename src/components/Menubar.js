import React from "react";
import Logo from './Logo';
import { Link } from 'gatsby';
const Menubar = () => {
    return (
        <div classList="sidebar">
          <Logo />
          <ul>
            <li><Link to="/">Home</Link> </li>
            <li><Link to="/">Streams</Link> </li>
            <li><Link to="/">Profile</Link> </li>
            <li><Link to="/">New Post</Link> </li>
          </ul>
        </div>
    )
}

export default Menubar;
