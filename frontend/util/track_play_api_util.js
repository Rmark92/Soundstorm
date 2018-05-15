export const createTrackPlay = (trackId) => {
  return $.ajax({ method: 'POST', url: `/api/tracks/${trackId}/plays`});
};
