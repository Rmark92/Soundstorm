import React from 'react';
import { Link } from 'react-router-dom';
import PlayButton from './play_button_container';
import LikeButton from '../tracks/like_button_container';
import TrackLoader from './loader';
import { formatTime } from '../../util/format_time';
import { generateRandomGradient } from '../../util/generate_random_gradient';
import { sliceText } from '../../util/slice_text';

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 1,
      muted: false,
      elapsed: 0,
      progressHover: false,
      loaded: false
    };

    this.ref = this.ref.bind(this);
    this.handleReady = this.handleReady.bind(this);
    this.handlePlaying = this.handlePlaying.bind(this);
    this.handlePlayProgress = this.handlePlayProgress.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleBuffer = this.handleBuffer.bind(this);
    this.setTrackDuration = this.setTrackDuration.bind(this);
    this.setProgressHover = this.setProgressHover.bind(this);
    this.unsetProgressHover = this.unsetProgressHover.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleLoop = this.handleLoop.bind(this);
    this.toggleMuted = this.toggleMuted.bind(this);
    this.handleNextTrackClick = this.handleNextTrackClick.bind(this);
    this.handlePrevTrackClick = this.handlePrevTrackClick.bind(this);
    this.handleTrackEnded = this.handleTrackEnded.bind(this);
  }

  calculateInitElapsed() {
    return this.props.lastProgressStamp || 0;
  }

  ref(player) {
    this.props.setReactPlayer(player);
    this.reactPlayer = player;
    this.reactPlayer.addEventListener('loadstart', this.handleBuffer);
    this.reactPlayer.addEventListener('durationchange', this.setTrackDuration);
    this.reactPlayer.addEventListener('canplay', this.handleReady);
    this.reactPlayer.addEventListener('play', this.handlePlaying);
    this.reactPlayer.addEventListener('pause', this.handlePause);
    this.reactPlayer.addEventListener('ended', this.handleTrackEnded);
    this.reactPlayer.addEventListener('stalled', this.handleBuffer);
  }

  handleReady() {
    this.setState( { loaded: true }, () => {
      if (this.props.controls.playing) {
        this.reactPlayer.play();
      }
    });
  }

  handlePlaying() {
    if (this.state.elapsed === 0 && this.props.loggedIn) {
      this.props.createTrackPlay(this.props.currentTrack.id);
    }

    if (!this.playProgressInterval) {
      this.playProgressInterval = setInterval( this.handlePlayProgress, 20);
    }
  }

  handlePlayProgress() {
    if (this.reactPlayer.readyState <= 2 && !this.props.controls.buffering) {
      this.setState( { loaded: false }, () => {
        this.props.updateBufferStatus(true);
      });
    } else if (this.reactPlayer.readyState > 2 ){
      const currentElapsed = this.reactPlayer.currentTime / this.reactPlayer.duration;
      this.setState( { elapsed: currentElapsed, loaded: true }, () => {
        if (this.props.controls.buffering) { this.props.updateBufferStatus(false); }
      } );
    }
  }

  handlePause() {
    clearInterval(this.playProgressInterval);
    this.playProgressInterval = null;
  }

  handleBuffer() {
    if (!this.props.controls.buffering) {
      this.props.updateBufferStatus(true);
    }
  }

  setTrackDuration() {
    if (!this.props.duration) {
      this.props.setTrackDuration(this.props.currentTrack.id, this.reactPlayer.duration);
    }
  }

  setProgressHover() {
    this.setState( { progressHover: true });
  }

  unsetProgressHover() {
    this.setState( { progressHover: false });
  }

  handleLoop() {
    this.props.toggleLoop();
  }

  handleSeek(event) {
    const newTrackPos = parseFloat(event.target.value);
    this.reactPlayer.currentTime = newTrackPos * this.props.duration;
    this.setState( { elapsed: newTrackPos });
    this.props.playerSeek(parseFloat(event.target.value));
  }

  toggleMuted() {
    this.setState( { muted: !this.state.muted });
  }

  handleTrackEnded() {
    this.props.trackEnded();
  }

  handleNextTrackClick() {
    this.props.moveToNextTrack();
  }

  handlePrevTrackClick() {
    if (!this.reactPlayer.currentTime || this.reactPlayer.currentTime <= 5) {
      this.props.moveToPrevTrack();
    } else {
      this.reactPlayer.currentTime = 0;
      this.setState( { elapsed: 0 }, () => {
        this.reactPlayer.currentTime = 0;
        this.props.playerSeek(0);
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.controls.lastWaveFormSeek !== this.props.controls.lastWaveFormSeek) {
      const elapsed = nextProps.lastProgressStamp;
      this.setState( { elapsed }, () => {
        this.reactPlayer.currentTime = elapsed * this.props.duration;
      });
    }

    if (nextProps.controls.playing && this.reactPlayer && this.reactPlayer.paused) {
      this.reactPlayer.play();
    } else if (!nextProps.controls.playing && this.reactPlayer && !this.reactPlayer.paused) {
      this.reactPlayer.pause();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentTrack && prevProps.currentTrack.id !== this.props.currentTrack.id) {
      const elapsed = this.calculateInitElapsed();
      this.setState( { elapsed, loaded: false }, () => {
        this.reactPlayer.currentTime = (elapsed * this.props.duration) || 0;
      });
    }
  }

  renderSeekInput() {
    if (this.state.progressHover) {
      return (
        <input className="seek-input"
          type="range"
          min="0"
          max="1"
          onChange={this.handleSeek}
          step="any"
          value={String(this.state.elapsed)}></input>
      );
    }
  }

  renderLoopButton() {
    if (this.props.controls.looping) {
      return (
        <div className="loop-btn" onClick={this.handleLoop}>
          <div className="loop-selected_div"></div>
        </div>
      );
    } else {
      return <div className="loop-btn" onClick={this.handleLoop}></div>;
    }
  }

  renderVolumeControl() {
    if (this.state.muted) {
      return (
        <div className="player-volume-muted" onClick={this.toggleMuted}></div>
      );
    } else {
      return (
        <div className="player-volume-active" onClick={this.toggleMuted}></div>
      );
    }
  }

  renderTrackImage() {
    if (this.props.currentTrack.imageURL) {
      return (
        <div className="player-track-cover-art">
          <img src={this.props.currentTrack.imageURL}/>
        </div>
      );
    } else {
      const divStyle = {
        backgroundImage: generateRandomGradient()
      };
      return (
        <div className="player-track-cover-art" style={divStyle}></div>
      );
    }
  }

  renderProgress() {
    if (!this.state.loaded) {
      return <TrackLoader width={716}></TrackLoader>;
    } else {
      return (
        <div className="progress-data" onMouseEnter={this.setProgressHover} onMouseLeave={this.unsetProgressHover}>
          <div className="player-bar-progress-time">
            {formatTime(this.state.elapsed * this.props.duration)}
          </div>
          <div className="progress-bar">
            <div className="progress-bar-elapsed" style={ {width: `${Math.floor(this.state.elapsed * 640)}px`} }>
            </div>
            {this.renderSeekInput()}
          </div>
          <div className="player-bar-duration-time">
            {formatTime(this.props.duration)}
          </div>
        </div>
      );
    }
  }

  render() {
    if (!this.props.currentTrack) {
      return <div></div>;
    } else {
      return (
        <div className="player-bar">
          <div className="player-bar-contents">
            <audio ref={this.ref}
                   src={this.props.currentTrack.audioURL}
                   controls={false}
                   loop={this.props.controls.looping}
                   autoPlay={false}
                   volume={this.state.volume}
                   muted={this.state.muted}
              />
           <div className="player-buttons">
             <div className="prev-track-btn" onClick={this.handlePrevTrackClick}></div>
             <PlayButton styleType="simple" trackId={this.props.currentTrack.id}></PlayButton>
             <div className="next-track-btn" onClick={this.handleNextTrackClick}></div>
             {this.renderLoopButton()}
           </div>
           <div className="progress-container">
             {this.renderProgress()}
           </div>
           {this.renderVolumeControl()}
           <div className="player-right">
             <div className="player-track-details">
               {this.renderTrackImage()}
               <div className="player-track-text-details">
                 <Link to={`/users/${this.props.artist.id}`} className="player-track-artist-name">
                   {sliceText(this.props.artist.username, 40)}
                 </Link>
                 <Link to={`/tracks/${this.props.currentTrack.id}`} className="player-track-title">
                   {sliceText(this.props.currentTrack.title, 40)}
                 </Link>
               </div>
             </div>
             <LikeButton divClass="like-btn-player" trackId={this.props.currentTrack.id}></LikeButton>
           </div>
          </div>
        </div>
      );
    }
  }
}
