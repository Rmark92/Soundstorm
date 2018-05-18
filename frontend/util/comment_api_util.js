export const createComment = (trackId, commentData) => {
  return $.ajax({ method: 'POST',
                  url: `/api/tracks/${trackId}/comments`,
                  data: { comment: commentData}});
};

export const deleteComment = (trackId, commentId) => {
  return $.ajax({ method: 'DELETE',
                  url: `/api/tracks/${trackId}/comments/${commentId}`});
};
