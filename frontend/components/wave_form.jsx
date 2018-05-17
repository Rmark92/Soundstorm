import React from 'react';
import WaveSurfer from "wavesurfer.js";

export default class WaveForm extends React.Component {
  constructor(props) {
    super(props);
    this.waveFormid = `waveform${this.props.track.id}`;
    // debugger
  }

  componentDidMount() {
    this.wavesurfer = WaveSurfer.create({ container: `#${this.waveFormid}`,
                                          waveColor: '#666',
                                          progressColor: '#f50',
                                          barWidth: 2,
                                          height: 70,
                                          reflection: false
                                      });
    // console.log(this.props.track.audioURL);
    const filePath = window.audioFile;
    this.wavesurfer.load(this.props.track.audioURL);

  }

  render() {
    return (
      <div className="waveform" id={this.waveFormid}>
      </div>
    );
  }
}
