import React from 'react';
import WaveSurfer from "wavesurfer.js";

export default class WaveForm extends React.Component {
  constructor(props) {
    super(props);
    this.waveFormid = `waveform${this.props.track.id}`;
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
    this.wavesurfer.on('ready', () => {
      this.wavesurfer.setMute();
      const currentTrackProgress = this.props.player.tracksProgress[this.props.track.id];
      if (currentTrackProgress ==='playing' &&
          this.props.track.id === this.props.player.currentTrackId) {
        this.wavesurfer.seekTo(this.currentPlayerTime());
      } else if (currentTrackProgress){
        this.wavesurfer.seekTo(currentTrackProgress);
      }
      // else {
      //   this.wavesurfer.seekTo(0);
      // }

      // if (this.props.player.playing &&
      //     this.props.track.id === this.props.player.currentTrackId &&
      //     Math.round(this.currentPlayerTime() * 100) !== Math.round(currentPos * 100) )) {
      //
      //   currentTrackProgress = this.currentPlayerTime();
      //   console.log(currentTrackProgress);
      //   this.wavesurfer.seekTo(currentTrackProgress);
      //   this.mountSeek = true;
      //   this.wavesurfer.play();
      // } else {
      //   currentTrackProgress = this.props.player.tracksProgress[this.props.track.id];
      //   if (currentTrackProgress) {
      //     this.wavesurfer.seekTo(currentTrackProgress);
      //   } else {
      //     this.wavesurfer.seekTo(0);
      //   }
      //   this.wavesurfer.pause();
      // }


    });
    //
    this.wavesurfer.on('seek', (pos) => {
      const trackProgress = this.props.player.tracksProgress[this.props.track.id];
      // if (this.props.player.playing &&
      //     this.props.track.id === this.props.player.currentTrackId &&
      //     Math.round(this.currentPlayerTime() * 100) !== Math.round(pos * 100) ) {
      //       // debugger;
      //       // console.log(Math.round(this.currentPlayerTime() * 100));
      //       // console.log(Math.round(pos * 100));
      //       // debugger
      //       this.props.updateProgress(this.props.track.id, pos);
      // } else
      if (!trackProgress ||
          (trackProgress &&
           Math.round(pos * 100) !== Math.round(trackProgress * 100)
          )) {
        this.props.updateProgress(this.props.track.id, pos);
      }
    });
  }

  componentWillUnmount() {

    if (this.props.player.playing &&
        this.props.track.id === this.props.player.currentTrackId) {
      this.props.updateProgress(this.props.track.id, 'playing');
    } else {
      const currentPos = this.wavesurfer.getCurrentTime() / this.wavesurfer.getDuration();
      this.props.updateProgress(this.props.track.id, currentPos)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.player.playing && nextProps.player.currentTrackId === this.props.track.id) {
      this.wavesurfer.play();
    } else {
      this.wavesurfer.pause();
    }

    const trackProgress = nextProps.player.tracksProgress[this.props.track.id];
    const currentPos = this.wavesurfer.getCurrentTime() / this.wavesurfer.getDuration();
    // if (this.props.player.playing &&
    //     this.props.track.id === this.props.player.currentTrackId &&
    //     this.props.player.reactPlayer &&
    //     Math.round(this.currentPlayerTime() * 100) !== Math.round(currentPos * 100) ) {
    //       console.log(currentPos);
    //       console.log(this.currentPlayerTime());
    //       this.wavesurfer.seekTo(this.currentPlayerTime());
    // } else
    if (trackProgress &&
        trackProgress !== 'playing' &&
        (Math.round(currentPos * 100) !== Math.round(trackProgress * 100))) {
      this.wavesurfer.seekTo(trackProgress);
    }
  }

  currentPlayerTime() {
    return (this.props.player.reactPlayer.getCurrentTime()) / (this.props.player.reactPlayer.getDuration());
  }

  render() {
    return (
      <div className={this.props.divClass} id={this.waveFormid}>
      </div>
    );
  }
}
