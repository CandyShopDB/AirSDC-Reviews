const { Pool, Client } = require('pg');
const config = require('./config');

// const pool = new Pool(config);
const client = new Client(config);

// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client: ', err);
//   process.exit(-1);
// });

client.connect()
  .then(() => console.log('Connected to the PostgreSQL db'))
  .catch(err => console.log(err));


const queryRoomInfoByRoomId = async (roomId) => {
  try {
    // const client = await pool.connect();
    const data = await client.query('SELECT * FROM rooms WHERE id = $1;', [roomId]);
    const result = data.rows[0];
    result.roomName = result.roomname;
    result.roomAddress = result.roomaddress;
    result.hostId = result.hostid;
    result.totalNumberReviews = result.totalnumreviews;
    result.accuracy = result.totalaccuracy;
    result.communication = result.totalcommunication;
    result.cleanliness = result.totalcleanliness;
    result.location = result.totallocation;
    result.checkIn = result.totalcheckin;
    result.value = result.totalvalue;
    // client.release();
    return Object.assign({}, result);
  } catch (err) {
    throw new Error(`query room info error: ${err.message}`);
  }
};

const queryReviewsByRoomId = async (queryObj) => {
  let queryStr = `SELECT username, avatar, date, (accuracy + communication + cleanliness + location + checkIn + value) / 6 AS aggregateRate, text FROM (SELECT users.username, users.avatar, reviews.date, reviews.text, reviews.accuracy, reviews.communication, reviews.cleanliness, reviews.location, reviews.checkIn, reviews.value FROM reviews INNER JOIN users ON users.id = reviews.userId WHERE reviews.roomId = $1) AS candidates`;
  if (queryObj.keyword || queryObj.keyword === 0) {
    queryStr += ` WHERE text LIKE "%${queryObj.keyword}%"`;
  }
  queryStr += ' ORDER BY ';
  if (queryObj.sortBy && queryObj.sortBy.length) {
    queryStr += `${queryObj.sortBy[0]}${(queryObj.sortBy[1] === -1) ? ' DESC, ' : ', '}`;
  }
  queryStr += 'date DESC;';
  try {
    const data = await client.query(queryStr, [queryObj.roomId]);
    return data.rows.map((row) => {
      row.userName = row.username;
      row.aggregateRate = row.aggregaterate;
      return Object.assign({}, row);
    });
  } catch (err) {
    throw new Error(`query room info error: ${err.message}`);
  }
};

const addReview = async (queryObj) => {
  let queryStr = `INSERT INTO reviews (userId, roomId, text, date, accuracy, communication, cleanliness, location, checkIn, value) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
  try {
    await client.query(queryStr, [queryObj.userId, queryObj.roomId, queryObj.text, queryObj.date, queryObj.accuracy, queryObj.communication, queryObj.cleanliness, queryObj.location, queryObj.checkIn, queryObj.value]);
  } catch (err) {
    throw new Error(`post review error: ${err.message}`);
  }
}

const updateReview = async (queryObj) => {
  let queryStr = `UPDATE reviews SET text = $1, accuracy = $2, communication = $3, cleanliness = $4, location = $5, checkIn = $6, value = $7 WHERE id = $8`;
  try {
    await client.query(queryStr, [queryObj.text, queryObj.accuracy, queryObj.communication, queryObj.cleanliness, queryObj.location, queryObj.checkIn, queryObj.value, queryObj.reviewId]);
  } catch (err) {
    throw new Error(`update review error: ${err.message}`);
  }
};

const deleteReview = async (queryObj) => {
  let queryStr = `DELETE FROM reviews where id = $1`;
  try {
    await client.query(queryStr, [queryObj.reviewId]);
  } catch (err) {
    throw new Error(`delete review error: ${err.message}`);
  }
}

module.exports.client = client;
module.exports.queryRoomInfoByRoomId = queryRoomInfoByRoomId;
module.exports.queryReviewsByRoomId = queryReviewsByRoomId;
module.exports.addReview = addReview;
module.exports.updateReview = updateReview;
module.exports.deleteReview = deleteReview;

if (!module.parent) {
  client.end();
  process.exit(-1);
}