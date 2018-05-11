export const createTrack = (trackData) => {
  return $.ajax({ method: 'POST',
                  url: '/api/tracks',
                  contentType: false,
                  processData: false,
                  data: trackData });
};

export const fetchTrack = (trackId) => {
  return $.ajax({method: 'GET', url: `/api/tracks/${trackId}`});
};
