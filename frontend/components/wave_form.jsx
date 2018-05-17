import React from 'react';
import WaveSurfer from "wavesurfer.js";

export default class WaveForm extends React.Component {
  constructor(props) {
    super(props);
    this.waveFormid = `waveform${this.props.track.id}`;
    // debugger
  }

  createWaveForm() {
    switch(this.props.divClass) {
      case "waveform-index":
        this.wavesurfer = WaveSurfer.create({ container: `#${this.waveFormid}`,
                                              progressColor: '#f50',
                                              height: 70,
                                              waveColor: '#666',
                                              barWidth: 2,
                                          });
        break;
      case "waveform-track-show":
        this.wavesurfer = WaveSurfer.create({ container: `#${this.waveFormid}`,
                                              progressColor: '#f50',
                                              height: 100,
                                              waveColor: 'white',
                                              barWidth: 2,
                                          });
        break;
    }
  }

  // setClassOptions() {
  //   switch(this.props.divClass) {
  //     case "waveform-index":
  //       this.wavesurfer.height = 70;
  //       this.wavesurfer.waveColor = '#666';
  //       break;
  //     case "waveform-track-show":
  //       this.wavesurfer.height = 100;
  //       this.wavesurfer.waveColor = 'white';
  //       break;
  //   }
  // }

  componentDidMount() {
    this.createWaveForm();
    // this.wavesurfer = WaveSurfer.create({ container: `#${this.waveFormid}`,
    //                                       progressColor: '#f50',
    //                                       barWidth: 2,
    //                                   });
    // this.setClassOptions();
    // console.log(this.props.track.audioURL);
    this.wavesurfer.load(this.props.track.audioURL);
    this.wavesurfer.on('ready', () => {
      this.wavesurfer.setMute();
      const currentTrackProgress = this.props.player.tracksProgress[this.props.track.id];
      if (currentTrackProgress) {
        this.wavesurfer.seekTo(currentTrackProgress);
      }

      if (this.props.player.playing && this.props.track.id === this.props.player.currentTrackId) {
        const player = this.props.player.reactPlayer;
        this.wavesurfer.seekTo(player.getCurrentTime() / player.getDuration());
        this.wavesurfer.play();
      } else {
        this.wavesurfer.pause();
      }


    });
  }

  // setInitSeek() {
  //
  // }

  // setInitTime(relProps) {
  //   if (relProps.player.playing && relProps.player)
  //   if (relProps.player.playing && relProps.player.currentTrackId === this.props.track.id) {
  //     const player = nextProps.player.reactPlayer;
  //     this.wavesurfer.seekTo(player.getCurrentTime() / player.getDuration());
  //     this.wavesurfer.play();
  //   } else {
  //     this.wavesurfer.pause();
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.player.playing &&
        nextProps.player.currentTrackId === this.props.track.id &&
        nextProps.player.reactPlayer) {
      // debugger;
      const trackProgress = nextProps.player.tracksProgress[this.props.track.id] || 0;
      this.wavesurfer.seekTo(trackProgress);
      // const player = nextProps.player.reactPlayer;
      // debugger;
      // this.wavesurfer.seekTo((player.getCurrentTime() / player.getDuration()) || 0);
      this.wavesurfer.play();
    } else {
      this.wavesurfer.pause();
    }
  }

  // setClass() {
  //   switch(this.props.size) {
  //     case "waveform-index":
  //       return { width: }
  //   }
  // }

  render() {
    return (
      <div className={this.props.divClass} id={this.waveFormid}>
      </div>
    );
  }
}
