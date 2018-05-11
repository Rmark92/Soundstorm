import React from 'react';
import { Link } from 'react-router-dom';
import { timeSince } from '../util/format_time.js';

export default class TrackShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchTrack(this.props.trackId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.trackId !== nextProps.trackId) {
      this.props.fetchTrack(nextProps.trackId);
    }
  }

  render() {
    return (
      <div id="track-show">
        <div className="show-image">
          <div className="play-btn-large"></div>
          <div id="track-show-title">
            <Link id="track-artist" to={`/users/${this.props.artist.id}`}>
              {this.props.artist.username}
            </Link>
            <p id="track-name">{this.props.track.title}</p>
          </div>
          <p className="track-time-elapsed">{timeSince( new Date(this.props.track.createdAt) )}</p>
          <div className="cover-art-large"><img src={this.props.track.image_url}/></div>
        </div>
      </div>
    );
  }
}
