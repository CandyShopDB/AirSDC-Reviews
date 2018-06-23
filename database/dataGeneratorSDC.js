const faker = require('faker');
const fs = require('fs');
const path = require('path');
// const Promise = require('bluebird');
// const appendFile = Promise.promisify(fs.appendFile);

const generateRandomInt = (min, max) => (
  Math.ceil((Math.random() * (max - min)) + min)
);

const roomTotal = 1000000;

// Populate rooms table CSV file
console.time(`${roomTotal}_rooms`);
const roomsFile = fs.createWriteStream(path.join(__dirname, './csvData/rooms.csv'));
roomsFile.write('roomname,room_address,hostId,totalNumReviews,totalAccuracy,totalCommunication,totalCleanliness,totalLocation,totalCheckIn,totalValue\r\n');
for (let i = 0; i < Math.sqrt(roomTotal); i++) {
  let storageStr = '';
  for (let j = 0; j < Math.sqrt(roomTotal); j++) {
    const roomname = `Private ${generateRandomInt(1, 5)} Bedroom ${faker.commerce.productAdjective()} House Available!`;
    const roomAddress = `${faker.address.streetAddress(true)}. ${faker.address.city()}. ${faker.address.stateAbbr()} ${faker.address.zipCode()}`;
    const hostId = generateRandomInt(1, roomTotal * 3);
    storageStr += `${roomname},${roomAddress},${hostId},,,,,,,\r\n`;
  }
  roomsFile.write(storageStr);
}
console.timeEnd(`${roomTotal}_rooms`);

// Populate reviews table CSV file
console.time(`${roomTotal * 10}_reviews`);
const reviewsFile = fs.createWriteStream(path.join(__dirname, './csvData/reviews.csv'));
reviewsFile.write('userId,roomId,text,date,accuracy,communication,cleanliness,location,checkIn,value\r\n');
let counter = 1;
for (let i = 0; i < Math.sqrt(roomTotal); i++) {
  let storageStr = '';
  for (let j = 0; j < Math.sqrt(roomTotal); j++) {
    for (let k = 0; k < generateRandomInt(8, 12); k++) {
      const userId = generateRandomInt(1, roomTotal * 3);
      const roomId = counter;
      const text = faker.lorem.paragraph();
      const date = `${faker.date.month()} ${generateRandomInt(2008, 2018)}`;
      const accuracy = generateRandomInt(1, 5);
      const communication = generateRandomInt(1, 5);
      const cleanliness = generateRandomInt(1, 5);
      const location = generateRandomInt(1, 5);
      const checkIn = generateRandomInt(1, 5);
      const value = generateRandomInt(1, 5);
      storageStr += `${userId},${roomId},${text},${date},${accuracy},${communication},${cleanliness},${location},${checkIn},${value}\r\n`;
    }
    counter += 1;
  }
  reviewsFile.write(storageStr);
}
console.timeEnd(`${roomTotal * 10}_reviews`);

// Populate users table CSV file
console.time(`${roomTotal * 3}_users`);
const usersFile = fs.createWriteStream(path.join(__dirname, './csvData/users.csv'));
usersFile.write('username,avatar\r\n');
for (let i = 0; i < Math.sqrt(roomTotal) * 3; i++) {
  let storageStr = '';
  for (let j = 0; j < Math.sqrt(roomTotal); j++) {
    const username = faker.name.findName();
    const avatar = faker.image.avatar();
    storageStr += `${username},${avatar}\r\n`;
  }
  usersFile.write(storageStr);
}
console.timeEnd(`${roomTotal * 3}_users`);

// Populate photos table CSV file
console.time(`${roomTotal * 2}_photos`);
const photosFile = fs.createWriteStream(path.join(__dirname, './csvData/photos.csv'));
photosFile.write('reviewId,photoUrl\r\n');
for (let i = 0; i < Math.sqrt(roomTotal); i++) {
  let storageStr = '';
  for (let j = 0; j < Math.sqrt(roomTotal); j++) {
    for (let k = 0; k < generateRandomInt(0, 4); k++) {
      const reviewId = generateRandomInt(1, roomTotal);
      const photoUrl = `https://s3-us-west-1.amazonaws.com/fec-photos/photo${generateRandomInt(1001, 1315)}.jpeg`;
      storageStr += `${reviewId},${photoUrl}\r\n`;
    }
  }
  photosFile.write(storageStr);
}
console.timeEnd(`${roomTotal * 2}_photos`);

// Populate reports table CSV file
console.time(`${roomTotal * 0.5}_reports`);
const reportsFile = fs.createWriteStream(path.join(__dirname, './csvData/reports.csv'));
reportsFile.write('reviewId,userId,reason,comments\r\n');
for (let i = 0; i < Math.sqrt(roomTotal); i++) {
  let storageStr = '';
  for (let j = 0; j < Math.sqrt(roomTotal) / 2; j++) {
    const reviewId = generateRandomInt(1, roomTotal);
    const userId = generateRandomInt(1, roomTotal * 3);
    const reason = generateRandomInt(1, 3);
    const comments = faker.lorem.paragraph();
    storageStr += `${reviewId},${userId},${reason},${comments}\r\n`;
  }
  reportsFile.write(storageStr);
}
console.timeEnd(`${roomTotal * 0.5}_reports`);

