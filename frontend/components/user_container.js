import { connect } from 'react-redux';
import { selectUserTracks } from '../util/selectors';
import { fetchUser } from '../actions/user_actions';
import UserShow from './user_show';

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.userId;
  const user = state.entities.users[userId] || {};
  return {
    userId,
    user,
    tracks: selectUserTracks(state, user)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
