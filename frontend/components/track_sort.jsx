import React from 'react';
import TrackIndexContainerTmp from './track_index_container_tmp';

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
        return "The most played tracks on soundstorm";
      case "random":
        return "Check out these randomly selected songs";
    }
  }

  render() {
    return (
      <div className="track-sort-container">
        <div className="sort-container-header">{this.renderHeaderText()}</div>
        <TrackIndexContainerTmp trackIds={this.props.trackIds} trackSort={this.props.trackSort}>
        </TrackIndexContainerTmp>
      </div>
    );
  }
}
