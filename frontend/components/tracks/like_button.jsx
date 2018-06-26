import React from 'react';
import FaHeart from 'react-icons/lib/fa/heart';

export default class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  determineColor(isLiked) {
    if (isLiked) {
      return { fill: "f50" };
    } else if (this.props.divClass === "like-btn-track-show") {
      return { fill: "white" };
    } else {
      return { fill: "#333"};
    }
  }

  handleClick(event) {
    event.stopPropagation();
    if (this.props.isLiked) {
      this.props.destroyLike(this.props.trackId);
    } else {
      this.props.createLike(this.props.trackId);
    }
  }

  setSize() {
    switch (this.props.divClass) {
      case "like-btn-index":
        return { height: "13px", width: "13px" };
      case "like-btn-track-show":
      case "like-btn-player":
        return { height: "20px", width: "20px" };
    }
  }

  setStyle() {
    return Object.assign(this.determineColor(this.props.isLiked), this.setSize());
  }

  renderIcon() {
    return (
      <FaHeart className={this.props.divClass}
             style={this.setStyle()}
             onClick={this.handleClick}></FaHeart>
    );
  }

  render() {
    if (this.props.currentUserId) {
      if (this.props.divClass === "like-btn-index") {
        return (
          <div className="like-button-index-wrapper" onClick={this.handleClick}>
            {this.renderIcon()}
          </div>
        );
      } else {
        return this.renderIcon();
      }
    } else {
      return <div></div>;
    }
  }
}
