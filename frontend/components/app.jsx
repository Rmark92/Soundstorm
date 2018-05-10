import React from 'react';
import { Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util.js';
import NavBar from './navbar.jsx';
import Modal from './modal.jsx';
import SplashMain from './splash_main.jsx';
import TrackCreateForm from './track_create_form_container.js';

const App = () => (
  <div>
    <Modal></Modal>
    <NavBar></NavBar>
    <div id="main">
      <AuthRoute exact path="/" component={SplashMain}></AuthRoute>
      <ProtectedRoute exact path="/tracks/new" component={TrackCreateForm}></ProtectedRoute>
    </div>
  </div>
);


export default App;
