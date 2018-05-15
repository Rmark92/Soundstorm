import React from 'react';
import CommentIndexItem from './comment_index_item_container';

export default class CommentIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="comments-index">
        {this.props.comments.map(comment => {
          return (
            <CommentIndexItem key={comment.id}
                              comment={comment}></CommentIndexItem>
          );
        })}
      </div>
    );
  }
}
