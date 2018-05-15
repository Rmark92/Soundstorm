import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchTracks } from '../actions/track_actions';
import * as SortUtil from '../util/sort_tracks.js';
import TrackSort from './track_sort';

const determineSortFunc = (trackSort) => {
  switch (trackSort) {
    case 'top':
      return SortUtil.sortByPopularity;
    case 'recent':
      return SortUtil.sortByDate;
    case 'random':
      return SortUtil.sortRandom;
    default:
      return SortUtil.toUnsortedList;
  }
};

const mapStateToProps = (state, ownProps) => {
  const paramsToSortType = {
    stream: 'recent',
    charts: 'top',
    discover: 'random'
  };

  const trackSort = paramsToSortType[ownProps.match.params.listType || 'stream'];
  const sortFunc = determineSortFunc(trackSort);
  return {
    trackSort,
    trackIds: sortFunc(state.entities.tracks).map( track => track.id ).slice(0,10)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchTracks: (trackSort) => dispatch(fetchTracks(trackSort))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackSort));
