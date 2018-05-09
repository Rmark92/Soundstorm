import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/session_actions.js';

const Session = (props) => {

  function renderLoggedIn(){
    return (
      <div>
        {props.username}
        <button onClick={props.logout}>Sign Out</button>
      </div>
    );
  }

  function renderLoggedOut(){
    return (
    <div className="session-links">
      <Link to='/login'><div id="signin-link">Sign in</div></Link>
      <Link to='/signup'><div id="signup-link">Create account</div></Link>
    </div>
    );
  }

  return props.user ? renderLoggedIn() : renderLoggedOut();
};

const mapStateToProps = (state, ownProps) =>{
  return {
    user: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps= (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Session);
