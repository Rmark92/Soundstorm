export const getSearchResults = (queryInput) => {
  return $.ajax({ method: 'GET',
                  url: `/api/search`,
                  data: { query: queryInput}});
};
