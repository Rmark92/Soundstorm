import { connect } from 'react-redux';
import createComment from '../actions/comment_actions.js';
import CommentForm from './comment_form';

// const mapStateToProps = (state, ownProps) => {
//
// };

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createComment: (trackId, commentData) => dispatch(createComment(trackId, commentData))
  };
};


export default connect(null, mapDispatchToProps)(CommentForm);
