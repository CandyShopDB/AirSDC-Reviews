// jest file

import axios from 'axios';
import fetchData from './fetchData';
import db from '../../../../database/index';

const alterUrl = 'http://localhost:3003/';

axios.defaults.baseURL = alterUrl;
const roomId = Math.floor(Math.random() * 100) + 1000;

describe('api call tests', () => {
  describe('getRoomInfo function tests', () => {
    test('getRoomInfo response should have the following fetures', (done) => {
      const numberReviewsPerPage = 7;
      (async () => {
        const roomInfo = await fetchData.getRoomInfo(roomId, numberReviewsPerPage);
        expect(roomInfo).toHaveProperty('totalNumberResults');
        expect(roomInfo).toHaveProperty('roomInfo');
        expect(roomInfo).toHaveProperty('reviews');
        expect(typeof roomInfo.totalNumberResults).toBe('number');
        expect(roomInfo.roomInfo).toBeInstanceOf(Object);
        expect(roomInfo.reviews).toBeInstanceOf(Array);
        console.log(roomId);
        const newRoomId = roomId - 999;
        console.log(newRoomId);
        roomInfo.roomInfo.id -= 999;
        const expectedRoomInfo = await db.queryRoomInfoByRoomId(newRoomId);
        expect(roomInfo.roomInfo).toEqual(expectedRoomInfo);
        const expectedReviews = await db.queryReviewsByRoomId({ roomId: newRoomId });
        expect(roomInfo.totalNumberResults).toBe(expectedReviews.length);
        expect(roomInfo.reviews).toEqual(expectedReviews.slice(0, numberReviewsPerPage));
        done();
      })();
    });
  });

  describe('getReviewPage function tests', () => {
    test('getReviewPage response should have the following fetures', (done) => {
      const numberReviewsPerPage = 7;
      const pageNum = 2;
      (async () => {
        const reviewPage = await fetchData.getReviewPage(
          roomId,
          pageNum,
          numberReviewsPerPage,
        );
        expect(reviewPage).toHaveProperty('totalNumberResults');
        expect(reviewPage).toHaveProperty('reviews');
        expect(typeof reviewPage.totalNumberResults).toBe('number');
        expect(reviewPage.reviews).toBeInstanceOf(Array);
        const newRoomId = roomId - 999;
        console.log(newRoomId);
        const expectedReviews = await db.queryReviewsByRoomId({ roomId: newRoomId });
        expect(reviewPage.totalNumberResults).toBe(expectedReviews.length);
        expect(reviewPage.reviews).toEqual(expectedReviews.slice(
          (pageNum - 1) * numberReviewsPerPage,
          pageNum * numberReviewsPerPage,
        ));
        done();
      })();
    });
  });

  describe('getQueriedReviews function tests', () => {
    test('getQueriedReviews response should have the following fetures', (done) => {
      const numberReviewsPerPage = 7;
      const keyword = 'able';
      const sortBy = ['aggregateRate', -1];
      (async () => {
        const queriedReviews = await fetchData.getQueriedReviews(
          roomId,
          keyword,
          sortBy,
          numberReviewsPerPage,
        );
        expect(queriedReviews).toHaveProperty('totalNumberResults');
        expect(queriedReviews).toHaveProperty('reviews');
        expect(typeof queriedReviews.totalNumberResults).toBe('number');
        expect(queriedReviews.reviews).toBeInstanceOf(Array);
        const newRoomId = roomId - 999;
        console.log(newRoomId);
        const expectedReviews = await db.queryReviewsByRoomId({
          roomId: newRoomId,
          keyword,
          sortBy,
        });
        expect(queriedReviews.totalNumberResults).toBe(expectedReviews.length);
        expect(queriedReviews.reviews).toEqual(expectedReviews.slice(0, numberReviewsPerPage));
        done();
      })();
    });
  });

  describe('multiple fetching tests', () => {
    test('getReviewPage should ge part of the result from getQueried Reviews', (done) => {
      const numberReviewsPerPage = 7;
      const keyword = 'able';
      const sortBy = ['aggregateRate', -1];
      (async () => {
        await fetchData.getQueriedReviews(
          roomId,
          keyword,
          sortBy,
          numberReviewsPerPage,
        );
        const pageNum = 2;
        const reviewPage = await fetchData.getReviewPage(
          roomId,
          pageNum,
          numberReviewsPerPage,
        );
        expect(reviewPage).toHaveProperty('totalNumberResults');
        expect(reviewPage).toHaveProperty('reviews');
        expect(typeof reviewPage.totalNumberResults).toBe('number');
        expect(reviewPage.reviews).toBeInstanceOf(Array);
        const newRoomId = roomId - 999;
        const expectedReviews = await db.queryReviewsByRoomId({
          roomId: newRoomId,
          keyword,
          sortBy,
        });
        expect(reviewPage.totalNumberResults).toBe(expectedReviews.length);
        expect(reviewPage.reviews).toEqual(expectedReviews.slice(
          (pageNum - 1) * numberReviewsPerPage,
          pageNum * numberReviewsPerPage,
        ));
        done();
      })();
    });
  });
});
