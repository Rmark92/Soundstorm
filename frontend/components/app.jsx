import React from 'react';
import { AuthRoute } from '../util/route_util.js';
import NavBar from './navbar.jsx';
import LogInForm from './login_form_container.js';
import SignUpForm from './signup_form_container.js';

const App = () => (
  <div>
    <NavBar></NavBar>
    <AuthRoute exact path="/login" component={LogInForm}></AuthRoute>
    <AuthRoute exact path="/signup" component={SignUpForm}></AuthRoute>
  </div>
);

export default App;
