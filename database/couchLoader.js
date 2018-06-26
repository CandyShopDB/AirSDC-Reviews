const couchimport = require('couchimport');
const path = require('path');

const roomTotal = 10000;

const roomOptions = {
  COUCH_DELIMITER: ',',
  COUCH_URL: 'http://localhost:5984',
  COUCH_DATABASE: 'airbnb_rooms',
  COUCH_TRANSFORM: path.join(__dirname, './roomTransformer.js'),
};

const reviewOptions = {
  COUCH_DELIMITER: ',',
  COUCH_URL: 'http://localhost:5984',
  COUCH_DATABASE: 'airbnb_reviews',
  COUCH_TRANSFORM: path.join(__dirname, './reviewTransformer.js'),
};

// console.log(roomOptions.COUCH_TRANSFORM);
// console.log(reviewOptions.COUCH_TRANSFORM);

console.time(`${roomTotal}_rooms`);
couchimport.importFile(path.join(__dirname, './dataCouch/rooms.csv'), roomOptions, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('FINISHED IMPORTING ROOMS!');
    console.timeEnd(`${roomTotal}_rooms`);
  }
});

console.time(`${roomTotal}_reviews`)
couchimport.importFile(path.join(__dirname, './dataCouch/reviews.csv'), reviewOptions, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('FINISHED IMPORTING REVIEWS!');
    console.timeEnd(`${roomTotal}_reviews`);
  }
});