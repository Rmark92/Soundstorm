import React from 'react';
import TrackQueueItem from './track_queue_item_container';

export default class TrackQueue extends React.Component {
  render() {
    return (
      <div className="track-queue-container">
        <div className="track-queue-header">Your Playlist</div>
        {this.props.tracks.map((track) => {
          return <TrackQueueItem key={track.id} track={track}></TrackQueueItem>;
        })}
      </div>
    );
  }
}
