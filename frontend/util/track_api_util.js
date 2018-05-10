export const createTrack = (trackData) => {
  return $.ajax({ method: 'POST', url: '/api/tracks', data: { track: trackData }});
};
