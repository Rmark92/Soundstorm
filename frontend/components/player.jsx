import React from 'react';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import PlayButton from './play_button_container';
import LikeButton from './like_button_container';
import { formatTime } from '../util/format_time';
import { generateRandomGradient } from '../util/generate_random_gradient';
import { sliceText } from '../util/slice_text';

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 1,
      muted: false,
      playedSeconds: 0,
      elapsedWidth: 0,
      progressHover: false,
      volumeDisplayed: false
    };

    this.ref = this.ref.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleLoop = this.handleLoop.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.setProgressHover = this.setProgressHover.bind(this);
    this.unsetProgressHover = this.unsetProgressHover.bind(this);
    this.seek = this.seek.bind(this);
    this.toggleMuted = this.toggleMuted.bind(this);
    this.handleSeeking = this.handleSeeking.bind(this);
    this.handleTrackStart = this.handleTrackStart.bind(this);
  }

  calculatePlayedSeconds() {
    const trackProgress = this.props.player.tracksProgress[this.props.currentTrack.id];
    if (trackProgress) {
      return trackProgress * this.duration;
    } else {
      this.props.updateProgress(this.props.currentTrack.id, 0);
      return 0;
    }
  }

  ref(player) {
    this.reactPlayer = player;
    this.props.setReactPlayer(player);
  }

  setDuration(duration) {
    this.duration = duration;
    const playedSeconds = this.calculatePlayedSeconds();
    this.setState( { playedSeconds }, () => {
      this.reactPlayer.seekTo(playedSeconds);
    });
  }

  handleTrackStart() {
    this.props.createTrackPlay(this.props.currentTrack.id);
  }

  handleProgress(progress) {
    const elapsedWidth = Math.floor((this.state.playedSeconds / this.duration) * 640);
    this.setState({ playedSeconds: progress.playedSeconds, elapsedWidth: elapsedWidth });
  }

  setProgressHover() {
    this.setState( { progressHover: true });
  }

  unsetProgressHover() {
    this.setState( { progressHover: false });
  }

  handlePause(event) {
    // debugger
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
    if (this.state.progressHover) {
      return (
        <input className="seek-input"
               type="range"
               min="0"
               max={this.duration ? String(Math.round(this.duration)) : "0"}
               onChange={this.seek}
               onInput={this.handleSeeking}
               step="any"
               value={String(this.state.playedSeconds)}></input>
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

  handleSeeking(event) {
    const newTrackPos = parseFloat(event.target.value);
    const elapsedWidth = Math.floor((this.state.newTrackPos / this.duration) * 640);
    this.setState({ playedSeconds: newTrackPos, elapsedWidth: elapsedWidth });
    this.handleProgress( { playedSeconds: newTrackPos });
  }

  seek(event) {
    const newTrackPos = parseFloat(event.target.value);
    const elapsedWidth = Math.floor((this.state.newTrackPos / this.duration) * 640);
    this.setState({ playedSeconds: newTrackPos, elapsedWidth: elapsedWidth });
    this.handleProgress( { playedSeconds: newTrackPos });
    this.reactPlayer.seekTo(newTrackPos);
    this.props.updateProgress(this.props.currentTrack.id, this.determineTrackProgress());
  }

  // setNewTrackPos(newTrackPos) {
  //   const elapsedWidth = Math.floor((this.state.newTrackPos / this.duration) * 640);
  //   this.setState({ playedSeconds: newTrackPos, elapsedWidth: elapsedWidth });
  //   this.handleProgress( { playedSeconds: newTrackPos });
  //   this.reactPlayer.seekTo(newTrackPos);
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.currentTrack &&
  //       nextProps.currentTrack &&
  //       nextProps.currentTrack === this.props.currentTrack) {
  //     const currentProgress = (this.reactPlayer.getCurrentTime() / this.duration) || 0;
  //     const newProgress = nextProps.player.tracksProgress[this.props.currentTrack.id];
  //     debugger;
  //     if (currentProgress !== newProgress) {
  //       this.setNewTrackPos(newProgress * this.duration);
  //     }
  //   }
  // }

  determineTrackProgress() {
    if (this.reactPlayer) {
      return (this.reactPlayer.getCurrentTime() / this.reactPlayer.getDuration());
    } else {
      return null;
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
                         onPause={this.handlePause}
                         onProgress={this.handleProgress}
                         onDuration={this.setDuration}
                         onStart={this.handleTrackStart}
                         config={ { file: { forceAudio: true } }}
             />
           <div className="player-buttons">
             <PlayButton styleType="simple" trackId={this.props.currentTrack.id}></PlayButton>
             {this.renderLoopButton()}
           </div>
           <div className="progress-bar-container" onMouseEnter={this.setProgressHover} onMouseLeave={this.unsetProgressHover}>
             <div className="player-bar-progress-time">
               {formatTime(this.state.playedSeconds)}
             </div>
             <div className="progress-bar">
               <div className="progress-bar-elapsed" style={ {width: `${this.state.elapsedWidth}px`} }>
                 {this.renderSeekInput()}
               </div>
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

  // setVolume(event) {
  //   // debugger;
  // }

  // showVolumeBar() {
  //   this.setState({ volumeDisplayed: true });
  // }
  //
  // hideVolumeBar() {
  //   this.setState({ volumeDisplayed: false });
  // }

  // renderVolumeInput() {
  //   if (this.state.volumeDisplayed) {
  //     return (
  //       <div className="volume-control-bar">
  //         <input className="volume-input"
  //                type="range"
  //                step="any"
  //                min="0"
  //                max="1"
  //                onChange={this.setVolume}
  //                value={this.state.volume}></input>
  //       </div>
  //     );
  //   }
  // }

// <div className="player-volume-control" onMouseEnter={this.showVolumeBar} onMouseLeave={this.hideVolumeBar}>
//   {this.renderVolumeInput()}
// </div>

// <div className="player-volume-control" onMouseEnter={this.showVolumeBar} onMouseLeave={this.hideVolumeBar}>
//   {this.renderVolumeInput()}
// </div>
