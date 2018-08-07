import * as APIUtil from '../util/search_api_util.js';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';

export const receiveSearchResults = (results) => {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    results: results
  };
};

export const clearSearchResults = () => {
  return {
    type: CLEAR_SEARCH_RESULTS
  };
};

export const getSearchResults = (queryInput) => {
  return (dispatch) => {
    return APIUtil.getSearchResults(queryInput).then( (results) => dispatch(receiveSearchResults(results)));
  };
};
