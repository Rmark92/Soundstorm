import React from 'react';
import { Link } from 'react-router-dom';
import { timeSince } from '../util/format_time.js';
import generateRandomGradient from '../util/generate_random_gradient';

export default class TrackShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.track.id) {
      this.props.fetchTrack(this.props.trackId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.trackId !== nextProps.trackId) {
      this.props.fetchTrack(nextProps.trackId);
    }
  }

  renderTrackImage() {
    if (this.props.track.imageURL) {
      return (
        <div className="cover-art-large"><img src={this.props.track.imageURL}/></div>
      );
    } else {
      const divStyle = {
        backgroundImage: generateRandomGradient()
      };
      return (
        <div className="cover-art-large" style={divStyle}></div>
      );
    }
  }

  renderArtistImage() {
    if (this.props.artist.imageURL) {
      return (
        <div className="user-avatar-medium">
          <img src={this.props.artist.imageURL}></img>
        </div>
      );
    } else {
      const divStyle = {
        backgroundImage: generateRandomGradient()
      };
      return (
        <div className="user-avatar-medium-default" style={divStyle}></div>
      );
    }
  }

  render() {
    const showImgStyle = {
      backgroundImage: generateRandomGradient()
    };
    return (
      <div id="track-show">
        <div className="show-image" style={showImgStyle}>
          <div className="track-links">
            <div className="play-btn-large"></div>
            <div id="track-show-title">
              <Link id="track-artist" to={`/users/${this.props.artist.id}`}>
                {this.props.artist.username}
              </Link>
              <p id="track-name">{this.props.track.title}</p>
            </div>
          </div>
          <div className="cover-art-container-large">
            <p className="track-time-elapsed">{timeSince( new Date(this.props.track.createdAt) )}</p>
            {this.renderTrackImage()}
          </div>
        </div>
        <div className="track-comments-container">
          <div className="track-artist-details">
            {this.renderArtistImage()}
            <p>{this.props.artist.username}</p>
          </div>
          <div className="track-comments">
            <p className="track-description">{this.props.track.description}</p>
          </div>
        </div>
      </div>
    );
  }
}
