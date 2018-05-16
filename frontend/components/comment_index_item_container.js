import { connect } from 'react-redux';
import CommentIndexItem from './comment_index_item';

const mapStateToProps = (state, ownProps) => {
  const comment = ownProps.comment;
  return {
    comment,
    user: state.entities.users[comment.user_id],
    track: state.entities.tracks[comment.track_id]
  };
};

// const mapDispatchToProps = (dispatch, ownProps) => {
//
// };

export default connect(mapStateToProps)(CommentIndexItem);
