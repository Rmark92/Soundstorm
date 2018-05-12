import { connect } from 'react-redux';
import Player from './player';

const mapStateToProps = (state, ownProps) => {
  const player = state.ui.player;
  return {
    player,
    track: state.entities.tracks[player.currentTrackId]
  };
};

export default connect(mapStateToProps)(Player);
