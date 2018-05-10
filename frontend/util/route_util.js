import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const Auth = ({component: Component, path, loggedIn, exact}) => {
  return (
    <Route path={path} exact={exact} render={(props) => {
      if (!loggedIn) {
        return <Component {...props} />;
      } else {
        return <Redirect to="/charts" />;
      }
      }}></Route>
  );
};

const Protected = ({component: Component, path, loggedIn, exact}) => {
  return (
    <Route path={path} exact={exact} render={(props) => {
      if (loggedIn) {
        return <Component {...props} />;
      } else {
        return <Redirect to="/charts" />;
      }
      }}></Route>
  );
};

const mapStateToProps = state => {
  return {loggedIn: Boolean(state.session.id)};
};

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
