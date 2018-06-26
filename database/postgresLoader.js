const { Client } = require('pg');
const config = require('./config');

const db = new Client(config);
db.connect()
  .then(() => console.log('Connected to the PostgreSQL db'))
  .catch(err => console.log(err));

console.time('rooms');
console.time('reviews');
console.time('users');
console.time('photos');
console.time('reports');
console.time('foreign_keys');

console.log('10M rooms')

db.query(`COPY rooms (roomname,roomAddress,hostId,totalNumReviews,totalAccuracy,totalCommunication,totalCleanliness,totalLocation,totalCheckIn,totalValue)
FROM '/Users/anoop/desktop/anoop-reviews/database/dataPostgres/rooms.csv' (FORMAT csv, HEADER, DELIMITER ',');`)
  .then(() => {
    console.log('Rooms added! 1/6');
    console.timeEnd('rooms');
  })
  .catch(err => console.log(err));

db.query(`COPY reviews (userId,roomId,text,date,accuracy,communication,cleanliness,location,checkIn,value)
FROM '/Users/anoop/desktop/anoop-reviews/database/dataPostgres/reviews.csv' (FORMAT csv, HEADER, DELIMITER ',');`)
  .then(() => {
    console.log('Reviews added! 2/6');
    console.timeEnd('reviews');
  })
  .catch(err => console.log(err));

db.query(`COPY users (username,avatar) FROM
'/Users/anoop/desktop/anoop-reviews/database/dataPostgres/users.csv' (FORMAT csv, HEADER, DELIMITER ',');`)
  .then(() => {
    console.log('Users added! 3/6');
    console.timeEnd('users');
  })
  .catch(err => console.log(err));

db.query(`COPY photos (reviewId,photoUrl) FROM
'/Users/anoop/desktop/anoop-reviews/database/dataPostgres/photos.csv' (FORMAT csv, HEADER, DELIMITER ',');`)
  .then(() => {
    console.log('Photos added! 4/6');
    console.timeEnd('photos');
  })
  .catch(err => console.log(err));

db.query(`COPY reports (reviewId,userId,reason,comments) FROM
'/Users/anoop/desktop/anoop-reviews/database/dataPostgres/reports.csv' (FORMAT csv, HEADER, DELIMITER ',');`)
  .then(() => {
    console.log('Reports added! 5/6');
    console.timeEnd('reports');
  })
  .catch(err => console.log(err));

db.query(`ALTER TABLE reviews ADD FOREIGN KEY (userId) REFERENCES users (id);
ALTER TABLE reviews ADD FOREIGN KEY (roomId) REFERENCES rooms (id);
ALTER TABLE rooms ADD FOREIGN KEY (hostId) REFERENCES users (id);
ALTER TABLE photos ADD FOREIGN KEY (reviewId) REFERENCES reviews (id);
ALTER TABLE reports ADD FOREIGN KEY (userId) REFERENCES users (id);
ALTER TABLE reports ADD FOREIGN KEY (reviewId) REFERENCES reviews (id);`)
  .then(() => {
    console.log('Foreign Keys Added! 6/6');
    console.timeEnd('foreign_keys');
  })
  .catch(err => console.log(err));