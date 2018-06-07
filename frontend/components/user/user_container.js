import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { selectUserTracks } from '../../util/selectors';
import { fetchUser, updateUser } from '../../actions/user_actions';
import UserShow from './user_show';

const mapStateToProps = (state, ownProps) => {
  const userId = ownProps.match.params.userId;
  const user = state.entities.users[userId] || {};
  // debugger
  return {
    currentUserId: state.session.id,
    userId,
    user,
    tracks: selectUserTracks(state, user)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    updateUser: (userId, data) => dispatch(updateUser(userId, data))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow));
