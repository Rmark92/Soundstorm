import React from 'react';
import WaveSurfer from "wavesurfer.js";

export default class WaveForm extends React.Component {
  constructor(props) {
    super(props);
    this.waveFormid = `waveform${this.props.track.id}`;
    this.width = this.props.divClass === "waveform-index" ? 600 : 800;
    this.state = { loaderPos: 0,
                   loaderWidth: 300,
                   overflowWidth: 0,
                   loaded: false };
  }

  createWaveForm() {
    switch(this.props.divClass) {
      case "waveform-index":
        this.wavesurfer = WaveSurfer.create({ container: `#${this.waveFormid}`,
                                              progressColor: '#f50',
                                              height: 70,
                                              waveColor: '#666',
                                              barWidth: 2,
                                              interact: true
                                          });
        break;
      case "waveform-track-show":
        this.wavesurfer = WaveSurfer.create({ container: `#${this.waveFormid}`,
                                              progressColor: '#f50',
                                              height: 100,
                                              waveColor: 'white',
                                              barWidth: 2,
                                              interact: true
                                          });
        break;
    }
  }

  // componentDidUpdate(prev)

  componentDidMount() {
    this.loaderInterval = setInterval(() => {
      const loaderPos = (this.state.loaderPos + 3) % this.width;
      const overflowWidth = Math.max(loaderPos + 300 - this.width, 0);
      const loaderWidth = 300 - overflowWidth;
      this.setState(
        { loaderPos: loaderPos,
          loaderWidth: loaderWidth,
          overflowWidth: overflowWidth });
    }, 10);
    this.createWaveForm();
    this.wavesurfer.load(this.props.track.audioURL);
    this.wavesurfer.on('ready', () => {
      this.setState( {loaded: true });
      this.wavesurfer.setMute();
      if (this.props.isCurrentTrack && this.props.playing) {
        this.wavesurfer.seekTo(this.currentPlayerTime());
      } else if (this.props.lastProgressStamp){
        this.wavesurfer.seekTo(this.props.lastProgressStamp);
      }
    });

    this.wavesurfer.on('seek', (pos) => {
      if (this.props.isCurrentTrack &&
          // this.props.playing &&
          Math.round(pos * 100) !== Math.round(this.currentPlayerTime() * 100)) {
        this.props.waveFormSeek(pos);
      } else if (this.props.lastProgressStamp !== pos) {
        this.props.setCurrentTrack(this.props.track.id, pos);
      }
    });
  }

  // componentDidMount() {
  //   this.loaderInterval = setInterval(() => {
  //     const loaderPos = (this.state.loaderPos + 3) % this.width;
  //     const overflowWidth = Math.max(loaderPos + 300 - this.width, 0);
  //     const loaderWidth = 300 - overflowWidth;
  //     this.setState(
  //       { loaderPos: loaderPos,
  //         loaderWidth: loaderWidth,
  //         overflowWidth: overflowWidth });
  //   }, 10);
  //   this.createWaveForm();
  //   this.wavesurfer.load(this.props.track.audioURL);
  //   this.wavesurfer.on('ready', () => {
  //     // clearInterval(this.loaderInterval);
  //     this.setState( {loaded: true });
  //     this.wavesurfer.setMute();
  //     const currentTrackProgress = this.props.lastProgressStamp;
  //     if (currentTrackProgress ==='playing') {
  //       this.wavesurfer.seekTo(this.currentPlayerTime());
  //     } else if (currentTrackProgress){
  //       this.wavesurfer.seekTo(currentTrackProgress);
  //     }
  //   });
  //   //
  //   this.wavesurfer.on('seek', (pos) => {
  //     const trackProgress = this.props.trackProgress;
  //     if (!trackProgress ||
  //          Math.round(pos * 100) !== Math.round(trackProgress * 100)) {
  //       this.props.updateProgress(this.props.track.id, pos);
  //     }
  //   });
  // }
  //
  // componentWillUnmount() {
  //   if (this.props.playing &&
  //       this.props.isCurrentTrack) {
  //     this.props.updateProgress(this.props.track.id, 'playing');
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   // debugger
  //   if (nextProps.playing && nextProps.isCurrentTrack) {
  //     this.wavesurfer.play();
  //   } else {
  //     this.wavesurfer.pause();
  //   }
  //
  //   const trackProgress = nextProps.lastProgressStamp;
  //   const currentPos = this.wavesurfer.getCurrentTime() / this.wavesurfer.getDuration();
  //   if (trackProgress &&
  //       trackProgress !== 'playing' &&
  //       (Math.round(currentPos * 100) !== Math.round(trackProgress * 100))) {
  //     this.wavesurfer.seekTo(trackProgress);
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (!this.props.isCurrentTrack &&
        this.props.lastProgressStamp !== prevProps.lastProgressStamp) {
      this.wavesurfer.seekTo(this.props.lastProgressStamp);
    }
  }

  componentWillReceiveProps(nextProps) {
    // debugger
    if (nextProps.playing && nextProps.isCurrentTrack) {
      this.wavesurfer.play();
    } else {
      this.wavesurfer.pause();
    }

    if (this.props.isCurrentTrack &&
        this.props.lastPlayerSeek !== nextProps.lastPlayerSeek) {
      this.wavesurfer.seekTo(nextProps.lastPlayerSeek);
    }
  }

  currentPlayerTime() {
    return (this.props.reactPlayer.getCurrentTime()) / (this.props.reactPlayer.getDuration());
  }

  renderLoader() {
    // debugger
    if (!this.state.loaded) {
      return (
        <div className="waveform-loader" style={ { width: `${this.width}px` }}>
          <div className="waveform-loader-inner"
               style={ { left: '0px', width: `${this.state.overflowWidth}px` } }>
          </div>
          <div className="waveform-loader-inner"
               style={ {left: `${this.state.loaderPos}px`, width: `${this.state.loaderWidth}px` }}>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className={this.props.divClass} id={this.waveFormid}>
        {this.renderLoader()}
      </div>
    );
  }
}
