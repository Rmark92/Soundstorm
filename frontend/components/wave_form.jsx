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
  //       this.wavesurfer.color = '#666';
  //       break;
  //     case "waveform-track-show":
  //       this.wavesurfer.height = 100;
  //       this.wavesurfer.color = 'white';
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
