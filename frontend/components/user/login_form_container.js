import React from 'react';
import { connect } from 'react-redux';
import { login, demoLogin } from '../../actions/session_actions.js';
import { openModal, closeModal } from '../../actions/modal_actions.js';
import sessionForm from './session_form.jsx';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.sessionErrors,
    formType: 'login'
  };
};

const mapDispatchToProps = (dispatch) => {
  const switchForm = () => dispatch(openModal('signup'));
  return {
    processForm: (credentials) => dispatch(login(credentials)),
    demoLogin: () => dispatch(demoLogin()).then( () => dispatch(closeModal())),
    otherForm: (
      <div id="otherForm">
        {"Don't have an account"}? <span onClick={switchForm} id="switch-form">Create one</span>
      </div>
    ),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(sessionForm);
