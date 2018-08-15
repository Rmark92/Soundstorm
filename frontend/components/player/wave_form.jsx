import React from 'react';
import WaveSurfer from "wavesurfer.js";
import TrackLoader from './loader.jsx';

export default class WaveForm extends React.Component {
  constructor(props) {
    super(props);
    this.waveFormid = `waveform${this.props.track.id}`;
    this.width = this.props.divClass === "waveform-index" ? 600 : 800;
    this.state = { loaded: false };
    this.handleReady = this.handleReady.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
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
    this.createWaveForm();
    this.wavesurfer.load(this.props.track.audioURL);
    this.wavesurfer.on('ready', this.handleReady);
    this.wavesurfer.on('seek', this.handleSeek);
  }

  handleReady() {
    this.setState( {loaded: true });
    this.wavesurfer.setMute();

    if (!this.props.duration) {
      this.props.setTrackDuration(this.props.track.id, this.wavesurfer.getDuration());
    }

    if (this.props.isCurrentTrack && this.currentPlayerTime()) {
      this.wavesurfer.seekTo(this.currentPlayerTime());
      if (this.props.playing && !this.props.buffering) { this.wavesurfer.play(); }
    } else if (this.props.lastProgressStamp) {
      this.wavesurfer.seekTo(this.props.lastProgressStamp);
    }
  }

  handleSeek(pos) {
    if (!this.props.isCurrentTrack && this.props.lastProgressStamp !== pos) {
      if (this.props.lastProgressStamp === 0) { this.props.createTrackPlay(this.props.track.id); }
      this.props.setCurrentTrack(this.props.track.id, pos);
    } else if (this.props.isCurrentTrack &&
               Math.round(pos * 100) !== Math.round(this.currentPlayerTime() * 100)) {
      this.props.waveFormSeek(pos);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lastProgressStamp !== this.props.lastProgressStamp) {
      this.wavesurfer.seekTo(this.props.lastProgressStamp);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playing && !nextProps.buffering && nextProps.isCurrentTrack) {
      this.wavesurfer.play();
    } else {
      this.wavesurfer.pause();
    }

    if (this.props.isCurrentTrack &&
        this.props.lastPlayerSeek !== nextProps.lastPlayerSeek) {
      this.wavesurfer.seekTo(nextProps.lastProgressStamp);
    } else if (!this.props.isCurrentTrack && nextProps.isCurrentTrack) {
      this.wavesurfer.seekTo(nextProps.lastProgressStamp);
    }
  }

  componentWillUnmount() {
    this.wavesurfer.destroy();
  }

  currentPlayerTime() {
    return (this.props.reactPlayer.currentTime / this.props.reactPlayer.duration);
  }

  renderLoader() {
    if (!this.state.loaded) {
      return <TrackLoader width={this.width}></TrackLoader>;
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
