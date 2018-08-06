import { connect } from 'react-redux';
import { waveFormSeek, setCurrentTrack } from '../../actions/player_actions';
import { createTrackPlay } from '../../actions/track_play_actions';
import WaveForm from './wave_form';

const mapStateToProps = (state, ownProps) => {
  return {
    lastProgressStamp: state.ui.player.tracksProgress[ownProps.track.id],
    reactPlayer: state.ui.player.reactPlayer,
    isCurrentTrack: state.ui.player.currentTrackId === ownProps.track.id,
    playing: state.ui.player.playing,
    buffering: state.ui.player.buffering,
    lastPlayerSeek: state.ui.player.lastPlayerSeek,
    loggedIn: !!state.session.id
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    waveFormSeek: (progress) => dispatch(waveFormSeek(progress)),
    setCurrentTrack: (trackId, progress) => dispatch(setCurrentTrack(trackId, progress)),
    createTrackPlay: (trackId) => dispatch(createTrackPlay(trackId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaveForm);
