import React from 'react';
import { Link } from 'react-router-dom';
import { timeSince } from '../../util/format_time';
import IoIosTrash from 'react-icons/lib/io/ios-trash';

export default class CommentIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick() {
    // debugger
    this.props.deleteComment(this.props.track.id, this.props.comment.id);
  }

  renderDeleteButton() {
    if (this.props.currentUserId === this.props.user.id) {
      return (
        <div className="comment-delete-button-wrapper" onClick={this.handleDeleteClick}>
          <IoIosTrash className="comment-delete-button"
                      style={ { height: "14px", width: "14px", fill: "black" } }></IoIosTrash>
        </div>
      );
    }
  }

  render() {
    const dateCreated = new Date(this.props.comment.createdAt);
    return (
      <div className="comment-container">
        <div className="comment-left">
          <div className="user-avatar-comment">
            <img src={this.props.user.imageURL}></img>
          </div>
          <div className="comment-text">
            <Link className="comment-user-name" to={`/users/${this.props.user.id}`}>
              {this.props.user.username}
            </Link>
            <p className="comment-body">{this.props.comment.body}</p>
          </div>
        </div>
        <div className="comment-right">
          {this.renderDeleteButton()}
          <p className="comment-timestamp">
            {timeSince(dateCreated)}
          </p>
        </div>
      </div>
    );
  }
}
