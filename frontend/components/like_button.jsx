import React from 'react';
// Is it a bad idea to change state first so we dont have to wait
// for props to change via server response?

export default class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLiked: this.props.isLiked };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.stopPropagation();
    this.setState({ isLiked: !this.state.isLiked });
    if (this.props.isLiked) {
      this.props.destroyLike(this.props.trackId);
    } else {
      this.props.createLike(this.props.trackId);
    }
  }

  setDivStyle() {
    return this.state.isLiked ? { backgroundColor: "#f50" } : {}
  }

  render() {
    if (this.props.currentUserId) {
      return (
        <div className={this.props.divClass} style={this.setDivStyle()} onClick={this.handleClick}></div>
      );
    } else {
      return <div></div>;
    }
  }
}
