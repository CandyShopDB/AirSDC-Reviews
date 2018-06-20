// jest file

import axios from 'axios';

import { call, put, fork, cancel } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/lib/utils';
import fetchData from '../client/src/js/apis/fetchData';
import { updateState } from '../client/src/js/actions/index';
import {
  pageIsFetching,
  roomIsFetching,
  pageHasErrored,
  roomHasErrored,
  pageInfoFetched,
  roomInfoFetched,
  getReviewPage,
  getRoomInfo,
  selectAPage,
  selectARoom,
} from './sagas';

describe('Mock selectAPage', () => {
  const mockState = {
    currentPage: 2,
    roomId: 1001,
    numberReviewsPerPage: 7,
  };
  const alterUrl = 'http://localhost:3003/';
  axios.defaults.baseURL = alterUrl;

  describe('selectAPage test', () => {
    const selectAPageGen = selectAPage({ type: 'SELECT_A_PAGE', state: mockState });
    test('selectAPage should call getReviewPage generator function with the input state', () => {
      expect(selectAPageGen.next().value).toEqual(call(getReviewPage, mockState));
    });

    test('selectAPage should catch error and call pageHasErrored generator function with state', () => {
      expect(selectAPageGen.throw('error').value).toEqual(call(pageHasErrored, mockState));
    });
  });

  describe('getReviewPage test', () => {
    const getReviewPageGen = getReviewPage(mockState);
    const mockFork = fork(pageIsFetching);
    const mockForkTask = createMockTask(mockFork);
    test('getReviewPage should fork pageIsFetching generator function', () => {
      expect(getReviewPageGen.next().value).toEqual(mockFork);
    });

    test('getReviewPage should call getReviewPage fetch function with the input state', () => {
      expect(getReviewPageGen.next(mockForkTask).value).toEqual(call(
        fetchData.getReviewPage,
        mockState.roomId,
        mockState.currentPage,
        mockState.numberReviewsPerPage,
      ));
    });

    test('getReviewPage should cancel the forked task and call pageInfoFetched generator function with updated state', (done) => {
      (async (state) => {
        const data = await fetchData.getReviewPage(
          state.roomId,
          state.currentPage,
          state.numberReviewsPerPage,
        );
        expect(getReviewPageGen.next(data).value).toEqual(cancel(mockForkTask));
        expect(getReviewPageGen.next().value).toEqual(call(
          pageInfoFetched,
          { ...mockState, ...data },
        ));
        done();
      })(mockState);
    });

    const getReviewPageGen2 = getReviewPage(mockState);
    getReviewPageGen2.next();
    getReviewPageGen2.next(mockForkTask);
    test('getReviewPage should catch error in fetch and throw error', () => {
      expect(() => { getReviewPageGen2.throw('error'); }).toThrow();
    });
  });
});

