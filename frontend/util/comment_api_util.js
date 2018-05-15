export const createComment = (trackId, commentData) => {
  return $.ajax({ method: 'POST',
                  url: `/api/tracks/${commentData.trackId}/comments`,
                  data: { comment: commentData}});
};
