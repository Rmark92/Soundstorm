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

  handleClick(event) {
    event.stopPropagation();
    if (this.props.isCurrentTrack) {
      this.props.togglePlayerStatus(this.props.trackId);
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
