import React from 'react';
import TrackIndexItem from './track_index_item_container.js';

export default class TrackIndex extends React.Component {
  constructor(props) {
    super(props);
    this.setDataType(this.props.trackSort);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.trackSort !== newProps.trackSort) {
      this.setDataType(newProps.trackSort);
    }
  }

  renderRankHeader() {
    if (this.props.trackSort === 'top') {
      return <div className="track-num-header">#</div>;
    }
  }

  setDataType(trackSort) {
    switch(trackSort) {
      case 'top':
        this.dataCol = 'Activity';
        this.dataType = 'popularity';
        break;
      case 'recent':
        this.dataCol = 'Posted Date';
        this.dataType = 'date';
        break;
      case 'none':
      case 'random':
      default:
        this.dataCol = '';
        this.dataType = 'all';
        break;
    }
  }

  renderDataColText() {
    switch(this.props.trackSort) {
      case 'random':
      case 'top':
        return "Activity";
      case 'recent':
        return 'Posted Date';
      case 'none':
      default:
        return '';
    }
  }

  render() {
    return (
      <div className="track-index-container">
        { this.props.trackList.map( (track, idx) => {
            return (
              <TrackIndexItem key={track.id}
                              track={track}
                              dataType={this.dataType}
                              rankVal={this.props.trackSort === 'top' ? idx + 1 : null}></TrackIndexItem>
            );
          })
        }
      </div>
    );
  }
}
// <div className="track-index-header">

// <div className="track-info-cols">
//   {this.renderRankHeader()}
//   <div className="track-info-header">Track</div>
// </div>
// <div className="track-data-col">{this.dataCol}</div>
