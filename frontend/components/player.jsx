import React from 'react';
import ReactPlayer from 'react-player';
import PlayButton from './play_button_container';
import { formatTime } from '../util/format_time';

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 0.9,
      muted: false,
      playedSeconds: 0,
      elapsedWidth: 0,
      progressHover: false
    };

    this.ref = this.ref.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleLoop = this.handleLoop.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.setProgressHover = this.setProgressHover.bind(this);
    this.unsetProgressHover = this.unsetProgressHover.bind(this);
    this.seek = this.seek.bind(this);
  }

  ref(player) {
    this.reactPlayer = player;
    this.props.setReactPlayer(player);
  }

  setDuration(duration) {
    this.duration = duration;
  }

  handleProgress(progress) {
    const elapsedWidth = Math.floor((this.state.playedSeconds / this.duration) * 640);
    this.setState({ playedSeconds: progress.playedSeconds, elapsedWidth: elapsedWidth });
  }

  // handleProgress(progress) {
  //   this.setState({ playedSeconds: progress.playedSeconds });
  //   const elapsedWidth = Math.floor((this.state.playedSeconds / this.duration) * 640);
  //   this.setState({ playedSeconds: progress.playedSeconds, elapsedWidth: elapsedWidth });
  // }

  setProgressHover() {
    this.setState( { progressHover: true });
  }

  unsetProgressHover() {
    this.setState( { progressHover: false });
  }

  handlePause(event) {
    // debugger
  }

  percentagePlayed() {
    // debugger;
    return this.duration ? (this.state.playedSeconds / this.duration) : 0;
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
               step="any"
               value={String(this.state.playedSeconds)}></input>
      );
    }
  }

  seek(event) {
    this.reactPlayer.seekTo(event.target.value);
    // debugger
    // const newPos = (this.duration * (event.clientX - event.target.offsetLeft) / event.target.offsetLeft);
    // console.log(newPos);
    // this.player.seekTo(this.duration * (event.clientX - event.target.offsetLeft) / event.target.offsetLeft);

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
          </div>
        </div>
      );
    }
  }
}
