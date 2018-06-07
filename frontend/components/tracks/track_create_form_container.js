import React from 'react';
import { connect } from 'react-redux';
import { createTrack } from '../../actions/track_actions.js';
import { clearTrackErrors } from '../../actions/track_error_actions.js';
import trackForm from './track_form.jsx';

const mapStateToProps = (state, ownProps) => {
  return {
    track: {},
    formType: 'create',
    errors: state.errors.trackErrors
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    processForm: (trackData) => dispatch(createTrack(trackData)),
    clearTrackErrors: () => dispatch(clearTrackErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(trackForm);
