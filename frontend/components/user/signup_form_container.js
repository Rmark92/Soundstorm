import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions.js';
import { signup, demoLogin } from '../../actions/session_actions.js';
import sessionForm from './session_form.jsx';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.sessionErrors,
    formType: 'signup'
  };
};

const mapDispatchToProps = (dispatch) => {
  const switchForm = () => dispatch(openModal('login'));
  return {
    processForm: (credentials) => dispatch(signup(credentials)),
    demoLogin: () => dispatch(demoLogin()).then( () => dispatch(closeModal())),
    otherForm: (
      <div id="otherForm">
        Already have an account? <span onClick={switchForm} id="switch-form">Sign in</span>
      </div>
    ),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(sessionForm);
