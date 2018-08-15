import { combineReducers } from 'redux';
import playerControlsReducer from './player_controls_reducer';
import trackQueueReducer from './track_queue_reducer';
import trackPlayDataReducer from './trackplay_data_reducer';

export default combineReducers({
  controls: playerControlsReducer,
  trackQueue: trackQueueReducer,
  trackPlayData: trackPlayDataReducer
});
