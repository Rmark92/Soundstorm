import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { login } from '../actions/session_actions.js';
import sessionForm from './session_form.jsx';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.sessionErrors,
    formType: 'log_in'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (credentials) => dispatch(login(credentials))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(sessionForm));
