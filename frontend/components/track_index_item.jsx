import React from 'react';
import { Link } from 'react-router-dom';
import PlayButton from './play_button_container';
import { timeSince } from '../util/format_time.js';

export default class TrackIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: this.props.isCurrentTrack };
    this.displayAsSelected = this.displayAsSelected.bind(this);
    this.unselect = this.unselect.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.linkClick = this.linkClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isCurrentTrack) {
      this.setState({ selected: false});
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

  renderPlayButton() {
    if (this.state.selected) {
      return <PlayButton styleType="medium" trackId={this.props.track.id}></PlayButton>;
    }
  }

  handleClick() {
    if (this.props.isCurrentTrack) {
      this.props.togglePlayerStatus();
    } else {
      this.props.setCurrentTrack(this.props.track.id);
    }
  }

  linkClick(event) {
    event.stopPropagation();
  }

  render () {
    const style = this.state.selected ? { backgroundColor: '#ece2e2' } : {};
    return (
      <div style={style} className="track-index-item" onMouseEnter={this.displayAsSelected} onMouseLeave={this.unselect} onClick={this.handleClick}>
        <div className="track-index-item-details">
          <div className="track-index-item-rank">{this.props.rank}</div>
          <div className="track-index-item-info">
            <div className="cover-art-small">
              { this.renderPlayButton() }
              <img src={this.props.track.imageURL} />
            </div>
            <div className="track-index-item-text-details" onClick={this.linkClick}>
              <Link to={`/users/${this.props.artist.id}`} className="track-index-item-artist-link">
                {this.props.artist.username}
              </Link>
              <Link to={`/tracks/${this.props.track.id}`} className="track-index-item-track-link">
                {this.props.track.title}
              </Link>
            </div>
          </div>
        </div>
        <div className="track-index-item-data">{timeSince(new Date(this.props.track.createdAt))}</div>
      </div>
    );
  }
};
