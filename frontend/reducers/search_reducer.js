import { RECEIVE_SEARCH_RESULTS,
         CLEAR_SEARCH_RESULTS } from '../actions/search_actions.js';

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
      return action.results;
    case CLEAR_SEARCH_RESULTS:
      return [];
    default:
      return state;
  }
};
