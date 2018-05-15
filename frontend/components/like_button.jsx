import React from 'react';
import FaHeart from 'react-icons/lib/fa/heart';

// Is it a bad idea to change state first so we dont have to wait
// for props to change via server response?

export default class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  determineColor(isLiked) {
    return isLiked ? { fill: "f50" } : { fill: "#333" };
  }

  handleClick(event) {
    if (this.props.isLiked) {
      this.props.destroyLike(this.props.trackId);
    } else {
      this.props.createLike(this.props.trackId);
    }
  }

  render() {
    if (this.props.currentUserId) {
      return (
        <FaHeart className="like-btn"
                 style={this.determineColor(this.props.isLiked)}
                 onClick={this.handleClick}></FaHeart>
      );
    } else {
      return <div></div>;
    }
  }
}

// <div className={this.props.divClass} style={this.setDivStyle()} onClick={this.handleClick}></div>
