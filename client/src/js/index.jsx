// client/src/js/index.jsx

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import Reviews from './components/reviews';
import configureStore from './store/configureStore';
import sagas from './actions/sagas';

const initialState = {
  queryInput: '',
  querySortBy: [],
  roomHasErrored: false,
  roomIsFetching: false,
  pageHasErrored: false,
  pageIsFetching: false,
  roomId: Math.floor(Math.random() * 100) + 1000,
  roomName: '',
  roomTotalReviewNumber: 0,
  overallRating: {
    accuracy: 0,
    communication: 0,
    cleanliness: 0,
    location: 0,
    checkIn: 0,
    value: 0,
  },
  numberReviewsPerPage: 7,
  currentPage: 1,
  totalNumberResults: 0,
  reviews: [],
  pages: [],
};

const store = configureStore(initialState); // can also pass in an initialState here

store.runSaga(sagas.mySelectAPage);
store.runSaga(sagas.mySelectARoom);
store.runSaga(sagas.myQueryReview);

ReactDOM.render(
  (
    <Provider store={store}>
      <Reviews />
    </Provider>
  ),
  document.getElementById('reviews'),
);
