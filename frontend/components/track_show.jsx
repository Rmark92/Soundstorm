import React from 'react';
import { Link } from 'react-router-dom';
import PlayButton from './play_button_container';
import CommentForm from './comment_form_container';
import CommentIndex from './comment_index_container';
import { timeSince } from '../util/format_time.js';
import generateRandomGradient from '../util/generate_random_gradient';

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
  renderPlayButton() {
    if (this.props.track.audioURL) {
      return <PlayButton trackId={this.props.track.id} styleType='large'></PlayButton>;
    }
  }

  renderCommentCount() {
    const count = this.props.track.numComments;
    return count === 1 ? `1 comment` : `${count} comments`;
  }

  render() {
    const showImgStyle = {
      backgroundImage: generateRandomGradient()
    };
    return (
      <div id="track-show">
        <div className="show-image" style={showImgStyle}>
          <div className="track-links">
            {this.renderPlayButton()}
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
        <div className="track-show-contents">
          <div className="track-show-actions">
            <CommentForm trackId={this.props.track.id}></CommentForm>
          </div>
          <div className="track-show-users-comments">
            <div className="track-comments-container">
              <div className="track-artist-details">
                {this.renderArtistImage()}
                <p>{this.props.artist.username}</p>
              </div>
              <div className="track-comments">
                <p className="track-description">{this.props.track.description}</p>
                <div className="comments-count-header">
                  <div className="comments-count-icon"></div>
                    {this.renderCommentCount()}
                </div>
                <CommentIndex commentIds={this.props.track.commentIds}></CommentIndex>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// <div className="play-btn-large"></div>
