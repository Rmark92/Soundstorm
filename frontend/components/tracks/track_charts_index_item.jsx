import React from 'react';
import { Link } from 'react-router-dom';
import PlayButton from '../player/play_button_container';
import LikeButton from './like_button_container';
import { timeSince } from '../../util/format_time.js';
import { generateRandomGradient } from '../../util/generate_random_gradient';

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

  renderTrackImage() {
    if (this.props.track.imageURL) {
      return (
        <div className="cover-art-small">
          { this.renderPlayButton() }
          <img src={this.props.track.imageURL}/>
        </div>
      );
    } else {
      const divStyle = {
        backgroundImage: generateRandomGradient()
      };
      return (
        <div className="cover-art-small" style={divStyle}>
          { this.renderPlayButton() }
        </div>
      );
    }
  }

  renderRank() {
    if (this.props.rankVal) {
      return <div className="track-index-item-rank">{this.props.rankVal}</div>;
    }
  }

  renderTrackPostDate() {
    return (
      <div className="track-index-date">
        {timeSince(new Date(this.props.track.createdAt))}
      </div>
    );
  }

  renderTrackActivity() {
    return (
      <div className="track-index-activity">
        <div className="track-index-plays">
          <div className="play-icon-medium-index"></div>
          <div className="track-index-plays-num">{this.props.track.numPlays}</div>
        </div>
        <div className="track-index-likes">
          <div className="like-icon-medium-index"></div>
          <div className="track-index-like-num">{this.props.track.numLikes}</div>
        </div>
      </div>
    );
  }

  renderTrackData() {
    if (this.props.dataType === 'date') {
      return (
        <div className="track-index-item-data">
          {this.renderTrackPostDate()}
        </div>
      );
    } else if (this.props.dataType === 'popularity') {
      return (
        <div className="track-index-item-data">
          {this.renderTrackActivity()}
        </div>
      );
    } else if (this.props.dataType === 'all') {
      return (
        <div className="track-index-item-data">
          {this.renderTrackPostDate()}
          {this.renderTrackActivity()}
        </div>
      );
    }
  }

  render () {
    const style = this.state.selected ? { backgroundColor: '#ece2e2' } : {};
    return (
      <div style={style} className="track-index-item" onMouseEnter={this.displayAsSelected} onMouseLeave={this.unselect} onClick={this.handleClick}>
        <div className="track-index-item-details">
          {this.renderRank()}
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
        {this.renderTrackData()}
      </div>
    );
  }
}
