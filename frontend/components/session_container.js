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
    <div>
      <Link className="session-link" to='/signup'>Create Account</Link>
      <Link className="session-link" to='/login'>Sign In</Link>
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
