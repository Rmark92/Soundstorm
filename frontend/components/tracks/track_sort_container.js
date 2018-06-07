import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchTracks } from '../../actions/track_actions';
import * as SortUtil from '../../util/sort_util.js';
import TrackSort from './track_sort';

const determineSortFunc = (trackSort) => {
  switch (trackSort) {
    case 'top':
      return SortUtil.sortTracksByPopularity;
    case 'recent':
      return SortUtil.sortByDate;
    case 'random':
    default:
      return null;
  }
};

const mapStateToProps = (state, ownProps) => {
  const paramsToSortType = {
    stream: 'recent',
    charts: 'top',
    discover: 'random'
  };

  const trackSort = paramsToSortType[ownProps.match.params.listType || 'stream'];
  const trackObj = state.entities.tracks;
  const trackArr = Object.keys(trackObj).map( id => trackObj[id]);
  const sortFunc = determineSortFunc(trackSort);
  const sortedTracks = sortFunc ? sortFunc(trackArr) : trackArr;
  return {
    trackSort,
    trackIds: sortedTracks.map( track => track.id ).slice(0,10)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTracks: (trackSort) => dispatch(fetchTracks(trackSort))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackSort));
