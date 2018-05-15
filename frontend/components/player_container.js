import { connect } from 'react-redux';
import { togglePlayerStatus, setReactPlayer, toggleLoop } from '../actions/player_actions';
import { createTrackPlay } from '../actions/track_play_actions.js';
import { selectTrackArtist } from '../util/selectors';
import Player from './player';

const mapStateToProps = (state, ownProps) => {
  const player = state.ui.player;
  const currentTrack = state.entities.tracks[player.currentTrackId];
  return {
    player,
    currentTrack,
    artist: selectTrackArtist(state, currentTrack)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    togglePlayerStatus: () => dispatch(togglePlayerStatus()),
    setReactPlayer: playerRef => dispatch(setReactPlayer(playerRef)),
    toggleLoop: () => dispatch(toggleLoop()),
    createTrackPlay: (trackId) => dispatch(createTrackPlay(trackId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
