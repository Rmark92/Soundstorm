export const selectTrackArtist = (state, track) => {
  debugger
  if (!(track && track.artistId)) {
    return {};
  } else {
    return state.entities.users[track.artistId] || {};
  }
};

export const selectUserTracks = (state, user) => {
  if (!user || !user.trackIds) {
    return [];
  } else {
    return user.trackIds.map( trackId => {
      return state.entities.tracks[trackId];
    });
  }
};

export const selectTracksById = (state, trackIds) => {
  if (!trackIds) {
    return [];
  } else {
    return trackIds.map( trackId => {
      return state.entities.tracks[trackId];
    });
  }
};

export const selectCommentsById = (state, commentIds) => {
  if (!commentIds) {
    return [];
  } else {
    return commentIds.map( commentId => {
      return state.entities.comments[commentId];
    });
  }
};
