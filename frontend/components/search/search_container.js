import { connect } from 'react-redux';
import { getSearchResults, clearSearchResults } from '../../actions/search_actions';
import Search from './search';

const mapStateToProps = (state) => {
  return {
    results: state.ui.search
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSearchResults: (queryInput) => dispatch(getSearchResults(queryInput)),
    clearSearchResults: () => dispatch(clearSearchResults())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
