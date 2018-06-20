const randomGenerator = require('./randomGenerator');
const db = require('./index');

// increase max_allowed_packet parameter in mysql database to allow large write pipe
// Either add the following command to schema.sql or set the parameter on aws rds parameter group
// SET GLOBAL max_allowed_packet=16777216;

const numPics = 348;
const templateUrl = 'https://s3-us-west-1.amazonaws.com/nappbnbreviews/portait**.jpeg';

const numUsers = randomGenerator.generateInteger(1000, 100);
const userObjs = [];

for (let i = 0; i < numUsers; i++) {
  userObjs[i] = {
    userName: randomGenerator.generateString(null, 10, 3),
    avatar: templateUrl.replace('**', randomGenerator.generateInteger(numPics, 1).toString()),
  };
}

let numReviews;
const reviewObjs = [];
const zeroReviewRates = {
  accuracy: 0,
  communication: 0,
  cleanliness: 0,
  location: 0,
  checkIn: 0,
  value: 0,
};
let avgReviewRates;
const reviewRates = {};

const addRates = (j, key) => {
  reviewRates[key] = randomGenerator.generateInteger(5, 3);
  avgReviewRates[key] = ((avgReviewRates[key] * j) + reviewRates[key]) / (j + 1);
};

const numRooms = 100;
const roomObjs = [];


for (let i = 0; i < numRooms; i++) {
  numReviews = randomGenerator.generateInteger(200, 0);
  avgReviewRates = Object.assign({}, zeroReviewRates);
  for (let j = 0; j < numReviews; j++) {
    Object.keys(zeroReviewRates).forEach(addRates.bind(null, j));
    reviewObjs.push(Object.assign({
      userId: randomGenerator.generateInteger(numUsers, 1),
      roomId: i + 1,
      text: randomGenerator.generateWords(null, 1000, 80, 6),
      date: randomGenerator.generateDateString('2018-6-2', '2010-1-1'),
    }, reviewRates));
  }


  roomObjs[i] = Object.assign({
    roomName: randomGenerator.generateWords(),
    totalNumberReviews: numReviews,
  }, avgReviewRates);
}

const insertMockData = async () => {
  try {
    await Promise.all([
      db.truncateAllTables(),
      db.insertRecord('users', userObjs),
      db.insertRecord('rooms', roomObjs),
      db.insertRecord('reviews', reviewObjs)
    ]);
    console.log('done');
    return Promise.resolve();
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  insertMockData,
};

if (!module.parent) {
  insertMockData().then(() => { process.exit(-1); });
}
