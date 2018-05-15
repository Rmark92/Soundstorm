export const createComment = (trackId, commentData) => {
  return $.ajax({ method: 'POST',
                  url: `/api/tracks/${trackId}/comments`,
                  data: { comment: commentData}});
};
