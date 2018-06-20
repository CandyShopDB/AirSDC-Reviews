// client/src/js/apis/fetchData.js

import axios from 'axios';

if (!global._babelPolyfill) require('babel-polyfill');

const roomUrl = '/reviews/';

const getRoomInfo = async (roomId, numberReviewsPerPage) => {
  try {
    const url = roomUrl + roomId;
    const params = { pageonly: 0, start: 0, limit: numberReviewsPerPage };
    const response = axios.get(url, { params });
    return (await response).data;
  } catch (err) {
    throw (err);
  }
};

const getReviewPage = async (roomId, pageNum, numberReviewsPerPage) => {
  try {
    const url = roomUrl + roomId;
    const start = (pageNum - 1) * numberReviewsPerPage;
    const params = { pageonly: 1, start, limit: numberReviewsPerPage };
    const response = axios.get(url, { params });
    return (await response).data;
  } catch (err) {
    throw (err);
  }
};

const getQueriedReviews = async (roomId, keyword, sortBy, numberReviewsPerPage) => {
  try {
    const url = roomUrl + roomId;
    const params = { pageonly: 1, start: 0, limit: numberReviewsPerPage };
    const response = axios.post(url, { keyword, sortBy }, { params });
    return (await response).data;
  } catch (err) {
    throw (err);
  }
};

export default {
  getRoomInfo,
  getReviewPage,
  getQueriedReviews,
};

