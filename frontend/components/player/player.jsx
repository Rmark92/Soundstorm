import React from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import PlayButton from './play_button_container';
import LikeButton from '../tracks/like_button_container';
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
      progressHover: false
    };

    this.ref = this.ref.bind(this);
    this.handleLoop = this.handleLoop.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.setProgressHover = this.setProgressHover.bind(this);
    this.unsetProgressHover = this.unsetProgressHover.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleSeeking = this.handleSeeking.bind(this);
    this.toggleMuted = this.toggleMuted.bind(this);
    this.handleTrackEnded = this.handleTrackEnded.bind(this);
    this.handleTrackStart = this.handleTrackStart.bind(this);
    this.handleNextTrackClick = this.handleNextTrackClick.bind(this);
    this.handlePrevTrackClick = this.handlePrevTrackClick.bind(this);
  }

  calculateElapsed() {
    return this.props.player.tracksProgress[this.props.currentTrack.id] || 0;
  }

  ref(player) {
    this.reactPlayer = player;
    this.props.setReactPlayer(player);
  }

  setDuration(duration) {
    this.duration = duration;
    const elapsed = this.calculateElapsed();
    this.setState( { elapsed }, () => {
      this.reactPlayer.seekTo(elapsed);
    });
  }

  handleTrackStart() {
    if (this.props.loggedIn && !this.calculateElapsed()) {
      this.props.createTrackPlay(this.props.currentTrack.id);
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

  renderLoopButton() {
    if (this.props.player.looping) {
      return (
        <div className="loop-btn" onClick={this.handleLoop}>
          <div className="loop-selected_div"></div>
        </div>
      );
    } else {
      return <div className="loop-btn" onClick={this.handleLoop}></div>;
    }
  }

  renderSeekInput() {
    const duration = this.duration || 0;
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

  toggleMuted() {
    this.setState( { muted: !this.state.muted });
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

  handleProgress(progress) {
    this.setState({ elapsed: progress.played });
  }

  handleSeeking(event) {
    event.stopPropagation();
    this.setState({ elapsed: parseFloat(event.target.value) });
  }

  handleSeek(event) {
    const newTrackPos = parseFloat(event.target.value);
    console.log(newTrackPos);
    this.reactPlayer.seekTo(newTrackPos);
    // this.setNewTrackPos(newTrackPos);
    this.props.playerSeek();
    console.log('here');
  }

  handleSeek(seconds) {
    // this.handleProgress( { played: seconds / this.duration });
  }

  setNewTrackPos(newTrackPos) {
    this.handleProgress( { played: newTrackPos });
    // this.reactPlayer.seekTo(newTrackPos);
  }

  handleTrackEnded() {
    this.props.continueThroughQueue();
  }

  handleNextTrackClick() {
    this.props.moveToNextTrack();
  }

  handlePrevTrackClick() {
    this.props.moveToPrevTrack();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.player.lastWaveFormSeek !== this.props.player.lastWaveFormSeek) {
      console.log('should not log');
      // this.setNewTrackPos(nextProps.player.lastWaveFormSeek);
      this.reactPlayer.seekTo(nextProps.player.lastWaveFormSeek);
    }
  }

  render() {
    if (!this.props.currentTrack) {
      return <div></div>;
    } else {
      return (
        <div className="player-bar">
          <div className="player-bar-contents">
            <ReactPlayer ref={this.ref}
                         url={this.props.currentTrack.audioURL}
                         playing={this.props.player.playing}
                         loop={this.props.player.looping}
                         progressInterval={50}
                         height="0px"
                         width="0px"
                         volume={this.state.volume}
                         muted={this.state.muted}
                         onProgress={this.handleProgress}
                         onDuration={this.setDuration}
                         onStart={this.handleTrackStart}
                         onEnded={this.handleTrackEnded}
                         config={ { file: { forceAudio: true } }}
             />
           <div className="player-buttons">
             <div className="prev-track-btn" onClick={this.handlePrevTrackClick}></div>
             <PlayButton styleType="simple" trackId={this.props.currentTrack.id}></PlayButton>
             <div className="next-track-btn" onClick={this.handleNextTrackClick}></div>
             {this.renderLoopButton()}
           </div>
           <div className="progress-bar-container" onMouseEnter={this.setProgressHover} onMouseLeave={this.unsetProgressHover}>
             <div className="player-bar-progress-time">
               {formatTime(this.state.elapsed * this.duration)}
             </div>
             <div className="progress-bar">
               <div className="progress-bar-elapsed" style={ {width: `${Math.floor(this.state.elapsed * 640)}px`} }>
               </div>
               {this.renderSeekInput()}
             </div>
             <div className="player-bar-duration-time">
               {formatTime(this.duration)}
             </div>
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
