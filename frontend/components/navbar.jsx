import React from 'react';
import Session from './session_container.js';
import { Link } from 'react-router-dom';

const navBar = () => (
  <header>
    <nav>
      <div id="logo"></div>
      <Link to="/charts" id="charts-link">Charts</Link>
      <h2>Soundstorm</h2>
      <Session></Session>
    </nav>
  </header>
);

// <Link to="/charts"><div id="charts-link">Charts</div></Link>


export default(navBar);
