import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PlayButton from './play_button_container';
import WaveForm from './wave_form_container';
import CommentForm from './comment_form_container';
import CommentIndex from './comment_index_container';
import LikeButton from './like_button_container';
import IoIosTrash from 'react-icons/lib/io/ios-trash';
import { timeSince } from '../util/format_time.js';
import generateRandomGradient from '../util/generate_random_gradient';

class TrackShow extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
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

  renderWaveForm() {
    if (this.props.track.audioURL) {
      return (
        <WaveForm track={this.props.track} divClass="waveform-track-show"></WaveForm>
      );
    }
  }

  handleDeleteClick() {
    this.props.deleteTrack(this.props.track.id).then(() => this.props.history.push('/') );
  }

  handleQueueAction(type) {
    return () => {
      switch (type) {
        case 'add':
          this.props.addToQueue(this.props.track.id);
          break;
        case 'remove':
          this.props.removeFromQueue(this.props.track.id);
          break;
      }
    };
  }

  renderQueueButton() {
    if (this.props.isCurrentTrack) {
      return;
    } else if (!this.props.inQueue) {
      return (
        <div className="queue-action-show-button" onClick={this.handleQueueAction('add')}>
          Add to Queue
        </div>
      );
    } else {
      return (
        <div className="queue-action-show-button" onClick={this.handleQueueAction('remove')}>
          {'Remove from Queue'}
        </div>
      );
    }
  }

  renderRightButtons() {
    if (this.props.track.id && this.props.currentUserId === this.props.artist.id) {
      return (
        <div className="track-show-buttons">
          <IoIosTrash style={{ fill: "white", height: "20px", width: "20px" }}
                      onClick={this.handleDeleteClick}></IoIosTrash>
          <LikeButton divClass="like-btn-track-show" trackId={this.props.track.id}></LikeButton>
        </div>
      );
    }
  }

  renderLeftButtons() {
    return (
      <div className="track-show-left-buttons">
        {this.renderPlayButton()}
        {this.renderQueueButton()}
      </div>
    );
  }

  render() {
    const showImgStyle = {
      backgroundImage: generateRandomGradient()
    };
    return (
      <div id="track-show">
        <div className="show-image" style={showImgStyle}>
          <div className="show-image-left">
            <div className="show-image-top">
              <div className="track-links">
                {this.renderLeftButtons()}
                <div id="track-show-title">
                  <Link id="track-artist" to={`/users/${this.props.artist.id}`}>
                    {this.props.artist.username}
                  </Link>
                  <p id="track-name">{this.props.track.title}</p>
                </div>
              </div>
              <div className="show-image-top-right">
                <div className="track-time-elapsed">{timeSince( new Date(this.props.track.createdAt) )}</div>
                {this.renderRightButtons()}
              </div>
            </div>
            {this.renderWaveForm()}
          </div>
          <div className="cover-art-container-large">
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

export default withRouter(TrackShow);

// <div className="play-btn-large"></div>
