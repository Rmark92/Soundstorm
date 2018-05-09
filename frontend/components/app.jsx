import React from 'react';
import { AuthRoute } from '../util/route_util.js';
import NavBar from './navbar.jsx';
import Modal from './modal.jsx';
// import LogInForm from './login_form_container.js';
// import SignUpForm from './signup_form_container.js';

const App = () => (
  <div>
    <Modal></Modal>
    <NavBar></NavBar>
  </div>
);
// <Modal></Modal>


export default App;

// <AuthRoute exact path="/login" component={LogInForm}></AuthRoute>
// <AuthRoute exact path="/signup" component={SignUpForm}></AuthRoute>
