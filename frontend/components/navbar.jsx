import React from 'react';
import Session from './session_container.js';
import { Link } from 'react-router-dom';

const navBar = () => (
  <header>
    <nav>
      <div id="logo"></div>
      <Link to="/charts">Charts</Link>
      <h2>Soundstorm</h2>
      <Session></Session>
    </nav>
  </header>
);

// <ul id="navbar-links">
//   <li>
//     <div id="logo"></div>
//   </li>
//   <li>
//     <Link to="/charts">Charts</Link>
//   </li>
//   <li><h2>Soundstorm</h2></li>
//   <li><Session></Session></li>
// </ul>

export default(navBar);
