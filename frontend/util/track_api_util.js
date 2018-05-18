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

export const fetchTracks = (filters = {}) => {
  return $.ajax({method: 'GET', url: `/api/tracks`, data: filters});
};

export const deleteTrack = (trackId) => {
  return $.ajax({method: 'DELETE', url: `/api/tracks/${trackId}`});
};
