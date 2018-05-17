import React from 'react';

export default class PlayButton extends React.Component {

  constructor(props) {
    super(props);
    this.className = `${this.props.inputType}-btn-${this.props.styleType}`;
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inputType !== this.props.inputType) {
      this.className = `${nextProps.inputType}-btn-${this.props.styleType}`;
    }
  }

  determineTrackProgress() {
    if (this.props.reactPlayer) {
      return (this.props.reactPlayer.getCurrentTime() / this.props.reactPlayer.getDuration());
    } else {
      return null;
    }
  }

  handleClick(event) {
    event.stopPropagation();
    // debugger
    if (this.props.isCurrentTrack) {
      this.props.togglePlayerStatus(this.props.trackId, this.determineTrackProgress());
    } else {
      this.props.setCurrentTrack(this.props.trackId, this.determineTrackProgress());
    }
  }

  render() {
    return (
      <div className={this.className} onClick={this.handleClick}></div>
    );
  }
}
