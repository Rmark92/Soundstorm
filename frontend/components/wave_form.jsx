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
                                              interact: false
                                          });
        break;
      case "waveform-track-show":
        this.wavesurfer = WaveSurfer.create({ container: `#${this.waveFormid}`,
                                              progressColor: '#f50',
                                              height: 100,
                                              waveColor: 'white',
                                              barWidth: 2,
                                              interact: false
                                          });
        break;
    }
  }

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
    //
    // this.wavesurfer.on('seek', (pos) => {
    //   this.props.updateProgress(this.props.track.id, pos);
    // });
  }

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
    const trackProgress = nextProps.player.tracksProgress[this.props.track.id] || 0;
    this.wavesurfer.seekTo(trackProgress);
    if (nextProps.player.playing &&
        nextProps.player.currentTrackId === this.props.track.id &&
        nextProps.player.reactPlayer) {
      // debugger;
      // const trackProgress = nextProps.player.tracksProgress[this.props.track.id] || 0;
      // this.wavesurfer.seekTo(trackProgress);
      // const player = nextProps.player.reactPlayer;
      // debugger;
      // this.wavesurfer.seekTo((player.getCurrentTime() / player.getDuration()) || 0);
      this.wavesurfer.play();
    } else {
      this.wavesurfer.pause();
    }
  }

  render() {
    return (
      <div className={this.props.divClass} id={this.waveFormid}>
      </div>
    );
  }
}
