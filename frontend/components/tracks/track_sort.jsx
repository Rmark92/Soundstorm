import React from 'react';
import TrackIndexContainer from './track_index_container';
import TrackQueue from './track_queue_container';

export default class TrackSort extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchTracks({ trackSort: this.props.trackSort });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.trackSort !== newProps.trackSort) {
      this.props.fetchTracks({ trackSort: newProps.trackSort });
      this.rankTracks = newProps.trackSort === 'top';
    }
  }

  renderHeaderText() {
    switch(this.props.trackSort) {
      case "recent":
        return "Hear the latest tracks posted to soundstorm";
      case "top":
        return "The most popular tracks on soundstorm";
      case "random":
        return "Check out these randomly selected songs";
    }
  }

  render() {
    return (
      <div className="track-sort-container">
        <div className="track-sort-container-left">
          <div className="sort-container-header">{this.renderHeaderText()}</div>
          <TrackIndexContainer trackIds={this.props.trackIds} trackSort={this.props.trackSort}>
          </TrackIndexContainer>
        </div>
        <TrackQueue></TrackQueue>
      </div>
    );
  }
}
