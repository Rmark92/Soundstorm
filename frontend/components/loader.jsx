import React from 'react';

export default class WaveFormLoader {
  constructor(props) {
    super(props);
    this.state = { innerDivPos: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ innerDivPos: (this.state.innerDivPos + 1) % 600 }), 10);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="waveform-loader">
        <div className="waveform-loader-inner" style={ {left: this.state.innerDivPos }}></div>
      </div>
    );
  }
}
