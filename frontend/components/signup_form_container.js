import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { signup } from '../actions/session_actions.js';
import sessionForm from './session_form.jsx';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.sessionErrors,
    formType: 'sign_up'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (credentials) => dispatch(signup(credentials))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(sessionForm));
