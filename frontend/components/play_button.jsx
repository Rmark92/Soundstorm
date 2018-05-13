import React from 'react';

export default class PlayButton extends React.Component {

  constructor(props) {
    super(props);
    this.className = `${this.props.inputType}-btn-${this.props.size}`;
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inputType !== this.props.inputType) {
      this.className = `${nextProps.inputType}-btn-${this.props.size}`;
    }
  }

  handleClick(event) {
    event.stopPropagation();
    if (this.props.isCurrentTrack) {
      this.props.togglePlayerStatus();
    } else {
      this.props.setCurrentTrack(this.props.trackId);
    }
  }

  render() {
    return (
      <div className={this.className} onClick={this.handleClick}></div>
    );
  }
}
