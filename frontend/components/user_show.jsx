import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import FaCamera from 'react-icons/lib/fa/camera';
import generateRandomGradient from '../util/generate_random_gradient';
import TrackQueue from './track_queue_container';
import TrackIndex from './track_index_container';

export default class UserShow extends React.Component {
  constructor(props) {
    super(props);
    this.submitNewImage = this.submitNewImage.bind(this);
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
          <div className="main-user-contents">
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
          <TrackQueue style={ { border: "none" }}></TrackQueue>
        </div>
      );
    }
  }

  submitNewImage(event) {
    event.preventDefault();
    const file = event.currentTarget.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("user[image]", file);
      this.props.updateUser(this.props.userId, formData);
    }
    // const formData = new FormData();
    // formData.append("user[image]", file);
    //
    // const fileReader = new FileReader();
    // fileReader.onloadend = function () {
    //   this.
    //   this.setState({ [type + 'File']: file, [type + 'URL']: fileReader.result });
    // }.bind(this);
    //
    // if (file) {
    //   fileReader.readAsDataURL(file);
    // }
  }

  renderUserImageEdit() {
    if (this.props.currentUserId === this.props.user.id) {
      return (
        <div className="user-avatar-large">
          <img src={this.props.user.imageURL} />
          <label htmlFor="user-image-file-input" className="user-image-file-input-label"><FaCamera className="user-camera-icon"></FaCamera>Update Image</label>
          <input id="user-image-file-input" type="file" onChange={this.submitNewImage} className="inputfile"></input>
        </div>
      );
    } else {
      return (
        <div className="user-avatar-large">
          <img src={this.props.user.imageURL}></img>
          {this.renderUserImageEdit()}
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
          {this.renderUserImageEdit()}
          <div className="user-name-large">
            {this.props.user.username}
          </div>
        </div>
        {this.renderSubContents()}
      </div>
    );
  }
}
