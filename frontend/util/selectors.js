export const selectTrackArtist = (state, track) => {
  if (!(track && track.artistId)) {
    return {};
  } else {
    return state.entities.users[track.artistId] || {};
  }
};
