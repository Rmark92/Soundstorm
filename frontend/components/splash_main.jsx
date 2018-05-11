import React from 'react';
import { connect } from 'react-redux';
import { demoLogin } from '../actions/session_actions.js';

const SplashMain = ( {demoLogin} ) => {
  return (
    <div id="splash">
      <div id="splash-image">
        <h2>{'Discover more with soundstorm'}</h2>
        <p>{'Just want to try it out?'} <button id='demo-login-btn' onClick={demoLogin}>Demo</button></p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    demoLogin: () => dispatch(demoLogin())
  };
};

export default connect(null, mapDispatchToProps)(SplashMain);
