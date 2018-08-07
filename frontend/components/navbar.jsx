import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import Session from './user/session_container.js';
import Search from './search/search_container.js';

const navBar = () => (
  <header>
    <nav>
      <div className="navbar-left">        
        <div id="logo"></div>
        <Link to="/home/stream" id="home-link">Home</Link>
      </div>
      <Switch>
        <Route exact path="/" component={() => <h2>soundstorm</h2>}></Route>
        <Route component={Search}></Route>
      </Switch>
      <Session></Session>
    </nav>
  </header>
);


export default(navBar);
