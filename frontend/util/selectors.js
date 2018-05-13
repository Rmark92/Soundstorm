export const selectTrackArtist = (state, track) => {
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
