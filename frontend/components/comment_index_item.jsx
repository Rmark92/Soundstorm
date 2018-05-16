import React from 'react';
import { Link } from 'react-router-dom';
import { timeSince } from '../util/format_time';

export default class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="comment-container">
        <div className="comment-left">
          <div className="user-avatar-comment">
            <img src={this.props.user.imageURL}></img>
          </div>
          <div className="comment-text">
            <Link className="comment-user-name" to={`/users/${this.props.user.username}`}>
              {this.props.user.username}
            </Link>
            <p className="comment-body">{this.props.comment.body}</p>
          </div>
        </div>
        <div className="comment-right">
          <p className="comment-timestamp">
            {timeSince(this.props.comment.createdAt)}
          </p>
        </div>
      </div>
    );
  }
}
