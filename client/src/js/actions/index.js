// client/src/js/actions/index.js


export const updateState = state => ({ type: 'UPDATE_STATE', state });
export const selectARoom = (roomId, numberReviewsPerPage) => ({ type: 'SELECT_A_ROOM', state: { roomId, numberReviewsPerPage } });
export const selectAPage = (roomId, currentPage, numberReviewsPerPage) => ({ type: 'SELECT_A_PAGE', state: { roomId, currentPage, numberReviewsPerPage } });
export const queryReview = (roomId, queryInput, querySortBy, numberReviewsPerPage) => ({
  type: 'QUERY_REVIEW',
  state: {
    roomId,
    queryInput,
    querySortBy,
    numberReviewsPerPage,
  },
});
export const updateQueryInput = queryInput => ({ type: 'UPDATE_QUERY_INPUT', queryInput });
export const updateQuerySortBy = querySortBy => ({ type: 'UDPATE_QUERY_SORTBY', querySortBy });
