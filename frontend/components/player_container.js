import { connect } from 'react-redux';
import { togglePlayerStatus, setReactPlayer } from '../actions/player_actions';
import Player from './player';

const mapStateToProps = (state, ownProps) => {
  const player = state.ui.player;
  return {
    player,
    currentTrack: state.entities.tracks[player.currentTrackId]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    togglePlayerStatus: () => dispatch(togglePlayerStatus()),
    setReactPlayer: playerRef => dispatch(setReactPlayer(playerRef))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
