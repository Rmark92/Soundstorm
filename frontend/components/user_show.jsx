import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import generateRandomGradient from '../util/generate_random_gradient';
import TrackIndex from './track_index_container';

export default class UserShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.userId, this.props.dataType);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.userId !== newProps.userId ) {
      this.props.fetchUser(newProps.userId);
    }
  }

  renderSubContents() {
    if (this.props.user) {
      return (
        <div className="user-contents">
          <div className="user-show-links">
            <NavLink to={`/users/${this.props.user.id}/tracks`} activeClassName="users-show-selected">
              Tracks
            </NavLink>
            <NavLink to={`/users/${this.props.user.id}/likes`} activeClassName="users-show-selected">
              Likes
            </NavLink>
            <NavLink to={`/users/${this.props.user.id}/listens`} activeClassName="users-show-selected">
              Listens
            </NavLink>
          </div>
          <div className="user-track-list">
            <Route exact
                   path={`/users/${this.props.user.id}/`}
                   render={ (props) => <TrackIndex trackIds={this.props.user.trackIds}></TrackIndex> }>
            </Route>

            <Route exact
                   path={`/users/${this.props.user.id}/tracks`}
                   render={ (props) => <TrackIndex trackIds={this.props.user.trackIds}></TrackIndex> }>
            </Route>

            <Route exact
                   path={`/users/${this.props.user.id}/likes`}
                   render={ (props) => <TrackIndex trackIds={this.props.user.likedIds}></TrackIndex>}>
            </Route>

            <Route exact
                   path={`/users/${this.props.user.id}/listens`}
                   render={ (props) => <TrackIndex trackIds={this.props.user.listenedIds}></TrackIndex>}>
            </Route>
          </div>
        </div>
      );
    }
  }

  render() {
    const showImgStyle = {
      backgroundImage: generateRandomGradient()
    };
    return (
      <div className="user-show">
        <div className="user-show-background-image" style={showImgStyle}>
          <div className="user-avatar-large">
            <img src={this.props.user.imageURL}></img>
          </div>
          <div className="user-name-large">
            {this.props.user.username}
          </div>
        </div>
        {this.renderSubContents()}
      </div>
    );
  }
}
