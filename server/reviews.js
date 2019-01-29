const express = require('express');
const redis = require('redis');
const { promisify } = require('util');
const tempStorage = require('./tempStorage');
const db = require('../database/indexSDC');

const router = express.Router();
const redisClient = redis.createClient({
  host: '54.215.217.86',
  port: '6379',
});

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

const redisGetAsync = promisify(redisClient.get).bind(redisClient);


const roomIdAdjustment = -1000 + 1;

const getQueryParams = ({ pageonly, start, limit }) => {
  const result = {};
  result.totalNumberResults = tempStorage.totalNumberResults;
  if (!parseInt(pageonly, 10)) {
    result.roomInfo = tempStorage.roomInfo;
  }
  const index = parseInt(start, 10);
  const end = parseInt(limit, 10) + index;
  result.reviews = tempStorage.allQueryReviews.slice(index, end);
  return result;
};

// handle GET requests for /reviews
router.get('/:roomId', async (req, res) => {
  try {
    let { roomId } = req.params;
    roomId = parseInt(roomId, 10);
    const redisResults = await redisGetAsync(`room:${roomId}`);
    if (redisResults !== null) {
      res.status(200).send(redisResults);
    } else if (
      !parseInt(req.query.pageonly, 10)
      || !(tempStorage.roomInfo.id
        || tempStorage.roomInfo.id === roomId)
    ) {
      const info = db.queryRoomInfoByRoomId(roomId);
      const reviews = db.queryReviewsByRoomId({ roomId });
      [tempStorage.roomInfo, tempStorage.allQueryReviews] = await Promise.all([info, reviews]);
      tempStorage.roomInfo.id -= roomIdAdjustment;
      tempStorage.totalNumberResults = tempStorage.allQueryReviews.length;
      const result = getQueryParams(req.query);
      res.status(200).json(result);
      redisClient.set(`room:${roomId}`, JSON.stringify(result), 'EX', 60);
    } else {
      res.status(200).json(getQueryParams(req.query));
    }
  } catch (err) {
    res.status(500).json({error: err});
  }
});

router.post('/:roomId', async (req, res) => {
  try {
    let roomId = parseInt(req.params.roomId);
    roomId += roomIdAdjustment;
    let queryObj = { roomId };
    Object.assign(queryObj, req.body);
    await db.addReview(queryObj);
    res.status(201).end();
  } catch (err) {
    res.status(500).json({error: err});
  }
});


router.put('/:roomId/:reviewId', async (req, res) => {
  try {
    let roomId = req.params.roomId;
    let reviewId = req.params.reviewId;
    const queryObj = { reviewId };
    Object.assign(queryObj, req.body);
    await db.updateReview(queryObj);
    res.status(200).end();
    redisClient.del(`room:${roomId}`);
  } catch (err) {
    res.status(500).json({error: err});
  }
});

router.delete('/:roomId/:reviewId', async (req, res) => {
  try {
    let roomId = req.params.roomId;
    let reviewId = req.params.reviewId;
    const queryObj = { reviewId };
    Object.assign(queryObj, req.body);
    await db.deleteReview(queryObj);
    res.status(200).end();
    redisClient.del(`room:${roomId}`);
  } catch (err) {
    res.status(500).json({error: err});
  }
});

module.exports = router;
