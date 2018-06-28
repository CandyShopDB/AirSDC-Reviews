const { Client } = require('pg');
const config = require('./config');
const db = new Client(config);
db.connect()
  .then(() => console.log('Connected to the PostgreSQL db'))
  .catch(err => console.log(err));


const queryRoomInfoByRoomId = async (roomId) => {
  try {
    const data = await db.query('SELECT * FROM rooms WHERE id = $1;', [roomId]);
    return Object.assign({}, data.rows[0]);
  } catch (err) {
    throw new Error(`query room info error: ${err.message}`);
  }
};

const queryReviewsByRoomId = async (queryObj) => {
  let queryStr = `SELECT username as userName, avatar, date, (accuracy + communication + cleanliness + location + checkIn + value) / 6 AS aggregateRate, text FROM (SELECT users.username, users.avatar, reviews.date, reviews.text, reviews.accuracy, reviews.communication, reviews.cleanliness, reviews.location, reviews.checkIn, reviews.value FROM reviews INNER JOIN users ON users.id = reviews.userId WHERE reviews.roomId = $1) AS candidates`;
  if (queryObj.keyword || queryObj.keyword === 0) {
    queryStr += ` WHERE text LIKE "%${queryObj.keyword}%"`;
  }
  queryStr += ' ORDER BY ';
  if (queryObj.sortBy && queryObj.sortBy.length) {
    queryStr += `${queryObj.sortBy[0]}${(queryObj.sortBy[1] === -1) ? ' DESC, ' : ', '}`;
  }
  queryStr += 'date DESC;';
  try {
    const data = await db.query(queryStr, [queryObj.roomId]);
    return data.rows.map(row => Object.assign({}, row));
  } catch (err) {
    console.log(err);
    throw new Error(`query room info error: ${err.message}`);
  }
};

module.exports.queryRoomInfoByRoomId = queryRoomInfoByRoomId;
module.exports.queryReviewsByRoomId = queryReviewsByRoomId;