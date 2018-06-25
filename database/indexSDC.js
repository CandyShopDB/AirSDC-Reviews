const { Client } = require('pg');
const config = require('./config');
const path = require('path');

const db = new Client(config);
db.connect()
  .then(() => console.log('Connected to the PostgreSQL db'))
  .catch(err => console.log(err));

console.time('rooms');
console.time('reviews');
console.time('users');
console.time('photos');
console.time('reports');

console.log('1M rooms')

db.query(`COPY rooms (roomname,roomAddress,hostId,totalNumReviews,totalAccuracy,totalCommunication,totalCleanliness,totalLocation,totalCheckIn,totalValue)
FROM '/Users/anoop/desktop/sdcProject/anoop-reviews/database/csvData/rooms.csv' (FORMAT csv, HEADER, DELIMITER ',');`)
  .then(() => {
    console.log('Rooms added! 1/5');
    console.timeEnd('rooms');
  })
  .catch(err => console.log(err));

db.query(`COPY reviews (userId,roomId,text,date,accuracy,communication,cleanliness,location,checkIn,value)
FROM '/Users/anoop/desktop/sdcProject/anoop-reviews/database/csvData/reviews.csv' (FORMAT csv, HEADER, DELIMITER ',');`)
  .then(() => {
    console.log('Reviews added! 2/5');
    console.timeEnd('reviews');
  })
  .catch(err => console.log(err));

db.query(`COPY users (username,avatar) FROM
'/Users/anoop/desktop/sdcProject/anoop-reviews/database/csvData/users.csv' (FORMAT csv, HEADER, DELIMITER ',');`)
  .then(() => {
    console.log('Users added! 3/5');
    console.timeEnd('users');
  })
  .catch(err => console.log(err));

db.query(`COPY photos (reviewId,photoUrl) FROM
'/Users/anoop/desktop/sdcProject/anoop-reviews/database/csvData/photos.csv' (FORMAT csv, HEADER, DELIMITER ',');`)
  .then(() => {
    console.log('Photos added! 4/5');
    console.timeEnd('photos');
  })
  .catch(err => console.log(err));

db.query(`COPY reports (reviewId,userId,reason,comments) FROM
'/Users/anoop/desktop/sdcProject/anoop-reviews/database/csvData/reports.csv' (FORMAT csv, HEADER, DELIMITER ',');`)
  .then(() => {
    console.log('Reports added! 5/5');
    console.timeEnd('reports');
  })
  .catch(err => console.log(err));
