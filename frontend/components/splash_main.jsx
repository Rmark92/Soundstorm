import React from 'react';
import { connect } from 'react-redux';
import { demoLogin } from '../actions/session_actions.js';

const SplashMain = ( {demo} ) => {
  return (
    <div id="splash">
      <div id="splash-image">
        <h2>{'Discover more with soundstorm'}</h2>
        <p>{'Just want to try it out?'} <button id='demo-login-btn' onClick={demo}>Demo</button></p>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    demo: () => dispatch(demoLogin())
  };
};

export default connect(null, mapDispatchToProps)(SplashMain);
