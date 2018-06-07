import React from 'react';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions.js';
import { addPlaylist } from '../../actions/playlist_actions.js';
import NewPlaylistForm from './new_playlist_form';

const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => {
  return {
    addPlaylist: (title, track) => {
      dispatch(addPlaylist(title, track)).then( () => dispatch(closeModal()));
    },
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(null, mapDispatchToProps)(NewPlaylistForm);
