import { connect } from 'react-redux';
import { createLike, destroyLike } from '../actions/like_actions';
import LikeButton from './like_button';

const mapStateToProps = (state, ownProps) => {
  const trackId = ownProps.trackId;
  return {
    currentUserId: state.session.id,
    isLiked: state.entities.tracks[trackId].isLiked
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createLike: (trackId) => dispatch(createLike(trackId)),
    destroyLike: (trackId) => dispatch(destroyLike(trackId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeButton);
