import React from 'react';
import ReactPlayer from 'react-player';
import PlayButton from './play_button_container';

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: 0.9,
      muted: false
    };

    this.ref = this.ref.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  ref(player) {
    this.player = player;
    this.props.setReactPlayer(player);
  }

  handlePause(event) {
    debugger
  }

  render() {
    if (!this.props.currentTrack) {
      return <div></div>;
    } else {
      return (
        <div className="player-bar">
          <PlayButton id="test" size="medium" trackId={this.props.currentTrack.id}></PlayButton>
          <ReactPlayer ref={this.ref}
                       url={this.props.currentTrack.audioURL}
                       playing={this.props.player.playing}
                       height="0px"
                       width="0px"
                       volume={this.state.volume}
                       muted={this.state.muted}
                       config={ { file: { forceAudio: true } }}
                       onPause={this.handlePause}
                       controls />
        </div>
      );
    }
  }
}
// <audio src={this.props.currentTrack.audioURL} volume="0.8" controls autoPlay></audio>

// <audio src="http://s3.us-east-1.amazonaws.com/soundstorm-app-dev/tracks/audios/000/000/026/original/09_Flowers.m4a?1526062845" controls volume="0.9" autoPlay></audio>

// if (!this.props.currentTrack) {
//   return <div className="empty-player"></div>;
// } else {
//
//   debugger;
//   return (
//       <audio src={this.props.currentTrack.audioUrl} controls volume="0.9" autoPlay></audio>
//   );
// }
// return (
//   <div className="player-bar">
//     <ReactPlayer url={this.props.currentTrack.audioUrl}
//                  playing
//                  volume={this.state.volume}
//                  muted={this.state.muted}
//                  onReady={this.handleOnReady}
//                  config={ { file: { forceAudio: true } }} />
//   </div>
// );
