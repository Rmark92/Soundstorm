import React from 'react';
import { Link } from 'react-router-dom';
import FaClose from 'react-icons/lib/fa/close';


export default class TrackQueueItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: this.props.isCurrentTrack };
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.displayAsSelected = this.displayAsSelected.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // componentDidMount() {
  //
  // }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isCurrentTrack) {
      this.setState({ selected: false });
    } else {
      this.setState({ selected: true });
    }
  }

  displayAsSelected() {
    this.setState( { selected: true } );
  }

  unselect() {
    if ( !this.props.isCurrentTrack ) {
      this.setState( { selected: false } );
    }
  }

  handleRemoveClick(event) {
    event.stopPropagation();
    this.props.removeFromQueue(this.props.track.id);
  }

  handleLinkClick(event) {
    event.stopPropagation();
  }

  handleClick() {
    if (this.props.isCurrentTrack) {
      this.props.togglePlayerStatus();
    } else {
      this.props.setCurrentTrack(this.props.track.id);
    }
  }

  renderRemoveButton() {
    if (!this.props.isCurrentTrack) {
      return (
        <FaClose className="track-queue-remove-btn"
               style={ {height: "15px", width: "15px", fill: "black"}}
               onClick={this.handleRemoveClick}></FaClose>
      );
    }
  }

  render() {
    const style = this.state.selected ? { backgroundColor: '#ece2e2' } : {};
    return (
      <div className="track-queue-item" style={style} onClick={this.handleClick}>
        <div className="track-queue-left">
          <div className="track-queue-album-art">
            <img src={this.props.track.imageURL} />
          </div>
          <div className="track-queue-links">
            <Link to={`/users/${this.props.artist.id}`}
                  className="track-queue-artist-link"
                  onClick={this.handleLinkClick}>
              {this.props.artist.username}
            </Link>
            <Link to={`/tracks/${this.props.track.id}`}
                  className="track-queue-track-link"
                  onClick={this.handleLinkClick}>
              {this.props.track.title}
            </Link>
          </div>
          <div className="track-queue-album-art" />
        </div>
        {this.renderRemoveButton()}
      </div>
    );
  }
}
