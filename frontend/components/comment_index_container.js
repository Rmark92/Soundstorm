import { connect } from 'react-redux';
import CommentIndex from './comment_index';
import { selectCommentsById } from '../util/selectors.js';
import * as SortUtil from '../util/sort_util.js';

const mapStateToProps = (state, ownProps) => {
  let comments;
  if (!ownProps.commentIds) {
    comments = [];
  } else {
    const commentsArr = selectCommentsById(state, ownProps.commentIds);
    comments = SortUtil.sortByDate(commentsArr);
  }

  return {
    comments
  };
};

export default connect(mapStateToProps)(CommentIndex);
