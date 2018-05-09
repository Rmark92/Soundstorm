import React from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/session_actions.js';
import { openModal, closeModal } from '../actions/modal_actions.js';
import sessionForm from './session_form.jsx';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.sessionErrors,
    formType: 'login'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (credentials) => dispatch(login(credentials)),
    otherForm: (
      <button onClick={() => dispatch(openModal('signup'))}>
        Signup
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(sessionForm);
