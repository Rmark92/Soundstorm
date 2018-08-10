import React from 'react';

export default class TrackLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaderPos: 0,
                   loaderWidth: 300,
                   overflowWidth: 0 };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const loaderPos = (this.state.loaderPos + 3) % this.props.width;
      const overflowWidth = Math.max(loaderPos + 300 - this.props.width, 0);
      const loaderWidth = 300 - overflowWidth;
      this.setState(
        { loaderPos: loaderPos,
          loaderWidth: loaderWidth,
          overflowWidth: overflowWidth });
    }, 10);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="track-loader" style={ { width: `${this.props.width}px` }}>
        <div className="track-loader-inner"
             style={ { left: '0px', width: `${this.state.overflowWidth}px` } }>
        </div>
        <div className="track-loader-inner"
             style={ {left: `${this.state.loaderPos}px`, width: `${this.state.loaderWidth}px` }}>
        </div>
      </div>
    );
  }
}
