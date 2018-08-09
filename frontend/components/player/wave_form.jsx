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
      if (this.props.isCurrentTrack && this.currentPlayerTime()) {
        this.wavesurfer.seekTo(this.currentPlayerTime());
        if (this.props.playing && !this.props.buffering) { this.wavesurfer.play(); }
      } else if (this.props.lastProgressStamp){
        this.wavesurfer.seekTo(this.props.lastProgressStamp);
      }
    });

    this.wavesurfer.on('seek', (pos) => {
      if (!this.props.isCurrentTrack && this.props.lastProgressStamp !== pos) {
        this.props.setCurrentTrack(this.props.track.id, pos);
        if (!this.props.lastProgressStamp) { this.props.createTrackPlay(); }
      } else if (this.props.isCurrentTrack &&
                 Math.round(pos * 100) !== Math.round(this.currentPlayerTime() * 100)) {
        this.props.waveFormSeek(pos);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playing && !nextProps.buffering && nextProps.isCurrentTrack) {
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
    return (this.props.reactPlayer.currentTime / this.props.reactPlayer.duration);
  }

  renderLoader() {
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
