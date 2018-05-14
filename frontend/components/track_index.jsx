import React from 'react';
import TrackIndexItem from './track_index_item_container.js';

export default class TrackIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.type !== 'sub') {
      this.props.fetchTracks();
    }
  }

  renderRankHeader() {
    if (this.props.type !== 'sub') {
      return <div className="track-num-header">#</div>;
    }
  }

  render() {
    return (
      <div className="track-index-container">
        <div className="track-index-header">
          <div className="track-info-cols">
            {this.renderRankHeader()}
            <div className="track-info-header">Track</div>
          </div>
          <div className="track-data-col">{'Posted Date'}</div>
        </div>
        { this.props.trackList.map( (track, idx) => {
            return (
              <TrackIndexItem key={track.id}
                              track={track}
                              rank={idx + 1}
                              type={this.props.type}></TrackIndexItem>
            );
          })
        }
      </div>
    );
  }
}
