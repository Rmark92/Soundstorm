import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout } from '../../actions/session_actions.js';
import { openModal } from '../../actions/modal_actions.js';

class Session extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    this.props.logout().then( () => {
      this.props.history.push('/');
    });
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
      <div id="nav-user-details">
        <Link to="/tracks/new" id="upload-link">Upload</Link>
        <div id="nav-user-profpic">
          <img src={this.props.user.imageURL} />
        </div>
        <Link to={`/users/${this.props.user.id}`} id="nav-username">{this.props.user.username}</Link>
        <button onClick={this.handleLogout} id="signout-link">Sign Out</button>
      </div>
    );
  }
  // <div id="nav-user-profpic"></div>
  // {this.renderProfPic()}
  // renderProfPic() {
  //   if (this.props.user.image) {
  //     return (
  //       <div id="nav-user-profpic">
  //         <img src={this.props.user.image} />
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div id="nav-user-profpic">
  //         <div id="default-nav-prof-pic"></div>
  //       </div>
  //     );
  //   }
  // }

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Session));
