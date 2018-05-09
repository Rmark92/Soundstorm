import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../actions/modal_actions.js';
import { signup } from '../actions/session_actions.js';
import sessionForm from './session_form.jsx';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.sessionErrors,
    formType: 'signup'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processForm: (credentials) => dispatch(signup(credentials)),
    otherForm: (
      <button onClick={() => dispatch(openModal('login'))}>
        Signup
      </button>
    ),
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(sessionForm);
