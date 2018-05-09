import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/session_actions.js';
import { openModal } from '../actions/modal_actions.js';

class Session extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLoggedOut() {
    return (
      <div className="session-links">
        <button id="signin-link" onClick={this.handleNewRequest('login')}>Sign in</button>
        <button id="signup-link" onClick={this.handleNewRequest('signup')}>Create account</button>
      </div>
    );
  }

  renderLoggedIn(){
    return (
      <div>
        {this.props.username}
        <button onClick={this.props.logout}>Sign Out</button>
      </div>
    );
  }

  handleNewRequest(type) {
    return (event) => {
      this.props.openModal(type);
    };
  }

  render() {
    return this.props.user ? this.renderLoggedIn() : this.renderLoggedOut();
  }
}

const mapStateToProps = (state, ownProps) =>{
  return {
    user: state.entities.users[state.session.id]
  };
};

const mapDispatchToProps= (dispatch, ownProps) => {
  return {
    openModal: (type) => dispatch(openModal(type)),
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Session);
