import React from 'react';
import { closeModal } from '../actions/modal_actions.js';
import { connect } from 'react-redux';
import LogInForm from './login_form_container.js';
import SignUpForm from './signup_form_container.js';

const Modal = ( {modal, closeModal} ) => {
  // if (!modal) { return null; }

  let component;
  switch(modal) {
    case 'login':
      component = <LogInForm></LogInForm>;
      break;
    case 'signup':
      component = <SignUpForm></SignUpForm>;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={event => event.stopPropagation()}>
        { component }
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
