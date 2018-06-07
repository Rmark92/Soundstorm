import { connect } from 'react-redux';
import { deleteComment } from '../../actions/comment_actions';
import CommentIndexItem from './comment_index_item';

const mapStateToProps = (state, ownProps) => {
  const comment = ownProps.comment;
  return {
    comment,
    user: state.entities.users[comment.user_id],
    track: state.entities.tracks[comment.track_id],
    currentUserId: state.session.id
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteComment: (trackId, commentId) => dispatch(deleteComment(trackId, commentId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentIndexItem);
