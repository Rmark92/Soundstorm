import React from 'react';
import generateRandomGradient from '../util/generate_random_gradient';

export default class UserShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.userId);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.userId !== newProps.userId ) {
      this.props.fetchUser(newProps.userId);
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
      </div>
    );
  }
}

// <div id="track-show">
//   <div className="show-image" style={showImgStyle}>
//     <div className="track-links">
//       {this.renderPlayButton()}
//       <div id="track-show-title">
//         <Link id="track-artist" to={`/users/${this.props.artist.id}`}>
//           {this.props.artist.username}
//         </Link>
//         <p id="track-name">{this.props.track.title}</p>
//       </div>
//     </div>
//     <div className="cover-art-container-large">
//       <p className="track-time-elapsed">{timeSince( new Date(this.props.track.createdAt) )}</p>
//       {this.renderTrackImage()}
//     </div>
//   </div>
//   <div className="track-comments-container">
//     <div className="track-artist-details">
//       {this.renderArtistImage()}
//       <p>{this.props.artist.username}</p>
//     </div>
//     <div className="track-comments">
//       <p className="track-description">{this.props.track.description}</p>
//     </div>
//   </div>
// </div>
// );
// }
