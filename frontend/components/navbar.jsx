import React from 'react';
import Session from './user/session_container.js';
import { Link } from 'react-router-dom';

const navBar = () => (
  <header>
    <nav>
      <div id="logo"></div>
      <Link to="/home/stream" id="home-link">Home</Link>
      <h2>soundstorm</h2>
      <Session></Session>
    </nav>
  </header>
);


export default(navBar);
