import React from 'react';
import { Link } from 'react-router-dom';
import { timeSince } from '../util/format_time.js';

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

  // renderTrackImage() {
  //   if (this.props.track.image_url) {
  //     return (
  //       <div className="cover"
  //     );
  //   }
  // }

  renderArtistImage() {
    if (this.props.artist.image_url) {
      return (
        <div className="user-avatar-medium">
          <img src={this.props.artist.image_url}></img>
        </div>
      );
    } else {
      return (
        <div className="user-avatar-medium-default"></div>
      );
    }
  }

  render() {
    return (
      <div id="track-show">
        <div className="show-image">
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
            <div className="cover-art-large"><img src={this.props.track.image_url}/></div>
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
