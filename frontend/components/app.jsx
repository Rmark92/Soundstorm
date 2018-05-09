import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute } from '../util/route_util.js';
import NavBar from './navbar.jsx';
import Modal from './modal.jsx';
import SplashMain from './splash_main.jsx';
// import TrackForm from './track_form.jsx';

const App = () => (
  <div>
    <Modal></Modal>
    <NavBar></NavBar>
    <AuthRoute exact path="/" component={SplashMain}></AuthRoute>
  </div>
);


export default App;
